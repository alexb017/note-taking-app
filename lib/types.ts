export type CreateNote = {
  content: string;
  bgColor: {
    light: string;
    dark: string;
  };
  image: {
    src: string;
    altName: string;
  };
  reminder: string;
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  userId: string;
};

export type ImageData = {
  src: string;
  altName: string;
};

export type Note = {
  noteId: string;
  content: string;
  bgColor: {
    light: string;
    dark: string;
  };
  image: {
    src: string;
    altName: string;
  };
  reminder: string;
  isArchived: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  userId: string;
};

export type BgColor = {
  light: string;
  dark: string;
};

export type UserProfile = {
  displayName: string;
  email: string;
  userId: string;
  photoURL: string;
};
