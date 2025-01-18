'use client';

import { useContext } from 'react';
import CreateNote from '@/components/create-note';
import { AuthContext } from '../auth-context';
import Note from '@/components/note';
import useNotes from '@/lib/use-notes';
import MasonryGrid from '@/components/masonry-grid';
import { User } from 'firebase/auth';

export default function Notes() {
  const { user } = useContext(AuthContext) as { user: User };
  const [notes] = useNotes(user?.uid);

  const allNotes = notes.filter(
    (note: any) => !note?.isArchived && !note?.isDeleted && !note?.isPinned
  );

  const pinNotes = notes.filter(
    (note: any) => note?.isPinned && !note?.isDeleted && !note?.isArchived
  );

  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex justify-center">
          <CreateNote />
        </div>
        {pinNotes.length > 0 ? (
          <div className="sm:my-0 sm:mx-auto">
            <div className="flex flex-col gap-4">
              <h3 className="text-xs uppercase font-medium text-zinc-500">
                pinned
              </h3>
              <div className="w-full sm:w-[512px] lg:w-[768px] xl:w-[1024px] 3xl:w-[1280px] 4xl:w-[1536px] 5xl:w-[1792px] 6xl:w-[2048px]">
                {/* <MasonryGrid>
                  {pinNotes.map((note: any) => {
                    return <Note key={note.id} note={note} />;
                  })}
                </MasonryGrid> */}
              </div>
            </div>
          </div>
        ) : null}

        {allNotes.length > 0 ? (
          <div className="sm:my-0 sm:mx-auto">
            <div className="flex flex-col gap-4">
              {pinNotes.length > 0 && allNotes.length > 0 && (
                <h3 className="text-xs uppercase font-medium text-zinc-500">
                  others
                </h3>
              )}
              <div className="w-full sm:w-[512px] lg:w-[768px] xl:w-[1024px] 3xl:w-[1280px] 4xl:w-[1536px] 5xl:w-[1792px] 6xl:w-[2048px]">
                <MasonryGrid>
                  {notes.map((note: any) => {
                    return <Note key={note.noteId} note={note} />;
                  })}
                </MasonryGrid>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
