import { useEffect, useState } from 'react';
import {
  onSnapshot,
  doc,
  query,
  collection,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import { Note } from './types';

// Custom hook to read real-time updates for notes
export default function useNotes(uid: string) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (uid) {
      const q = query(collection(db, 'users', uid, 'notes'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notes: Note[] = [];
        querySnapshot.forEach((doc) => {
          notes.push({ noteId: doc.id, ...doc.data() } as Note);
        });
        setNotes(notes);
      });
    } else {
      setNotes([]);
    }

    return () => unsubscribe && unsubscribe();
  }, [uid]);

  return [notes];
}
