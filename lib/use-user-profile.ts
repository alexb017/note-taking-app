import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from './types';

export default function useUserProfile(uid: string) {
  const [userProfile, setUserProfile] = useState(new Object());

  useEffect(() => {
    let unsubscribe: any;

    if (uid) {
      unsubscribe = onSnapshot(doc(db, 'users', uid), (doc) => {
        //console.log('Current data: ', doc.data());
        setUserProfile({ ...doc.data() });
      });
    }

    return () => unsubscribe;
  }, [uid]);

  return userProfile;
}
