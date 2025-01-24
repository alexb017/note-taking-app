'use client';

import { AuthContext } from '@/app/auth-context';
import { useContext } from 'react';
import { User } from 'firebase/auth';
import useNotes from '@/lib/use-notes';
import MasonryGrid from '@/components/masonry-grid';
import Note from '@/app/notes/note';

export default function ViewNotes({
  slug,
  param,
}: {
  slug: string;
  param: string;
}) {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [notes] = useNotes(user?.uid || '');

  // Filter notes based on the slug
  const getFilteredNotes = () => {
    switch (slug) {
      case 'notes':
        return notes.filter(
          (note) => !note?.isArchived && !note?.isDeleted && !note?.isPinned
        );
      case 'pinned':
        return notes.filter(
          (note) => note?.isPinned && !note?.isDeleted && !note?.isArchived
        );
      case 'reminders':
        return notes.filter(
          (note) => note?.reminder !== null && !note?.isDeleted
        );
      case 'archive':
        return notes.filter((note) => note?.isArchived && !note?.isDeleted);
      case 'trash':
        return notes.filter((note) => note?.isDeleted);
      case 'search':
        return notes.filter(
          (note) =>
            note?.title.toLowerCase().includes(param.toLowerCase()) ||
            note?.content.toLowerCase().includes(param.toLowerCase())
        );
      default:
        return [];
    }
  };

  const filteredNotes = getFilteredNotes();

  return (
    <>
      {filteredNotes?.length > 0 && (
        <div className="sm:my-0 sm:mx-auto">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase font-medium text-zinc-500">
              {slug}
            </p>
            <div className="w-full sm:w-[512px] lg:w-[768px] xl:w-[1024px] 3xl:w-[1280px] 4xl:w-[1536px] 5xl:w-[1792px] 6xl:w-[2048px]">
              <MasonryGrid>
                {filteredNotes.map((note) => {
                  return <Note key={note.noteId} note={note} />;
                })}
              </MasonryGrid>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
