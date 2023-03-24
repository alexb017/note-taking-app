import Link from "next/link";
import styles from './Navbar.module.css';
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const [showModalSettings, setShowModalSettings] = useState(false);
    const modalRef = useRef(null);
    const btnRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        function handleOutsideClick(e) {
            if (modalRef.current && !modalRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
                setShowModalSettings(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [modalRef, showModalSettings, btnRef]);

    function toggleModalSettings() {
        if (showModalSettings) {
            setShowModalSettings(false);
        } else {
            setShowModalSettings(true);
        }
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navContent}>
                <Link href='/' className={styles.navTitle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M184 112a8 8 0 0 1-8 8h-64a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-8 24h-64a8 8 0 0 0 0 16h64a8 8 0 0 0 0-16Zm48-88v160a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16ZM48 208h24V48H48Zm160 0V48H88v160h120Z" /></svg>
                    NoteTaking
                </Link>
                <ul className={styles.navUl}>
                    <li className={styles.navLi}>
                        <Link href='/' className={router.pathname === "/" ? styles.active : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h108.69a15.86 15.86 0 0 0 11.31-4.69L219.31 168a15.86 15.86 0 0 0 4.69-11.31V48a16 16 0 0 0-16-16ZM48 48h160v104h-48a8 8 0 0 0-8 8v48H48Zm148.69 120L168 196.69V168Z" /></svg>
                            Notes
                        </Link>
                    </li>
                    <li className={styles.navLi}>
                        <Link href='/reminders' className={router.pathname === "/reminders" ? styles.active : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M224 71.1a8 8 0 0 1-10.78-3.42a94.13 94.13 0 0 0-33.46-36.91a8 8 0 1 1 8.54-13.54a111.46 111.46 0 0 1 39.12 43.09A8 8 0 0 1 224 71.1ZM35.71 72a8 8 0 0 0 7.1-4.32a94.13 94.13 0 0 1 33.46-36.91a8 8 0 1 0-8.54-13.54a111.46 111.46 0 0 0-39.12 43.09A8 8 0 0 0 35.71 72Zm186.1 103.94A16 16 0 0 1 208 200h-40.8a40 40 0 0 1-78.4 0H48a16 16 0 0 1-13.79-24.06C43.22 160.39 48 138.28 48 112a80 80 0 0 1 160 0c0 26.27 4.78 48.38 13.81 63.94ZM150.62 200h-45.24a24 24 0 0 0 45.24 0ZM208 184c-10.64-18.27-16-42.49-16-72a64 64 0 0 0-128 0c0 29.52-5.38 53.74-16 72Z" /></svg>
                            Reminders
                        </Link>
                    </li>
                    <li className={styles.navLi}>
                        <Link href='/labels' className={router.pathname === "/labels" ? styles.active : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="m227.31 73.37l-44.68-44.69a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h44.69a15.86 15.86 0 0 0 11.31-4.69L227.31 96a16 16 0 0 0 0-22.63ZM92.69 208H48v-44.69l88-88L180.69 120ZM192 108.68L147.31 64l24-24L216 84.68Z" /></svg>
                            Edit labels
                        </Link>
                    </li>
                    <li className={styles.navLi}>
                        <Link href='/archive' className={router.pathname === "/archive" ? styles.active : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M224 48H32a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16v88a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-88a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16Zm-16 144H48v-88h160Zm16-104H32V64h192v24ZM96 136a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8Z" /></svg>
                            Archive
                        </Link>
                    </li>
                    <li className={styles.navLi}>
                        <Link href='/trash' className={router.pathname === "/trash" ? styles.active : ""}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" /></svg>
                            Trash
                        </Link>
                    </li>
                </ul>
                <div className={styles.navRight}>
                    <div className={styles.notesSettings}>
                        <button className={styles.notesSettingsBtn} onClick={toggleModalSettings} ref={btnRef}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M128 80a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32Zm88-29.84q.06-2.16 0-4.32l14.92-18.64a8 8 0 0 0 1.48-7.06a107.21 107.21 0 0 0-10.88-26.25a8 8 0 0 0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186 40.54a8 8 0 0 0-3.94-6a107.71 107.71 0 0 0-26.25-10.87a8 8 0 0 0-7.06 1.49L130.16 40h-4.32L107.2 25.11a8 8 0 0 0-7.06-1.48a107.6 107.6 0 0 0-26.25 10.88a8 8 0 0 0-3.93 6l-2.64 23.76q-1.56 1.49-3 3L40.54 70a8 8 0 0 0-6 3.94a107.71 107.71 0 0 0-10.87 26.25a8 8 0 0 0 1.49 7.06L40 125.84v4.32L25.11 148.8a8 8 0 0 0-1.48 7.06a107.21 107.21 0 0 0 10.88 26.25a8 8 0 0 0 6 3.93l23.72 2.64q1.49 1.56 3 3L70 215.46a8 8 0 0 0 3.94 6a107.71 107.71 0 0 0 26.25 10.87a8 8 0 0 0 7.06-1.49L125.84 216q2.16.06 4.32 0l18.64 14.92a8 8 0 0 0 7.06 1.48a107.21 107.21 0 0 0 26.25-10.88a8 8 0 0 0 3.93-6l2.64-23.72q1.56-1.48 3-3l23.78-2.8a8 8 0 0 0 6-3.94a107.71 107.71 0 0 0 10.87-26.25a8 8 0 0 0-1.49-7.06Zm-16.1-6.5a73.93 73.93 0 0 1 0 8.68a8 8 0 0 0 1.74 5.48l14.19 17.73a91.57 91.57 0 0 1-6.23 15l-22.6 2.56a8 8 0 0 0-5.1 2.64a74.11 74.11 0 0 1-6.14 6.14a8 8 0 0 0-2.64 5.1l-2.51 22.58a91.32 91.32 0 0 1-15 6.23l-17.74-14.19a8 8 0 0 0-5-1.75h-.48a73.93 73.93 0 0 1-8.68 0a8 8 0 0 0-5.48 1.74l-17.78 14.2a91.57 91.57 0 0 1-15-6.23L82.89 187a8 8 0 0 0-2.64-5.1a74.11 74.11 0 0 1-6.14-6.14a8 8 0 0 0-5.1-2.64l-22.58-2.52a91.32 91.32 0 0 1-6.23-15l14.19-17.74a8 8 0 0 0 1.74-5.48a73.93 73.93 0 0 1 0-8.68a8 8 0 0 0-1.74-5.48L40.2 100.45a91.57 91.57 0 0 1 6.23-15L69 82.89a8 8 0 0 0 5.1-2.64a74.11 74.11 0 0 1 6.14-6.14A8 8 0 0 0 82.89 69l2.51-22.57a91.32 91.32 0 0 1 15-6.23l17.74 14.19a8 8 0 0 0 5.48 1.74a73.93 73.93 0 0 1 8.68 0a8 8 0 0 0 5.48-1.74l17.77-14.19a91.57 91.57 0 0 1 15 6.23L173.11 69a8 8 0 0 0 2.64 5.1a74.11 74.11 0 0 1 6.14 6.14a8 8 0 0 0 5.1 2.64l22.58 2.51a91.32 91.32 0 0 1 6.23 15l-14.19 17.74a8 8 0 0 0-1.74 5.53Z" /></svg>
                            Settings
                        </button>
                        {showModalSettings && <div className={styles.modalSettings} ref={modalRef}>
                            <p>Settings</p>
                            <hr />
                            <button type='button' className={styles.btnAppearance}>
                                Switch appearance
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 256 256"
                                >
                                    <path
                                        d="M233.54 142.23a8 8 0 0 0-8-2a88.08 88.08 0 0 1-109.8-109.8a8 8 0 0 0-10-10a104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88a104.84 104.84 0 0 0 37-52.91a8 8 0 0 0-1.98-7.98Zm-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104a106 106 0 0 0 14.92-1.06a89 89 0 0 1-26.02 31.4Z"
                                    />
                                </svg>
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </nav>
    )
}