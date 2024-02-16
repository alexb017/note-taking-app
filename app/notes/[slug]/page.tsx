'use client';

import { AuthContext } from '@/app/auth-context';
import MasonryGrid from '@/components/masonry-grid';
import Note from '@/components/note';
import useNotes from '@/lib/use-notes';
import { useContext } from 'react';

export default function NotesCategory({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = useContext(AuthContext);
  const [notes] = useNotes(user?.uid);

  let filtered: any;

  if (params.slug === 'reminders') {
    filtered = notes.filter(
      (note: any) => note?.reminder !== '' && note?.isDeleted === false
    );
  }

  if (params.slug === 'archive') {
    filtered = notes.filter(
      (note: any) => note?.isArchived === true && note?.isDeleted === false
    );
  }

  if (params.slug === 'trash') {
    filtered = notes.filter((note: any) => note?.isDeleted === true);
  }

  return (
    <>
      <div className="flex flex-col gap-12">
        <div>My {params.slug}</div>
        {filtered?.length > 0 ? (
          <>
            <MasonryGrid>
              {filtered.map((note: any) => {
                return <Note key={note.id} note={note} />;
              })}
            </MasonryGrid>
          </>
        ) : null}
      </div>
    </>
  );
}
