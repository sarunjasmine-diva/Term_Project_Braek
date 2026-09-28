import React from 'react';

export const AcaiBowlIllustration: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => (
  <div className={`${className} rounded-full overflow-hidden shadow-inner ring-4 ring-purple-100/60`}>
    <svg className="w-full h-full object-cover" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      {/* Coconut/Ceramic Bowl */}
      <circle cx="80" cy="80" fill="#4a3728" r="76" />
      <circle cx="80" cy="80" fill="#5b2d56" r="72" />
      {/* Thick Purple Acai Base */}
      <circle cx="80" cy="80" fill="#4d1c52" r="69" />
      {/* Banana slices arc (top) */}
      <circle cx="60" cy="38" fill="#fff9c4" r="10" stroke="#e0c978" strokeWidth="1.5" />
      <circle cx="78" cy="34" fill="#fff9c4" r="10" stroke="#e0c978" strokeWidth="1.5" />
      <circle cx="96" cy="36" fill="#fff9c4" r="10" stroke="#e0c978" strokeWidth="1.5" />
      <circle cx="114" cy="42" fill="#fff9c4" r="10" stroke="#e0c978" strokeWidth="1.5" />
      {/* Blueberries cluster */}
      <circle cx="118" cy="62" fill="#1e2040" r="7" />
      <circle cx="128" cy="74" fill="#2d325e" r="6.5" />
      <circle cx="116" cy="78" fill="#1e2040" r="7" />
      <circle cx="106" cy="70" fill="#3b4175" r="6" />
      {/* Strawberries fan (center-left) */}
      <path d="M50,60 Q65,55 74,74 Q58,86 50,60 Z" fill="#e53935" />
      <path d="M68,68 Q83,62 92,80 Q76,92 68,68 Z" fill="#ef5350" />
      <path d="M38,70 Q54,68 58,88 Q42,94 38,70 Z" fill="#d32f2f" />
      {/* Granola & Chia cluster (bottom) */}
      <path d="M36,92 Q80,126 124,96 Q100,128 50,118 Z" fill="#cfa15f" />
      <circle cx="55" cy="100" fill="#ecd19d" r="3" />
      <circle cx="70" cy="108" fill="#a47738" r="4" />
      <circle cx="90" cy="106" fill="#edd6a8" r="3.5" />
      <circle cx="105" cy="98" fill="#885b24" r="3" />
      <circle cx="82" cy="115" fill="#f7e4be" r="2.5" />
      {/* Chia Seeds sprinkles */}
      <circle cx="75" cy="85" fill="#222" r="1" />
      <circle cx="85" cy="88" fill="#222" r="1" />
      <circle cx="80" cy="95" fill="#222" r="1" />
    </svg>
  </div>
);

