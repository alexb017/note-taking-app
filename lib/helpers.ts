import { db } from './firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Delete user's notes from the database
export async function deleteUserNotes(userId: string) {
  try {
    const notesRef = db.collection('users').doc(userId).collection('notes');
    const snapshot = await notesRef.get(); // Get all the notes

    // Create a batch of writes to delete the notes
    // This is more efficient than deleting each note individually
    const batchSize = snapshot.size;
    if (batchSize === 0) {
      return;
    }

    // Delete the notes in batches
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid exploding the stack
    process.nextTick(() => deleteUserNotes(userId));
  } catch (error: any) {
    throw new Error(`Error deleting user's notes: ${error}`);
  }
}

// Delete user from the database
export async function deleteUserFromDatabase(userId: string) {
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.delete();
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error}`);
  }
}

// Delete user from Firebase Authentication
export async function deleteUserFromFirebaseAuth(userId: string) {
  try {
    await getAuth().deleteUser(userId);
  } catch (error: any) {
    throw new Error(`Error deleting user from Firebase: ${error}`);
  }
}

// Delete images from Cloud Storage
export async function deleteImagesFromStorage(userId: string) {
  try {
    const storage = getStorage();
    // Create a reference to the bucket
    const bucket = storage.bucket('note-taking-app-8432a.appspot.com');
    // Get all the files in the user's folder
    const [files] = await bucket.getFiles({ prefix: `users/${userId}/` });

    if (files.length === 0) {
      return;
    }

    // Delete the files
    const deleteFiles = files.map((file) => {
      return file.delete();
    });

    // Wait for all the files to be deleted
    await Promise.all(deleteFiles);
  } catch (error: any) {
    throw new Error(`Error deleting images: ${error}`);
  }
}
