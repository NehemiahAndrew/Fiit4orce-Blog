import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { loadEnvLocal } from "./load-env-local.mjs";

loadEnvLocal();

const [email, password, displayName = "Fit4Force Admin"] = process.argv.slice(2);

if (!email || !password) {
  console.error(
    "Usage: npm run bootstrap:admin -- <email> <password> [displayName]"
  );
  process.exit(1);
}

const requiredEnv = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
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

const auth = getAuth(app);

async function run() {
  let user;

  try {
    user = await auth.getUserByEmail(email);
    console.log(`Found existing user ${email}.`);
  } catch {
    user = await auth.createUser({
      email,
      password,
      displayName,
      emailVerified: true,
    });
    console.log(`Created new user ${email}.`);
  }

  await auth.setCustomUserClaims(user.uid, { admin: true });
  console.log(`Applied custom admin claim to ${email}.`);
  console.log("Next steps:");
  console.log("1. Sign in at https://admin.fit4force.com.ng");
  console.log("2. If you were already signed in elsewhere, sign out and sign back in to refresh the claim.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
