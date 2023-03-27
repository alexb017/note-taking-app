import db from "@/components/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import styles from "../../styles/Reminders.module.css";

export default function Reminders({ data }) {
    const [notes, setNotes] = useState(data);
    const [heightDiv, setHeightDiv] = useState(0);

    useEffect(() => {
        const divs = document.querySelectorAll(".Note_noteContents__N62xp");
        const divsArray = [...divs];
        const divsHeight = divsArray.reduce((total, current) => total + current.clientHeight, 0);
        let divHeight = 0;

        if (data.length <= 4) {
            divHeight = Number.parseInt(divsHeight) / 2;
        } else {
            divHeight = (Number.parseInt(divsHeight) / Number.parseInt(data.length)) * 4;
        }

        setHeightDiv(divHeight);

    }, [heightDiv]);

    return (
        <>
            <h1>Reminders</h1>
            <p>Notes with upcoming reminders appear here</p>
            <div className="notesContentFlex" style={{ height: heightDiv }}>
                {notes.map(note => {
                    return <Note key={note.id} details={note} />
                })}
            </div>
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