import { Timestamp } from 'firebase/firestore';

export type ImageData = {
  src: string;
  altName: string;
};

export type BgColor = {
  light: string;
  dark: string;
  tooltip: string;
};

export type CreateNote = {
  content: string;
  title: string;
  bgColor?: BgColor;
  image?: ImageData;
  reminder?: Timestamp | null;
  isArchived?: boolean;
  isPinned?: boolean;
  isDeleted?: boolean;
  userId: string;
  lastEdited: Timestamp;
};

export type Note = {
  noteId: string;
  content: string;
  title: string;
  bgColor: BgColor;
  image: ImageData;
  reminder: Timestamp | null;
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  userId: string;
  lastEdited: Timestamp;
};

export type UserProfile = {
  displayName: string;
  email: string;
  userId: string;
  photoURL: string;
};
