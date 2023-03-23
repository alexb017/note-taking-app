import { useState, useEffect, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../components/firebase";
import { useRouter } from "next/navigation";
import styles from "@/styles/CreateNote.module.css";

export default function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modalReminder, setModalReminder] = useState(false);
    const [modalColors, setModalColors] = useState(false);
    const modalColorsRef = useRef(null);
    const modalReminderRef = useRef(null);
    const btnColorsRef = useRef(null);
    const btnReminderRef = useRef(null);
    const [backgroundColor, setBackgroundColor] = useState('#fff');

    const router = useRouter();

    useEffect(() => {
        function handleOutsideClick(e) {
            if (modalColorsRef.current && !modalColorsRef.current.contains(e.target) && !btnColorsRef.current.contains(e.target)) {
                setModalColors(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [modalColorsRef, modalColors, btnColorsRef]);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (modalReminderRef.current && !modalReminderRef.current.contains(e.target) && !btnReminderRef.current.contains(e.target)) {
                setModalReminder(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [modalReminderRef, modalReminder, btnReminderRef]);

    // add new note
    async function handleNoteSubmit(e) {
        e.preventDefault();

        if (content) {
            await addDoc(collection(db, 'notes'), {
                title,
                content,
                backgroundColor
            });

            setTitle('');
            setContent('');
            router.refresh();
        }

    }

    function toggleModalReminderClick() {
        if (modalReminder) {
            setModalReminder(false);
        } else {
            setModalReminder(true);
        }
    }

    function toggleModalColorsClick() {
        if (modalColors) {
            setModalColors(false);
        } else {
            setModalColors(true)
        }
    }

    function addBackgroundColorClick(color) {
        if (backgroundColor !== "#fff") {
            setBackgroundColor('#fff');
        } else {
            setBackgroundColor(color);
        }

        //setBgForm(color);
    }

    return (
        <div className={styles.form} style={{ backgroundColor: backgroundColor }}>
            <form className={styles.formContent} onSubmit={handleNoteSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" rows="1" placeholder="Take a note..." value={content} onChange={(e) => setContent(e.target.value)} required />
                <div className={styles.formOptions}>
                    <div className={styles.formOptionsLeft}>

                        <div className={styles.reminderContent}>
                            <button type="button" className={styles.btn} onClick={toggleModalReminderClick} ref={btnReminderRef}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M224 71.1a8 8 0 0 1-10.78-3.42a94.13 94.13 0 0 0-33.46-36.91a8 8 0 1 1 8.54-13.54a111.46 111.46 0 0 1 39.12 43.09A8 8 0 0 1 224 71.1ZM35.71 72a8 8 0 0 0 7.1-4.32a94.13 94.13 0 0 1 33.46-36.91a8 8 0 1 0-8.54-13.54a111.46 111.46 0 0 0-39.12 43.09A8 8 0 0 0 35.71 72Zm186.1 103.94A16 16 0 0 1 208 200h-40.8a40 40 0 0 1-78.4 0H48a16 16 0 0 1-13.79-24.06C43.22 160.39 48 138.28 48 112a80 80 0 0 1 160 0c0 26.27 4.78 48.38 13.81 63.94ZM150.62 200h-45.24a24 24 0 0 0 45.24 0ZM208 184c-10.64-18.27-16-42.49-16-72a64 64 0 0 0-128 0c0 29.52-5.38 53.74-16 72Z" /></svg>
                            </button>
                            {modalReminder && <div className={styles.modalReminder} ref={modalReminderRef}>
                                <p className={styles.reminder}>Pick date & time</p>
                                <button type="button" className={styles.reminder}>
                                    <span>Mar 21, 2023</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M197.66 69.66L83.31 184H168a8 8 0 0 1 0 16H64a8 8 0 0 1-8-8V88a8 8 0 0 1 16 0v84.69L186.34 58.34a8 8 0 0 1 11.32 11.32Z" /></svg>
                                </button>
                                <button type="button" className={styles.reminder}>
                                    <span>8:00 AM</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M197.66 69.66L83.31 184H168a8 8 0 0 1 0 16H64a8 8 0 0 1-8-8V88a8 8 0 0 1 16 0v84.69L186.34 58.34a8 8 0 0 1 11.32 11.32Z" /></svg>
                                </button>
                            </div>}
                        </div>

                        <div className={styles.bgColorsContent}>
                            <button type="button" className={styles.btn} onClick={toggleModalColorsClick} ref={btnColorsRef}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.43 104.43 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23Zm13 93.71a15.89 15.89 0 0 1-15.56 12.4H152a32 32 0 0 0-32 32a16 16 0 0 1-21.31 15.07C62.49 194.3 40 164 40 128a88 88 0 0 1 87.09-88h.9a88.35 88.35 0 0 1 88 87.25a88.86 88.86 0 0 1-2.18 20.35ZM140 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 24a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm0 56a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm88-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z" /></svg>
                            </button>
                            {modalColors && <div className={styles.modalColors} ref={modalColorsRef}>
                                <p>Background options</p>
                                <div className={styles.listColors}>
                                    <div className={styles.color} style={{ backgroundColor: '#fff475' }} onClick={() => addBackgroundColorClick('#fff475')}></div>
                                    <div className={styles.color} style={{ backgroundColor: '#c7ebb3' }} onClick={() => addBackgroundColorClick('#c7ebb3')}></div>
                                    <div className={styles.color} style={{ backgroundColor: '#f4dfcd' }} onClick={() => addBackgroundColorClick('#f4dfcd')}></div>
                                    <div className={styles.color} style={{ backgroundColor: '#ffd5f8' }} onClick={() => addBackgroundColorClick('#ffd5f8')}></div>
                                    <div className={styles.color} style={{ backgroundColor: '#a9def9' }} onClick={() => addBackgroundColorClick('#a9def9')}></div>
                                </div>
                            </div>}
                        </div>

                    </div>
                    <button type="submit" className={styles.btnSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="m223.87 114l-168-95.89a16 16 0 0 0-22.94 19.21l31 90.47a.42.42 0 0 0 0 .1a.3.3 0 0 0 0 .1l-31 90.67A16 16 0 0 0 48 240a16.14 16.14 0 0 0 7.92-2.1l167.91-96.05a16 16 0 0 0 .05-27.89ZM48 224v-.09L78.14 136H136a8 8 0 0 0 0-16H78.22L48.06 32.12L48 32l168 95.83Z" /></svg>
                    </button>
                </div>
            </form>
        </div>
    )
}