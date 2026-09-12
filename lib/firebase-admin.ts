import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getPrivateKey() {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim();

  if (!privateKey) {
    return undefined;
  }

  const unwrappedKey = privateKey
    .replace(/^"|"$/g, "")
    .replace(/^'|'$/g, "");

  return unwrappedKey.replace(/\\n/g, "\n");
}

export function hasFirebaseAdminConfig() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      getPrivateKey()
  );
}

export function getFirebaseAdminApp() {
  if (!hasFirebaseAdminConfig()) {
    return null;
  }

  try {
    return (
      getApps()[0] ??
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: getPrivateKey(),
        }),
      })
    );
  } catch {
    return null;
  }
}

export function getAdminAuth() {
  const firebaseAdminApp = getFirebaseAdminApp();
  return firebaseAdminApp ? getAuth(firebaseAdminApp) : null;
}

export function getAdminDb() {
  const firebaseAdminApp = getFirebaseAdminApp();
  return firebaseAdminApp ? getFirestore(firebaseAdminApp) : null;
}
