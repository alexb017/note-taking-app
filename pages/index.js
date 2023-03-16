import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Notes.module.css';
import Link from 'next/link';
import db from "../components/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import CreateNote from './CreateNote';
import Note from "../components/Note";

export default function Notes({ data }) {
  async function updateNote(newNote) {
    await updateDoc(doc(db, "notes", newNote), {
      title: true,
      content: true
    });
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
            <div>
              <h1>Notes</h1>
              <p>Notes you add appear here</p>
            </div>
            <CreateNote />
            <div className={styles.alignContent}>
              Switch buttons grid/list
            </div>
          </div>
          <div className={styles.notesContentFlex}>
            {data.map(note => {
              return <Note key={note.id} details={note} onUpdateNote={updateNote} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(db, "notes"));
  const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  return {
    props: { data }
  }
}