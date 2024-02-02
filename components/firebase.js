import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvgzOCwbHN9FtcepICptHyJknKggeCRZI',
  authDomain: 'note-taking-app-8432a.firebaseapp.com',
  databaseURL: 'https://note-taking-app-8432a-default-rtdb.firebaseio.com',
  projectId: 'note-taking-app-8432a',
  storageBucket: 'note-taking-app-8432a.appspot.com',
  messagingSenderId: '572699717734',
  appId: '1:572699717734:web:de42c83ca57b649992fda7',
  measurementId: 'G-QXC1GWYLZL',
};

// If an app exists, use it, otherwise initialize it
const app = getApps().length ? getApp : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
