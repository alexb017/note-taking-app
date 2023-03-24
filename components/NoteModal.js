import styles from "./NoteModal.module.css";
import { useRouter } from 'next/router';

export default function NoteModal(props) {
    const router = useRouter()
    const { details } = props;
    return (
        <div className={styles.noteModal}>
            <h1>Note Modal</h1>
            <button type="button" onClick={props.onClose}>{details.id}</button>
        </div>
    )
}