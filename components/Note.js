import { useState, useRef, useEffect } from "react";
import styles from "./Note.module.css";
import NoteModal from "./NoteModal";
import db from "../components/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where, getDoc, onSnapshot } from "firebase/firestore";
import Modal from "./Modal";

export default function Note(props) {
    const [notes, setNotes] = useState(props.data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
    const modalRef = useRef(null);
    const btnRef = useRef(null);
    const { details } = props;
    const router = useRouter();
    const [selectedNote, setSelectedNote] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const modalColorsRef = useRef(null);
    const btnColorsRef = useRef(null);
    const [modalColors, setModalColors] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(() => {
        return details.backgroundColor;
    });

    useEffect(() => {
        function handleOutsideClick(e) {
            if (modalColorsRef.current && !modalColorsRef.current.contains(e.target) && !btnColorsRef.current.contains(e.target)) {
                setModalColors(false);
                setIsModalSettingsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [modalColorsRef, modalColors, btnColorsRef]);

    // useEffect(() => {
    //     function handleOutsideClick(e) {
    //         if (modalRef.current && !modalRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
    //             setIsModalSettingsOpen(false);
    //         }
    //     }

    //     document.addEventListener('mouseleave', handleOutsideClick);

    //     return () => {
    //         document.removeEventListener('mouseleave', handleOutsideClick);
    //     }
    // }, [modalRef, isModalSettingsOpen, btnRef]);

    // useEffect(() => {
    //     console.log(notes)
    // })

    function toggleModalColorsClick() {
        if (modalColors) {
            setModalColors(false);
        } else {
            setModalColors(true)
        }
    }

    function addBackgroundColorClick(color) {
        setBackgroundColor(color);
        changeBackgroundColor(details.id, color);
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function toggleModalSettings() {
        setIsModalSettingsOpen(!isModalSettingsOpen);
    }

    async function deleteNote(noteId) {
        try {
            const docRef = doc(db, "notes", noteId);
            const docSnap = await getDoc(docRef);
            const currentDeleteValue = docSnap.data().isDelete;

            if (currentDeleteValue) {
                await deleteDoc(docRef);
            } else {
                await updateDoc(docRef, {
                    isDelete: !currentDeleteValue
                });
            }

            console.log(`Document with ID ${noteId} deleted successfully`);
        } catch (error) {
            console.error("Error deleting document:", error);
        }


        props.onUpdateNote();

    }

    async function restoreDeleteNote(noteId) {
        try {
            const docRef = doc(db, "notes", noteId);
            const docSnap = await getDoc(docRef);
            const currentDeleteValue = docSnap.data().isDelete;

            if (currentDeleteValue) {

                await updateDoc(docRef, {
                    isDelete: !currentDeleteValue
                });

                console.log(`Document with ID ${noteId} restored successfully`);
            } else {
                console.log("No such document!");
            }

        } catch (error) {
            console.error("Error restored document:", error);
        }

        props.onUpdateNote();
    }

    async function archiveNote(noteId) {
        try {
            const docRef = doc(db, "notes", noteId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const currentArchiveValue = docSnap.data().isArchive;

                await updateDoc(docRef, {
                    isArchive: !currentArchiveValue
                });

                console.log(`Document with ID ${noteId} update successfully`);
            } else {
                console.log("No such document!");
            }

        } catch (error) {
            console.error("Error updating document:", error);
        }

        props.onUpdateNote();

    }

    async function pinNote(noteId) {
        try {
            const docRef = doc(db, "notes", noteId);
            const docSnap = await getDoc(docRef);
            const currentPinValue = docSnap.data().isPinned;

            await updateDoc(docRef, {
                isPinned: !currentPinValue
            });
            console.log(`Document with ID ${noteId} pinned successfully`);
        } catch (error) {
            console.error("Error pinned document:", error);
        }

        props.onUpdateNote();
    }

    async function changeBackgroundColor(noteId, color) {
        try {
            const docRef = doc(db, "notes", noteId);

            await updateDoc(docRef, {
                backgroundColor: color
            });
            console.log(`Document with ID ${noteId} pinned successfully`);
        } catch (error) {
            console.error("Error pinned document:", error);
        }
    }

    function openDeleteModal() {
        setIsDeleteModal(true);
    }

    function modalSettingsOpen() {
        if (modalColors) {
            setIsModalSettingsOpen(true);
        } else {
            setIsModalSettingsOpen(false);
        }
    }

    return (
        <>
            <div className={`${styles.noteContents} noteContents`} style={{ backgroundColor: backgroundColor }} onMouseEnter={() => setIsModalSettingsOpen(true)} onMouseLeave={modalSettingsOpen}>

                <div>
                    <div className={styles.topNoteContent}>
                        {details.title && <p className={styles.noteTitle}>{details.title}</p>}
                        <p className={styles.noteContent}>{details.content}</p>
                        {details.dateTime &&
                            <button type="button" className={styles.dateTimeBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm64-88a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 8 8Z" /></svg>
                                {details.dateTime}
                            </button>}
                    </div>
                    <div className={styles.editNoteContent}>
                        <div className={`${styles.btnsList} ${isModalSettingsOpen ? "" : styles.hidden}`}>
                            {details.isDelete ? (
                                <button type="button" className={styles.modalBtn} onClick={() => restoreDeleteNote(details.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M232 112a64.07 64.07 0 0 1-64 64H51.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L51.31 160H168a48 48 0 0 0 0-96H80a8 8 0 0 1 0-16h88a64.07 64.07 0 0 1 64 64Z" /></svg>
                                    {/* Restore note */}
                                </button>
                            ) :
                                (
                                    <>
                                        <button type="button" className={styles.modalBtn} onClick={() => props.onHandleNoteClick(details.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="m227.32 73.37l-44.69-44.68a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h168a8 8 0 0 0 0-16H115.32l112-112a16 16 0 0 0 0-22.63ZM92.69 208H48v-44.69l88-88L180.69 120ZM192 108.69L147.32 64l24-24L216 84.69Z" /></svg>
                                            {/* Edit note */}
                                        </button>
                                        <button type="button" className={styles.modalBtn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M224 71.1a8 8 0 0 1-10.78-3.42a94.13 94.13 0 0 0-33.46-36.91a8 8 0 1 1 8.54-13.54a111.46 111.46 0 0 1 39.12 43.09A8 8 0 0 1 224 71.1ZM35.71 72a8 8 0 0 0 7.1-4.32a94.13 94.13 0 0 1 33.46-36.91a8 8 0 1 0-8.54-13.54a111.46 111.46 0 0 0-39.12 43.09A8 8 0 0 0 35.71 72Zm186.1 103.94A16 16 0 0 1 208 200h-40.8a40 40 0 0 1-78.4 0H48a16 16 0 0 1-13.79-24.06C43.22 160.39 48 138.28 48 112a80 80 0 0 1 160 0c0 26.27 4.78 48.38 13.81 63.94ZM150.62 200h-45.24a24 24 0 0 0 45.24 0ZM208 184c-10.64-18.27-16-42.49-16-72a64 64 0 0 0-128 0c0 29.52-5.38 53.74-16 72Z" /></svg>
                                            {/* Remind me */}
                                        </button>
                                        <button type="button" className={styles.modalBtn} onClick={() => archiveNote(details.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M224 48H32a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16v88a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-88a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16Zm-16 144H48v-88h160Zm16-104H32V64h192v24ZM96 136a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8Z" /></svg>
                                            {/* {!details.isArchive ? "Archive note" : "Unarchive note"} */}
                                        </button>


                                        <div className={styles.bgColorsContent}>
                                            <button type="button" className={styles.modalBtn} onClick={toggleModalColorsClick} ref={btnColorsRef}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.43 104.43 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23Zm13 93.71a15.89 15.89 0 0 1-15.56 12.4H152a32 32 0 0 0-32 32a16 16 0 0 1-21.31 15.07C62.49 194.3 40 164 40 128a88 88 0 0 1 87.09-88h.9a88.35 88.35 0 0 1 88 87.25a88.86 88.86 0 0 1-2.18 20.35ZM140 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 24a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm0 56a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm88-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z" /></svg>
                                                {/* Change backgroundColor */}
                                            </button>
                                            {modalColors && <Modal className="modal modalCreateNote modalBgColors" ref={modalColorsRef}>
                                                <p>Background options</p>
                                                <div className={styles.listColors}>
                                                    <div className={styles.color} style={{ backgroundColor: '#ffffff' }} onClick={() => addBackgroundColorClick('#ffffff')}></div>
                                                    <div className={styles.color} style={{ backgroundColor: '#fff475' }} onClick={() => addBackgroundColorClick('#fff475')}></div>
                                                    <div className={styles.color} style={{ backgroundColor: '#c7ebb3' }} onClick={() => addBackgroundColorClick('#c7ebb3')}></div>
                                                    <div className={styles.color} style={{ backgroundColor: '#f4dfcd' }} onClick={() => addBackgroundColorClick('#f4dfcd')}></div>
                                                    <div className={styles.color} style={{ backgroundColor: '#ffd5f8' }} onClick={() => addBackgroundColorClick('#ffd5f8')}></div>
                                                    <div className={styles.color} style={{ backgroundColor: '#a9def9' }} onClick={() => addBackgroundColorClick('#a9def9')}></div>
                                                </div>
                                            </Modal>}
                                        </div>

                                        <button type="button" className={styles.modalBtn}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20l-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52l80 80H40Zm176 28h-21.37l-36-36l20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z" /></svg>
                                            {/* Change image */}
                                        </button>
                                    </>)}

                            {!details.isDelete ? (
                                <button type="button" className={`${styles.modalBtn} ${styles.modalBtnDelete}`} onClick={() => deleteNote(details.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" /></svg>
                                    {/* Delete note */}
                                </button>
                            ) : (<button type="button" className={`${styles.modalBtn} ${styles.modalBtnDelete}`} onClick={openDeleteModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" /></svg>
                                {/* Delete note */}
                            </button>)}

                        </div>
                    </div>
                </div>

                {props.selectedNote && <NoteModal details={props.selectedNote} onClose={props.onHandleModalClose} />}


                <button type="button" className={`${styles.modalBtn} ${styles.btnPinn} ${isModalSettingsOpen ? "" : styles.hidden}`} onClick={() => pinNote(details.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="m235.32 81.37l-60.69-60.68a16 16 0 0 0-22.63 0l-53.63 53.8c-10.66-3.34-35-7.37-60.4 13.14a16 16 0 0 0-1.29 23.78L85 159.71l-42.66 42.63a8 8 0 0 0 11.32 11.32L96.29 171l48.29 48.29A16 16 0 0 0 155.9 224h1.13a15.93 15.93 0 0 0 11.64-6.33c19.64-26.1 17.75-47.32 13.19-60L235.33 104a16 16 0 0 0-.01-22.63ZM224 92.69l-57.27 57.46a8 8 0 0 0-1.49 9.22c9.46 18.93-1.8 38.59-9.34 48.62L48 100.08c12.08-9.74 23.64-12.31 32.48-12.31A40.13 40.13 0 0 1 96.81 91a8 8 0 0 0 9.25-1.51L163.32 32L224 92.68Z" /></svg>
                    {/* {!details.isPinned ? "Pin note" : "Unpin note"} */}
                </button>


                {/* <button type="button" className={styles.btnSettings} onClick={toggleModalSettings} ref={btnRef}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z" /></svg>
                </button> */}



                {isDeleteModal && <div className={styles.deleteModal}>
                    <div className={styles.deleteModalContent}>
                        <p>Delete note forever?</p>
                        <div className={styles.deleteModalBtns}>
                            <button type="button" className={styles.modalBtn} onClick={() => setIsDeleteModal(false)}>
                                Cancel
                            </button>
                            <button type="button" className={styles.modalBtn} onClick={() => deleteNote(details.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" /></svg>
                                Delete note
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}