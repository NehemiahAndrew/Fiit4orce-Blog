import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { loadEnvLocal } from "./load-env-local.mjs";

loadEnvLocal();

const requiredEnv = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  console.error("Set the Firebase Admin SDK env vars before running this script.");
  process.exit(1);
}

const app =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });

const db = getFirestore(app);

const post = {
  id: "naf-scam-warning",
  title: "How to Avoid Nigerian Air Force Recruitment Scams (NAF Official Warning)",
  slug: "how-to-avoid-nigerian-air-force-recruitment-scams-naf-official-warning",
  excerpt:
    "Learn how to avoid Nigerian Air Force recruitment scams by using the official NAF careers portal, ignoring unofficial payment requests, and verifying every step.",
  content:
    "If you want to avoid Nigerian Air Force recruitment scams, use only the official NAF careers portal and treat any unofficial payment request, shortcut offer, or \"connection\" promise as a red flag. The safest rule is simple: if it does not come from the official Nigerian Air Force recruitment portal, do not trust it.\n\nScammers often target applicants when recruitment interest is high. They may claim they can help you secure a slot, speed up screening, or \"upgrade\" your name on the shortlist. The best protection is to follow only the official process published on the NAF careers portal in the source field above.\n\n## What the safest NAF anti-scam rule looks like\n\nThe strongest anti-scam habit is to verify every recruitment update through the official NAF careers portal before you act. Do not rely on random WhatsApp broadcasts, Telegram messages, Facebook posts, or unofficial blogs for sensitive decisions about application steps.\n\nWhen reviewing any recruitment message, check:\n\n- whether it points back to the official NAF careers portal\n- whether the instructions match the process currently shown on the portal\n- whether the sender is asking for money, personal favors, or private contact outside the normal application process\n\nIf any of those details feel wrong, pause and verify first.\n\n## Common signs a Nigerian Air Force recruitment message may be a scam\n\nMost recruitment scams follow familiar patterns. Watch out for messages that:\n\n- ask you to pay a fee to register, shortlist, screen, or secure selection\n- promise guaranteed success or \"special help\" from an insider\n- direct you to unofficial websites or suspicious forms\n- pressure you to act quickly without giving you time to verify through the official portal\n- ask for sensitive personal details through personal chat instead of the official application channel\n\nEven when a scammer uses military language, agency logos, or urgent wording, that still does not make the message official.\n\n## How to verify a Nigerian Air Force recruitment update safely\n\nBefore you click, pay, upload, or share anything, go back to the official source: [NAF Careers Portal](https://careers.naf.mil.ng).\n\nUse this quick check:\n\n- open the official portal yourself instead of trusting a forwarded link\n- confirm that recruitment is actually open before following any instruction\n- compare the message you received with the guidance on the official portal\n- ignore private claims that someone can influence your result\n- keep screenshots of suspicious messages in case you need to report them\n\nThis habit can save you money, stress, and the risk of exposing your personal information.\n\n## What you should never do during NAF recruitment\n\nTo stay safe, never:\n\n- pay a recruiter, agent, or middleman for \"help\"\n- submit documents through unofficial personal accounts\n- trust shortlist or screening claims that you cannot confirm on the official portal\n- assume a social media graphic is genuine without checking the source\n\nIf a person says the process has changed, verify that change on the official NAF portal first.\n\n## How Fit4Force Can Help\n\nAvoiding scams is easier when your preparation is organized and you are not chasing every rumor online. Fit4Force helps you stay focused on actual preparation with study materials, practice questions, and structured readiness support for Nigerian Air Force aspirants. You can start with [Fit4Force on Google Play](https://play.google.com/store/apps/details?id=com.fitf4force.fit_4_force) and keep your preparation centered on practice instead of panic.\n\nYou can also browse more preparation content on the [Fit4Force blog](/blog) as you build your study plan.\n\n---\n\n**Ready to start preparing?**\nDownload [Fit4Force free on Google Play](https://play.google.com/store/apps/details?id=com.fitf4force.fit_4_force) and practice real past questions for Nigerian Air Force.",
  featuredImage: "/blog-images/naf-screening-day.png",
  category: "Air Force",
  tags: ["scam-alert", "application-process"],
  seoTitle: "How to Avoid Nigerian Air Force Recruitment Scams (NAF Official Warning)",
  seoDescription:
    "Learn how to avoid Nigerian Air Force recruitment scams using the official NAF careers portal and practical verification habits.",
  status: "published",
  createdAt: new Date("2026-06-23T00:00:00.000Z"),
  updatedAt: new Date("2026-06-23T00:00:00.000Z"),
  publishedAt: new Date("2026-06-23T00:00:00.000Z"),
  author: "Fit4Force Editorial",
  viewCount: 0,
};

const dummyPostIds = ["sample-post-1", "sample-post-2", "sample-post-3"];

const batch = db.batch();

for (const id of dummyPostIds) {
  batch.delete(db.collection("posts").doc(id));
}

const { id, ...data } = post;
batch.set(db.collection("posts").doc(id), data, { merge: true });

await batch.commit();

console.log("Removed dummy blog posts and published the NAF scam warning post.");
