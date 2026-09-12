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
  console.error("Set the Firebase Admin SDK env vars before running this seed.");
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

const posts = [
  {
    id: "sample-post-1",
    title: "How to Start Nigerian Army Recruitment Preparation",
    slug: "start-nigerian-army-recruitment-preparation",
    excerpt:
      "Build a simple preparation rhythm around study materials, fitness training, and official recruitment updates.",
    content:
      "Start by confirming the latest recruitment instructions on the official Nigerian Army website. Then organize your week around general knowledge revision, aptitude practice, and fitness training.\n\n## What to prepare first\n\nFocus on the areas you can control every week: reading, timed practice, document readiness, and physical conditioning. Avoid relying on social media claims for dates, fees, age limits, or requirements.\n\n## How Fit4Force can help\n\nFit4Force brings study materials, fitness training, progress tracking, and community features into one preparation flow.\n\n---\n\n**Ready to start preparing?**\nDownload Fit4Force free on Google Play and practice real past questions for your agency.",
    featuredImage: "/screenshots/prep.png",
    category: "Army",
    tags: ["application-process", "physical-fitness"],
    seoTitle: "How to Start Nigerian Army Recruitment Preparation",
    seoDescription:
      "A practical starting plan for Nigerian Army recruitment preparation using official updates, study, and fitness.",
    status: "published",
    createdAt: new Date("2026-06-21T00:00:00.000Z"),
    updatedAt: new Date("2026-06-21T00:00:00.000Z"),
    publishedAt: new Date("2026-06-21T00:00:00.000Z"),
    author: "Fit4Force Editorial",
    viewCount: 124,
  },
  {
    id: "sample-post-2",
    title: "What to Practice Before a Recruitment Aptitude Test",
    slug: "practice-before-recruitment-aptitude-test",
    excerpt:
      "Use timed practice, general knowledge revision, and basic quantitative reasoning to build exam confidence.",
    content:
      "Before a recruitment aptitude test, practice under timed conditions and revise the topics most commonly tested in general aptitude exams. Confirm agency-specific instructions from the official portal before acting on any requirement.\n\n## Practice areas\n\nPrioritize English, mathematics, general knowledge, current affairs, and logical reasoning. Keep your study sessions short enough to repeat consistently.\n\n## How Fit4Force can help\n\nFit4Force includes study materials, mock preparation flows, and progress tracking to make daily practice easier to sustain.\n\n---\n\n**Ready to start preparing?**\nDownload Fit4Force free on Google Play and practice real past questions.",
    featuredImage: "/screenshots/dashboard.png",
    category: "Recruitment Tips",
    tags: ["past-questions", "screening"],
    seoTitle: "What to Practice Before a Recruitment Aptitude Test",
    seoDescription:
      "A simple guide to aptitude test preparation for Nigerian military and paramilitary recruitment.",
    status: "published",
    createdAt: new Date("2026-06-20T00:00:00.000Z"),
    updatedAt: new Date("2026-06-20T00:00:00.000Z"),
    publishedAt: new Date("2026-06-20T00:00:00.000Z"),
    author: "Fit4Force Editorial",
    viewCount: 96,
  },
  {
    id: "sample-post-3",
    title: "Fitness Habits for Recruitment Screening Preparation",
    slug: "fitness-habits-recruitment-screening-preparation",
    excerpt:
      "Consistent bodyweight training, mobility, and recovery can support recruitment screening readiness.",
    content:
      "Fitness preparation works best when it is consistent, progressive, and realistic. Check the official recruitment instructions for any agency-specific screening requirement before treating a target as final.\n\n## Weekly fitness rhythm\n\nCombine cardio, strength, core work, stretching, and rest days. Track your progress so you can see whether your endurance and strength are improving.\n\n## How Fit4Force can help\n\nFit4Force has fitness training categories and progress support for aspirants preparing alongside their study plan.\n\n---\n\n**Ready to start preparing?**\nDownload Fit4Force free on Google Play and build your recruitment preparation routine.",
    featuredImage: "/screenshots/fitness.png",
    category: "Fitness",
    tags: ["physical-fitness", "screening"],
    seoTitle: "Fitness Habits for Recruitment Screening Preparation",
    seoDescription:
      "Fitness preparation habits for Nigerian military and paramilitary recruitment screening.",
    status: "published",
    createdAt: new Date("2026-06-19T00:00:00.000Z"),
    updatedAt: new Date("2026-06-19T00:00:00.000Z"),
    publishedAt: new Date("2026-06-19T00:00:00.000Z"),
    author: "Fit4Force Editorial",
    viewCount: 81,
  },
];

