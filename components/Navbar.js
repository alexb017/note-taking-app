import Link from "next/link";
import { useState, useEffect, useRef, use } from "react";
import Button from "./Button";
import Icon from "./Icon";

export default function Navbar() {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            return localStorage.getItem("isDarkTheme") === 'true';
        }
    });
    const [showModalSettings, setShowModalSettings] = useState(false);
    const modalRef = useRef(null);
    const btnRef = useRef(null);

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

    useEffect(() => {
        localStorage.setItem('isDarkTheme', isDarkTheme);

        if (isDarkTheme) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [isDarkTheme]);

    function handleThemeClick() {
        setIsDarkTheme(!isDarkTheme);
        setShowModalSettings(false);
    }

    function toggleModalSettings() {
        setShowModalSettings(!showModalSettings);
    }

    return (
        <nav className="nav">
            <div className="nav-content">
                <Link href='/' className="nav-title">
                    <Icon iconName="iconFileTextFill" width="40px" height="40px" />
                    NoteTaking
                </Link>
                <div className="nav-right">
                    <div className="notes-settings">
                        <Button secondary onClick={toggleModalSettings} ref={btnRef}>
                            <Icon iconName="iconGear" />
                            Settings
                        </Button>
                        {showModalSettings && <div className="modal-settings" ref={modalRef}>
                            <p>Settings</p>
                            <hr />
                            <Button className="btn-appearance" onClick={handleThemeClick}>
                                Switch appearance
                                <Icon iconName="iconMoon" />
                            </Button>
                        </div>}
                    </div>
                </div>
            </div>
        </nav>
    )
}