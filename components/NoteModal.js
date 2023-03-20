import styles from "./NoteModal.module.css";

export default function NoteModal(props) {
    return (
        <div className={styles.noteModal}>
            <h1>Note Modal</h1>
            <button type="button" onClick={props.onIsModalClose}>X</button>
        </div>
    )
}