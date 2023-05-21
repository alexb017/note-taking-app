import { useState, useEffect, useRef } from "react";
import { setDoc, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import db from "../components/firebase";
import Modal from "../components/Modal";
import { format, addDays, setHours, setMinutes } from 'date-fns';
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Palette from "@/components/Palette";

export default function CreateNote(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modalReminder, setModalReminder] = useState(false);
    const [modalColors, setModalColors] = useState(false);
    const modalColorsRef = useRef(null);
    const modalReminderRef = useRef(null);
    const btnColorsRef = useRef(null);
    const btnReminderRef = useRef(null);
    const [backgroundColor, setBackgroundColor] = useState('color-white');
    const [date, setDate] = useState('');
    const [removeDate, setRemoveDate] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [documentId, setDocumentId] = useState('');
    const [archiveNote, setArchiveNote] = useState(false);

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

    // Add new note
    async function handleNoteSubmit(e) {
        e.preventDefault();

        const noteId = documentId || getRandomAlphanumeric(20);

        if (title || content) {
            // Create a new document
            await setDoc(doc(db, 'notes', noteId), {
                title,
                content,
                backgroundColor,
                imageSrc,
                dateTime: date,
                isArchive: archiveNote,
                isDelete: false,
                isPinned: false
            });
        }

        setTitle('');
        setContent('');
        setBackgroundColor('color-white');
        setImageSrc('');
        setDate('');

        props.onUpdateNote();
    }

    function getRandomAlphanumeric(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    function handleUpload(e) {
        // Get the file
        const file = e.target.files[0];
        const id = getRandomAlphanumeric(20);

        // Create a reference to the file to create
        const storage = getStorage();
        const storageRef = ref(storage, `/${id}`);
        setDocumentId(id);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file)
            .then(() => {
                // Get downloadURL
                return getDownloadURL(storageRef);
            }).then((url) => {
                setImageSrc(url);
            }).catch((error) => {
                // error
            });
    }

    function handleDeleteImage() {
        setImageSrc('');

        // Create a reference to the file to delete
        const storage = getStorage();
        const storageRef = ref(storage, documentId);

        // Delete the file
        deleteObject(storageRef)
            .then(() => {
                // file delete successfully
            }).catch((error) => {
                // error
            });
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

    function addTodayReminderClick() {
        // Set the hour to 8 PM (20:00)
        const today = setMinutes(setHours(new Date(), 20), 0);
        const formatDate = format(today, 'EEEE, h:mm a');
        setDate(formatDate);
        setModalReminder(false);
    }

    function addTomorrowReminderClick() {
        // Set the hour to 8 AM (8:00)
        const today = setMinutes(setHours(new Date(), 8), 0);
        const tomorrow = addDays(today, 1);
        const formatDate = format(tomorrow, 'EEEE, h:mm a');
        setDate(formatDate);
        setModalReminder(false);
    }

    function addBackgroundColorClick(color) {
        setBackgroundColor(color);
    }

    function toggleArchiveNote() {
        if (archiveNote) {
            setArchiveNote(false);
        } else {
            setArchiveNote(true);
        }
    }

    function removeDateClick() {
        setDate('');
    }

    return (
        <div className="form" style={{ backgroundColor: `var(--${backgroundColor})` }}>
            {imageSrc &&
                <div className="image-src-container">
                    <img className="image-src" src={imageSrc} loading="lazy" alt="Selected image" />
                    <Button className="btn-modal btn-image-src" onClick={handleDeleteImage}>
                        <Icon iconName="iconTrashFill" />
                    </Button>
                </div>}
            <form className="form-content" onSubmit={handleNoteSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" rows="1" placeholder="Take a note..." value={content} onChange={(e) => setContent(e.target.value)} />
                {date && (
                    <div className="date-time-content">
                        <div className="date-time-content-flex" onMouseEnter={() => setRemoveDate(true)} onMouseLeave={() => setRemoveDate(false)}>
                            <Button className="btn-date-time">
                                <Icon iconName="iconClock" />
                                {date}
                            </Button>
                            <Button className={`btn-date-time-remove ${removeDate ? "" : "hidden"}`} onClick={removeDateClick}>
                                <Icon iconName="iconClose" />
                            </Button>
                        </div>
                    </div>)}
                <div className="form-options">
                    <div className="form-options-left">

                        <div className="reminder-content">
                            <Button className="btn-modal" onClick={toggleModalReminderClick} ref={btnReminderRef}>
                                <Icon iconName="iconAlert" />
                            </Button>
                            <div className="btn-name-details">Remind me</div>
                            {modalReminder && <Modal className="modal modal-reminder note-modal-reminder" ref={modalReminderRef}>
                                <p className="reminder">Reminder:</p>
                                <Button className="btn-reminder" onClick={addTodayReminderClick}>
                                    <div className="btn-reminder-format">
                                        <p>Later today</p>
                                        <p>8:00 PM</p>
                                    </div>
                                </Button>
                                <Button className="btn-reminder" onClick={addTomorrowReminderClick}>
                                    <div className="btn-reminder-format">
                                        <p>Tomorrow</p>
                                        <div>8:00 AM</div>
                                    </div>
                                </Button>
                                <Button className="btn-reminder pick-date-time">
                                    <Icon iconName="iconClock" width="16px" height="16px" />
                                    <p>Pick date & time</p>
                                </Button>
                            </Modal>}
                        </div>

                        <div className="bg-colors-content">
                            <Button className="btn-modal" onClick={toggleModalColorsClick} ref={btnColorsRef}>
                                <Icon iconName="iconPalette" />
                            </Button>
                            <div className="btn-name-details">Background options</div>
                            {modalColors && <Modal className="modal modal-colors" ref={modalColorsRef}>
                                <p>Background options</p>
                                <div className="list-colors">
                                    <Palette white className="color-default" sample={backgroundColor} onClick={() => addBackgroundColorClick('color-white')} />
                                    <Palette red sample={backgroundColor} onClick={() => addBackgroundColorClick('color-red')} />
                                    <Palette orange sample={backgroundColor} onClick={() => addBackgroundColorClick('color-orange')} />
                                    <Palette yellow sample={backgroundColor} onClick={() => addBackgroundColorClick('color-yellow')} />
                                    <Palette teal sample={backgroundColor} onClick={() => addBackgroundColorClick('color-teal')} />
                                    <Palette blue sample={backgroundColor} onClick={() => addBackgroundColorClick('color-blue')} />
                                    <Palette purple sample={backgroundColor} onClick={() => addBackgroundColorClick('color-purple')} />
                                    <Palette gray sample={backgroundColor} onClick={() => addBackgroundColorClick('color-gray')} />
                                </div>
                            </Modal>}
                        </div>

                        <div className="bg-image-change">
                            <label className="btn-modal">
                                <Icon iconName="iconImage" />
                                <input type="file" onChange={handleUpload} accept="image/*" />
                            </label>
                            <div className="btn-name-details">Add image</div>
                        </div>

                        <div className="archive-content">
                            <Button className={`btn-modal ${archiveNote ? "is-archive-note" : ""}`} onClick={toggleArchiveNote}>
                                <Icon iconName="iconArchive" />
                            </Button>
                            <div className="btn-name-details">Archive</div>
                        </div>

                    </div>
                    <Button type="submit" className="btn-submit btn-submit-new">
                        <Icon iconName="iconPaperPlane" />
                    </Button>
                </div>
            </form>
        </div>
    )
}