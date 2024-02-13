import Masonry from 'react-masonry-css';

export default function MasonryGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  const breakpointColumnsObj = {
    default: 8,
    1920: 6,
    1366: 4,
    1280: 3,
    768: 2,
    500: 1,
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
