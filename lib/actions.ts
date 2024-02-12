import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { db } from './firebase';

type Note = {
  content: string;
  bgColor: string;
  imageSrc: {
    imageName: string;
    imageURL: string;
  };
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
};

export async function createNote(data: Note, uid: string) {
  // Add a new document in collection "notes"
  const docRef = collection(db, 'users', uid, 'notes');

  await addDoc(docRef, data);
}
