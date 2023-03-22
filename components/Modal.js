import { useState } from "react";
import styles from "./Modal.module.css";

export default function Modal({ props }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.modal}>
            {props.children}
        </div>
    )
}