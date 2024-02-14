import { useEffect, useState } from 'react';
import { onSnapshot, doc, query, collection } from 'firebase/firestore';
import { db } from './firebase';

// Custom hook to read real-time updates for notes
export default function useNotes(uid: string) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let unsubscribe: any;

    if (uid) {
      const q = query(collection(db, 'users', uid, 'notes'));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notes: any = [];
        querySnapshot.forEach((doc) => {
          notes.push({ id: doc.id, ...doc.data() });
        });
        setNotes(notes);
      });
    } else {
      setNotes([]);
    }

    return () => unsubscribe;
  }, [uid]);

  return [notes];
}
