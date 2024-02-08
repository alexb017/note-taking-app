export default function BellIcon({ classname }: { classname?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6.448 7.97a5.586 5.586 0 0 1 11.104 0l.252 2.266l.006.057a8 8 0 0 0 1.074 3.18l.03.05l.577.963c.525.874.787 1.311.73 1.67a1 1 0 0 1-.345.61c-.279.234-.789.234-1.808.234H5.932c-1.02 0-1.53 0-1.808-.233a1 1 0 0 1-.346-.611c-.056-.359.206-.796.73-1.67l.579-.964l.03-.05a8 8 0 0 0 1.073-3.179l.006-.057l.252-2.267Z" />
        <path strokeLinecap="round" d="M8 17a4 4 0 1 0 8 0" />
      </g>
    </svg>
  );
}
