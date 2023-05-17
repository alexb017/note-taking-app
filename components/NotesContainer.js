export default function NotesContainer(props) {
    const { children } = props;

    return (
        <div className="notes-container">
            {children}
        </div>
    )
}