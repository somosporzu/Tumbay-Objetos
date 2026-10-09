import { CardPalette, CardData, ItemCategory } from '../types/card';

export const FONT_OPTIONS = [
  { id: "'Cinzel', serif", name: 'Cinzel (Fantasía Épica / Pumba)' },
  { id: "'Cinzel Decorative', serif", name: 'Cinzel Decorative (Rúnica Ornamental)' },
  { id: "'MedievalSharp', cursive", name: 'MedievalSharp (Manuscrito Medieval)' },
  { id: "'Spectral', serif", name: 'Spectral (Editorial Elegante)' },
  { id: "'Outfit', sans-serif", name: 'Outfit (Moderno TCG / Limpio)' },
  { id: "Georgia, serif", name: 'Georgia Clásico' },
  { id: "system-ui, sans-serif", name: 'Sistema Sans-Serif' },
];

export const CATEGORY_INFO: Record<ItemCategory, { label: string; iconName: string }> = {
  arma: { label: 'Arma', iconName: 'sword' },
  armadura: { label: 'Armadura', iconName: 'shirt' },
  objeto: { label: 'Objeto (Caja)', iconName: 'package' },
  pocion: { label: 'Poción', iconName: 'flask' },
  pergamino: { label: 'Pergamino', iconName: 'scroll' },
  accesorio: { label: 'Accesorio (Collar)', iconName: 'sparkles' },
};

