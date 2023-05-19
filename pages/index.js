import Head from 'next/head';
import db from "../components/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import CreateNote from './CreateNote';
import Note from "../components/Note";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from "next/router";
import NotesContainer from '@/components/NotesContainer';

export default function Notes({ data }) {
  const [notes, setNotes] = useState(data);
  const [selectedNote, setSelectedNote] = useState(null);
  const router = useRouter();
  const noteRef = useRef(null);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);

  const notesPinned = notes.filter(note => note.isPinned);
  const notesList = notes.filter(note => !note.isArchive && !note.isDelete && !note.isPinned);

  useEffect(() => {
    console.log(notes)
  }, [notes]);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (noteRef.current && !noteRef.current.contains(e.target) && !noteRef.current.contains(e.target)) {
        setIsModalSettingsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [noteRef, isModalSettingsOpen]);

  function updateNote() {
    const unsubscribe = onSnapshot(collection(db, "notes"), (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(data);
    });

    return unsubscribe;
  }

  function handleNoteClick(noteId) {
    router.push(`/?id=${noteId}`);
    //setSelectedNote(notes.find(note => note.id === noteId));
  }

  function handleModalClose() {
    //setSelectedNote(null)
    router.replace('/', undefined, { shallow: true });
  }

  return (
    <>
      <Head>
        <title>Note Taking App</title>
        <meta name="description" content="Build a note-taking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>

          <div className="note-content-add">
            <CreateNote onUpdateNote={updateNote} />
          </div>

          {notesPinned.length > 0 &&
            <div className="pinned">
              <p>Pinned</p>
              <NotesContainer>
                {notesPinned.map(note => {
                  return <Note key={note.id} details={note} data={notes} onUpdateNote={updateNote} onHandleNoteClick={handleNoteClick} onHandleModalClose={handleModalClose} selectedNote={selectedNote} />
                })}
              </NotesContainer>
            </div>}

          {notesList.length === 0 && notesPinned.length === 0 ? (
            <div>
              <h1>Notes</h1>
              <p>Notes you add appear here</p>
            </div>
          ) :

            <>
              {notesList.length !== 0 && notesPinned.length > 0 ? <p className="others">Others</p> : ""}
              <NotesContainer>
                {notesList.map(note => {
                  return <Note key={note.id} details={note} data={notes} onUpdateNote={updateNote} onHandleNoteClick={handleNoteClick} onHandleModalClose={handleModalClose} selectedNote={selectedNote} />
                })}
              </NotesContainer>
            </>
          }
        </div>
      </div>


    </>
  )
}

export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(db, "notes"));
  const data = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return {
    props: { data }
  };
}