import Masonry from 'react-masonry-css';

export default function MasonryGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  const breakpointColumnsObj = {
    default: 8,
    1560: 7,
    2304: 6,
    2048: 5,
    1792: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto -pl-4"
      columnClassName="pl-4 bg-clip-padding"
    >
      {children}
    </Masonry>
  );
}
