import styles from "./Note.module.css";

export default function Note(props) {
    const { details } = props;

    return (
        <div className={styles.noteContents} style={{}}>
            {details.title && <div className={styles.noteTitle} aria-multiline="true" role="textbox" contentEditable="true" suppressContentEditableWarning="true">{details.title}</div>}
            <div className={styles.noteContent} aria-multiline="true" role="textbox" contentEditable="true" suppressContentEditableWarning="true">{details.content}</div>
        </div>
    )
}