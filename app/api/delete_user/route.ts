import { NextRequest, NextResponse } from 'next/server';
import {
  deleteUserNotes,
  deleteUserFromDatabase,
  deleteUserFromFirebaseAuth,
  deleteImagesFromStorage,
} from '@/lib/helpers';

export async function DELETE(req: NextRequest) {
  if (req.method !== 'DELETE') {
    return NextResponse.json(
      { message: 'Method not allowed' },
      { status: 405 }
    );
  }

  try {
    const body = await req.json();

    const { userId } = body;

    // Delete user's notes, images, and user from the database and Firebase Auth
    await deleteUserNotes(userId);
    await deleteImagesFromStorage(userId);
    await deleteUserFromDatabase(userId);
    await deleteUserFromFirebaseAuth(userId);

    return NextResponse.json({ message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error deleting the user', error: error.message },
      { status: 500 }
    );
  }
}