export const BearApronIllustration: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => (
  <div className={`${className} flex items-center justify-center`}>
    <svg className="w-full h-full" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <circle cx="48" cy="38" fill="#ffffff" r="14" stroke="#ecd8e5" strokeWidth="2" />
      <circle cx="48" cy="38" fill="#fce4ec" r="7" />
      <circle cx="112" cy="38" fill="#ffffff" r="14" stroke="#ecd8e5" strokeWidth="2" />
      <circle cx="112" cy="38" fill="#fce4ec" r="7" />
      {/* Bear Head */}
      <ellipse cx="80" cy="56" fill="#ffffff" rx="42" ry="34" stroke="#ecd8e5" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="68" cy="52" fill="#222222" r="3.5" />
      <circle cx="69" cy="51" fill="#ffffff" r="1" />
      <circle cx="92" cy="52" fill="#222222" r="3.5" />
      <circle cx="93" cy="51" fill="#ffffff" r="1" />
      {/* Cheeks */}
      <circle cx="60" cy="58" fill="#ffb4be" opacity="0.6" r="4.5" />
      <circle cx="100" cy="58" fill="#ffb4be" opacity="0.6" r="4.5" />
      {/* Snout & Mouth */}
      <ellipse cx="80" cy="58" fill="#fff" rx="6" ry="4" />
      <ellipse cx="80" cy="56" fill="#523939" rx="2.5" ry="1.8" />
      <path d="M77,61 Q80,64 83,61" fill="none" stroke="#523939" strokeLinecap="round" strokeWidth="1.2" />
      {/* Lavender shirt sleeves */}
      <path d="M42,88 L34,106 Q38,114 48,110 L52,90 Z" fill="#b19ec8" />
      <path d="M118,88 L126,106 Q122,114 112,110 L108,90 Z" fill="#b19ec8" />
      {/* Paws */}
      <circle cx="36" cy="110" fill="#fff" r="6" stroke="#ebdce7" />
      <circle cx="124" cy="110" fill="#fff" r="6" stroke="#ebdce7" />
      {/* Pastel Green Apron Body */}
      <path d="M58,82 L102,82 L114,136 L46,136 Z" fill="#d9f3c7" stroke="#bedbaa" strokeWidth="1.5" />
      {/* Apron bib strap */}
      <path d="M64,74 L64,82 M96,74 L96,82" stroke="#b19ec8" strokeWidth="2.5" />
      {/* Apron Pocket (Yellow) */}
      <path d="M66,100 L94,100 Q94,124 80,124 Q66,124 66,100 Z" fill="#fef9c3" stroke="#f6e05e" strokeWidth="1" />
      {/* Text on apron */}
      <text fill="#666" fontFamily="system-ui, sans-serif" fontSize="5.5" textAnchor="middle" x="80" y="94">give me a</text>
      <text fill="#222" fontFamily="'DM Serif Display', Georgia, serif" fontSize="8.5" fontWeight="bold" textAnchor="middle" x="80" y="104">bræk.</text>
    </svg>
  </div>
);

export const BearCupIllustration: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => (
  <div className={`${className} flex items-center justify-center`}>
    <svg className="w-full h-full" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      {/* Mascot Head inside cup */}
      {/* Ears */}
      <circle cx="56" cy="46" fill="#ffffff" r="11" stroke="#ebdce7" strokeWidth="1.5" />
      <circle cx="56" cy="46" fill="#fce4ec" r="5" />
      <circle cx="104" cy="46" fill="#ffffff" r="11" stroke="#ebdce7" strokeWidth="1.5" />
      <circle cx="104" cy="46" fill="#fce4ec" r="5" />
      {/* Head */}
      <ellipse cx="80" cy="60" fill="#ffffff" rx="34" ry="26" stroke="#ebdce7" strokeWidth="1" />
      {/* Eyes */}
      <circle cx="70" cy="57" fill="#222222" r="3" />
      <circle cx="71" cy="56" fill="#ffffff" r="0.8" />
      <circle cx="90" cy="57" fill="#222222" r="3" />
      <circle cx="91" cy="56" fill="#ffffff" r="0.8" />
      {/* Cheeks */}
      <circle cx="63" cy="62" fill="#ffb4be" opacity="0.6" r="4" />
      <circle cx="97" cy="62" fill="#ffb4be" opacity="0.6" r="4" />
      {/* Snout & Mouth */}
      <ellipse cx="80" cy="61" fill="#523939" rx="2" ry="1.5" />
      <path d="M78,64 Q80,66 82,64" fill="none" stroke="#523939" strokeWidth="1" />
      {/* Cute Paws holding the cup rim */}
      <ellipse cx="58" cy="80" fill="#805b45" rx="7" ry="5.5" stroke="#fff" strokeWidth="1" />
      <circle cx="58" cy="80" fill="#fbcfe8" r="2.5" />
      <ellipse cx="102" cy="80" fill="#805b45" rx="7" ry="5.5" stroke="#fff" strokeWidth="1" />
      <circle cx="102" cy="80" fill="#fbcfe8" r="2.5" />
      {/* Yellow Branded Cup */}
      <polygon fill="#fef08a" points="46,80 114,80 106,144 54,144" stroke="#fce268" strokeWidth="1.5" />
      {/* Text on Cup */}
      <text fill="#666" fontFamily="system-ui, sans-serif" fontSize="5.5" textAnchor="middle" x="80" y="104">give me a</text>
      <text fill="#222" fontFamily="'DM Serif Display', Georgia, serif" fontSize="10.5" fontWeight="bold" textAnchor="middle" x="80" y="119">bræk.</text>
    </svg>
  </div>
);
