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

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex justify-center">
          <CreateNote />
        </div>
        {notes.length > 0 ? (
          <>
            <MasonryGrid>
              {notes.map((note: any) => {
                return <Note key={note.id} note={note} />;
              })}
            </MasonryGrid>
          </>
        ) : null}
      </div>
    </>
  );
}
