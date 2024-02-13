import { getStorage, ref, deleteObject } from 'firebase/storage';

export async function deleteImage(filename: string) {
  // Create a reference to the file to delete
  const storage = getStorage();
  const storageRef = ref(storage, filename);

  // Delete the file
  await deleteObject(storageRef);
}
