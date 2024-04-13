'use client';

import { AuthContext } from '@/app/auth-context';
import MasonryGrid from '@/components/masonry-grid';
import Note from '@/components/note';
import useNotes from '@/lib/use-notes';
import { useContext } from 'react';

export default function NotesCategory({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { q: string };
}) {
  const { user } = useContext(AuthContext);
  const [notes] = useNotes(user?.uid);

  let filtered: any;

  if (params.slug === 'reminders') {
    filtered = notes.filter(
      (note: any) => note?.reminder !== '' && !note?.isDeleted
    );
  }

  if (params.slug === 'archive') {
    filtered = notes.filter(
      (note: any) => note?.isArchived && !note?.isDeleted
    );
  }

  if (params.slug === 'trash') {
    filtered = notes.filter((note: any) => note?.isDeleted);
  }

  if (searchParams.q) {
    filtered = notes.filter((note: any) =>
      note?.content.toLowerCase().includes(searchParams.q?.toLowerCase())
    );
  }

  return (
    <div className="sm:my-0 sm:mx-auto">
      <div className="flex flex-col gap-4">
        <h3 className="text-xs uppercase font-medium text-zinc-500">
          {params.slug}
        </h3>
        {filtered?.length > 0 ? (
          <div className="w-full sm:w-[512px] lg:w-[768px] xl:w-[1024px] 3xl:w-[1280px] 4xl:w-[1536px] 5xl:w-[1792px] 6xl:w-[2048px]">
            <MasonryGrid>
              {filtered.map((note: any) => {
                return <Note key={note.id} note={note} />;
              })}
            </MasonryGrid>
          </div>
        ) : null}
      </div>
    </div>
  );
}
