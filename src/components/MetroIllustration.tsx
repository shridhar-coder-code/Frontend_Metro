export function MetroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Track */}
      <rect x="20" y="260" width="460" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
      <rect x="20" y="264" width="460" height="2" rx="1" fill="rgba(255,255,255,0.08)" />

      {/* Sleepers */}
      {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440].map((x) => (
        <rect key={x} x={x} y="258" width="16" height="14" rx="2" fill="rgba(255,255,255,0.1)" />
      ))}

      {/* Metro Train Body */}
      <rect x="60" y="190" width="280" height="72" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Train Nose */}
      <path d="M340 196 Q370 196 375 220 Q375 242 340 258" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Green accent stripe */}
      <rect x="60" y="218" width="315" height="4" rx="2" fill="rgba(74,222,128,0.6)" />

      {/* Windows */}
      {[80, 130, 180, 230, 280].map((x) => (
        <rect key={x} x={x} y="200" width="36" height="28" rx="5" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      ))}

      {/* Train nose window */}
      <rect x="345" y="200" width="22" height="20" rx="4" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

      {/* Headlight */}
      <circle cx="372" cy="235" r="6" fill="rgba(253,224,71,0.8)" />
      <circle cx="372" cy="235" r="10" fill="rgba(253,224,71,0.15)" />

      {/* Wheels */}
      {[95, 155, 225, 295].map((x) => (
        <g key={x}>
          <circle cx={x} cy="264" r="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <circle cx={x} cy="264" r="5" fill="rgba(255,255,255,0.2)" />
        </g>
      ))}
      <circle cx="355" cy="264" r="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <circle cx="355" cy="264" r="5" fill="rgba(255,255,255,0.2)" />

      {/* Pantograph */}
      <line x1="160" y1="190" x2="150" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="200" y1="190" x2="210" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <line x1="140" y1="162" x2="220" y2="162" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

      {/* Overhead wire */}
      <line x1="20" y1="158" x2="480" y2="158" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Trees / greenery */}
      {[30, 430, 460].map((x, i) => (
        <g key={i}>
          <rect x={x + 8} y="230" width="6" height="34" rx="2" fill="rgba(34,197,94,0.3)" />
          <ellipse cx={x + 11} cy="220" rx="14" ry="18" fill="rgba(34,197,94,0.25)" />
          <ellipse cx={x + 11} cy="215" rx="10" ry="13" fill="rgba(74,222,128,0.2)" />
        </g>
      ))}

      {/* Leaf particles */}
      <circle cx="420" cy="180" r="3" fill="rgba(74,222,128,0.5)" />
      <circle cx="440" cy="160" r="2" fill="rgba(134,239,172,0.4)" />
      <circle cx="400" cy="170" r="2.5" fill="rgba(74,222,128,0.4)" />

      {/* CO2 reduction indicator */}
      <g transform="translate(390, 195)">
        <rect x="0" y="0" width="80" height="38" rx="8" fill="rgba(34,197,94,0.2)" stroke="rgba(74,222,128,0.4)" strokeWidth="1" />
        <text x="8" y="14" fill="rgba(74,222,128,0.9)" fontSize="8" fontWeight="bold" fontFamily="sans-serif">CO₂ Saved</text>
        <text x="8" y="30" fill="rgba(255,255,255,0.9)" fontSize="14" fontWeight="bold" fontFamily="sans-serif">2.4 kg</text>
      </g>

      {/* Station platform hint */}
      <rect x="390" y="240" width="90" height="22" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="390" y="260" width="90" height="6" rx="2" fill="rgba(255,255,255,0.05)" />

      {/* Stars/dots background */}
      {[[50,100],[100,80],[300,90],[380,120],[450,80],[480,140],[30,140],[250,70]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="rgba(255,255,255,0.3)" />
      ))}
    </svg>
  );
}
