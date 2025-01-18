import { useEffect, useState } from 'react';
import { onSnapshot, doc, Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';
import { type UserProfile } from './types';

export default function useUserProfile(uid: string) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    if (!uid) {
      return;
    }

    const userRef = doc(db, 'users', uid);
    unsubscribe = onSnapshot(userRef, (doc) => {
      const data = doc.data() as UserProfile;
      const { displayName, email, photoURL, userId } = data;
      setUserProfile({ displayName, email, photoURL, userId });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [uid]);

  return [userProfile];
}
