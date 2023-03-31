import db from "@/components/firebase";
import { collection, query, where, getDocs, getDoc, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Note from "@/components/Note";
import { useRouter } from "next/navigation";

export default function Archive({ data }) {
    const [notes, setNotes] = useState(data);
    const [heightDiv, setHeightDiv] = useState(0);
    const router = useRouter();

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
        <div>
            <h1>Archive</h1>
            <p>Your archived notes appear here</p>
            <div className="notesContentFlex" style={{ height: heightDiv }}>
                {notes.map(note => {
                    return <Note key={note.id} details={note} />
                })}
            </div>
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