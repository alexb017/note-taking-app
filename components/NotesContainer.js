import { useState, useEffect } from "react";

export default function NotesContainer(props) {
    const { children } = props;

    return (
        <div className="notesContentFlex">
            {children}
        </div>
    )
}