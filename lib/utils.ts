import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

export async function uploadImageToStorage(
  event: React.ChangeEvent<HTMLInputElement>,
  uid: string
) {
  // Get the file, with optional chaining to handle null
  const file = event.target.files?.[0];
  const filename = file?.name.split('.')[0] as string;
  const extension = file?.type.split('/')[1];

  if (!file) {
    return;
  }

  // Create a reference to the file to create
  const storage = getStorage();
  const storageRef = ref(storage, `notes/${uid}/${Date.now()}.${extension}`);

  // Upload the file
  await uploadBytes(storageRef, file);

  // Get the download URL
  const url = await getDownloadURL(storageRef);

  return { src: url, altname: filename };
}

export async function deleteImageFromStorage(filename: string) {
  // Create a reference to the file to delete
  const storage = getStorage();
  const storageRef = ref(storage, filename);

  // Delete the file
  await deleteObject(storageRef);
}
