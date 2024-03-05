export default function UndoIcon({ classname }: { classname?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.5 9.5h7.539a3.462 3.462 0 0 1 0 6.923H9.5M6.5 9.5l2.25-2.077M6.5 9.5l2.25 2.077"
        />
        <path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" />
      </g>
    </svg>
  );
}
