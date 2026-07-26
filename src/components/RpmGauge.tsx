'use client';

export default function RpmGauge({ label }: { label: string }) {
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" style={{ flexShrink: 0 }}>
      <circle cx="46" cy="46" r="40" fill="none" stroke="var(--line)" strokeWidth="6" />
      <circle
        cx="46"
        cy="46"
        r="40"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="6"
        strokeDasharray="188 251"
        strokeLinecap="round"
        transform="rotate(-210 46 46)"
      />
      <text
        x="46"
        y="51"
        textAnchor="middle"
        fontFamily="var(--font-barlow), sans-serif"
        fontSize="22"
        fontWeight={700}
        fill="var(--text)"
      >
        {label}
      </text>
    </svg>
  );
}
