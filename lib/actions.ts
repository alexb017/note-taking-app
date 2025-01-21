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
  Timestamp,
  deleteField,
} from 'firebase/firestore';
import { db } from './firebase';
import { Note, CreateNote, ImageData, BgColor, UserProfile } from './types';
import { deleteUser, User } from 'firebase/auth';

export async function createNote(note: CreateNote, uid: string) {
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

export async function addNoteToTrash(uid: string, noteId: string) {
  try {
    const trashRef = doc(db, 'users', uid, 'notes', noteId);
    const trashDoc = await getDoc(trashRef);
    const currentValue = trashDoc.data()?.isDeleted;

    await updateDoc(trashRef, {
      isDeleted: !currentValue,
    });
  } catch (error) {
    console.error('Error to add note to trash: ', error);
  }
}

export async function updateContent(uid: string, noteId: string, text: string) {
  try {
    const contentRef = doc(db, 'users', uid, 'notes', noteId);
    await updateDoc(contentRef, { content: text });
  } catch (error) {
    console.error('Error to update content: ', error);
  }
}

export async function updateReminder(
  uid: string,
  noteId: string,
  reminder: Timestamp | undefined
) {
  try {
    const reminderRef = doc(db, 'users', uid, 'notes', noteId);

    // If reminder is undefined, set the field to null
    await updateDoc(reminderRef, { reminder: reminder ?? null });
  } catch (error) {
    console.error('Error to update reminder: ', error);
  }
}

export async function updateBgColor(
  uid: string,
  noteId: string,
  colors: BgColor
) {
  try {
    const colorRef = doc(db, 'users', uid, 'notes', noteId);
    await updateDoc(colorRef, { bgColor: colors });
  } catch (error) {
    console.error('Error to update bg color: ', error);
  }
}

export async function updateImage(uid: string, noteId: string, img: ImageData) {
  try {
    const imageRef = doc(db, 'users', uid, 'notes', noteId);
    await updateDoc(imageRef, {
      image: img,
    });
  } catch (error) {
    console.error('Error to update image: ', error);
  }
}

export async function updateIsArchived(uid: string, noteId: string) {
  try {
    const archiveRef = doc(db, 'users', uid, 'notes', noteId);
    const archiveDoc = await getDoc(archiveRef);
    const currentValue = archiveDoc.data()?.isArchived;

    await updateDoc(archiveRef, {
      isArchived: !currentValue,
    });
  } catch (error) {
    console.error('Error to update isArchive: ', error);
  }
}

export async function updateIsPinned(uid: string, noteId: string) {
  try {
    const pinRef = doc(db, 'users', uid, 'notes', noteId);
    const pinDoc = await getDoc(pinRef);
    const currentValue = pinDoc.data()?.isPinned;

    await updateDoc(pinRef, {
      isPinned: !currentValue,
    });
  } catch (error) {
    console.error('Error to update isPinned: ', error);
  }
}

export async function createUserProfile(user: User, data: object) {
  if (!user) {
    return;
  }

  const { displayName, email, uid, photoURL } = user;
  const userRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userRef);

  const userId = uid;

  if (!userSnapshot.exists()) {
    try {
      await setDoc(userRef, {
        userId,
        displayName,
        email,
        photoURL,
        ...data,
      });
    } catch (error) {
      console.error('Error to add user profile: ', error);
    }
  }

  return userRef;
}

export async function deleteUserNotesFromDatabase(uid: string) {
  try {
    // Makes a reference to the notes subcollection
    const querySnapshot = await getDocs(collection(db, 'users', uid, 'notes'));

    // Delete all the notes from subcollection
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        return await deleteDoc(doc.ref);
      })
    );
  } catch (error) {
    console.error('Error deleting the notes: ', error);
  }
}

export async function deleteUserFromDatabase(uid: string) {
  try {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error deleting the user: ', error);
  }
}

export async function deleteUserFromFirebase(user: any) {
  try {
    await deleteUser(user);
  } catch (error) {
    console.error('Error deleting the user: ', error);
  }
}
