import { useRef, useState, useEffect } from "react";
import db from "../components/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";

export default function NoteModal(props) {
    const { details } = props;
    const [title, setTitle] = useState(details.title);
    const [content, setContent] = useState(details.content);
    const [backgroundColor, setBackgroundColor] = useState(() => {
        return details.backgroundColor;
    });
    const [date, setDate] = useState('');
    const [modalReminder, setModalReminder] = useState(false);
    const [modalColors, setModalColors] = useState(false);
    const modalColorsRef = useRef(null);
    const modalReminderRef = useRef(null);
    const btnColorsRef = useRef(null);
    const btnReminderRef = useRef(null);

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

    function addReminderClick(reminder) {
        setDate(reminder);
        setModalReminder(false)
    }

    function addBackgroundColorClick(color) {
        setBackgroundColor(color);
        props.setBackgroundColor(color);
        props.onUpdateBackgroundColor(details.id, color);
    }

    async function handleUpdateTitle(e, noteId) {
        const title = e.target.value;
        setTitle(title);

        await updateDoc(doc(db, "notes", noteId), {
            title: title
        });

        props.onUpdateNote();
    }

    async function handleUpdateContent(e, noteId) {
        const content = e.target.value;
        setContent(content);

        await updateDoc(doc(db, "notes", noteId), {
            content: content
        });

        props.onUpdateNote();
    }

    return (
        <div className="note-modal">
            <div className="note-modal-container">
                <div className="form" style={{ backgroundColor: backgroundColor }}>
                    {props.imageSrc && <div className="image-src-container">
                        <img src={props.imageSrc} className="image-src" loading="lazy" alt="just an image" />
                        <button type="button" className="btn-modal btn-image-src" onClick={() => props.onHandleDeleteImage(details.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M224 56a8 8 0 0 1-8 8h-8v144a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16V64h-8a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM88 32h80a8 8 0 0 0 0-16H88a8 8 0 0 0 0 16Z" /></svg>
                        </button>
                    </div>}
                    <div className="form-content">
                        <input type="text" placeholder="Title" value={title} onChange={(e) => handleUpdateTitle(e, details.id)} />
                        <textarea type="text" rows="3" placeholder="Take a note..." value={content} onChange={(e) => handleUpdateContent(e, details.id)} />
                        <div className="date-time-content">
                            {props.date &&
                                <div className="date-time-content-flex date-time-content-note" onMouseEnter={() => props.setRemoveDate(true)} onMouseLeave={() => props.setRemoveDate(false)}>
                                    <button type="button" className="btn-date-time">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm64-88a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 8 8Z" /></svg>
                                        {details.dateTime}
                                    </button>
                                    <button type="button" className={`btn-date-time-remove ${props.removeDate ? "" : "hidden"}`} onClick={() => props.onHandleRemoveDateClick(details.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" /></svg>
                                    </button>
                                </div>}
                        </div>
                        <div className="form-options">
                            <div className="form-options-left">

                                <div className="reminder-content">
                                    <button type="button" className="btn-modal" onClick={toggleModalReminderClick} ref={btnReminderRef}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M224 71.1a8 8 0 0 1-10.78-3.42a94.13 94.13 0 0 0-33.46-36.91a8 8 0 1 1 8.54-13.54a111.46 111.46 0 0 1 39.12 43.09A8 8 0 0 1 224 71.1ZM35.71 72a8 8 0 0 0 7.1-4.32a94.13 94.13 0 0 1 33.46-36.91a8 8 0 1 0-8.54-13.54a111.46 111.46 0 0 0-39.12 43.09A8 8 0 0 0 35.71 72Zm186.1 103.94A16 16 0 0 1 208 200h-40.8a40 40 0 0 1-78.4 0H48a16 16 0 0 1-13.79-24.06C43.22 160.39 48 138.28 48 112a80 80 0 0 1 160 0c0 26.27 4.78 48.38 13.81 63.94ZM150.62 200h-45.24a24 24 0 0 0 45.24 0ZM208 184c-10.64-18.27-16-42.49-16-72a64 64 0 0 0-128 0c0 29.52-5.38 53.74-16 72Z" /></svg>
                                    </button>
                                    <div className="btn-name-details">Remind me</div>
                                    {modalReminder && <Modal className="modal modal-reminder" ref={modalReminderRef}>
                                        <p className="reminder">Reminder:</p>
                                        <button type="button" className="btn-reminder" onClick={() => props.onAddTodayReminderClick(details.id)}>
                                            <div className="btn-reminder-format">
                                                <p>Later today</p>
                                                <p>8:00 PM</p>
                                            </div>
                                        </button>
                                        <button type="button" className="btn-reminder" onClick={() => onAddTomorrowReminderClick(details.id)}>
                                            <div className="btn-reminder-format">
                                                <p>Tomorrow</p>
                                                <div>8:00 AM</div>
                                            </div>
                                        </button>
                                        <button type="button" className="btn-reminder pick-date-time">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm64-88a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 8 8Z" /></svg>
                                            <p>Pick date & time</p>
                                        </button>
                                    </Modal>}
                                </div>

                                <div className="bg-colors-content">
                                    <button type="button" className="btn-modal" onClick={toggleModalColorsClick} ref={btnColorsRef}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.43 104.43 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23Zm13 93.71a15.89 15.89 0 0 1-15.56 12.4H152a32 32 0 0 0-32 32a16 16 0 0 1-21.31 15.07C62.49 194.3 40 164 40 128a88 88 0 0 1 87.09-88h.9a88.35 88.35 0 0 1 88 87.25a88.86 88.86 0 0 1-2.18 20.35ZM140 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 24a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm0 56a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm88-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z" /></svg>
                                    </button>
                                    <div className="btn-name-details">Background options</div>
                                    {modalColors && <Modal className="modal modal-colors" ref={modalColorsRef}>
                                        <p>Background options</p>
                                        <div className="list-colors">
                                            <div className={`color color-default ${backgroundColor === "#ffffff" ? "is-active" : ""}`} style={{ backgroundColor: '#ffffff' }} onClick={() => addBackgroundColorClick('#ffffff')}></div>
                                            <div className={`color ${backgroundColor === "#f28b82" ? "is-active" : ""}`} style={{ backgroundColor: '#f28b82' }} onClick={() => addBackgroundColorClick('#f28b82')}></div>
                                            <div className={`color ${backgroundColor === "#fff475" ? "is-active" : ""}`} style={{ backgroundColor: '#fff475' }} onClick={() => addBackgroundColorClick('#fff475')}></div>
                                            <div className={`color ${backgroundColor === "#a7ffeb" ? "is-active" : ""}`} style={{ backgroundColor: '#a7ffeb' }} onClick={() => addBackgroundColorClick('#a7ffeb')}></div>
                                            <div className={`color ${backgroundColor === "#cbf0f8" ? "is-active" : ""}`} style={{ backgroundColor: '#cbf0f8' }} onClick={() => addBackgroundColorClick('#cbf0f8')}></div>
                                            <div className={`color ${backgroundColor === "#d7aefb" ? "is-active" : ""}`} style={{ backgroundColor: '#d7aefb' }} onClick={() => addBackgroundColorClick('#d7aefb')}></div>
                                            <div className={`color ${backgroundColor === "#e8eaed" ? "is-active" : ""}`} style={{ backgroundColor: '#e8eaed' }} onClick={() => addBackgroundColorClick('#e8eaed')}></div>
                                        </div>
                                    </Modal>}
                                </div>

                                <div className="bg-image-change">
                                    <label className="btn-modal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20l-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52l80 80H40Zm176 28h-21.37l-36-36l20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z" /></svg>
                                        <input type="file" onChange={(e) => props.onUploadImageSrc(e, details.id)} accept="image/*" />
                                    </label>
                                    <div className="btn-name-details">Add image</div>
                                </div>

                                <div className="archive-content">
                                    <button type="button" className="btn-modal" onClick={() => props.onArchiveNote(details.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M224 48H32a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16v88a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-88a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16Zm-16 144H48v-88h160Zm16-104H32V64h192v24ZM96 136a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8Z" /></svg>
                                    </button>
                                    <div className="btn-name-details">Archive</div>
                                </div>

                                <div className="delete-content">
                                    <button type="button" className="btn-modal" onClick={() => props.onDeleteNote(details.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" /></svg>
                                    </button>
                                    <div className="btn-name-details">Delete note</div>
                                </div>

                            </div>
                            <button onClick={props.onClose} className="btn-submit">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}