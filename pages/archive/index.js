import db from "@/components/firebase";
import { collection, query, where, getDocs, getDoc, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import { useRouter } from "next/navigation";
import NotesContainer from "@/components/NotesContainer";

export default function Archive({ data }) {
    const [notes, setNotes] = useState(data);
    const arrayLength = data.length;

    return (
        <div>
            <h1>Archive</h1>
            <p>Your archived notes appear here</p>
            <NotesContainer arrayLength={arrayLength}>
                {notes.map(note => {
                    return <Note key={note.id} details={note} data={data} />
                })}
            </NotesContainer>
        </div>
    )
}

export async function getServerSideProps() {
    const q = query(collection(db, "notes"), where("isArchive", "==", true), where("isDelete", "==", false));
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