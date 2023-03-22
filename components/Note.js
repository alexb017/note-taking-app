import { useState, useRef, useEffect } from "react";
import styles from "./Note.module.css";
import NoteModal from "./NoteModal";

export default function Note(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
    const modalRef = useRef(null);
    const btnRef = useRef(null);
    const { details } = props;

    useEffect(() => {
        function handleOutsideClick(e) {
            if (modalRef.current && !modalRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
                setIsModalSettingsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [modalRef, isModalSettingsOpen, btnRef]);

    function openModal() {
        setIsModalOpen(true);
    }

    function toggleModalSettings() {
        if (isModalSettingsOpen) {
            setIsModalSettingsOpen(false);
        } else {
            setIsModalSettingsOpen(true);
        }
    }

    return (
        <div className={styles.noteContents}>

            <div onClick={openModal}>
                {details.title && <div className={styles.noteTitle} aria-multiline="true" role="textbox">{details.title}</div>}
                <div className={styles.noteContent} aria-multiline="true" role="textbox">{details.content}</div>
            </div>

            {isModalOpen && <NoteModal onIsModalClose={() => setIsModalOpen(false)} />}

            <button type="button" className={styles.btnSettings} onClick={toggleModalSettings} ref={btnRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z" /></svg>
            </button>
            {isModalSettingsOpen &&
                (<div className={styles.modalSettings} ref={modalRef}>
                    <button type="button" className={styles.modalBtn}>Delete note</button>
                    <button type="button" className={styles.modalBtn}>Add label</button>
                </div>)}
        </div>
    )
}