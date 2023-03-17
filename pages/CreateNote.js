import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../components/firebase";
import { useRouter } from "next/navigation";
import styles from "@/styles/CreateNote.module.css";

export default function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();

    async function handleNoteSubmit(e) {
        e.preventDefault();

        if (title && content) {
            await addDoc(collection(db, 'notes'), {
                title,
                content
            });

            setTitle('');
            setContent('');
            router.refresh();
        }

    }

    return (
        <div className={styles.form}>
            <form className={styles.formContent} onSubmit={handleNoteSubmit}>
                <input type="text" aria-multiline="true" role="textbox" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" aria-multiline="true" role="textbox" placeholder="Take a note..." value={content} onChange={(e) => setContent(e.target.value)} />
                <div className={styles.formOptions}>
                    <div className={styles.formOptionsLeft}>
                        <button type="button" className={styles.btn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15q.425 0 .713-.288T13 14v-1h1q.425 0 .713-.288T15 12q0-.425-.288-.713T14 11h-1v-1q0-.425-.288-.713T12 9q-.425 0-.713.288T11 10v1h-1q-.425 0-.713.288T9 12q0 .425.288.713T10 13h1v1q0 .425.288.713T12 15Zm-7 4q-.425 0-.713-.288T4 18q0-.425.288-.713T5 17h1v-7q0-2.075 1.25-3.688T10.5 4.2v-.7q0-.625.438-1.063T12 2q.625 0 1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18q0 .425-.288.713T19 19H5Zm7-7.5ZM12 22q-.825 0-1.413-.588T10 20h4q0 .825-.588 1.413T12 22Zm-4-5h8v-7q0-1.65-1.175-2.825T12 6q-1.65 0-2.825 1.175T8 10v7Z" /></svg>
                        </button>
                        <button type="button" className={styles.btn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.05 0-3.875-.788t-3.188-2.15q-1.362-1.362-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175Q6.4 3.575 8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9q1.337 1.212 2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.313.125t-.087.275q0 .3.375.863t.375 1.287q0 1.25-.688 1.85T12 22Zm0-10Zm-5.5 1q.65 0 1.075-.425T8 11.5q0-.65-.425-1.075T6.5 10q-.65 0-1.075.425T5 11.5q0 .65.425 1.075T6.5 13Zm3-4q.65 0 1.075-.425T11 7.5q0-.65-.425-1.075T9.5 6q-.65 0-1.075.425T8 7.5q0 .65.425 1.075T9.5 9Zm5 0q.65 0 1.075-.425T16 7.5q0-.65-.425-1.075T14.5 6q-.65 0-1.075.425T13 7.5q0 .65.425 1.075T14.5 9Zm3 4q.65 0 1.075-.425T19 11.5q0-.65-.425-1.075T17.5 10q-.65 0-1.075.425T16 11.5q0 .65.425 1.075T17.5 13ZM12 20q.225 0 .363-.125t.137-.325q0-.35-.375-.825T11.75 17.3q0-1.05.725-1.675T14.25 15H16q1.65 0 2.825-.963T20 11.05q0-3.025-2.313-5.038T12.2 4Q8.8 4 6.4 6.325T4 12q0 3.325 2.337 5.663T12 20Z" /></svg>
                        </button>
                    </div>
                    <button type="submit" className={styles.btnSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18.5v-13q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5q-.5.2-.95-.088T3 18.5ZM5 17l11.85-5L5 7v3.5l6 1.5l-6 1.5V17Zm0-5V7v10v-5Z" /></svg>
                    </button>
                </div>
            </form>
        </div>
    )
}