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
                <input type="text" aria-multiline="true" role="textbox" placeholder="Take a note..." value={content} onChange={(e) => setContent(e.target.value)} />
                <div className={styles.formOptions}>
                    <div className={styles.formOptionsLeft}>
                        <button type="button" className={styles.btn}>
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.25 1.25 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.251 1.251 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5ZM13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145l.006-.147ZM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.004-.225A5.988 5.988 0 0 0 12 3.496Z" /></svg>
                        </button>
                        <button type="button" className={styles.btn}>
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.839 5.858c2.94-3.916 9.03-5.055 13.364-2.36 4.28 2.66 5.854 7.777 4.1 12.577-1.655 4.533-6.016 6.328-9.159 4.048-1.177-.854-1.634-1.925-1.854-3.664l-.106-.987-.045-.398c-.123-.934-.311-1.352-.705-1.572-.535-.298-.892-.305-1.595-.033l-.351.146-.179.078c-1.014.44-1.688.595-2.541.416l-.2-.047-.164-.047c-2.789-.864-3.202-4.647-.565-8.157Zm.984 6.716.123.037.134.03c.439.087.814.015 1.437-.242l.602-.257c1.202-.493 1.985-.54 3.046.05.917.512 1.275 1.298 1.457 2.66l.053.459.055.532.047.422c.172 1.361.485 2.09 1.248 2.644 2.275 1.65 5.534.309 6.87-3.349 1.516-4.152.174-8.514-3.484-10.789-3.675-2.284-8.899-1.306-11.373 1.987-2.075 2.763-1.82 5.28-.215 5.816Zm11.225-1.994a1.25 1.25 0 1 1 2.414-.647 1.25 1.25 0 0 1-2.414.647Zm.494 3.488a1.25 1.25 0 1 1 2.415-.647 1.25 1.25 0 0 1-2.415.647ZM14.07 7.577a1.25 1.25 0 1 1 2.415-.647 1.25 1.25 0 0 1-2.415.647Zm-.028 8.998a1.25 1.25 0 1 1 2.414-.647 1.25 1.25 0 0 1-2.414.647Zm-3.497-9.97a1.25 1.25 0 1 1 2.415-.646 1.25 1.25 0 0 1-2.415.646Z" /></svg>
                        </button>
                    </div>
                    <button type="submit" className={styles.btnSubmit}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.694 12 2.299 3.272c-.236-.607.356-1.188.942-.982l.093.04 18 9a.75.75 0 0 1 .097 1.283l-.097.058-18 9c-.583.291-1.217-.244-1.065-.847l.03-.096L5.694 12 2.299 3.272 5.694 12ZM4.402 4.54l2.61 6.71h6.627a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.649.743l-.101.007H7.01l-2.609 6.71L19.322 12 4.401 4.54Z" /></svg>
                    </button>
                </div>
            </form>
        </div>
    )
}