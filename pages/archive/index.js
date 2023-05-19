import Head from "next/head";
import db from "@/components/firebase";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import Note from "@/components/Note";
import { useRouter } from "next/router";
import NotesContainer from "@/components/NotesContainer";

export default function Archive({ data }) {
    const [notes, setNotes] = useState(data);
    const [selectedNote, setSelectedNote] = useState(null);
    const router = useRouter();
    const arrayLength = notes.length;

    function updateNote() {
        const unsubscribe = onSnapshot(query(collection(db, "notes"), where("isArchive", "==", true), where("isDelete", "==", false)), (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(data);
        });

        return unsubscribe;
    }

    function handleNoteClick(noteId) {
        router.push(`/archive/?id=${noteId}`);
        setSelectedNote(notes.find(note => note.id === noteId));
    }

    function handleModalClose() {
        setSelectedNote(null)
        router.replace('/archive', undefined, { shallow: true });
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
                {notes.filter(note => note.isArchive && !note.isDelete).length > 0 ?
                    <NotesContainer className="notes-container">
                        {notes.map(note => {
                            return <Note key={note.id} details={note} data={notes} onUpdateNote={updateNote} onHandleNoteClick={handleNoteClick} onHandleModalClose={handleModalClose} selectedNote={selectedNote} />
                        })}
                    </NotesContainer>
                    :
                    <div className="content">
                        <h1>Archive</h1>
                        <p>Your archived notes appear here</p>
                    </div>}
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const q = query(collection(db, "notes"), where("isArchive", "==", true), where("isDelete", "==", false));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return {
        props: { data }
    };
}