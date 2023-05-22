import { useRef, useState, useEffect } from "react";
import db from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import Button from "./Button";
import Icon from "./Icon";
import Palette from "./Palette";
import { format, addDays, setHours, setMinutes } from 'date-fns';

export default function EditNote(props) {
    const { details } = props;
    const [title, setTitle] = useState(details.title);
    const [content, setContent] = useState(details.content);
    const [backgroundColor, setBackgroundColor] = useState(details.backgroundColor);
    const [date, setDate] = useState(details.dateTime);
    const [imageSrc, setImageSrc] = useState(details.imageSrc);

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

    function addBackgroundColorClick(color) {
        setBackgroundColor(color);
        props.setBackgroundColor(color);
        props.onHandleChangeBackgroundColor(details.id, color);
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

    function handleAddTodayReminderClick(noteId) {
        const today = setMinutes(setHours(new Date(), 20), 0);
        const formatDate = format(today, 'EEEE, h:mm a');
        setDate(formatDate);
        props.onHandleAddTodayReminderClick(noteId);
        setModalReminder(false);
    }

    function handleAddTomorrowReminderClick(noteId) {
        const today = setMinutes(setHours(new Date(), 8), 0);
        const tomorrow = addDays(today, 1);
        const formatDate = format(tomorrow, 'EEEE, h:mm a');
        setDate(formatDate);
        props.onHandleAddTomorrowReminderClick(noteId);
        setModalReminder(false);
    }

    function handleRemoveDateClick(noteId) {
        setDate('');
        props.onHandleRemoveDateClick(noteId);
    }

    function handleUploadImageSrc(e, noteId) {
        //setImageSrc(details.imageSrc);
        props.onHandleUploadImageSrc(e, noteId);
    }

    function handleDeleteImage(noteId) {
        props.setImageSrc('');
        props.onHandleDeleteImage(noteId);
    }

    return (
        <div className="note-modal">
            <div className="note-modal-container">
                <div className="form" style={{ backgroundColor: `var(--${backgroundColor})` }}>
                    {props.imageSrc && <div className="image-src-container">
                        <img src={props.imageSrc} className="image-src" loading="lazy" alt="just an image" />
                        <div className="btn-image-src">
                            <Button className="btn-modal" onClick={() => handleDeleteImage(details.id)}>
                                <Icon iconName="iconTrashFill" />
                            </Button>
                            <div className="btn-name-details">Delete image</div>
                        </div>
                    </div>}
                    <div className="form-content">
                        <input type="text" placeholder="Title" value={title} onChange={(e) => handleUpdateTitle(e, details.id)} />
                        <textarea type="text" rows="3" placeholder="Take a note..." value={content} onChange={(e) => handleUpdateContent(e, details.id)} />
                        <div className="date-time-content">
                            {date &&
                                <div className="date-time-content-flex date-time-content-note" onMouseEnter={() => props.setRemoveDate(true)} onMouseLeave={() => props.setRemoveDate(false)}>
                                    <Button className="btn-date-time">
                                        <Icon iconName="iconClock" width="16px" height="16px" />
                                        {date}
                                    </Button>
                                    <Button className={`btn-date-time-remove ${props.removeDate ? "" : "hidden"}`} onClick={() => handleRemoveDateClick(details.id)}>
                                        <Icon iconName="iconClose" width="16px" height="16px" />
                                    </Button>
                                </div>}
                        </div>
                        <div className="form-options">
                            <div className="form-options-left">

                                <div className="reminder-content">
                                    <Button className="btn-modal" onClick={toggleModalReminderClick} ref={btnReminderRef}>
                                        <Icon iconName="iconAlert" />
                                    </Button>
                                    <div className="btn-name-details">Remind me</div>
                                    {modalReminder && <Modal className="modal modal-reminder note-modal-reminder" ref={modalReminderRef}>
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
                                            <Icon iconName="iconClock" />
                                            <p>Pick date & time</p>
                                        </Button>
                                    </Modal>}
                                </div>

                                <div className="bg-colors-content">
                                    <Button className="btn-modal" onClick={toggleModalColorsClick} ref={btnColorsRef}>
                                        <Icon iconName="iconPalette" />
                                    </Button>
                                    <div className="btn-name-details">Background options</div>
                                    {modalColors && <Modal className="modal modal-colors " ref={modalColorsRef}>
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
                                        <input type="file" onChange={(e) => handleUploadImageSrc(e, details.id)} accept="image/*" />
                                    </label>
                                    <div className="btn-name-details">Add image</div>
                                </div>

                                <div className="archive-content">
                                    <Button className="btn-modal" onClick={() => props.onArchiveNote(details.id)}>
                                        <Icon iconName="iconArchive" />
                                    </Button>
                                    <div className="btn-name-details">Archive</div>
                                </div>

                                <div className="delete-content">
                                    <Button className="btn-modal" onClick={() => props.onDeleteNote(details.id)}>
                                        <Icon iconName="iconTrash" />
                                    </Button>
                                    <div className="btn-name-details">Delete note</div>
                                </div>

                            </div>
                            <Button onClick={props.onClose} className="btn-submit">Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}