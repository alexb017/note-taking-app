export default function PaletteIcon({ classname }: { classname?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 6a4 4 0 1 1 8 0v12a4 4 0 0 1-8 0z" />
        <path d="m10 8.243l3.313-3.314a4 4 0 0 1 5.657 5.657L9.306 20.25" />
        <path d="M6 22h12a4 4 0 0 0 0-8h-2.5M7 18a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
      </g>
    </svg>
  );
}
