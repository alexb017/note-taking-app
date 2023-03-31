import db from "@/components/firebase";
import { collection, query, where, getDocs, getDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import { useRouter } from "next/navigation";
import NotesContainer from "@/components/NotesContainer";

export default function Trash({ data }) {
    const [notes, setNotes] = useState(data);
    const arrayLength = data.length;

    return (
        <div>
            <h1>Trash</h1>
            <p>No notes in trash</p>
            <NotesContainer arrayLength={arrayLength}>
                {notes.map(note => {
                    return <Note key={note.id} details={note} data={data} />
                })}
            </NotesContainer>
        </div>
    )
}

export async function getServerSideProps() {
    const q = query(collection(db, "notes"), where("isDelete", "==", true));
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