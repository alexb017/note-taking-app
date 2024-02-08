import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

export async function createUserProfileDocument(
  userAuth: any,
  additionalData: any
) {
  if (!userAuth) {
    return;
  }

  const { displayName, email, uid } = userAuth;

  // Add a new document in collection "cities"
  await setDoc(doc(db, 'users', uid), {
    displayName,
    email,
    uid,
    ...additionalData,
  });
}
