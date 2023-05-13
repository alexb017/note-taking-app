import Head from "next/head";
import db from "@/components/firebase";
import { collection, query, where, getDocs, getDoc, updateDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import styles from "../../styles/Trash.module.css";
import NotesContainer from "@/components/NotesContainer";

export default function Trash({ data }) {
    const [notes, setNotes] = useState(data);
    const arrayLength = notes.length;

    async function updateNote() {
        const unsubscribe = onSnapshot(query(collection(db, "notes"), where("isDelete", "==", true)), (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(data);
        });

        return unsubscribe;
    }

    function handleNoteClick() {
        return;
    }

    function handleModalClose() {
        return;
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
                    <h1>Trash</h1>
                    <p>No notes in trash</p>
                </div>
                <NotesContainer>
                    {notes.map(note => {
                        return <Note key={note.id} details={note} data={notes} onUpdateNote={updateNote} onHandleNoteClick={handleNoteClick} onHandleModalClose={handleModalClose} />
                    })}
                </NotesContainer>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const q = query(collection(db, "notes"), where("isDelete", "==", true));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return {
        props: { data }
    };
}