const recruitmentUpdates = [
  {
    id: "sample-update-1",
    title: "Check Nigerian Air Force Updates on the Official Careers Portal",
    slug: "check-naf-official-careers-portal",
    excerpt:
      "Use the official NAF careers portal for current recruitment instructions and avoid unverified social media claims.",
    content:
      "This sample update is a reminder to verify Nigerian Air Force recruitment information only from the official careers portal. It does not publish dates, fees, age limits, or requirements because those must be checked against the official source before publication.",
    category: "Air Force",
    tags: ["recruitment-dates", "scam-alert"],
    status: "published",
    important: true,
    source: "https://careers.naf.mil.ng",
    createdAt: new Date("2026-06-21T00:00:00.000Z"),
    updatedAt: new Date("2026-06-21T00:00:00.000Z"),
    publishedAt: new Date("2026-06-21T00:00:00.000Z"),
  },
  {
    id: "sample-update-2",
    title: "Use the Nigerian Navy Recruitment Portal for Current Notices",
    slug: "use-nigerian-navy-recruitment-portal-current-notices",
    excerpt:
      "The Nigerian Navy recruitment portal should be the reference point for current application notices.",
    content:
      "This sample update points applicants to the official Nigerian Navy recruitment portal for current notices. TODO: Human review required before adding any dates, fees, age limits, or requirements.",
    category: "Navy",
    tags: ["application-process"],
    status: "published",
    important: false,
    source: "https://narecportal.navy.mil.ng",
    createdAt: new Date("2026-06-20T00:00:00.000Z"),
    updatedAt: new Date("2026-06-20T00:00:00.000Z"),
    publishedAt: new Date("2026-06-20T00:00:00.000Z"),
  },
  {
    id: "sample-update-3",
    title: "Verify FRSC Recruitment Information from the Official Website",
    slug: "verify-frsc-recruitment-information-official-website",
    excerpt:
      "FRSC recruitment details should be verified from the official FRSC website before candidates act.",
    content:
      "This sample update keeps candidates focused on the official FRSC website for current recruitment information. It intentionally avoids unverified requirements or recruitment dates.",
    category: "FRSC",
    tags: ["scam-alert"],
    status: "published",
    important: true,
    source: "https://frsc.gov.ng",
    createdAt: new Date("2026-06-19T00:00:00.000Z"),
    updatedAt: new Date("2026-06-19T00:00:00.000Z"),
    publishedAt: new Date("2026-06-19T00:00:00.000Z"),
  },
];

const categories = [
  {
    id: "army",
    name: "Army",
    slug: "army",
    description: "Nigerian Army content",
    type: "blog",
    createdAt: new Date("2026-06-21T00:00:00.000Z"),
    updatedAt: new Date("2026-06-21T00:00:00.000Z"),
  },
  {
    id: "navy",
    name: "Navy",
    slug: "navy",
    description: "Nigerian Navy content",
    type: "blog",
    createdAt: new Date("2026-06-21T00:00:00.000Z"),
    updatedAt: new Date("2026-06-21T00:00:00.000Z"),
  },
  {
    id: "air-force",
    name: "Air Force",
    slug: "air-force",
    description: "Nigerian Air Force content",
    type: "blog",
    createdAt: new Date("2026-06-21T00:00:00.000Z"),
    updatedAt: new Date("2026-06-21T00:00:00.000Z"),
  },
  {
    id: "recruitment-tips",
    name: "Recruitment Tips",
    slug: "recruitment-tips",
    description: "General preparation guidance",
    type: "blog",
    createdAt: new Date("2026-06-21T00:00:00.000Z"),
    updatedAt: new Date("2026-06-21T00:00:00.000Z"),
  },
  {
    id: "fitness",
    name: "Fitness",
    slug: "fitness",
    description: "Fitness preparation content",
    type: "blog",
    createdAt: new Date("2026-06-21T00:00:00.000Z"),
    updatedAt: new Date("2026-06-21T00:00:00.000Z"),
  },
  {
    id: "frsc",
    name: "FRSC",
    slug: "frsc",
    description: "FRSC updates",
    type: "update",
    createdAt: new Date("2026-06-21T00:00:00.000Z"),
    updatedAt: new Date("2026-06-21T00:00:00.000Z"),
  },
];

async function seedCollection(collectionName, documents) {
  const batch = db.batch();

  for (const document of documents) {
    const { id, ...data } = document;
    batch.set(db.collection(collectionName).doc(id), data, { merge: true });
  }

  await batch.commit();
  console.log(`Seeded ${documents.length} documents into ${collectionName}.`);
}

await seedCollection("posts", posts);
await seedCollection("recruitment_updates", recruitmentUpdates);
await seedCollection("categories", categories);

console.log("Firestore seed complete.");
