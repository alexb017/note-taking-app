import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "./Icon";

export default function NavbarLeft() {
    const router = useRouter();

    return (
        <div className="navbar-left-content">
            <ul className="ul-nav-left">
                <li className="li-nav-left">
                    <Link href='/' className={router.pathname === "/" ? "active" : ""}>
                        <Icon iconName="iconLightbulb" />
                        <div className="hide-on-mobile">Notes</div>
                    </Link>
                </li>
                <li className="li-nav-left">
                    <Link href='/reminders' className={router.pathname === "/reminders" ? "active" : ""}>
                        <Icon iconName="iconAlert" />
                        <div className="hide-on-mobile">Reminders</div>
                    </Link>
                </li>
                <li className="li-nav-left">
                    <Link href='/archive' className={router.pathname === "/archive" ? "active" : ""}>
                        <Icon iconName="iconArchive" />
                        <div className="hide-on-mobile">Archive</div>
                    </Link>
                </li>
                <li className="li-nav-left">
                    <Link href='/trash' className={router.pathname === "/trash" ? "active" : ""}>
                        <Icon iconName="iconTrash" />
                        <div className="hide-on-mobile">Trash</div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}