import Head from 'next/head';
import db from '@/components/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { useState } from 'react';
import Note from '@/components/Note';
import NotesContainer from '@/components/NotesContainer';
import { useRouter } from 'next/router';
import Layout from '../layout';

export default function Reminders({ data }) {
  const [notes, setNotes] = useState(data);
  const [selectedNote, setSelectedNote] = useState(null);
  const router = useRouter();

  function updateNote() {
    const unsubscribe = onSnapshot(
      query(collection(db, 'notes'), where('dateTime', '!=', '')),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(data);
      }
    );

    return unsubscribe;
  }

  function handleNoteClick(noteId) {
    router.push(`/reminders/?id=${noteId}`);
    setSelectedNote(notes.find((note) => note.id === noteId));
  }

  function handleModalClose() {
    setSelectedNote(null);
    router.replace('/reminders', undefined, { shallow: true });
  }

  return (
    <>
      <Head>
        <title>Note Taking App</title>
        <meta name="description" content="Build a note-taking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {notes.filter((note) => note.dateTime !== '').length > 0 ? (
          <NotesContainer className="notes-container">
            {notes.map((note) => {
              return (
                <Note
                  key={note.id}
                  details={note}
                  data={notes}
                  onUpdateNote={updateNote}
                  onHandleNoteClick={handleNoteClick}
                  onHandleModalClose={handleModalClose}
                  selectedNote={selectedNote}
                />
              );
            })}
          </NotesContainer>
        ) : (
          <div className="content">
            <h1>Reminders</h1>
            <p>Notes with upcoming reminders appear here</p>
          </div>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const q = query(collection(db, 'notes'), where('dateTime', '!=', ''));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: { data },
  };
}