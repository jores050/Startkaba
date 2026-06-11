// Logo StartKaba : flèche de croissance + bâtiments (skyline).
export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo StartKaba"
    >
      {/* Bâtiments */}
      <rect x="4" y="28" width="8" height="16" rx="1" fill="#0722AB" />
      <rect x="14" y="22" width="8" height="22" rx="1" fill="#0722AB" opacity="0.8" />
      <rect x="24" y="16" width="8" height="28" rx="1" fill="#0722AB" opacity="0.6" />
      {/* Fenêtres */}
      <rect x="6.5" y="31" width="3" height="3" fill="#AEFF94" />
      <rect x="16.5" y="25" width="3" height="3" fill="#AEFF94" />
      <rect x="26.5" y="19" width="3" height="3" fill="#AEFF94" />
      {/* Flèche de croissance */}
      <path
        d="M6 24 L18 14 L26 18 L40 6"
        stroke="#F77E2D"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M40 6 L40 16 M40 6 L30 6" stroke="#F77E2D" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
