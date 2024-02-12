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
} from 'firebase/firestore';
import { db } from './firebase';

export async function createNote(data: any, uid: string) {}
