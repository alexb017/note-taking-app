import Head from "next/head";
import db from "@/components/firebase";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import styles from "../../styles/Reminders.module.css";
import NotesContainer from "@/components/NotesContainer";
import { useRouter } from "next/router";

export default function Reminders({ data }) {
    const [notes, setNotes] = useState(data);
    const [selectedNote, setSelectedNote] = useState(null);
    const router = useRouter();

    async function updateNote() {
        const unsubscribe = onSnapshot(query(collection(db, "notes"), where("dateTime", "!=", '')), (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(data);
        });

        return unsubscribe;
    }

    function handleNoteClick(noteId) {
        router.push(`/reminders/?id=${noteId}`);
        setSelectedNote(notes.find(note => note.id === noteId));
    }

    function handleModalClose() {
        setSelectedNote(null)
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
            <div>
                <div className={styles.content}>
                    <h1>Reminders</h1>
                    <p>Notes with upcoming reminders appear here</p>
                </div>
                <NotesContainer arrayLength={notes.length}>
                    {notes.map(note => {
                        return <Note key={note.id} details={note} data={notes} onUpdateNote={updateNote} onHandleNoteClick={handleNoteClick} onHandleModalClose={handleModalClose} selectedNote={selectedNote} />
                    })}
                </NotesContainer>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const q = query(collection(db, "notes"), where("dateTime", "!=", ''));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return {
        props: { data }
    };
}