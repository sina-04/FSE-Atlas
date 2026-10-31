export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="44"
      viewBox="0 0 40 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 39V15M20 27C7 28 3 20 4 13c9 0 15 4 16 14Zm0-8C20 8 26 3 35 4c0 10-6 16-15 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="36" r="3" fill="currentColor" />
      <circle cx="32" cy="29" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="m12 35 8-6 9 1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
export function ScienceIllustration({ small = false }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 600 580"
      fill="none"
      className={small ? 'science-art small-art' : 'science-art'}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="glass"
          x1="260"
          y1="145"
          x2="435"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--glass-top)" />
          <stop offset="1" stopColor="var(--glass-bottom)" />
        </linearGradient>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" stroke="currentColor" strokeOpacity=".055" />
        </pattern>
      </defs>
      <rect width="600" height="580" fill="url(#grid)" />
      <circle cx="300" cy="284" r="218" fill="var(--sage-wash)" />
      <circle
        cx="300"
        cy="284"
        r="246"
        stroke="currentColor"
        strokeOpacity=".17"
        strokeDasharray="2 9"
      />
      <path
        d="M64 428c86-47 185-54 289-37 68 12 118 35 166 51"
        stroke="currentColor"
        strokeOpacity=".2"
      />
      <ellipse cx="318" cy="487" rx="151" ry="17" fill="currentColor" opacity=".06" />
      <path
        d="M277 134v139l-83 149c-15 28 1 49 31 49h186c31 0 47-24 31-51l-83-147V134"
        fill="url(#glass)"
        stroke="var(--art-stroke)"
        strokeWidth="2"
      />
      <path
        d="m237 353-47 86c-5 10 1 19 13 19h219c12 0 18-10 12-20l-48-85c-39 22-104-17-149 0Z"
        fill="var(--art-liquid)"
        opacity=".88"
      />
      <path d="M237 353c41-18 105 23 150 0" stroke="var(--art-stroke)" strokeWidth="1.5" />
      <path
        d="M268 127h101v15H268z"
        fill="var(--surface)"
        stroke="var(--art-stroke)"
        strokeWidth="2"
      />
      <path
        d="M294 157v119l-39 70M208 427l-7 13"
        stroke="var(--surface)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity=".8"
      />
      <circle cx="285" cy="406" r="7" stroke="var(--cream)" strokeWidth="2" />
      <circle cx="339" cy="427" r="5" fill="var(--cream)" opacity=".7" />
      <circle cx="359" cy="388" r="11" stroke="var(--cream)" strokeWidth="2" />
      <circle cx="311" cy="369" r="4" fill="var(--cream)" />
      <g stroke="var(--art-stroke)" strokeWidth="1.8">
        <path d="M137 369c7-71 35-130 75-170" />
        <path d="M151 307c-35-2-53-23-48-49 28 1 49 20 48 49Z" fill="var(--sage)" />
        <path d="M166 268c-1-37 18-65 46-63 2 30-16 56-46 63Z" fill="var(--sage)" />
        <path d="M142 345c-33 0-55-18-57-45 30-3 53 13 57 45Z" fill="var(--sage)" />
        <path d="M187 235c-12-29-6-55 15-68 17 26 12 52-15 68Z" fill="var(--sage)" />
      </g>
      <g stroke="var(--terracotta)" strokeWidth="2">
        <path d="m415 187 33-19 34 19v38l-34 20-33-20v-38Zm33 58v38m34-96 31-18m-98 18-30-17" />
        <circle cx="448" cy="289" r="7" fill="var(--surface)" />
        <circle cx="518" cy="165" r="7" fill="var(--surface)" />
        <circle cx="379" cy="166" r="7" fill="var(--surface)" />
      </g>
      <path d="M67 149h88m-44-44v88" stroke="currentColor" strokeOpacity=".22" />
      <circle cx="110" cy="149" r="16" stroke="currentColor" strokeOpacity=".25" />
      <g fill="var(--terracotta)">
        <circle cx="458" cy="409" r="4" />
        <circle cx="483" cy="379" r="2.5" />
        <circle cx="472" cy="429" r="2" />
      </g>
      <path d="M411 72h57m-28-28v57" stroke="currentColor" strokeOpacity=".2" />
    </svg>
  );
}