// Simplified, elegant palettes with Acero y Grafito as default
export const COLOR_PALETTES: CardPalette[] = [
  {
    id: 'acero-grafito',
    name: 'Grafito',
    borderColor: '#cbd5e1',
    accentColor: '#64748b',
    glowColor: 'rgba(203, 213, 225, 0.35)',
    textBoxBg: '#181e24',
    titleBannerBg: '#28313b', // Grafito metálico
    textTitleColor: '#ffffff',
    textColor: '#f8fafc',
    loreTextColor: '#cbd5e1',
    badgeBg: 'rgba(100, 116, 139, 0.3)',
    badgeTextColor: '#f8fafc',
    circleBg: '#181e24',
    starsColor: '#e2e8f0',
  },
  {
    id: 'papa-tumbay-oficial',
    name: 'Papa Tumbay',
    borderColor: '#ebd08c',
    accentColor: '#df356b',
    glowColor: 'rgba(223, 53, 107, 0.45)',
    textBoxBg: '#2c2e30',
    titleBannerBg: '#352518',
    textTitleColor: '#ffffff',
    textColor: '#f5f6f8',
    loreTextColor: '#ebd08c',
    badgeBg: 'rgba(223, 53, 107, 0.25)',
    badgeTextColor: '#ffffff',
    circleBg: '#2c2e30',
    starsColor: '#ebd08c',
  },
  {
    id: 'porzuu-rosa-ceniza',
    name: 'Rosa Porzuu',
    borderColor: '#c57375',
    accentColor: '#df356b',
    glowColor: 'rgba(197, 115, 117, 0.45)',
    textBoxBg: '#2c2e30',
    titleBannerBg: '#3c232c',
    textTitleColor: '#ffffff',
    textColor: '#f1f5f9',
    loreTextColor: '#ebd08c',
    badgeBg: 'rgba(197, 115, 117, 0.3)',
    badgeTextColor: '#ffffff',
    circleBg: '#2c2e30',
    starsColor: '#ffffff',
  },
  {
    id: 'verde-ruinas',
    name: 'Naturaleza',
    borderColor: '#34d399',
    accentColor: '#10b981',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    textBoxBg: '#13281e',
    titleBannerBg: '#0f3322',
    textTitleColor: '#ffffff',
    textColor: '#ecfdf5',
    loreTextColor: '#a7f3d0',
    badgeBg: 'rgba(52, 211, 153, 0.25)',
    badgeTextColor: '#ecfdf5',
    circleBg: '#11291d',
    starsColor: '#6ee7b7',
  },
  {
    id: 'fuego-volcanico',
    name: 'Magma',
    borderColor: '#f97316',
    accentColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    textBoxBg: '#26120e',
    titleBannerBg: '#45170d',
    textTitleColor: '#fff7ed',
    textColor: '#ffedd5',
    loreTextColor: '#fed7aa',
    badgeBg: 'rgba(249, 115, 22, 0.3)',
    badgeTextColor: '#fff7ed',
    circleBg: '#26120e',
    starsColor: '#fba94b',
  },
  {
    id: 'glaciar-escarcha',
    name: 'Glaciar',
    borderColor: '#38bdf8',
    accentColor: '#0284c7',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    textBoxBg: '#0b1d2e',
    titleBannerBg: '#0e2f47',
    textTitleColor: '#ffffff',
    textColor: '#f0f9ff',
    loreTextColor: '#bae6fd',
    badgeBg: 'rgba(56, 189, 248, 0.25)',
    badgeTextColor: '#f0f9ff',
    circleBg: '#0b1d2e',
    starsColor: '#7dd3fc',
  },
  {
    id: 'arcano-vacio',
    name: 'Arcano',
    borderColor: '#c084fc',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    textBoxBg: '#201233',
    titleBannerBg: '#341952',
    textTitleColor: '#faf5ff',
    textColor: '#f3e8ff',
    loreTextColor: '#e9d5ff',
    badgeBg: 'rgba(168, 85, 247, 0.3)',
    badgeTextColor: '#faf5ff',
    circleBg: '#201233',
    starsColor: '#d8b4fe',
  },
  {
    id: 'oro-imperial',
    name: 'Oro Imperial',
    borderColor: '#fbbf24',
    accentColor: '#d97706',
    glowColor: 'rgba(251, 191, 36, 0.45)',
    textBoxBg: '#2d2212',
    titleBannerBg: '#473216',
    textTitleColor: '#fffbeb',
    textColor: '#fef3c7',
    loreTextColor: '#fde68a',
    badgeBg: 'rgba(245, 158, 11, 0.3)',
    badgeTextColor: '#fffbeb',
    circleBg: '#2d2212',
    starsColor: '#fde047',
  },
  {
    id: 'sangre-onix',
    name: 'Carmesí',
    borderColor: '#f43f5e',
    accentColor: '#be123c',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    textBoxBg: '#260a12',
    titleBannerBg: '#4c0f20',
    textTitleColor: '#fff1f2',
    textColor: '#ffe4e6',
    loreTextColor: '#fecdd3',
    badgeBg: 'rgba(244, 63, 94, 0.3)',
    badgeTextColor: '#fff1f2',
    circleBg: '#260a12',
    starsColor: '#fda4af',
  },
  {
    id: 'cripta-jade',
    name: 'Cripta',
    borderColor: '#a7f3d0',
    accentColor: '#059669',
    glowColor: 'rgba(110, 231, 183, 0.4)',
    textBoxBg: '#0f2019',
    titleBannerBg: '#173629',
    textTitleColor: '#ecfdf5',
    textColor: '#d1fae5',
    loreTextColor: '#a7f3d0',
    badgeBg: 'rgba(5, 150, 105, 0.3)',
    badgeTextColor: '#ecfdf5',
    circleBg: '#0f2019',
    starsColor: '#6ee7b7',
  },
];

export interface SampleArtwork {
  id: string;
  title: string;
  category: ItemCategory;
  url: string;
}

