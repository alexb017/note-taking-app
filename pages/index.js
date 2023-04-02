import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Notes.module.css';
import Link from 'next/link';
import db from "../components/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where, getDoc } from "firebase/firestore";
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
  const [isPinned, setIsPinned] = useState(false);
  const router = useRouter();
  const noteRef = useRef(null);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
  const arrayLength = data.length;

  useEffect(() => {
    console.log(notes)
  }, []);

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

  async function updateNote(newNote) {
    try {
      await updateDoc(doc(db, "notes", newNote), {
        title,
        content,
        backgroundColor,
        dateTime
      });

      console.log('Document updated successfully!');
    } catch (error) {
      console.error("Error updating document:", error);
    }

  }

  function isPinnedNote() {
    const pinNotes = notes.filter(note => note.isPinned);

    if (pinNotes.length === 0) {
      setIsPinned(false);
    } else {
      setIsPinned(true);
    }
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
            <CreateNote />
          </div>

          <div className={styles.pinned}>
            {isPinned &&
              <>
                <p>PINNED</p>
                <NotesContainer arrayLength={arrayLength}>
                  {notes.filter(note => note.isPinned).map(note => {
                    return <Note key={note.id} details={note} data={data} />
                  })}

                  <span className="noteContents break"></span>
                  <span className="noteContents break"></span>
                  <span className="noteContents break"></span>

                </NotesContainer>
              </>
            }
          </div>

          {arrayLength === 0 ? (
            <div>
              <h1>Notes</h1>
              <p>Notes you add appear here</p>
            </div>
          ) :

            <NotesContainer arrayLength={arrayLength}>
              {notes.map(note => {
                return <Note key={note.id} details={note} data={data} />
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
  const q = query(collection(db, "notes"), where("isArchive", "==", false), where("isDelete", "==", false));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach(doc => data.push({
    id: doc.id,
    ...doc.data()
  }));

  return {
    props: { data }
  };
}