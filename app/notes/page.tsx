'use client';

import CreateNote from '@/app/notes/create-note';
import ViewNotes from './view-notes';

export default function Notes() {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex justify-center">
          <CreateNote />
        </div>

        <ViewNotes slug="pinned" param="" />

        <ViewNotes slug="notes" param="q" />
      </div>
    </>
  );
}
