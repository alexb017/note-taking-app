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

export default function Notes({ data }) {
  const [notes, setNotes] = useState(data);
  const [loading, setLoading] = useState(true);
  const [heightDiv, setHeightDiv] = useState(0);
  const [pinned, setPinned] = useState([]);
  const [isPinned, useIsPinned] = useState(false);
  const router = useRouter();
  const noteRef = useRef(null);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);

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

  useEffect(() => {
    const divs = document.querySelectorAll(".Note_noteContents__N62xp");
    const divsArray = [...divs];
    const divsHeight = divsArray.reduce((total, current) => total + current.clientHeight, 0);
    let divHeight = 0;

    if (data.length <= 4) {
      divHeight = Number.parseInt(divsHeight) / 2;
    } else {
      divHeight = (Number.parseInt(divsHeight) / Number.parseInt(data.length)) * 4;
    }

    setHeightDiv(divHeight);

  }, [heightDiv]);

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

  async function deleteNote(noteId) {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      console.log(`Document with ID ${noteId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting document:", error);
    }

    //router.refresh();
  }

  async function archiveNote(noteId) {
    try {
      const docRef = doc(db, "notes", noteId);
      const docSnap = await getDoc(docRef);
      const currentArchiveValue = docSnap.data().archive;

      await updateDoc(doc(db, "notes", noteId), {
        archive: !currentArchiveValue
      });
      console.log(`Document with ID ${noteId} update successfully`);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    //router.refresh();
  }

  async function updateDateTime(noteId) {
    try {
      await updateDoc(doc(db, "notes", noteId), {
        dateTime: ""
      });

      console.log(`Document with ID ${noteId} update successfully`);
    } catch (error) {
      console.error("Error updating document:", error);
    }

    //router.refresh();
  }

  function toggleModalSettings() {
    setIsModalSettingsOpen(!isModalSettingsOpen);
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
            {/* <div>
              <h1>Notes</h1>
              <p>Notes you add appear here</p>
            </div> */}

            <CreateNote />

          </div>

          <div className="notesContentFlex" style={{ height: heightDiv }}>
            {notes.map(note => {
              return <Note key={note.id} details={note} />
            })}

            <span className="noteContents break"></span>
            <span className="noteContents break"></span>
            <span className="noteContents break"></span>

          </div>

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