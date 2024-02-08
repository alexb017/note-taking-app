import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebase';

export default function useUserProfile(uid: string) {
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    let unsubscribe: any;

    if (uid) {
      unsubscribe = onSnapshot(doc(db, 'users', uid), (doc) => {
        console.log('Current data: ', doc.data());
        setUserProfile(doc.data() as any);
      });
    }

    return () => unsubscribe;
  }, [uid]);

  return [userProfile];
}
