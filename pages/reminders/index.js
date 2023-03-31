import db from "@/components/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import styles from "../../styles/Reminders.module.css";
import NotesContainer from "@/components/NotesContainer";

export default function Reminders({ data }) {
    const [notes, setNotes] = useState(data);
    const arrayLength = data.length;

    return (
        <>
            <h1>Reminders</h1>
            <p>Notes with upcoming reminders appear here</p>
            <NotesContainer arrayLength={arrayLength}>
                {notes.map(note => {
                    return <Note key={note.id} details={note} data={data} />
                })}
            </NotesContainer>
        </>
    )
}

export async function getServerSideProps() {
    const q = query(collection(db, "notes"), where("dateTime", "!=", ''));
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