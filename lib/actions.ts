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
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

type Note = {
  content: string;
  bgColor: string;
  image: {
    src: string;
    altname: string;
  };
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  uid: string;
};

type ImageData = {
  src: string;
  altname: string;
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

export async function updateBgColor(
  uid: string,
  noteId: string,
  color: string
) {
  try {
    const colorRef = doc(db, 'users', uid, 'notes', noteId);
    await updateDoc(colorRef, { bgColor: color });
  } catch (error) {
    console.error('Error to update bg color: ', error);
  }
}

export async function updateImage(
  uid: string,
  noteId: string,
  image: ImageData
) {
  try {
    const imageRef = doc(db, 'users', uid, 'notes', noteId);
    await updateDoc(imageRef, {
      image: { src: image.src, altname: image.altname },
    });
  } catch (error) {
    console.error('Error to update image: ', error);
  }
}
