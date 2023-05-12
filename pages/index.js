import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Notes.module.css';
import Link from 'next/link';
import db from "../components/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where, getDoc, onSnapshot } from "firebase/firestore";
import CreateNote from './CreateNote';
import Note from "../components/Note";
import NoteModal from '@/components/NoteModal';
import { useEffect, useState, useRef } from 'react';
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import NotesContainer from '@/components/NotesContainer';

export default function Notes({ data }) {
  const [notes, setNotes] = useState(data);
  const [loading, setLoading] = useState(true);
  const [pinned, setPinned] = useState([]);
  const [pinNotes, setPinNotes] = useState([]);
  const [isPinned, setIsPinned] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const router = useRouter();
  const noteRef = useRef(null);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
  const arrayPinnedLength = notes.filter(note => note.isPinned).length;

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

  async function updateNote() {
    const unsubscribe = onSnapshot(collection(db, "notes"), (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(data);
    });

    return unsubscribe;
  }

  function addPinNote(pinId) {
    const existingNote = notes.find(note => note.id === pinId);
    //setPinNotes([...pinNotes, { ...pinNote }]);
    if (existingPin) {
      setIsPinned(true);
    }

  }

  function handleNoteClick(noteId) {
    router.push(`/?id=${noteId}`);
    setSelectedNote(notes.find(note => note.id === noteId));
  }

  function handleModalClose() {
    setSelectedNote(null)
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
      <div className={styles.notes}>
        <div className={styles.notesContent}>

          <div className={styles.noteContentAdd}>
            <CreateNote onUpdateNote={updateNote} />
          </div>

          <div className={styles.pinned}>
            {isPinned &&
              <>
                <p>PINNED</p>
                <NotesContainer arrayLength={arrayPinnedLength}>
                  {notes.filter(note => note.isPinned).map(note => {
                    return <Note key={note.id} details={note} data={notes} onAddPinNote={addPinNote} />
                  })}

                  <span className="noteContents break"></span>
                  <span className="noteContents break"></span>
                  <span className="noteContents break"></span>

                </NotesContainer>
              </>
            }
          </div>

          {notes.length === 0 ? (
            <div>
              <h1>Notes</h1>
              <p>Notes you add appear here</p>
            </div>
          ) :

            <NotesContainer arrayLength={notes.length}>
              {notes.filter(note => !note.isArchive && !note.isDelete && !note.isPinned).map(note => {
                return <Note key={note.id} details={note} data={notes} onUpdateNote={updateNote} onHandleNoteClick={handleNoteClick} onHandleModalClose={handleModalClose} selectedNote={selectedNote} />
              })}

              <span className="noteContents break"></span>
              <span className="noteContents break"></span>
              <span className="noteContents break"></span>

            </NotesContainer>
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