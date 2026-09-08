import type { SVGProps } from 'react';

export function IconCampeao(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M7 4h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4Z" />
      <path d="M7 5H4a2 2 0 0 0 0 4h1.3" />
      <path d="M17 5h3a2 2 0 0 1 0 4h-1.3" />
      <path d="M12 13v3" />
      <path d="M9 20h6" />
      <path d="M10 17h4l.6 3H9.4l.6-3Z" />
    </svg>
  );
}

export function IconPole(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="8" width="16" height="8" rx="2.5" />
      <circle cx="8" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="1.7" fill="none" />
    </svg>
  );
}

export function IconVmr(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 9v4l3 2" />
      <path d="M10 2h4M12 2v2" />
      <path d="M19.5 6.5 18 8" />
    </svg>
  );
}

export function IconPodio(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M4 20V13h4v7M10 20V9h4v11M16 20v-5h4v5" />
      <path d="M2 20h20" />
    </svg>
  );
}

export function IconCrown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" />
    </svg>
  );
}
