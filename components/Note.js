import { useState, useRef, useEffect } from "react";
import EditNote from "./EditNote";
import db from "../components/firebase";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import Modal from "./Modal";
import { format, addDays, setHours, setMinutes } from 'date-fns';
import Icon from "./Icon";
import Button from "./Button";
import Palette from "./Palette";

export default function Note(props) {
    const { details } = props;
    const [selectedNote, setSelectedNote] = useState(null);
    const [date, setDate] = useState('');
    const [backgroundColor, setBackgroundColor] = useState(details.backgroundColor);
    const [imageSrc, setImageSrc] = useState(details.imageSrc);
    const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const modalColorsRef = useRef(null);
    const btnColorsRef = useRef(null);
    const [modalColors, setModalColors] = useState(false);
    const [modalReminder, setModalReminder] = useState(false);
    const modalReminderRef = useRef(null);
    const btnReminderRef = useRef(null);
    const [removeDate, setRemoveDate] = useState(false);

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

    useEffect(() => {
        function handleOutsideClick(e) {
            if (modalReminderRef.current && !modalReminderRef.current.contains(e.target) && !btnReminderRef.current.contains(e.target)) {
                setModalReminder(false);
                setIsModalSettingsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [modalReminderRef, modalReminder, btnReminderRef]);

    function toggleModalColorsClick() {
        if (modalColors) {
            setModalColors(false);
        } else {
            setModalColors(true);
        }
    }

    function toggleModalReminderClick() {
        if (modalReminder) {
            setModalReminder(false);
        } else {
            setModalReminder(true);
        }
    }

    function addBackgroundColorClick(color) {
        setBackgroundColor(color);
        handleChangeBackgroundColor(details.id, color);
    }

    async function handleDeleteNote(noteId) {
        const docRef = doc(db, "notes", noteId);
        const docSnap = await getDoc(docRef);
        const currentDeleteValue = docSnap.data().isDelete;
        const currentPinValue = docSnap.data().isPinned;

        if (currentDeleteValue) {
            if (imageSrc !== "") {
                handleDeleteImage(noteId);
            }
            await deleteDoc(docRef);
        } else {
            await updateDoc(docRef, {
                isDelete: !currentDeleteValue
            });
        }

        if (currentPinValue) {
            await updateDoc(doc(db, "notes", noteId), {
                isPinned: !currentPinValue
            });
        }

        props.onUpdateNote();
    }

    async function handleRestoreDeleteNote(noteId) {
        const docRef = doc(db, "notes", noteId);
        const docSnap = await getDoc(docRef);
        const currentDeleteValue = docSnap.data().isDelete;

        await updateDoc(docRef, {
            isDelete: !currentDeleteValue
        });

        props.onUpdateNote();
    }

    async function handleArchiveNote(noteId) {
        const docRef = doc(db, "notes", noteId);
        const docSnap = await getDoc(docRef);
        const currentArchiveValue = docSnap.data().isArchive;
        const currentPinnedValue = docSnap.data().isPinned;

        if (currentPinnedValue) {
            await updateDoc(docRef, {
                isArchive: !currentArchiveValue,
                isPinned: !currentPinnedValue
            });
        } else {
            await updateDoc(docRef, {
                isArchive: !currentArchiveValue
            });
        }

        props.onUpdateNote();
    }

    async function handlePinNote(noteId) {
        const docRef = doc(db, "notes", noteId);
        const docSnap = await getDoc(docRef);
        const currentPinValue = docSnap.data().isPinned;

        await updateDoc(docRef, {
            isPinned: !currentPinValue
        });

        props.onUpdateNote();
    }

    async function handleChangeBackgroundColor(noteId, color) {
        await updateDoc(doc(db, "notes", noteId), {
            backgroundColor: color
        });

        props.onUpdateNote();
    }

    async function handleUpdateImageSrc(url, noteId) {
        await updateDoc(doc(db, "notes", noteId), {
            imageSrc: url
        });

        props.onUpdateNote();
    }

    function handleUploadImageSrc(e, noteId) {
        // Get the file
        const file = e.target.files[0];

        // Create a reference to the file to create
        const storage = getStorage();
        const storageRef = ref(storage, `/${noteId}`);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file)
            .then(() => {
                // Get downloadURL
                return getDownloadURL(storageRef);
            }).then((url) => {
                setImageSrc(url);
                handleUpdateImageSrc(url, noteId);
            }).catch((error) => {
                // error
            });
    }

    async function handleDeleteImageSrc(noteId) {
        setImageSrc('');

        await updateDoc(doc(db, "notes", noteId), {
            imageSrc: ""
        });

        props.onUpdateNote();
    }

    function handleDeleteImage(noteId) {
        handleDeleteImageSrc(noteId);

        // Create a reference to the file to delete
        const storage = getStorage();
        const storageRef = ref(storage, noteId);

        // Delete the file
        deleteObject(storageRef)
            .then(() => {
                // file delete successfully
            }).catch((error) => {
                // error
            });
    }

    async function handleUpdateDateTime(date, noteId) {
        await updateDoc(doc(db, "notes", noteId), {
            dateTime: date
        });

        props.onUpdateNote();
    }

    function openDeleteModal() {
        setIsDeleteModal(true);
    }

    function modalSettingsOpen() {
        if (modalColors || modalReminder) {
            setIsModalSettingsOpen(true);
        } else {
            setIsModalSettingsOpen(false);
        }
    }

    function updateNoteModal(noteId) {
        const editNote = props.data.find(note => note.id === noteId);
        setSelectedNote(editNote);
        props.onHandleNoteClick(noteId);
    }

    function closeUpdateNoteModal() {
        setSelectedNote(null);
        props.onHandleModalClose();
    }

    function handleAddTodayReminderClick(noteId) {
        // Set the hour to 8 PM (20:00)
        const today = setMinutes(setHours(new Date(), 20), 0);
        const formatDate = format(today, 'EEEE, h:mm a');
        setDate(formatDate);
        handleUpdateDateTime(formatDate, noteId);
        setModalReminder(false);
    }

    function handleAddTomorrowReminderClick(noteId) {
        // Set the hour to 8 AM (8:00)
        const today = setMinutes(setHours(new Date(), 8), 0);
        const tomorrow = addDays(today, 1);
        const formatDate = format(tomorrow, 'EEEE, h:mm a');
        setDate(formatDate);
        handleUpdateDateTime(formatDate, noteId);
        setModalReminder(false);
    }

    async function handleRemoveDateClick(noteId) {
        await updateDoc(doc(db, "notes", noteId), {
            dateTime: ""
        });

        setDate('');
        props.onUpdateNote();
    }

    return (
        <>
            <div className="note-contents"
                style={{ backgroundColor: `var(--${backgroundColor})` }}
                onMouseEnter={() => setIsModalSettingsOpen(true)}
                onMouseLeave={modalSettingsOpen}
                onClick={() => setIsModalSettingsOpen(true)}>

                <div>
                    {imageSrc && <img src={imageSrc} className="image-src" loading="lazy" alt="just an image" />}
                    <div className="top-note-content">
                        {details.title && <p className="note-title">{details.title}</p>}
                        <p className="note-content">{details.content}</p>
                        {details.dateTime &&
                            <div className="date-time-content-flex date-time-content-note" onMouseEnter={() => setRemoveDate(true)} onMouseLeave={() => setRemoveDate(false)}>
                                <Button className="btn-date-time">
                                    <Icon iconName="iconClock" width="16px" height="16px" />
                                    {details.dateTime}
                                </Button>
                                <Button className={`btn-date-time-remove ${removeDate ? "" : "btn-date-time-remove-hidden"}`} onClick={() => handleRemoveDateClick(details.id)}>
                                    <Icon iconName="iconClose" width="16px" height="16px" />
                                </Button>
                            </div>}
                    </div>
                    <div className="edit-note-content">
                        <div className={`btns-list ${isModalSettingsOpen ? "" : "hidden"}`}>
                            {details.isDelete ? (
                                <div className="btn-delete-note">
                                    <Button className="btn-modal" onClick={() => handleRestoreDeleteNote(details.id)}>
                                        <Icon iconName="iconUpLeft" />
                                    </Button>
                                    <div className="btn-name-details">Restore note</div>
                                </div>
                            ) :
                                (
                                    <>
                                        <div className="btn-edit-note">
                                            <Button className="btn-modal" onClick={() => updateNoteModal(details.id)}>
                                                <Icon iconName="iconEdit" />
                                            </Button>
                                            <div className="btn-name-details">Edit note</div>
                                        </div>
                                        <div className="reminder-content reminder-content-note">
                                            <Button className="btn-modal" onClick={toggleModalReminderClick} ref={btnReminderRef}>
                                                <Icon iconName="iconAlert" />
                                            </Button>
                                            <div className="btn-name-details">Remind me</div>
                                            {modalReminder && <Modal className="modal modal-reminder" ref={modalReminderRef}>
                                                <p className="reminder">Reminder:</p>
                                                <Button className="btn-reminder" onClick={() => handleAddTodayReminderClick(details.id)}>
                                                    <div className="btn-reminder-format">
                                                        <p>Later today</p>
                                                        <p>8:00 PM</p>
                                                    </div>
                                                </Button>
                                                <Button className="btn-reminder" onClick={() => handleAddTomorrowReminderClick(details.id)}>
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
                                        <div className="bg-colors-content bg-colors-content-note">
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
                                        <div className="btn-image-note">
                                            <label className="btn-modal">
                                                <Icon iconName="iconImage" />
                                                <input type="file" onChange={(e) => handleUploadImageSrc(e, details.id)} accept="image/*" />
                                            </label>
                                            <div className="btn-name-details">Add image</div>
                                        </div>

                                        <div className="btn-archive-note">
                                            <Button className="btn-modal" onClick={() => handleArchiveNote(details.id)}>
                                                <Icon iconName="iconArchive" />
                                            </Button>
                                            <div className="btn-name-details">{details.isArchive ? "Unarchive" : "Archive"}</div>
                                        </div>
                                    </>)}

                            {!details.isDelete ? (
                                <div className="btn-delete-note">
                                    <Button className={`btn-modal btn-modal-delete`} onClick={() => handleDeleteNote(details.id)}>
                                        <Icon iconName="iconTrash" />
                                    </Button>
                                    <div className="btn-name-details">Delete note</div>
                                </div>
                            ) : (
                                <div className="btn-delete-note">
                                    <Button className={`btn-modal btn-modal-delete`} onClick={openDeleteModal}>
                                        <Icon iconName="iconTrash" />
                                    </Button>
                                    <div className="btn-name-details">Delete note</div>
                                </div>)}

                        </div>
                    </div>
                </div>

                {!details.isDelete &&
                    <div className="btn-pin-content">
                        {details.isPinned ?
                            <div className="btn-pin-note">
                                <Button className={`btn-modal ${isModalSettingsOpen ? "" : "hidden"}`} onClick={() => handlePinNote(details.id)}>
                                    <Icon iconName="iconPinFill" />
                                </Button>
                                <div className="btn-name-details">Unpin note</div>
                            </div>
                            :
                            <div className="btn-pin-note">
                                <Button className={`btn-modal ${isModalSettingsOpen ? "" : "hidden"}`} onClick={() => handlePinNote(details.id)}>
                                    <Icon iconName="iconPin" />
                                </Button>
                                <div className="btn-name-details">Pin note</div>
                            </div>
                        }
                    </div>}

                {isDeleteModal && <div className="delete-modal">
                    <div className="delete-modal-content">
                        <p>Delete note forever?</p>
                        <div className="delete-modal-btns">
                            <Button className="btn-modal" onClick={() => setIsDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button className="btn-modal" onClick={() => handleDeleteNote(details.id)}>
                                Delete note
                            </Button>
                        </div>
                    </div>
                </div>}
            </div>

            {selectedNote &&
                <EditNote
                    details={selectedNote}
                    onClose={closeUpdateNoteModal}
                    onUpdateNote={props.onUpdateNote}
                    date={date}
                    onHandleAddTodayReminderClick={handleAddTodayReminderClick}
                    onHandleAddTomorrowReminderClick={handleAddTomorrowReminderClick}
                    onHandleRemoveDateClick={handleRemoveDateClick}
                    onHandleChangeBackgroundColor={handleChangeBackgroundColor}
                    setBackgroundColor={setBackgroundColor}
                    onArchiveNote={handleArchiveNote}
                    onDeleteNote={handleDeleteNote}
                    imageSrc={imageSrc}
                    setImageSrc={setImageSrc}
                    onHandleUploadImageSrc={handleUploadImageSrc}
                    removeDate={removeDate}
                    setRemoveDate={setRemoveDate}
                    onHandleDeleteImage={handleDeleteImage} />}
        </>
    )
}