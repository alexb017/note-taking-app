import styles from "./NoteModal.module.css";

export default function NoteModal(props) {
    const { details } = props;
    return (
        <div className={styles.noteModal}>
            <p>{details.title}</p>
            <p>{details.content}</p>
            <button type="button" onClick={props.onClose}>{details.id}</button>
        </div>
    )
}