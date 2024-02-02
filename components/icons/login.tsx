export default function LoginIcon({ classname }: { classname?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M7 7.132v-.52c0-2.146 0-3.219.69-3.817c.69-.598 1.751-.446 3.876-.143l4.282.612c2.457.351 3.685.526 4.418 1.372C21 5.482 21 6.723 21 9.204v5.592c0 2.481 0 3.722-.734 4.568c-.733.846-1.961 1.021-4.417 1.372l-4.283.612c-2.125.303-3.187.455-3.876-.143C7 20.607 7 19.534 7 17.388v-.322"
        />
        <path
          fill="currentColor"
          d="m16 12l.78-.625l.5.625l-.5.625L16 12ZM4 13a1 1 0 1 1 0-2v2Zm8.78-6.625l4 5l-1.56 1.25l-4-5l1.56-1.25Zm4 6.25l-4 5l-1.56-1.25l4-5l1.56 1.25ZM16 13H4v-2h12v2Z"
        />
      </g>
    </svg>
  );
}