export const SAMPLE_ARTWORKS: SampleArtwork[] = [
  {
    id: 'espada-ancestral',
    title: 'Cuchilla de las Estrellas',
    category: 'arma',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1050" width="750" height="1050">
        <defs>
          <linearGradient id="cosmic" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#141416"/>
            <stop offset="40%" stop-color="#2c2e30"/>
            <stop offset="70%" stop-color="#40202e"/>
            <stop offset="100%" stop-color="#18181b"/>
          </linearGradient>
          <radialGradient id="nebula" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#df356b" stop-opacity="0.8"/>
            <stop offset="40%" stop-color="#ebd08c" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#18181b" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="blade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#fdf2f8"/>
            <stop offset="48%" stop-color="#ffffff"/>
            <stop offset="52%" stop-color="#ebd08c"/>
            <stop offset="100%" stop-color="#df356b"/>
          </linearGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef3c7"/>
            <stop offset="50%" stop-color="#ebd08c"/>
            <stop offset="100%" stop-color="#c57375"/>
          </linearGradient>
        </defs>
        <rect width="750" height="1050" fill="url(#cosmic)"/>
        <circle cx="375" cy="420" r="300" fill="url(#nebula)"/>
        <circle cx="375" cy="420" r="230" fill="none" stroke="#df356b" stroke-width="2" opacity="0.4" stroke-dasharray="8 6"/>
        <circle cx="375" cy="420" r="180" fill="none" stroke="#ebd08c" stroke-width="3" opacity="0.5"/>
        <polygon points="375,120 395,490 355,490" fill="url(#blade)"/>
        <line x1="375" y1="140" x2="375" y2="470" stroke="#2c2e30" stroke-width="3" opacity="0.7"/>
        <path d="M 270,490 Q 375,515 480,490 L 465,520 Q 375,535 285,520 Z" fill="url(#gold)"/>
        <circle cx="375" cy="510" r="14" fill="#df356b"/>
        <circle cx="375" cy="510" r="8" fill="#ffffff"/>
        <rect x="365" y="525" width="20" height="90" rx="6" fill="#2c2e30"/>
        <line x1="365" y1="540" x2="385" y2="545" stroke="#ebd08c" stroke-width="3"/>
        <line x1="365" y1="560" x2="385" y2="565" stroke="#ebd08c" stroke-width="3"/>
        <line x1="365" y1="580" x2="385" y2="585" stroke="#ebd08c" stroke-width="3"/>
        <circle cx="375" cy="630" r="22" fill="url(#gold)"/>
        <circle cx="375" cy="630" r="10" fill="#df356b"/>
        <polygon points="375,80 382,105 407,112 382,119 375,144 368,119 343,112 368,105" fill="#ffffff"/>
      </svg>
    `)}`,
  },
  {
    id: 'escudo-guardian',
    title: 'Baluarte y Armadura de Acero',
    category: 'armadura',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1050" width="750" height="1050">
        <defs>
          <linearGradient id="forgeBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="50%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#090d16"/>
          </linearGradient>
          <radialGradient id="plateGlow" cx="50%" cy="45%" r="48%">
            <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.45"/>
            <stop offset="50%" stop-color="#475569" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="steelShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="45%" stop-color="#94a3b8"/>
            <stop offset="75%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>
        </defs>
        <rect width="750" height="1050" fill="url(#forgeBg)"/>
        <circle cx="375" cy="450" r="320" fill="url(#plateGlow)"/>
        <!-- Shield Silhouette -->
        <path d="M 210,240 L 540,240 L 530,480 C 510,650 375,760 375,760 C 375,760 240,650 220,480 Z" 
              fill="url(#steelShine)" stroke="#cbd5e1" stroke-width="8"/>
        <!-- Inner Border rim -->
        <path d="M 238,268 L 512,268 L 504,475 C 486,620 375,720 375,720 C 375,720 264,620 246,475 Z" 
              fill="none" stroke="#f8fafc" stroke-width="3" stroke-dasharray="8 6" opacity="0.75"/>
        <!-- Central Boss Crest -->
        <circle cx="375" cy="450" r="85" fill="#1e293b" stroke="#cbd5e1" stroke-width="6"/>
        <polygon points="375,395 395,435 440,450 395,465 375,505 355,465 310,450 355,435" fill="#f8fafc"/>
        <circle cx="375" cy="450" r="14" fill="#df356b"/>
        <!-- Rivets -->
        <circle cx="250" cy="280" r="6" fill="#f8fafc"/>
        <circle cx="500" cy="280" r="6" fill="#f8fafc"/>
        <circle cx="375" cy="275" r="7" fill="#f8fafc"/>
        <circle cx="235" cy="460" r="6" fill="#f8fafc"/>
        <circle cx="515" cy="460" r="6" fill="#f8fafc"/>
      </svg>
    `)}`,
  },
  {
    id: 'ruinas-solitarias',
    title: 'Ruinas y Cofre Misterioso',
    category: 'objeto',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1050" width="750" height="1050">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0f2b23"/>
            <stop offset="35%" stop-color="#1e4d3a"/>
            <stop offset="65%" stop-color="#2d6a4f"/>
            <stop offset="100%" stop-color="#0b1e16"/>
          </linearGradient>
          <radialGradient id="sun" cx="50%" cy="30%" r="45%">
            <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.9"/>
            <stop offset="35%" stop-color="#ebd08c" stop-opacity="0.5"/>
            <stop offset="70%" stop-color="#86efac" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#0f2b23" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="stone" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#e2e8f0"/>
            <stop offset="50%" stop-color="#94a3b8"/>
            <stop offset="100%" stop-color="#475569"/>
          </linearGradient>
          <linearGradient id="moss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4ade80"/>
            <stop offset="100%" stop-color="#15803d"/>
          </linearGradient>
        </defs>
        <rect width="750" height="1050" fill="url(#sky)"/>
        <circle cx="380" cy="300" r="320" fill="url(#sun)"/>
        <polygon points="260,180 470,140 470,620 260,660" fill="url(#stone)" opacity="0.85"/>
        <polygon points="280,190 320,180 320,640 280,650" fill="#f8fafc" opacity="0.5"/>
        <polygon points="410,150 450,145 450,625 410,630" fill="#334155" opacity="0.6"/>
        <path d="M 230,220 Q 280,260 270,360 T 320,520 Q 360,600 390,700" stroke="#166534" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M 450,160 Q 420,240 430,340 T 400,500" stroke="#14532d" stroke-width="12" fill="none" stroke-linecap="round"/>
        <ellipse cx="230" cy="270" rx="45" ry="75" fill="url(#moss)" transform="rotate(-25 230 270)"/>
        <ellipse cx="270" cy="230" rx="40" ry="65" fill="#86efac" transform="rotate(20 270 230)"/>
        <ellipse cx="320" cy="320" rx="55" ry="85" fill="#22c55e" transform="rotate(35 320 320)"/>
        <ellipse cx="200" cy="380" rx="60" ry="90" fill="#15803d" transform="rotate(-40 200 380)"/>
        <ellipse cx="500" cy="240" rx="50" ry="80" fill="#4ade80" transform="rotate(30 500 240)"/>
        <ellipse cx="480" cy="330" rx="65" ry="95" fill="#16a34a" transform="rotate(-15 480 330)"/>
        <ellipse cx="530" cy="420" rx="55" ry="85" fill="#15803d" transform="rotate(45 530 420)"/>
        <!-- Chest Relic on plinth -->
        <rect x="300" y="520" width="150" height="90" rx="8" fill="#1e293b" stroke="#ebd08c" stroke-width="5"/>
        <rect x="315" y="530" width="120" height="12" rx="3" fill="#ebd08c"/>
        <circle cx="375" cy="565" r="10" fill="#df356b" stroke="#ebd08c" stroke-width="3"/>
        <circle cx="280" cy="280" r="5" fill="#fff" opacity="0.8"/>
        <circle cx="340" cy="230" r="7" fill="#ebd08c" opacity="0.9"/>
        <circle cx="430" cy="290" r="6" fill="#fff" opacity="0.8"/>
        <circle cx="380" cy="380" r="9" fill="#fff" opacity="0.9"/>
      </svg>
    `)}`,
  },
  {
    id: 'pocion-niebla',
    title: 'Poción de Niebla Lunar',
    category: 'pocion',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1050" width="750" height="1050">
        <defs>
          <linearGradient id="cave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#141416"/>
            <stop offset="50%" stop-color="#2c2e30"/>
            <stop offset="100%" stop-color="#18241e"/>
          </linearGradient>
          <radialGradient id="liquid" cx="45%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ebd08c"/>
            <stop offset="45%" stop-color="#df356b"/>
            <stop offset="90%" stop-color="#c57375"/>
            <stop offset="100%" stop-color="#2c2e30"/>
          </radialGradient>
          <radialGradient id="flaskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#df356b" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#ebd08c" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#141416" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="750" height="1050" fill="url(#cave)"/>
        <circle cx="375" cy="460" r="280" fill="url(#flaskGlow)"/>
        <path d="M 335,260 L 415,260 L 415,330 C 490,400 520,530 460,610 C 410,670 340,670 290,610 C 230,530 260,400 335,330 Z" 
              fill="rgba(44, 46, 48, 0.4)" stroke="#ebd08c" stroke-width="8"/>
        <path d="M 285,470 Q 375,440 465,470 C 500,540 460,620 410,650 C 340,660 290,620 285,470 Z" 
              fill="url(#liquid)"/>
        <circle cx="350" cy="540" r="14" fill="#ffffff" opacity="0.7"/>
        <circle cx="410" cy="580" r="9" fill="#ebd08c" opacity="0.6"/>
        <circle cx="330" cy="610" r="18" fill="#df356b" opacity="0.5"/>
        <circle cx="400" cy="510" r="12" fill="#ffffff" opacity="0.8"/>
        <polygon points="340,220 410,220 405,260 345,260" fill="#c57375" stroke="#2c2e30" stroke-width="4"/>
        <path d="M 345,290 Q 375,305 405,290" stroke="#ebd08c" stroke-width="6" fill="none"/>
      </svg>
    `)}`,
  },
  {
    id: 'pergamino-arcano',
    title: 'Pergamino de la Alta Runa',
    category: 'pergamino',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1050" width="750" height="1050">
        <defs>
          <linearGradient id="archiveBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1a1024"/>
            <stop offset="50%" stop-color="#2d1b3f"/>
            <stop offset="100%" stop-color="#0f0917"/>
          </linearGradient>
          <radialGradient id="runeGlow" cx="50%" cy="45%" r="48%">
            <stop offset="0%" stop-color="#c084fc" stop-opacity="0.6"/>
            <stop offset="45%" stop-color="#9333ea" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#1a1024" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="parchment" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef3c7"/>
            <stop offset="50%" stop-color="#fde68a"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
        </defs>
        <rect width="750" height="1050" fill="url(#archiveBg)"/>
        <circle cx="375" cy="450" r="300" fill="url(#runeGlow)"/>
        <!-- Scroll Body -->
        <rect x="220" y="240" width="310" height="460" rx="12" fill="url(#parchment)" stroke="#92400e" stroke-width="6"/>
        <!-- Rolled rods top and bottom -->
        <rect x="190" y="220" width="370" height="28" rx="10" fill="#78350f" stroke="#ebd08c" stroke-width="3"/>
        <rect x="190" y="690" width="370" height="28" rx="10" fill="#78350f" stroke="#ebd08c" stroke-width="3"/>
        <!-- Glowing Runic Seal in center -->
        <circle cx="375" cy="470" r="75" fill="#4c1d95" stroke="#e9d5ff" stroke-width="5"/>
        <circle cx="375" cy="470" r="60" fill="none" stroke="#c084fc" stroke-width="2" stroke-dasharray="6 4"/>
        <polygon points="375,415 390,455 435,470 390,485 375,525 360,485 315,470 360,455" fill="#fbbf24"/>
        <circle cx="375" cy="470" r="12" fill="#ffffff"/>
        <!-- Runes and lines -->
        <line x1="260" y1="290" x2="490" y2="290" stroke="#78350f" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        <line x1="260" y1="320" x2="470" y2="320" stroke="#78350f" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        <line x1="260" y1="620" x2="490" y2="620" stroke="#78350f" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        <line x1="280" y1="650" x2="470" y2="650" stroke="#78350f" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
      </svg>
    `)}`,
  },
  {
    id: 'amuleto-astral',
    title: 'Amuleto y Joya de las Estrellas',
    category: 'accesorio',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1050" width="750" height="1050">
        <defs>
          <linearGradient id="vault" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#17171c"/>
            <stop offset="45%" stop-color="#241429"/>
            <stop offset="100%" stop-color="#0a0a0f"/>
          </linearGradient>
          <radialGradient id="jewelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
            <stop offset="40%" stop-color="#df356b" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#17171c" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="goldChain" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="50%" stop-color="#eab308"/>
            <stop offset="100%" stop-color="#a16207"/>
          </linearGradient>
        </defs>
        <rect width="750" height="1050" fill="url(#vault)"/>
        <circle cx="375" cy="500" r="300" fill="url(#jewelGlow)"/>
        <!-- Draped Golden Necklace Chain -->
        <path d="M 180,180 C 210,380 320,490 375,500 C 430,490 540,380 570,180" 
              fill="none" stroke="url(#goldChain)" stroke-width="12" stroke-linecap="round"/>
        <path d="M 180,180 C 210,380 320,490 375,500 C 430,490 540,380 570,180" 
              fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="6 8" opacity="0.9"/>
        <!-- Central Medallion Frame -->
        <circle cx="375" cy="530" r="95" fill="#1e1e24" stroke="url(#goldChain)" stroke-width="10"/>
        <circle cx="375" cy="530" r="82" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="5 5" opacity="0.8"/>
        <!-- Faceted Blue Diamond Gem -->
        <polygon points="375,465 435,530 375,595 315,530" fill="#38bdf8" stroke="#ffffff" stroke-width="3"/>
        <polygon points="375,485 415,530 375,575 335,530" fill="#0284c7"/>
        <circle cx="375" cy="530" r="16" fill="#ffffff" opacity="0.9"/>
        <!-- Radiant Star Sparks -->
        <polygon points="375,410 380,430 400,435 380,440 375,460 370,440 350,435 370,430" fill="#ffffff"/>
      </svg>
    `)}`,
  },
];

