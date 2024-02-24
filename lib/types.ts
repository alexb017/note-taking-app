export type Notes = {
  id: string;
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
  uid: string;
};

export type ImageData = {
  src: string;
  altName: string;
};

export type Note = {
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
  uid: string;
};

export type BgColor = {
  light: string;
  dark: string;
};

export type UserProfile = {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
};
