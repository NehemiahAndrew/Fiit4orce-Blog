import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, hasFirebaseAdminConfig } from "@/lib/firebase-admin";
import { sanitizeText } from "@/lib/sanitize";

const rateWindowMs = 60_000;
const maxRequestsPerWindow = 10;
const requestStore = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const current = requestStore.get(key);

  if (!current || current.expiresAt < now) {
    requestStore.set(key, { count: 1, expiresAt: now + rateWindowMs });
    return false;
  }

  if (current.count >= maxRequestsPerWindow) {
    return true;
  }

  current.count += 1;
  requestStore.set(key, current);
  return false;
}

export async function POST(request: Request) {
  try {
    const forwardedFor =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const body = (await request.json()) as { slug?: string };
    const slug = sanitizeText(body.slug ?? "");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug." }, { status: 400 });
    }

    if (isRateLimited(`${forwardedFor}:${slug}`)) {
      return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
    }

    if (!hasFirebaseAdminConfig || !adminDb) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const snapshot = await adminDb
      .collection("posts")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    const document = snapshot.docs[0];
    if (!document) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    await document.ref.update({
      viewCount: FieldValue.increment(1),
      updatedAt: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to track view." }, { status: 500 });
  }
}
