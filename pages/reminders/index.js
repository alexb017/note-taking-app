import db from "@/components/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import styles from "../../styles/Reminders.module.css";

export default function Reminders({ data }) {
    const [reminders, setReminders] = useState([]);
    const [heightDiv, setHeightDiv] = useState(0);

    useEffect(() => {
        const divs = document.querySelectorAll('.Note_noteContents__N62xp');
        const divsArray = [...divs];
        const divsHeight = divsArray.reduce((total, current) => total + current.clientHeight, 0);
        const divHeight = (Number.parseInt(divsHeight) / Number.parseInt(data.length)) * 4;
        setHeightDiv(divHeight);
    }, [heightDiv]);

    return (
        <>
            <h1>Reminders</h1>
            <p>Notes with upcoming reminders appear here</p>
            <div className="notesContentFlex" style={{ height: heightDiv }}>
                {data.filter(note => note.date !== '' || note.time !== '').map(note => {
                    return <Note key={note.id} details={note} />
                })}
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
        props: { data }
    };
}