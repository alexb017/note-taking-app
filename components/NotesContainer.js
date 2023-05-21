import Masonry from 'react-masonry-css';

export default function NotesContainer(props) {
    const { children, className } = props;

    const breakpointColumnsObj = {
        default: 8,
        1920: 5,
        1280: 4,
        1024: 3,
        768: 2,
        500: 1
    };

    return (
        <Masonry breakpointCols={breakpointColumnsObj}
            className={`my-masonry-grid ${className}`}
            columnClassName="my-masonry-grid_column">
            {children}
        </Masonry>
    )
}