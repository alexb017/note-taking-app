import { useState, useEffect } from "react";

export default function NotesContainer(props) {
    const { children } = props;
    const [heightDiv, setHeightDiv] = useState(null);

    useEffect(() => {
        const divs = document.querySelectorAll(".Note_noteContents__N62xp");
        const divsArray = [...divs];
        const divsHeight = divsArray.reduce((total, current) => total + current.clientHeight, 0);
        let divHeight = 0;
        let divHeightMobile = "100%";

        if (props.arrayLength <= 4) {
            divHeight = Number.parseInt(divsHeight, 10) / 2 + 16;
        } else {
            divHeight = (Number.parseInt(divsHeight, 10) / Number.parseInt(props.arrayLength, 10)) * 4;
        }

        if (window.innerWidth <= 800) {
            setHeightDiv(`${100}%`)
        } else {
            setHeightDiv(divHeight);
        }

    }, [heightDiv]);

    return (
        <div className="notesContentFlex" style={{ height: heightDiv }}>
            {children}
        </div>
    )
}