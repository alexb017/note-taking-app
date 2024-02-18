'use client';

import { useContext } from 'react';
import CreateNote from '@/components/create-note';
import { AuthContext } from '../auth-context';
import Note from '@/components/note';
import useNotes from '@/lib/use-notes';
import MasonryGrid from '@/components/masonry-grid';

export default function Notes() {
  const { user } = useContext(AuthContext);
  const [notes] = useNotes(user?.uid);

  const allNotes = notes.filter(
    (note: any) =>
      note?.isArchived !== true &&
      note?.isDeleted !== true &&
      note?.isPinned !== true
  );

  const pinNotes = notes.filter(
    (note: any) =>
      note?.isPinned === true &&
      note?.isDeleted !== true &&
      note?.isArchived !== true
  );

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex justify-center">
          <CreateNote />
        </div>
        {pinNotes.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm uppercase font-medium">pinned</h3>
            <MasonryGrid>
              {pinNotes.map((note: any) => {
                return <Note key={note.id} note={note} />;
              })}
            </MasonryGrid>
          </div>
        ) : null}

        {allNotes.length > 0 ? (
          <div className="flex flex-col gap-4">
            {pinNotes.length > 0 && allNotes.length > 0 && (
              <h3 className="text-sm uppercase font-medium">others</h3>
            )}
            <MasonryGrid>
              {allNotes.map((note: any) => {
                return <Note key={note.id} note={note} />;
              })}
            </MasonryGrid>
          </div>
        ) : null}
      </div>
    </>
  );
}
