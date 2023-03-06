import Link from "next/link";
import style from './Navbar.module.css';
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className={style.nav}>
            <div className={style.navContent}>
                <div className={style.navTop}>
                    <Link href='/' className={style.navTitle}>Note Taking App</Link>
                    <ul className={style.navUl}>
                        <li className={style.navLi}>
                            <Link href='/' className={router.pathname === "/" ? style.active : ""}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.75A3.25 3.25 0 0 0 6.25 21h4.915l.356-1.423c.162-.648.497-1.24.97-1.712l5.902-5.903a3.279 3.279 0 0 1 2.607-.95V6.25A3.25 3.25 0 0 0 17.75 3H11v4.75A3.25 3.25 0 0 1 7.75 11H3v6.75ZM9.5 3.44 3.44 9.5h4.31A1.75 1.75 0 0 0 9.5 7.75V3.44Zm9.6 9.23-5.903 5.902a2.686 2.686 0 0 0-.706 1.247l-.458 1.831a1.087 1.087 0 0 0 1.319 1.318l1.83-.457a2.685 2.685 0 0 0 1.248-.707l5.902-5.902A2.286 2.286 0 0 0 19.1 12.67Z" /></svg>
                                Notes
                            </Link>
                        </li>
                        <li className={style.navLi}>
                            <Link href='/labels' className={router.pathname === "/labels" ? style.active : ""}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z" /></svg>
                                Edit labels
                            </Link>
                        </li>
                        <li className={style.navLi}>
                            <Link href='/archive' className={router.pathname === "/archive" ? style.active : ""}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 8v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 19.5V8h16Zm-6 3.5h-4a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5ZM20 3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16Z" /></svg>
                                Archive
                            </Link>
                        </li>
                        <li className={style.navLi}>
                            <Link href='/trash' className={router.pathname === "/trash" ? style.active : ""}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z" /></svg>
                                Trash
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={style.navBottom}>
                    <button type="button">Dark Mode</button>
                </div>
            </div>
        </nav>
    )
}