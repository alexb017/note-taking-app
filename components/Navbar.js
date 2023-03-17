import Link from "next/link";
import styles from './Navbar.module.css';
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <div className={styles.navContent}>
                <div className={styles.navTop}>
                    <Link href='/' className={styles.navTitle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><path fill="#B4ACBC" d="M4.5 1A2.5 2.5 0 0 0 2 3.5v23A2.5 2.5 0 0 0 4.5 29H7v.5A1.5 1.5 0 0 0 8.5 31h17a1.5 1.5 0 0 0 1.5-1.5v-23A1.5 1.5 0 0 0 25.5 5h-4.586l-3.268-3.268A2.5 2.5 0 0 0 15.88 1H4.5Z" /><path fill="#F3EEF8" d="M3 3.5A1.5 1.5 0 0 1 4.5 2h11.379a1.5 1.5 0 0 1 1.06.44l5.622 5.62A1.5 1.5 0 0 1 23 9.122V26.5a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 3 26.5v-23Z" /><path fill="#998EA4" d="M6.5 11a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1h-13Zm0 3a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1h-13ZM6 17.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1h-8Z" /><path fill="#CDC4D6" d="M16 2.005a1.5 1.5 0 0 1 .94.434l5.62 5.622a1.5 1.5 0 0 1 .435.939H17.5A1.5 1.5 0 0 1 16 7.5V2.005Z" /><path fill="#F70A8D" d="M22.36 13.118a.5.5 0 0 1 .323-.118H25.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2.817a.5.5 0 0 1-.322-.118l-1.187-1a.5.5 0 0 1 0-.764l1.187-1Z" /><path fill="#F9C23C" d="M25.36 20.118a.5.5 0 0 1 .323-.118H28.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2.817a.5.5 0 0 1-.322-.118l-1.187-1a.5.5 0 0 1 0-.764l1.187-1Z" /></g></svg>
                        NoteTaking
                    </Link>
                    <ul className={styles.navUl}>
                        <li className={styles.navLi}>
                            <Link href='/' className={router.pathname === "/" ? styles.active : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h108.69a15.86 15.86 0 0 0 11.31-4.69L219.31 168a15.86 15.86 0 0 0 4.69-11.31V48a16 16 0 0 0-16-16ZM48 48h160v104h-48a8 8 0 0 0-8 8v48H48Zm148.69 120L168 196.69V168Z" /></svg>
                                Notes
                            </Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link href='/reminders' className={router.pathname === "/reminders" ? styles.active : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M224 71.1a8 8 0 0 1-10.78-3.42a94.13 94.13 0 0 0-33.46-36.91a8 8 0 1 1 8.54-13.54a111.46 111.46 0 0 1 39.12 43.09A8 8 0 0 1 224 71.1ZM35.71 72a8 8 0 0 0 7.1-4.32a94.13 94.13 0 0 1 33.46-36.91a8 8 0 1 0-8.54-13.54a111.46 111.46 0 0 0-39.12 43.09A8 8 0 0 0 35.71 72Zm186.1 103.94A16 16 0 0 1 208 200h-40.8a40 40 0 0 1-78.4 0H48a16 16 0 0 1-13.79-24.06C43.22 160.39 48 138.28 48 112a80 80 0 0 1 160 0c0 26.27 4.78 48.38 13.81 63.94ZM150.62 200h-45.24a24 24 0 0 0 45.24 0ZM208 184c-10.64-18.27-16-42.49-16-72a64 64 0 0 0-128 0c0 29.52-5.38 53.74-16 72Z" /></svg>
                                Reminders
                            </Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link href='/labels' className={router.pathname === "/labels" ? styles.active : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="m227.31 73.37l-44.68-44.69a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h44.69a15.86 15.86 0 0 0 11.31-4.69L227.31 96a16 16 0 0 0 0-22.63ZM92.69 208H48v-44.69l88-88L180.69 120ZM192 108.68L147.31 64l24-24L216 84.68Z" /></svg>
                                Edit labels
                            </Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link href='/archive' className={router.pathname === "/archive" ? styles.active : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M224 48H32a16 16 0 0 0-16 16v24a16 16 0 0 0 16 16v88a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-88a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16Zm-16 144H48v-88h160Zm16-104H32V64h192v24ZM96 136a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8Z" /></svg>                                Archive
                            </Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link href='/trash' className={router.pathname === "/trash" ? styles.active : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" /></svg>                                Trash
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.navBottom}>
                    <p>&copy; 2023. Note Taking App.</p>
                    {/* <button type="button">Dark Mode</button> */}
                </div>
            </div>
        </nav>
    )
}