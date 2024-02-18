export type Notes = {
  id: string;
  content: string;
  bgColor: string;
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
  bgColor: string;
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
