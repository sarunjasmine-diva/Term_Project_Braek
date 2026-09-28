import React from 'react';

interface BowlVisualizerProps {
  base: string;
  granola: string;
  fruits: string[];
  superfoods: string[];
  drizzle: string;
  size: 'Regular' | 'Large' | 'Superbraek';
}

export const BowlVisualizer: React.FC<BowlVisualizerProps> = ({
  base,
  granola,
  fruits,
  superfoods,
  drizzle,
  size,
}) => {
  // Determine base color
  let baseColor = '#4d1c52'; // default dark açai
  let baseSecondaryColor = '#3a133e';
  if (base.toLowerCase().includes('pitaya') || base.toLowerCase().includes('pink')) {
    baseColor = '#9d174d';
    baseSecondaryColor = '#831843';
  } else if (base.toLowerCase().includes('matcha')) {
    baseColor = '#1e3a1e';
    baseSecondaryColor = '#142914';
  }

  // Determine drizzle color
  let drizzleStroke = '#d97706'; // default speculoos / cookie butter
  if (drizzle.toLowerCase().includes('chocolate') || drizzle.toLowerCase().includes('cocoa')) {
    drizzleStroke = '#381e11';
  } else if (drizzle.toLowerCase().includes('almond') || drizzle.toLowerCase().includes('peanut')) {
    drizzleStroke = '#c48943';
  } else if (drizzle.toLowerCase().includes('honey')) {
    drizzleStroke = '#fbbf24';
  }

  const hasBanana = fruits.some((f) => f.toLowerCase().includes('banana'));
  const hasStrawberry = fruits.some((f) => f.toLowerCase().includes('strawberr'));
  const hasBlueberry = fruits.some((f) => f.toLowerCase().includes('blueberr'));
  const hasMango = fruits.some((f) => f.toLowerCase().includes('mango'));
  const hasKiwi = fruits.some((f) => f.toLowerCase().includes('kiwi'));
  const hasPassionfruit = fruits.some((f) => f.toLowerCase().includes('passion'));

  const hasChia = superfoods.some((s) => s.toLowerCase().includes('chia'));
  const hasCacao = superfoods.some((s) => s.toLowerCase().includes('cacao'));
  const hasAlmond = superfoods.some((s) => s.toLowerCase().includes('almond'));
  const hasCoconut = superfoods.some((s) => s.toLowerCase().includes('coconut'));
  const hasGoji = superfoods.some((s) => s.toLowerCase().includes('goji'));

  const hasGranola = !granola.toLowerCase().includes('no granola');
  const isCocoaGranola = granola.toLowerCase().includes('cocoa') || granola.toLowerCase().includes('chocolate');

  return (
    <div className="relative w-full max-w-[340px] aspect-square mx-auto flex items-center justify-center p-2 select-none">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Bowl outer drop shadow / rim */}
          <radialGradient id="bowlGradient" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#4a3728" />
            <stop offset="95%" stopColor="#302217" />
            <stop offset="100%" stopColor="#1a110a" />
          </radialGradient>

          {/* Acai Base Gradient */}
          <radialGradient id="acaiGradient" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor={baseColor} />
            <stop offset="100%" stopColor={baseSecondaryColor} />
          </radialGradient>

          {/* Strawberry texture pattern */}
          <pattern id="seedPattern" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="#fef08a" opacity="0.8" />
          </pattern>
        </defs>

        {/* 1. Coconut/Ceramic Outer Bowl */}
        <circle cx="100" cy="100" r="96" fill="url(#bowlGradient)" />
        <circle cx="100" cy="100" r="92" fill="#584030" stroke="#3d2c1e" strokeWidth="2" />
        <circle cx="100" cy="100" r="88" fill="#694e3b" opacity="0.5" />

        {/* 2. Açai / Smoothie Base */}
        <circle cx="100" cy="100" r="86" fill="url(#acaiGradient)" />

        {/* Swirl texture if pitaya or matcha */}
        {base.toLowerCase().includes('swirl') && (
          <path
            d="M 60,100 C 60,70 140,70 140,100 C 140,130 70,130 80,105"
            fill="none"
            stroke="#be185d"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.8"
          />
        )}
        {base.toLowerCase().includes('matcha') && (
          <path
            d="M 50,80 Q 100,50 150,90 Q 130,140 70,130 Z"
            fill="#2d5a27"
            opacity="0.65"
          />
        )}

        {/* 3. Granola Layer (bottom crescent) */}
        {hasGranola && (
          <g id="granola-layer" className="transition-opacity duration-300">
            <path
              d="M 35,115 Q 100,165 165,115 Q 140,165 60,155 Z"
              fill={isCocoaGranola ? '#543d2b' : '#cfa15f'}
            />
            {/* Granola crunchy clusters */}
            <circle cx="60" cy="125" r="4.5" fill={isCocoaGranola ? '#3e2c1e' : '#ecd19d'} />
            <circle cx="80" cy="136" r="5" fill={isCocoaGranola ? '#6f4e37' : '#a47738'} />
            <circle cx="100" cy="140" r="4" fill={isCocoaGranola ? '#3e2c1e' : '#e6c88f'} />
            <circle cx="120" cy="135" r="5.5" fill={isCocoaGranola ? '#5d4037' : '#d2a663'} />
            <circle cx="140" cy="122" r="4.5" fill={isCocoaGranola ? '#3e2c1e' : '#ecd19d'} />
            <circle cx="70" cy="138" r="3.5" fill={isCocoaGranola ? '#795548' : '#885b24'} />
            <circle cx="110" cy="142" r="3.5" fill={isCocoaGranola ? '#6d4c41' : '#f7e4be'} />
            <circle cx="130" cy="130" r="3" fill={isCocoaGranola ? '#4e342e' : '#b8863f'} />
          </g>
        )}

        {/* 4. Banana Slices (top-right arc) */}
        {hasBanana && (
          <g id="banana-slices" className="transition-all duration-300">
            {/* Slice 1 */}
            <circle cx="70" cy="48" r="12" fill="#fff9c4" stroke="#e0c978" strokeWidth="1.8" />
            <circle cx="70" cy="48" r="3" fill="#ecd879" opacity="0.6" />
            <circle cx="69" cy="47" r="0.8" fill="#8d6e63" />
            <circle cx="71" cy="49" r="0.8" fill="#8d6e63" />

            {/* Slice 2 */}
            <circle cx="94" cy="42" r="12" fill="#fff9c4" stroke="#e0c978" strokeWidth="1.8" />
            <circle cx="94" cy="42" r="3" fill="#ecd879" opacity="0.6" />
            <circle cx="93" cy="41" r="0.8" fill="#8d6e63" />
            <circle cx="95" cy="43" r="0.8" fill="#8d6e63" />

            {/* Slice 3 */}
            <circle cx="118" cy="45" r="12" fill="#fff9c4" stroke="#e0c978" strokeWidth="1.8" />
            <circle cx="118" cy="45" r="3" fill="#ecd879" opacity="0.6" />
            <circle cx="117" cy="44" r="0.8" fill="#8d6e63" />
            <circle cx="119" cy="46" r="0.8" fill="#8d6e63" />

            {/* Slice 4 */}
            <circle cx="140" cy="55" r="11" fill="#fff9c4" stroke="#e0c978" strokeWidth="1.8" />
            <circle cx="140" cy="55" r="2.8" fill="#ecd879" opacity="0.6" />
          </g>
        )}

        {/* 5. Strawberries (left fan) */}
        {hasStrawberry && (
          <g id="strawberry-slices" className="transition-all duration-300">
            <path
              d="M 45,75 Q 65,68 76,90 Q 56,105 45,75 Z"
              fill="#e53935"
              stroke="#b71c1c"
              strokeWidth="1.2"
            />
            <path
              d="M 50,78 Q 63,73 70,88 Q 57,98 50,78 Z"
              fill="#ef5350"
            />
            {/* Seeds */}
            <circle cx="58" cy="84" r="0.8" fill="#fff9c4" />
            <circle cx="62" cy="87" r="0.8" fill="#fff9c4" />
            <circle cx="56" cy="90" r="0.8" fill="#fff9c4" />

            <path
              d="M 68,85 Q 88,78 96,102 Q 76,115 68,85 Z"
              fill="#d32f2f"
              stroke="#b71c1c"
              strokeWidth="1.2"
            />
            <path
              d="M 72,88 Q 85,82 91,100 Q 77,108 72,88 Z"
              fill="#ef5350"
            />
            <circle cx="78" cy="94" r="0.8" fill="#fff9c4" />
            <circle cx="82" cy="98" r="0.8" fill="#fff9c4" />

            <path
              d="M 32,88 Q 50,85 55,108 Q 36,116 32,88 Z"
              fill="#c62828"
            />
          </g>
        )}

        {/* 6. Blueberries (cluster top-right & center) */}
        {hasBlueberry && (
          <g id="blueberries-cluster" className="transition-all duration-300">
            <circle cx="145" cy="80" r="8" fill="#1e2040" stroke="#121324" strokeWidth="1" />
            <circle cx="143" cy="78" r="2.5" fill="#3b4175" />
            <path d="M 143,77 L 145,79 M 145,77 L 143,79" stroke="#1e2040" strokeWidth="0.8" />

            <circle cx="156" cy="94" r="7.5" fill="#2d325e" stroke="#121324" strokeWidth="1" />
            <circle cx="154" cy="92" r="2.2" fill="#4d5594" />

            <circle cx="140" cy="98" r="8.5" fill="#1e2040" stroke="#121324" strokeWidth="1" />
            <circle cx="138" cy="96" r="2.8" fill="#3b4175" />

            <circle cx="125" cy="88" r="8" fill="#2a2e58" stroke="#121324" strokeWidth="1" />
            <circle cx="123" cy="86" r="2.4" fill="#464d85" />
          </g>
        )}

        {/* 7. Mango Cubes */}
        {hasMango && (
          <g id="mango-cubes" className="transition-all duration-300">
            <rect x="92" y="65" width="13" height="13" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1" transform="rotate(15 98 71)" />
            <rect x="110" y="66" width="12" height="12" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" transform="rotate(-10 116 72)" />
            <rect x="100" y="80" width="13" height="13" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1" transform="rotate(25 106 86)" />
          </g>
        )}

        {/* 8. Kiwi Slices */}
        {hasKiwi && (
          <g id="kiwi-slices" className="transition-all duration-300">
            <circle cx="48" cy="60" r="11" fill="#84cc16" stroke="#65a30d" strokeWidth="1" />
            <circle cx="48" cy="60" r="3.5" fill="#f7fee7" />
            {/* Kiwi black seeds ring */}
            <circle cx="45" cy="58" r="0.6" fill="#1e293b" />
            <circle cx="51" cy="58" r="0.6" fill="#1e293b" />
            <circle cx="45" cy="62" r="0.6" fill="#1e293b" />
            <circle cx="51" cy="62" r="0.6" fill="#1e293b" />
            <circle cx="48" cy="56" r="0.6" fill="#1e293b" />
            <circle cx="48" cy="64" r="0.6" fill="#1e293b" />
          </g>
        )}

        {/* 9. Passionfruit */}
        {hasPassionfruit && (
          <g id="passionfruit-pulp" className="transition-all duration-300">
            <ellipse cx="120" cy="110" rx="14" ry="9" fill="#fef08a" opacity="0.85" />
            <circle cx="114" cy="108" r="1.5" fill="#3f2e18" />
            <circle cx="122" cy="111" r="1.8" fill="#3f2e18" />
            <circle cx="126" cy="107" r="1.4" fill="#3f2e18" />
            <circle cx="118" cy="113" r="1.6" fill="#3f2e18" />
          </g>
        )}

        {/* 10. Superfoods: Cacao Nibs, Chia, Goji, Coconut, Almonds */}
        {hasChia && (
          <g id="chia-seeds" opacity="0.85">
            <circle cx="85" cy="75" r="1" fill="#18181b" />
            <circle cx="92" cy="78" r="0.9" fill="#18181b" />
            <circle cx="88" cy="85" r="1" fill="#18181b" />
            <circle cx="75" cy="80" r="0.9" fill="#18181b" />
            <circle cx="105" cy="95" r="1" fill="#18181b" />
            <circle cx="115" cy="82" r="0.9" fill="#18181b" />
            <circle cx="78" cy="110" r="1" fill="#18181b" />
            <circle cx="86" cy="118" r="0.9" fill="#18181b" />
          </g>
        )}

        {hasCacao && (
          <g id="cacao-nibs">
            <rect x="76" y="92" width="3.5" height="2.5" rx="0.5" fill="#381e11" transform="rotate(20 76 92)" />
            <rect x="88" y="100" width="4" height="3" rx="0.5" fill="#2b160c" transform="rotate(-35 88 100)" />
            <rect x="104" y="90" width="3.5" height="2" rx="0.5" fill="#381e11" transform="rotate(40 104 90)" />
            <rect x="96" y="112" width="4" height="2.5" rx="0.5" fill="#2b160c" transform="rotate(15 96 112)" />
          </g>
        )}

        {hasGoji && (
          <g id="goji-berries">
            <ellipse cx="65" cy="70" rx="3.5" ry="1.8" fill="#b91c1c" transform="rotate(30 65 70)" />
            <ellipse cx="112" cy="78" rx="4" ry="2" fill="#dc2626" transform="rotate(-25 112 78)" />
            <ellipse cx="132" cy="105" rx="3.5" ry="1.8" fill="#b91c1c" transform="rotate(45 132 105)" />
          </g>
        )}

        {hasAlmond && (
          <g id="almond-flakes">
            <ellipse cx="82" cy="62" rx="5" ry="2.5" fill="#fde68a" stroke="#d97706" strokeWidth="0.6" transform="rotate(40 82 62)" />
            <ellipse cx="128" cy="68" rx="5.5" ry="2.6" fill="#fde68a" stroke="#d97706" strokeWidth="0.6" transform="rotate(-30 128 68)" />
            <ellipse cx="94" cy="106" rx="5" ry="2.4" fill="#fde68a" stroke="#d97706" strokeWidth="0.6" transform="rotate(65 94 106)" />
          </g>
        )}

        {hasCoconut && (
          <g id="coconut-flakes">
            <path d="M 52,102 Q 62,98 68,105" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 125,95 Q 135,92 142,99" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 90,122 Q 102,118 108,126" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* 11. Signature Drizzle Swirl */}
        {drizzle && !drizzle.toLowerCase().includes('no drizzle') && (
          <g id="drizzle-swirl" className="transition-all duration-300">
            <path
              d="M 55,70 Q 75,95 95,75 T 135,80 T 150,110"
              fill="none"
              stroke={drizzleStroke}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
            <path
              d="M 45,95 Q 75,120 105,100 T 145,115"
              fill="none"
              stroke={drizzleStroke}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </g>
        )}

        {/* Subtle glass reflection on the bowl edge */}
        <path
          d="M 35,60 A 88 88 0 0 1 100,14"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>

      {/* Floating Badge for Current Size & Ingredient Tally */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full shadow-md border border-purple-100 flex items-center space-x-2 text-[11px] whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
        <span className="font-bold text-gray-900">{size} Bowl</span>
        <span className="text-gray-400">•</span>
        <span className="text-purple-800 font-semibold">
          {fruits.length + superfoods.length + (hasGranola ? 1 : 0) + (drizzle ? 1 : 0)} toppings active
        </span>
      </div>
    </div>
  );
};
