import Head from "next/head";
import db from "@/components/firebase";
import { collection, query, where, getDocs, getDoc, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import { useRouter } from "next/navigation";
import NotesContainer from "@/components/NotesContainer";

export default function Archive({ data }) {
    const [notes, setNotes] = useState(data);
    const arrayLength = notes.length;

    return (
        <>
            <Head>
                <title>Note Taking App</title>
                <meta name="description" content="Build a note-taking app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>Archive</h1>
                <p>Your archived notes appear here</p>
                <NotesContainer arrayLength={arrayLength}>
                    {notes.map(note => {
                        return <Note key={note.id} details={note} data={notes} />
                    })}
                </NotesContainer>
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