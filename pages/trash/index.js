import Head from "next/head";
import db from "@/components/firebase";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import Note from "@/components/Note";
import NotesContainer from "@/components/NotesContainer";

export default function Trash({ data }) {
    const [notes, setNotes] = useState(data);

    function updateNote() {
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
                {notes.filter(note => note.isDelete).length > 0 ?
                    <NotesContainer className="notes-container">
                        {notes.map(note => {
                            return <Note key={note.id} details={note} data={notes} onUpdateNote={updateNote} onHandleNoteClick={handleNoteClick} onHandleModalClose={handleModalClose} />
                        })}
                    </NotesContainer>
                    :
                    <div className="content">
                        <h1>Trash</h1>
                        <p>No notes in trash</p>
                    </div>
                }
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