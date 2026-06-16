import type { ReactElement } from "react";

/**
 * On-brand inline SVG illustrations for the 16 mortgage calculators.
 * Pure server component — no client interactivity. Each scene is decorative
 * (aria-hidden) and drawn on a 96×96 rounded canvas using the brand palette:
 *   navy   #0b2545
 *   navy-2 #163a63 (lighter navy)
 *   emerald#1b9c85
 *   gold   #e6b800
 */

const NAVY = "#0b2545";
const NAVY2 = "#163a63";
const EMERALD = "#1b9c85";
const GOLD = "#e6b800";

type Scene = (id: string) => ReactElement;

/** A rounded background tile + soft gradient shared by every scene. */
function frame(id: string, children: ReactElement, from = NAVY, to = NAVY2) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="96" height="96" rx="20" fill={`url(#${id}-bg)`} />
      {children}
    </>
  );
}

const SCENES: Record<string, Scene> = {
  // ── house + coin ─────────────────────────────────────────────
  payment: (id) =>
    frame(
      id,
      <g>
        <path d="M24 48 48 28 72 48v26a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4Z" fill="#fff" />
        <path d="M20 50 48 27 76 50" fill="none" stroke={EMERALD} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="42" y="58" width="12" height="20" fill={NAVY2} />
        <circle cx="64" cy="66" r="13" fill={GOLD} />
        <text x="64" y="71" textAnchor="middle" fontSize="15" fontWeight="700" fill={NAVY}>$</text>
      </g>,
    ),

  // ── calendar with $ (monthly) ────────────────────────────────
  monthly: (id) =>
    frame(
      id,
      <g>
        <rect x="22" y="26" width="52" height="48" rx="6" fill="#fff" />
        <rect x="22" y="26" width="52" height="13" rx="6" fill={EMERALD} />
        <rect x="32" y="20" width="5" height="12" rx="2.5" fill={GOLD} />
        <rect x="59" y="20" width="5" height="12" rx="2.5" fill={GOLD} />
        <circle cx="48" cy="57" r="13" fill={NAVY} />
        <text x="48" y="62" textAnchor="middle" fontSize="16" fontWeight="700" fill={GOLD}>$</text>
      </g>,
    ),

  // ── percent badge / interest ─────────────────────────────────
  interest: (id) =>
    frame(
      id,
      <g>
        <circle cx="48" cy="48" r="26" fill="#fff" />
        <line x1="36" y1="60" x2="60" y2="36" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
        <circle cx="39" cy="39" r="6.5" fill={EMERALD} />
        <circle cx="57" cy="57" r="6.5" fill={GOLD} />
      </g>,
    ),

  // ── "30" on a banner ─────────────────────────────────────────
  "thirty-year": (id) =>
    frame(
      id,
      <g>
        <circle cx="48" cy="48" r="27" fill="none" stroke={EMERALD} strokeWidth="5" />
        <path d="M48 21 A27 27 0 0 1 75 48" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
        <text x="48" y="55" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff">30</text>
        <text x="48" y="68" textAnchor="middle" fontSize="8" fontWeight="600" fill={GOLD} letterSpacing="1">YEARS</text>
      </g>,
    ),

  // ── document + coins (closing) ───────────────────────────────
  closing: (id) =>
    frame(
      id,
      <g>
        <rect x="26" y="22" width="34" height="44" rx="4" fill="#fff" />
        <line x1="32" y1="32" x2="54" y2="32" stroke={NAVY2} strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="40" x2="54" y2="40" stroke={NAVY2} strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="48" x2="46" y2="48" stroke={EMERALD} strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="62" r="11" fill={GOLD} />
        <circle cx="50" cy="66" r="9" fill={EMERALD} />
        <text x="60" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill={NAVY}>$</text>
      </g>,
    ),

  // ── descending bars (amortization) ───────────────────────────
  amortization: (id) =>
    frame(
      id,
      <g>
        <rect x="24" y="34" width="11" height="40" rx="2" fill="#fff" />
        <rect x="39" y="44" width="11" height="30" rx="2" fill={EMERALD} />
        <rect x="54" y="54" width="11" height="20" rx="2" fill={GOLD} />
        <rect x="69" y="64" width="11" height="10" rx="2" fill="#fff" opacity="0.7" />
        <path d="M24 32 L72 60" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 4" />
      </g>,
    ),

  // ── house + downward arrow (payoff) ──────────────────────────
  payoff: (id) =>
    frame(
      id,
      <g>
        <path d="M28 46 48 30 68 46v24a3 3 0 0 1-3 3H31a3 3 0 0 1-3-3Z" fill="#fff" />
        <path d="M24 48 48 29 72 48" fill="none" stroke={NAVY2} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="48" cy="56" r="12" fill={EMERALD} />
        <path d="M48 50v12M43 57l5 5 5-5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>,
    ),

  // ── stopwatch + fast-forward (early payoff) ──────────────────
  "early-payoff": (id) =>
    frame(
      id,
      <g>
        <circle cx="48" cy="52" r="22" fill="#fff" />
        <rect x="42" y="20" width="12" height="6" rx="3" fill={GOLD} />
        <line x1="48" y1="26" x2="48" y2="32" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
        <path d="M40 52l8-6v12zM50 52l8-6v12z" fill={EMERALD} />
        <line x1="48" y1="52" x2="48" y2="42" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
      </g>,
    ),

  // ── wallet / home + magnifier (affordability) ────────────────
  affordability: (id) =>
    frame(
      id,
      <g>
        <rect x="22" y="36" width="40" height="30" rx="5" fill="#fff" />
        <rect x="22" y="44" width="40" height="7" fill={EMERALD} />
        <circle cx="54" cy="58" r="4" fill={GOLD} />
        <circle cx="62" cy="40" r="13" fill="none" stroke={GOLD} strokeWidth="4" />
        <line x1="71" y1="49" x2="79" y2="57" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
        <text x="62" y="45" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">$</text>
      </g>,
    ),

  // ── gauge / speedometer (rates) ──────────────────────────────
  rates: (id) =>
    frame(
      id,
      <g>
        <path d="M24 62 A24 24 0 0 1 72 62" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <path d="M24 62 A24 24 0 0 1 39 39" fill="none" stroke={EMERALD} strokeWidth="6" strokeLinecap="round" />
        <path d="M62 41 A24 24 0 0 1 72 62" fill="none" stroke={GOLD} strokeWidth="6" strokeLinecap="round" />
        <line x1="48" y1="62" x2="60" y2="46" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
        <circle cx="48" cy="62" r="5" fill="#fff" />
      </g>,
    ),

  // ── two arrows cycling (refinance) ───────────────────────────
  refinance: (id) =>
    frame(
      id,
      <g>
        <path d="M30 40a18 18 0 0 1 33-4" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path d="M66 56a18 18 0 0 1-33 4" fill="none" stroke={EMERALD} strokeWidth="5" strokeLinecap="round" />
        <path d="M57 30l8 4-3 9" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M39 66l-8-4 3-9" fill="none" stroke={EMERALD} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="48" cy="48" r="6" fill={GOLD} />
      </g>,
    ),

  // ── house vs key balance (rent vs buy) ───────────────────────
  "rent-vs-buy": (id) =>
    frame(
      id,
      <g>
        <path d="M22 50 36 38 50 50v20H22Z" fill="#fff" />
        <path d="M19 51 36 37 53 51" fill="none" stroke={EMERALD} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="63" cy="40" r="9" fill="none" stroke={GOLD} strokeWidth="4" />
        <path d="M63 49v18M63 60h8" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
        <rect x="58" y="68" width="20" height="5" rx="2.5" fill={GOLD} />
      </g>,
    ),

  // ── scale / ratio (dti) ──────────────────────────────────────
  dti: (id) =>
    frame(
      id,
      <g>
        <line x1="48" y1="24" x2="48" y2="70" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <line x1="28" y1="34" x2="68" y2="34" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M28 34l-7 14h14Z" fill={EMERALD} />
        <path d="M68 34l-7 14h14Z" fill={GOLD} />
        <rect x="40" y="70" width="16" height="6" rx="3" fill="#fff" />
        <circle cx="48" cy="24" r="4" fill={GOLD} />
      </g>,
    ),

  // ── house + elder figure (reverse) ───────────────────────────
  reverse: (id) =>
    frame(
      id,
      <g>
        <path d="M22 50 40 34 58 50v22H22Z" fill="#fff" />
        <path d="M19 51 40 33 61 51" fill="none" stroke={NAVY2} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="64" cy="40" r="7" fill={GOLD} />
        <path d="M56 72v-9a8 8 0 0 1 16 0v9Z" fill={EMERALD} />
        <line x1="74" y1="52" x2="74" y2="74" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
      </g>,
    ),

  // ── office building (commercial) ─────────────────────────────
  commercial: (id) =>
    frame(
      id,
      <g>
        <rect x="26" y="30" width="24" height="44" rx="2" fill="#fff" />
        <rect x="50" y="42" width="20" height="32" rx="2" fill={EMERALD} />
        <g fill={NAVY}>
          <rect x="31" y="36" width="5" height="5" /><rect x="40" y="36" width="5" height="5" />
          <rect x="31" y="46" width="5" height="5" /><rect x="40" y="46" width="5" height="5" />
          <rect x="31" y="56" width="5" height="5" /><rect x="40" y="56" width="5" height="5" />
        </g>
        <g fill="#fff">
          <rect x="55" y="48" width="4" height="4" /><rect x="62" y="48" width="4" height="4" />
          <rect x="55" y="57" width="4" height="4" /><rect x="62" y="57" width="4" height="4" />
        </g>
        <rect x="36" y="64" width="8" height="10" fill={GOLD} />
      </g>,
    ),

  // ── shield + house (fha) ─────────────────────────────────────
  fha: (id) =>
    frame(
      id,
      <g>
        <path d="M48 22 70 30v18c0 14-10 22-22 26-12-4-22-12-22-26V30Z" fill="#fff" />
        <path d="M37 50 48 41 59 50v12H37Z" fill={NAVY} />
        <path d="M34 51 48 40 62 51" fill="none" stroke={EMERALD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="45" y="54" width="6" height="8" fill={GOLD} />
      </g>,
    ),
};

/** Fallback: generic house badge for unknown art keys. */
function defaultScene(id: string) {
  return frame(
    id,
    <g>
      <path d="M26 50 48 32 70 50v22a3 3 0 0 1-3 3H29a3 3 0 0 1-3-3Z" fill="#fff" />
      <path d="M22 52 48 31 74 52" fill="none" stroke={EMERALD} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="60" r="7" fill={GOLD} />
    </g>,
  );
}

export default function CalcArt({ art, className }: { art: string; className?: string }) {
  const id = `ca-${art}`;
  const scene = SCENES[art] ?? defaultScene;
  return (
    <svg
      viewBox="0 0 96 96"
      role="img"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {scene(id)}
    </svg>
  );
}
