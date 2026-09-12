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
  id: "naf-physical-standards",
  title: "What Physical Standards Are Required for NAF Recruitment?",
  slug: "what-physical-standards-are-required-for-naf-recruitment",
  excerpt:
    "Find out the physical standards generally expected for NAF recruitment and why you should confirm the latest screening details on the official NAF careers portal.",
  content:
    "The physical standards required for NAF recruitment usually center on basic fitness, medical fitness, and your ability to pass the screening process successfully. To avoid using outdated or unofficial figures, you should confirm the current physical and medical requirements on the official NAF careers portal before you submit or prepare for screening.\n\nIn practical terms, NAF physical standards are not only about appearance. They are about whether you are fit enough for military training and whether you can pass the physical and medical checks used during recruitment.\n\n## What NAF physical standards usually cover\n\nFor most Nigerian Air Force recruitment exercises, physical standards typically relate to:\n\n- general body fitness\n- medical fitness\n- physical screening readiness\n- posture and overall appearance\n- ability to complete recruitment screening without obvious physical limitations\n\nThis means candidates should think beyond just working out. You should prepare for both physical activity and formal screening checks.\n\n## What medically fit usually means in recruitment\n\nA big part of physical qualification is medical fitness. During recruitment, the Nigerian Air Force may assess whether a candidate is free from obvious health conditions that could affect training or service suitability.\n\nThat is why it is important to:\n\n- prepare honestly rather than trying to hide a medical issue\n- avoid relying on unofficial advice about what can be ignored\n- confirm the latest screening guidance from the official portal\n\nIf the current NAF recruitment notice lists medical exclusions or special physical conditions, treat that notice as the final authority.\n\n## How to prepare for NAF physical screening\n\nIf you are waiting for recruitment screening, focus on the areas you can control now:\n\n- improve your stamina with regular cardio\n- build bodyweight strength with push-ups, squats, planks, and similar basic drills\n- maintain mobility and flexibility\n- keep a healthy sleep routine\n- avoid crash dieting or extreme last-minute training\n\nSteady preparation is usually better than trying to force results a few days before screening.\n\n## What you should check on the official portal\n\nBefore you treat any physical standard as final, check the official NAF careers portal for:\n\n- the current recruitment notice\n- screening instructions\n- medical fitness guidance\n- any physical requirements stated for that intake\n\nThis matters because recruitment details can change from one exercise to another. A candidate who prepares from an old screenshot, forwarded message, or blog post can easily train for the wrong thing.\n\n## How Fit4Force Can Help\n\nIf you are preparing for Nigerian Air Force recruitment, Fit4Force can help you build a more disciplined routine around fitness and exam preparation at the same time. Instead of training blindly, you can use Fit4Force to stay consistent with study practice, structured preparation, and readiness habits while you keep checking the official NAF portal for the final screening requirements.\n\nYou can also explore more preparation guides on the [Fit4Force blog](/blog) or start practicing with [Fit4Force on Google Play](https://play.google.com/store/apps/details?id=com.fitf4force.fit_4_force).\n\n---\n\n**Ready to start preparing?**\nDownload Fit4Force free on [Google Play](https://play.google.com/store/apps/details?id=com.fitf4force.fit_4_force) and practice real past questions for Nigerian Air Force.",
  featuredImage:
    "https://th.bing.com/th/id/OIG4.Acd.mJvHsTbAcJX7_chT?pid=ImgGn",
  category: "Air Force",
  tags: ["physical-fitness", "screening"],
  seoTitle: "What Physical Standards Are Required for NAF Recruitment?",
  seoDescription:
    "Find out the physical standards generally expected for NAF recruitment and why you should confirm the latest screening details on the official NAF careers portal.",
  status: "published",
  createdAt: new Date("2026-06-23T00:00:00.000Z"),
  updatedAt: new Date("2026-06-23T00:00:00.000Z"),
  publishedAt: new Date("2026-06-23T00:00:00.000Z"),
  author: "Fit4Force Editorial",
  viewCount: 0,
};

const { id, ...data } = post;
await db.collection("posts").doc(id).set(data, { merge: true });

console.log("Published the NAF physical standards post.");
