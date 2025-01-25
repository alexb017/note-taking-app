import {
  initializeApp,
  cert,
  ServiceAccount,
  getApp,
  getApps,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Get the service account key from the environment variables
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
) as ServiceAccount;

// If an app exists, use it, otherwise initialize it
const app = getApps().length
  ? getApp()
  : initializeApp({ credential: cert(serviceAccount) });

// Get the Firestore database instance
const db = getFirestore(app);

export { db };