export const INITIAL_CARD_DATA: CardData = {
  id: 'card-default-1',
  name: 'Forgotten Ruins',
  category: 'objeto',
  rarityStars: 4,
  
  // Title (Ornamental by default)
  title: 'Forgotten Ruins',
  titleFont: "'Cinzel', serif",
  titleSize: 38,
  titleAlign: 'left',
  titleOffsetY: 0,
  titleBannerStyle: 'pumba',
  
  // Description / Rules (Clear, easy-to-read Georgia Clásico as requested)
  description: 'He wanders where history serves no memory. When resting, he restores warmth to places that are long forgotten and leaves it brighter than he found it.',
  descriptionFont: "Georgia, serif",
  descriptionSize: 24,
  
  // Flavor / Lore (Spectral / Ornamental)
  lore: 'He is calm, fatherly and has a habit of wandering off into ruins, and investigating the arcane and forgotten.',
  loreFont: "'Spectral', serif",
  loreSize: 20,
  
  // Footer
  systemLabel: 'Sistema PAPA TUMBAY',
  illustratorName: '',
  authorName: 'Porzu',
  
  // Image adjustments
  imageUrl: SAMPLE_ARTWORKS[2].url, // Ruinas y Cofre Misterioso
  imageScale: 1.0,
  imageOffsetX: 0,
  imageOffsetY: 0,
  imageRotate: 0,
  imageBrightness: 100,
  imageContrast: 100,
  imageSaturation: 100,
  imageWidth: 750,
  imageHeight: 1050,
  imageAspectRatio: 750 / 1050,
  imageFit: 'cover',
  
  // Layout Options
  autoAdjustText: true,
  textBoxHeightBonus: 0,
  circlePosY: 93, // Fixed at 93px
  rightCrossSize: 22.2,
  showRarityBorder: false,
  showOrnamentTopLeft: false,
  topLeftOrnamentType: 'none',
  topLeftNumberValue: '8',
  showHorizontalStars: false,
  showDividerFlourish: true, // Maintain ornamental divider always
  
  // Palette (Acero / Grafito default)
  palette: COLOR_PALETTES[0],
  
  customLayers: [],
};
