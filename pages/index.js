import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Notes.module.css'
import Link from 'next/link'
import db from "../components/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Notes({ data }) {
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
          <h1>Notes</h1>
          <p>Notes you add appear here</p>
          {data.map(note => {
            return <div key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          })}
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