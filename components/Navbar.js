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
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.75 3A3.25 3.25 0 0 1 21 6.25v6.879a2.25 2.25 0 0 1-.659 1.59l-5.621 5.622a2.25 2.25 0 0 1-1.591.659H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm0 1.5H6.25A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .966.784 1.75 1.75 1.75H13v-3.25a3.25 3.25 0 0 1 3.066-3.245L16.25 13h3.25V6.25a1.75 1.75 0 0 0-1.75-1.75Zm.689 10H16.25a1.75 1.75 0 0 0-1.744 1.607l-.006.143v2.189l3.939-3.939Z" /></svg>
                                Notes
                            </Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link href='/reminders' className={router.pathname === "/reminders" ? styles.active : ""}>
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.996a7.49 7.49 0 0 1 7.496 7.25l.004.25v4.097l1.38 3.156a1.25 1.25 0 0 1-1.145 1.75L15 18.502a3 3 0 0 1-5.995.177L9 18.499H4.275a1.251 1.251 0 0 1-1.147-1.747L4.5 13.594V9.496c0-4.155 3.352-7.5 7.5-7.5ZM13.5 18.5l-3 .002a1.5 1.5 0 0 0 2.993.145l.006-.147ZM12 3.496c-3.32 0-6 2.674-6 6v4.41L4.656 17h14.697L18 13.907V9.509l-.004-.225A5.988 5.988 0 0 0 12 3.496Z" /></svg>
                                Reminders
                            </Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link href='/labels' className={router.pathname === "/labels" ? styles.active : ""}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.03 2.97a3.578 3.578 0 0 1 0 5.06L9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L15.97 2.97a3.578 3.578 0 0 1 5.06 0ZM15 6.06 5.062 16a.75.75 0 0 0-.193.333l-1.05 3.85 3.85-1.05A.75.75 0 0 0 8 18.938L17.94 9 15 6.06Zm2.03-2.03-.97.97L19 7.94l.97-.97a2.079 2.079 0 0 0-2.94-2.94Z" /></svg>
                                Edit labels
                            </Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link href='/archive' className={router.pathname === "/archive" ? styles.active : ""}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.25 3c.966 0 1.75.784 1.75 1.75v2c0 .698-.408 1.3-1 1.581v9.919A3.75 3.75 0 0 1 16.25 22h-8.5A3.75 3.75 0 0 1 4 18.25V8.332A1.75 1.75 0 0 1 3 6.75v-2C3 3.784 3.784 3 4.75 3h14.5Zm-.75 5.5h-13v9.75a2.25 2.25 0 0 0 2.25 2.25h8.5a2.25 2.25 0 0 0 2.25-2.25V8.5Zm-8.5 3h4a.75.75 0 0 1 .102 1.493L14 13h-4a.75.75 0 0 1-.102-1.493L10 11.5h4-4Zm9.25-7H4.75a.25.25 0 0 0-.25.25v2c0 .138.112.25.25.25h14.5a.25.25 0 0 0 .25-.25v-2a.25.25 0 0 0-.25-.25Z" /></svg>
                                Archive
                            </Link>
                        </li>
                        <li className={styles.navLi}>
                            <Link href='/trash' className={router.pathname === "/trash" ? styles.active : ""}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" /></svg>
                                Trash
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