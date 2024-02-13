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
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';

type Note = {
  content: string;
  bgColor: string;
  imageURL: string;
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  uid: string;
};

export async function createNote(note: Note, uid: string) {
  try {
    // Add a new document in subcollection notes
    const docRef = collection(db, 'users', uid, 'notes');

    await addDoc(docRef, note);
  } catch (error) {
    console.error('Error adding note: ', error);
  }
}

export async function getNotes(uid: string) {
  try {
    // Makes a reference to the notes subcollection
    const querySnapshot = await getDocs(collection(db, 'users', uid, 'notes'));
    const data: any[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error('Error getting notes: ', error);
  }
}

export async function deleteNote(uid: string, noteId: string) {
  try {
    // Makes a reference to the notes subcollection
    const noteRef = doc(db, 'users', uid, 'notes', noteId);
    await deleteDoc(noteRef);
  } catch (error) {
    console.error('Error deleting note: ', error);
  }
}
