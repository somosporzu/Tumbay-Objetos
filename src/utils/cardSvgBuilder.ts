import { CardData, ItemCategory } from '../types/card';

// High-detail, elegant fantasy RPG iconography for the upper-right circle
export function getCategoryIconSvg(category: ItemCategory, color: string): string {
  switch (category) {
    case 'arma':
      // Refined fantasy claymore / runic broadsword with bevels, quillons, and pommel
      return `
        <g fill="${color}">
          <!-- Double-edged blade silhouette -->
          <polygon points="20,2 24.5,9 23,26 17,26 15.5,9" />
          <!-- Blade central fuller groove & bevel reflection -->
          <polygon points="20,4 20.8,9 20.5,24 20,25" fill="#ffffff" opacity="0.6"/>
          <!-- Runic notches on blade -->
          <line x1="18.5" y1="13" x2="21.5" y2="13" stroke="#ffffff" stroke-width="0.8" opacity="0.8"/>
          <line x1="18.5" y1="18" x2="21.5" y2="18" stroke="#ffffff" stroke-width="0.8" opacity="0.8"/>
          <!-- Ornate flared crossguard with curved finials -->
          <path d="M 8,26.5 C 13,24.5 17,26 20,25.5 C 23,26 27,24.5 32,26.5 L 32.5,29 C 27,27.5 23,28 20,27.5 C 17,28 13,27.5 7.5,29 Z" />
          <circle cx="8.5" cy="27.5" r="1.6" fill="#ffffff" opacity="0.8"/>
          <circle cx="31.5" cy="27.5" r="1.6" fill="#ffffff" opacity="0.8"/>
          <!-- Central crossguard jewel -->
          <circle cx="20" cy="27" r="1.8" fill="#ffffff"/>
          <!-- Wire-wrapped grip -->
          <rect x="18.6" y="29" width="2.8" height="6.5" rx="0.6" />
          <line x1="18.6" y1="31" x2="21.4" y2="31" stroke="#ffffff" stroke-width="0.6" opacity="0.6"/>
          <line x1="18.6" y1="33" x2="21.4" y2="33" stroke="#ffffff" stroke-width="0.6" opacity="0.6"/>
          <!-- Faceted pommel -->
          <polygon points="20,35.5 22.8,37.5 20,39.5 17.2,37.5" />
          <circle cx="20" cy="37.5" r="0.9" fill="#ffffff"/>
        </g>
      `;

    case 'armadura':
      // Knight's Plate Armor Cuirass / Breastplate with spaulders, gorget collar, and faulds
      return `
        <g fill="${color}">
          <!-- Spaulders / Shoulders -->
          <!-- Left pauldron -->
          <path d="M 13,8 C 8,8 4,12 5,17 C 5,20 8,22 11,21 L 13,15 Z" />
          <circle cx="8" cy="14" r="0.8" fill="#ffffff"/>
          <circle cx="9" cy="18" r="0.8" fill="#ffffff"/>
          <!-- Right pauldron -->
          <path d="M 27,8 C 32,8 36,12 35,17 C 35,20 32,22 29,21 L 27,15 Z" />
          <circle cx="32" cy="14" r="0.8" fill="#ffffff"/>
          <circle cx="31" cy="18" r="0.8" fill="#ffffff"/>

          <!-- Neck Gorget collar -->
          <path d="M 14,6 C 17,9 23,9 26,6 L 27,10 C 23,12 17,12 13,10 Z" />
          <circle cx="20" cy="8.5" r="1.1" fill="#ffffff"/>

          <!-- Main Cuirass Breastplate -->
          <path d="M 12,11 L 28,11 L 30,22 C 30,28 26,32 20,33 C 14,32 10,28 10,22 Z" />
          
          <!-- Breastplate central crest ridge -->
          <line x1="20" y1="12" x2="20" y2="32" stroke="#ffffff" stroke-width="1.3" opacity="0.9"/>
          <!-- Pectoral sculpted lines -->
          <path d="M 13,18 Q 16.5,22 20,22 Q 23.5,22 27,18" fill="none" stroke="#ffffff" stroke-width="1.1" opacity="0.75"/>
          <path d="M 14,24 Q 17,27 20,27 Q 23,27 26,24" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.6"/>

          <!-- Waist belt & fauld / tassets plates -->
          <path d="M 12,32 H 28 L 29,38 C 26,40 22,40.5 20,40.5 C 18,40.5 14,40 11,38 Z" />
          <rect x="18" y="32" width="4" height="3" rx="0.6" fill="#ffffff" opacity="0.9"/>
          <line x1="16" y1="36" x2="16" y2="39" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
          <line x1="24" y1="36" x2="24" y2="39" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
        </g>
      `;

    case 'pocion':
      // Alchemical flask with bubbling brew, effervescence, and cork with cord
      return `
        <g fill="${color}">
          <!-- Flask glass body -->
          <path d="M 16,5 H 24 V 8.5 L 22.5,11.5 L 32.5,26.5 C 35.5,31.5 31.5,37.5 25,37.5 H 15 C 8.5,37.5 4.5,31.5 7.5,26.5 L 17.5,11.5 L 16,8.5 Z" />
          <!-- Cork stopper -->
          <polygon points="17,1.5 23,1.5 22.5,5 17.5,5" fill="${color}"/>
          <!-- Cord tied around flask neck -->
          <rect x="15.5" y="8" width="9" height="1.8" rx="0.5" fill="#ffffff" opacity="0.85"/>
          <!-- Internal liquid fill with curved meniscus -->
          <path d="M 11,24 Q 20,21 29,24 C 31,28 28.5,34 24,35 H 16 C 11.5,34 9,28 11,24 Z" fill="#ffffff" opacity="0.3"/>
          <!-- Bubbles rising -->
          <circle cx="16" cy="30" r="2.2" fill="#ffffff" opacity="0.95"/>
          <circle cx="23" cy="27" r="2.8" fill="#ffffff" opacity="0.95"/>
          <circle cx="19.5" cy="33" r="1.5" fill="#ffffff" opacity="0.9"/>
          <circle cx="19" cy="19" r="1.2" fill="#ffffff" opacity="0.8"/>
          <circle cx="21" cy="14" r="0.9" fill="#ffffff" opacity="0.8"/>
          <!-- Glass highlight gleam on left -->
          <path d="M 9.5,26 C 7.5,29 10,34 14,35" stroke="#ffffff" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.75"/>
        </g>
      `;

    case 'pergamino':
      // Rolled ancient parchment with seal ribbon and runic script
      return `
        <g fill="${color}">
          <!-- Top cylinder roll -->
          <ellipse cx="13" cy="7" rx="8" ry="3.5" />
          <ellipse cx="27" cy="7" rx="5" ry="3" />
          <!-- Unfurled scroll body -->
          <path d="M 5.5,7 C 5.5,7 18,9 29.5,6 L 33.5,28 C 24,31.5 11,28.5 11,28.5 L 5.5,7 Z" />
          <!-- Bottom cylinder roll -->
          <ellipse cx="20.5" cy="30.5" rx="9.5" ry="3.8" />
          <ellipse cx="32.5" cy="30" rx="4.5" ry="2.8" />
          <!-- Hanging wax seal ribbon at bottom -->
          <path d="M 23,31 L 21,37 L 24,36 L 27,37 L 25,31 Z" fill="#ffffff" opacity="0.9"/>
          <circle cx="24" cy="33.5" r="1.8" fill="${color}"/>
          <!-- Magic glyph writing lines in parchment (negative space) -->
          <line x1="11" y1="13" x2="26" y2="13" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.85"/>
          <line x1="11" y1="18" x2="28" y2="18" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.85"/>
          <line x1="13" y1="23" x2="23" y2="23" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.85"/>
        </g>
      `;

    case 'accesorio':
      // USER REQUEST: Collar (Fantasy Necklace with chain and gemstone pendant)
      return `
        <g fill="${color}">
          <!-- Draped neck chain -->
          <path d="M 6,5 C 8,18 14,26 20,27 C 26,26 32,18 34,5" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
          <!-- Chain bead link highlights -->
          <path d="M 6,5 C 8,18 14,26 20,27 C 26,26 32,18 34,5" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="1.8 2" opacity="0.85"/>

          <!-- Suspension Bail ring at center -->
          <rect x="18.2" y="25.5" width="3.6" height="3" rx="0.8" fill="#ffffff"/>
          <circle cx="20" cy="27" r="0.9" fill="${color}"/>

          <!-- Hanging Pendant Gemstone -->
          <polygon points="20,28.5 27,33.5 20,40 13,33.5" fill="${color}"/>
          <polygon points="20,28.5 27,33.5 20,40 13,33.5" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.9"/>
          <!-- Inner Faceted Gem cuts -->
          <polygon points="20,30.5 25,33.5 20,38 15,33.5" fill="#ffffff" opacity="0.85"/>
          <circle cx="20" cy="33.5" r="1.8" fill="${color}"/>
          <circle cx="19.2" cy="32.7" r="0.6" fill="#ffffff"/>

          <!-- Accent pearls along chain -->
          <circle cx="12" cy="18" r="1.6" fill="#ffffff" stroke="${color}" stroke-width="0.8"/>
          <circle cx="28" cy="18" r="1.6" fill="#ffffff" stroke="${color}" stroke-width="0.8"/>
        </g>
      `;

    case 'objeto':
    default:
      // USER REQUEST: Caja / Cofre de objetos RPG con herrajes
      return `
        <g fill="${color}">
          <!-- Chest Box Lid -->
          <path d="M 5,16 C 5,10 11,7 20,7 C 29,7 35,10 35,16 Z" />
          <!-- Lid highlight rim -->
          <path d="M 6.5,15 C 8,11 13,8.8 20,8.8 C 27,8.8 32,11 33.5,15" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.6"/>

          <!-- Metal strapping rim across lid base -->
          <rect x="4" y="15" width="32" height="3" rx="1" fill="${color}" stroke="#ffffff" stroke-width="0.8"/>

          <!-- Main Box Body -->
          <path d="M 5.5,17 H 34.5 L 33,35 C 33,36 32,37 31,37 H 9 C 8,37 7,36 7,35 Z" />

          <!-- Left vertical iron strap -->
          <rect x="9" y="18" width="3" height="18" fill="#ffffff" opacity="0.45"/>
          <circle cx="10.5" cy="20" r="0.7" fill="#ffffff"/>
          <circle cx="10.5" cy="34" r="0.7" fill="#ffffff"/>
          <!-- Right vertical iron strap -->
          <rect x="28" y="18" width="3" height="18" fill="#ffffff" opacity="0.45"/>
          <circle cx="29.5" cy="20" r="0.7" fill="#ffffff"/>
          <circle cx="29.5" cy="34" r="0.7" fill="#ffffff"/>

          <!-- Center Hasp and Lock Escutcheon Plate -->
          <path d="M 17,16 H 23 V 24 L 20,26 L 17,24 Z" fill="#ffffff" opacity="0.95"/>
          <!-- Keyhole in lock plate -->
          <circle cx="20" cy="20" r="1.4" fill="${color}"/>
          <polygon points="19.3,20.5 20.7,20.5 20.4,23 19.6,23" fill="${color}"/>

          <!-- Side carrying handles -->
          <path d="M 5.5,23 C 3.5,23 3.5,27 5.5,27" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.8"/>
          <path d="M 34.5,23 C 36.5,23 36.5,27 34.5,27" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.8"/>
        </g>
      `;
  }
}

// 4-pointed radiant star SVG string
export function getRadiantStarSvg(cx: number, cy: number, r: number, color: string, glow = true): string {
  const inner = r * 0.22;
  const path = `M ${cx} ${cy - r} 
               Q ${cx} ${cy} ${cx + r} ${cy} 
               Q ${cx} ${cy} ${cx} ${cy + r} 
               Q ${cx} ${cy} ${cx - r} ${cy} 
               Q ${cx} ${cy} ${cx} ${cy - r} Z`;
  
  return `
    <g>
      ${glow ? `<path d="${path}" fill="${color}" filter="url(#star-glow)" opacity="0.8"/>` : ''}
      <path d="${path}" fill="${color}"/>
      <circle cx="${cx}" cy="${cy}" r="${inner}" fill="#ffffff" opacity="0.95"/>
    </g>
  `;
}

// USER REQUEST: Cruz de la esquina derecha agrandada en un 20% (r: 22.2 vs original 18.5)
// Faceted radiant RPG cross with primary flared arms, secondary 45deg prismatic glimmers, and brilliant nucleus
export function getRadiantCrossSvg(cx: number, cy: number, r: number, color: string, glow = true): string {
  const inner = r * 0.22;
  const secondaryR = r * 0.48;
  const primaryPath = `M ${cx} ${cy - r} 
               Q ${cx} ${cy} ${cx + r} ${cy} 
               Q ${cx} ${cy} ${cx} ${cy + r} 
               Q ${cx} ${cy} ${cx - r} ${cy} 
               Q ${cx} ${cy} ${cx} ${cy - r} Z`;
  const secondaryPath = `M ${cx} ${cy - secondaryR} 
               Q ${cx} ${cy} ${cx + secondaryR} ${cy} 
               Q ${cx} ${cy} ${cx} ${cy + secondaryR} 
               Q ${cx} ${cy} ${cx - secondaryR} ${cy} 
               Q ${cx} ${cy} ${cx} ${cy - secondaryR} Z`;
  
  return `
    <g>
      ${glow ? `<path d="${primaryPath}" fill="${color}" filter="url(#star-glow)" opacity="0.88"/>` : ''}
      <!-- Secondary prismatic diagonal flare (rotated 45deg) -->
      <g transform="rotate(45 ${cx} ${cy})">
        <path d="${secondaryPath}" fill="${color}" opacity="0.75"/>
      </g>
      <!-- Main 4-pointed radiant cross -->
      <path d="${primaryPath}" fill="${color}"/>
      <!-- Core brilliant nucleus & highlight -->
      <circle cx="${cx}" cy="${cy}" r="${inner * 1.6}" fill="${color}" opacity="0.85"/>
      <circle cx="${cx}" cy="${cy}" r="${inner}" fill="#ffffff" opacity="0.98"/>
    </g>
  `;
}

// USER REQUEST: "reemplacemos la etrella del aldo izquierdo por una roza de lo vientos pero que la roza de los vientos no e vea entera, solo dos tercios y que este sobre el borde."
// Compass Rose (Rosa de los Vientos) placed at top-left corner over the border line, with ~2/3 visible extending inward!
export function getCompassRoseTopLeftSvg(color: string): string {
  // Center coordinates positioned directly on the inner border intersection (x: 24, y: 24)
  const cx = 26;
  const cy = 26;
  const r = 44; // Outer radius
  const rMed = 28;
  const rSmall = 16;

  return `
    <!-- ROSA DE LOS VIENTOS (COMPASS ROSE) OVER TOP-LEFT BORDER (2/3 VISIBLE) -->
    <g id="top-left-compass-rose" transform="translate(${cx}, ${cy})">
      <!-- Shadow filter for depth over background -->
      <filter id="compass-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="1" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.8"/>
      </filter>

      <g filter="url(#compass-shadow)">
        <!-- Concentric Compass Rings -->
        <circle cx="0" cy="0" r="38" fill="none" stroke="${color}" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.65"/>
        <circle cx="0" cy="0" r="32" fill="none" stroke="${color}" stroke-width="1.8" opacity="0.85"/>
        <circle cx="0" cy="0" r="28" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.5"/>
        <circle cx="0" cy="0" r="14" fill="none" stroke="${color}" stroke-width="1.2" opacity="0.75"/>

        <!-- Cardinal degree tick marks on ring -->
        <line x1="0" y1="-32" x2="0" y2="-28" stroke="${color}" stroke-width="2"/>
        <line x1="0" y1="28" x2="0" y2="32" stroke="${color}" stroke-width="2"/>
        <line x1="-32" y1="0" x2="-28" y2="0" stroke="${color}" stroke-width="2"/>
        <line x1="28" y1="0" x2="32" y2="0" stroke="${color}" stroke-width="2"/>

        <!-- Ordinal Secondary Points (NE, NW, SE, SW) - Faceted 2-tone -->
        <!-- SE Ray (pointing into the card) -->
        <polygon points="0,0 4,4 32,32" fill="${color}"/>
        <polygon points="0,0 32,32 4,4" fill="#ffffff" opacity="0.7"/>
        <polygon points="0,0 2,6 32,32" fill="${color}" opacity="0.8"/>
        <!-- NE Ray -->
        <polygon points="0,0 5,-2 30,-30" fill="${color}"/>
        <polygon points="0,0 2,-5 30,-30" fill="#ffffff" opacity="0.6"/>
        <!-- SW Ray -->
        <polygon points="0,0 -2,5 -30,30" fill="${color}"/>
        <polygon points="0,0 -5,2 -30,30" fill="#ffffff" opacity="0.6"/>
        <!-- NW Ray -->
        <polygon points="0,0 -4,-2 -28,-28" fill="${color}" opacity="0.5"/>

        <!-- Primary Cardinal Points (N, S, E, W) - Large faceted rays -->
        <!-- SOUTH RAY (pointing downwards into card) -->
        <polygon points="0,0 6,10 0,46" fill="${color}"/>
        <polygon points="0,0 -6,10 0,46" fill="#ffffff" opacity="0.75"/>
        
        <!-- EAST RAY (pointing rightwards into card) -->
        <polygon points="0,0 10,-6 46,0" fill="${color}"/>
        <polygon points="0,0 10,6 46,0" fill="#ffffff" opacity="0.75"/>

        <!-- NORTH RAY (extends upwards to outer border) -->
        <polygon points="0,0 6,-10 0,-44" fill="${color}"/>
        <polygon points="0,0 -6,-10 0,-44" fill="#ffffff" opacity="0.6"/>
        
        <!-- WEST RAY (extends leftwards to outer border) -->
        <polygon points="0,0 -10,-6 -44,0" fill="${color}"/>
        <polygon points="0,0 -10,6 -44,0" fill="#ffffff" opacity="0.6"/>

        <!-- Central Compass Hub & Runic Ring -->
        <circle cx="0" cy="0" r="7" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="3.2" fill="#ffffff"/>
        <circle cx="0" cy="0" r="1.5" fill="${color}"/>

        <!-- Cardinal letters N, E, S (visible portions) -->
        <text x="1" y="42" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" text-anchor="middle">S</text>
        <text x="42" y="3" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="9" font-weight="900" text-anchor="middle">E</text>
      </g>
    </g>
  `;
}

/**
 * Estimate the vertical height needed for text inside a container of given width.
 */
export function estimateFormattedTextHeight(
  text: string, 
  fontSize: number, 
  containerWidth: number = 650, 
  lineHeightMultiplier: number = 1.45
): number {
  if (!text || !text.trim()) return 0;
  
  // Proportional font metric: average character width in Latin fonts is ~0.58 of font size
  const avgCharWidth = fontSize * 0.58;
  const maxCharsPerLine = Math.max(10, Math.floor(containerWidth / avgCharWidth));
  const paragraphs = text.split('\n');
  let totalLines = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const rawP = paragraphs[i];
    if (rawP.trim().length === 0) {
      totalLines += 0.5; // blank line spacing
      continue;
    }
    const words = rawP.trim().split(/\s+/);
    let currentLineChars = 0;
    let linesInP = 1;

    for (const word of words) {
      const wLen = word.length;
      if (currentLineChars === 0) {
        currentLineChars = wLen;
      } else if (currentLineChars + 1 + wLen <= maxCharsPerLine) {
        currentLineChars += 1 + wLen;
      } else {
        linesInP++;
        currentLineChars = wLen;
      }
    }
    totalLines += linesInP;
    if (i < paragraphs.length - 1) {
      totalLines += 0.4; // margin between paragraphs
    }
  }

  const lineHeight = fontSize * lineHeightMultiplier;
  return Math.ceil(totalLines * lineHeight);
}

export interface TextAutoAdjustMetrics {
  effectiveDescSize: number;
  effectiveLoreSize: number;
  effectiveTitleSize: number;
  neededAutoExpansion: number;
  isAutoAdjusted: boolean;
  boxHeight: number;
  boxY: number;
  bannerY: number;
  bannerHeight: number;
  lowerBoxY: number;
  lowerBoxHeight: number;
  descriptionOffsetY: number;
  descriptionBoxHeight: number;
  loreDividerY: number;
  loreBlockY: number;
  loreForeignHeight: number;
  useTextLengthForTitle?: boolean;
}

/**
 * Calculates dynamic typography and upward text box expansion:
 * - Minimum font size is 20px
 * - Fonts auto-adjust down towards 20px to fit if needed
 * - If text exceeds box at 20px, the box automatically expands upwards
 */
export function calculateTextAutoAdjust(card: CardData): TextAutoAdjustMetrics {
  const autoAdjust = card.autoAdjustText !== false;
  const MIN_FONT_SIZE = 20;

  // Title auto-fit if title is long (banner has 686px total, ~635px usable text area)
  let effectiveTitleSize = card.titleSize || 38;
  let useTextLengthForTitle = false;
  if (autoAdjust && card.title && card.title.trim()) {
    const titleLen = card.title.trim().length;
    const maxTitleW = 635;
    const charFactor = 0.72; // Uppercase bold font with letter-spacing 1.5
    if (titleLen > 0) {
      const idealSize = Math.floor((maxTitleW / titleLen - 1.5) / charFactor);
      effectiveTitleSize = Math.max(MIN_FONT_SIZE, Math.min(card.titleSize || 38, idealSize));
      if (effectiveTitleSize <= MIN_FONT_SIZE && titleLen * (MIN_FONT_SIZE * charFactor + 1.5) > maxTitleW) {
        useTextLengthForTitle = true;
      }
    }
  }

  // Lore calculation (respect user loreSize, defaults to 18px)
  const hasLore = Boolean(card.lore && card.lore.trim());
  const effectiveLoreSize = card.loreSize || 18;
  let reqLoreHeight = 0;
  let totalLoreBlockHeight = 0;
  if (hasLore) {
    reqLoreHeight = estimateFormattedTextHeight(card.lore, effectiveLoreSize, 650, 1.35);
    const flourishHeight = card.showDividerFlourish !== false ? 26 : 12;
    totalLoreBlockHeight = reqLoreHeight + flourishHeight;
  }

  const baseBoxHeight = 360;
  const bannerHeight = 67;
  // Available height inside base 360px box between reduced padding and footer
  const baseAvailableUsableHeight = 232;
  const baseAvailableDescHeight = Math.max(50, baseAvailableUsableHeight - totalLoreBlockHeight);

  // Description / Rules font size: directly respects user configured font size!
  const configuredDescSize = card.descriptionSize || 22;
  let effectiveDescSize = configuredDescSize;
  let neededAutoExpansion = 0;

  if (autoAdjust && card.description && card.description.trim()) {
    let reqH = estimateFormattedTextHeight(card.description, effectiveDescSize, 650, 1.45);

    // If text at current font size overflows the base box:
    if (reqH > baseAvailableDescHeight) {
      const potentialExpansion = Math.ceil(reqH - baseAvailableDescHeight + 8);
      // If expanding at this font size would exceed maximum allowed card box height (650px)
      // and font is above MIN_FONT_SIZE (20px), scale down font towards 20px before expanding
      if (baseBoxHeight + potentialExpansion > 620 && effectiveDescSize > MIN_FONT_SIZE) {
        for (let s = effectiveDescSize - 1; s >= MIN_FONT_SIZE; s--) {
          const h = estimateFormattedTextHeight(card.description, s, 650, 1.45);
          effectiveDescSize = s;
          reqH = h;
          if (baseBoxHeight + Math.ceil(h - baseAvailableDescHeight + 8) <= 620 || s === MIN_FONT_SIZE) {
            break;
          }
        }
      }
      // Expand the box upwards to accommodate the text perfectly
      neededAutoExpansion = Math.max(0, Math.ceil(reqH - baseAvailableDescHeight + 8));
    }
  } else if (!autoAdjust) {
    effectiveDescSize = configuredDescSize;
    effectiveTitleSize = card.titleSize || 38;
    neededAutoExpansion = 0;
  }

  const isAutoAdjusted = autoAdjust && (
    effectiveDescSize !== (card.descriptionSize || 22) ||
    effectiveTitleSize !== (card.titleSize || 38) ||
    neededAutoExpansion > 0
  );

  // Box expansion: auto-expansion needed PLUS any manual bonus slider configured by user
  const manualBonus = card.textBoxHeightBonus || 0;
  const boxBonus = neededAutoExpansion + manualBonus;
  const maxAllowedBoxHeight = 650;
  const boxHeight = Math.min(maxAllowedBoxHeight, Math.max(baseBoxHeight, baseBoxHeight + boxBonus));
  const boxY = 1050 - boxHeight - 20;
  const bannerY = boxY + 14;
  const lowerBoxY = bannerY + bannerHeight;
  const lowerBoxHeight = 1026 - lowerBoxY;

  // USER REQUIREMENT: Reduced top space for rules text (lowerBoxY + 8 instead of + 22)
  const descriptionOffsetY = lowerBoxY + 8;
  const actualDescHeight = card.description && card.description.trim()
    ? estimateFormattedTextHeight(card.description, effectiveDescSize, 650, 1.45)
    : 36;
  const descriptionBoxHeight = Math.max(actualDescHeight + 8, 48);

  // USER REQUIREMENT: Reduced top space for ambientación / lore text
  const loreDividerY = hasLore ? (descriptionOffsetY + actualDescHeight + 6) : 0;
  const loreBlockY = hasLore ? (card.showDividerFlourish !== false ? loreDividerY + 10 : loreDividerY + 4) : 0;
  const loreForeignHeight = Math.max(reqLoreHeight + 10, 36);

  return {
    effectiveDescSize,
    effectiveLoreSize,
    effectiveTitleSize,
    neededAutoExpansion,
    isAutoAdjusted,
    boxHeight,
    boxY,
    bannerY,
    bannerHeight,
    lowerBoxY,
    lowerBoxHeight,
    descriptionOffsetY,
    descriptionBoxHeight,
    loreDividerY,
    loreBlockY,
    loreForeignHeight,
    useTextLengthForTitle,
  };
}

// Generate the complete 750 x 1050 SVG markup for a card
export interface SvgRenderOptions {
  showBleedGuides?: boolean;
}

export function generateCardSvgMarkup(card: CardData, options: SvgRenderOptions = {}): string {
  const { palette } = card;

  // Auto-adjustment of typography (minimum 20px) and upwards expansion of text box
  const layout = calculateTextAutoAdjust(card);
  const {
    boxHeight,
    boxY,
    bannerY,
    bannerHeight,
    lowerBoxY,
    lowerBoxHeight,
    descriptionOffsetY,
    descriptionBoxHeight,
    effectiveDescSize,
    effectiveLoreSize,
    effectiveTitleSize,
    loreDividerY,
    loreBlockY,
    loreForeignHeight,
    useTextLengthForTitle,
  } = layout;

  // USER REQUEST: Círculo fijo exactamente en Y: 93px
  const circleCenterX = 668;
  const circleCenterY = 93;
  const circleRadius = 44;

  // USER REQUEST: Cruz de la esquina derecha +20% agrandada (r: 22.2 vs original 18.5)
  const bannerCrossRadius = card.rightCrossSize ?? 22.2;

  // Star pill below circle:
  // USER REQUEST: Estrellas sin ningún borde ni fondo de cápsula (flotantes puras)
  const starCount = Math.min(Math.max(card.rarityStars || 1, 1), 5);
  const starRadius = 17.25; // 15% larger!
  const starPillSpacing = 40;
  const starPillY = circleCenterY + circleRadius + 14;

  // Top right vertical stars:
  const renderVerticalStars = () => {
    const stars = [];
    const firstStarY = starPillY + 18 + (starRadius - 13);
    for (let i = 0; i < starCount; i++) {
      const cy = firstStarY + i * starPillSpacing;
      stars.push(getRadiantStarSvg(circleCenterX, cy, starRadius, palette.starsColor));
    }
    return stars.join('');
  };

  // Custom text layers
  const renderCustomLayers = () => {
    if (!card.customLayers || card.customLayers.length === 0) return '';
    return card.customLayers.map(layer => {
      const x = (layer.x / 100) * 750;
      const y = (layer.y / 100) * 1050;
      const bg = layer.hasBackground ? `
        <rect x="${x - 12}" y="${y - layer.fontSize * 1.1}" width="${layer.text.length * (layer.fontSize * 0.6) + 24}" height="${layer.fontSize * 1.5}" 
              rx="6" fill="${layer.backgroundColor || 'rgba(0,0,0,0.7)'}" stroke="${layer.backgroundBorderColor || palette.borderColor}" stroke-width="1.5"/>
      ` : '';
      return `
        <g>
          ${bg}
          <text x="${x}" y="${y}" fill="${layer.color || '#fff'}" 
                font-family="${layer.fontFamily || 'sans-serif'}" 
                font-size="${layer.fontSize || 20}" 
                font-weight="${layer.fontWeight || 'normal'}" 
                font-style="${layer.fontStyle || 'normal'}" 
                text-anchor="${layer.align || 'left'}">
            ${escapeXml(layer.text)}
          </text>
        </g>
      `;
    }).join('');
  };

  // Category Icon (filled refined RPG silhouette)
  const categoryIconSvg = getCategoryIconSvg(card.category, palette.borderColor);

  function escapeXml(unsafe: string): string {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }

  // USER REQUEST:
  // "has que el nombre de la carta tenga un color solido, mientras que el texto inferior tenga un fondo negro con una opacidad que lo haga semi transparente pero sin que se pierda la legibilidad del texto"
  // Title banner has a 100% solid color!
  const bannerBg = palette.titleBannerBg || '#2a2018';

  // USER REQUEST:
  // "alinea el texto del nombre a la izquierda pero en medio del recuadro para nombrs, adema elimina eso bords al principio y al fial de los nombres"
  const titleAlign = card.titleAlign || 'left';
  let titleX = 22;
  let textAnchor = 'start';
  if (titleAlign === 'center') {
    titleX = 343;
    textAnchor = 'middle';
  } else if (titleAlign === 'right') {
    titleX = 664;
    textAnchor = 'end';
  }

  // USER REQUEST:
  // "siento que el nombre esta demasiado arriba e relacion al fonod/bloque dode esta, podemos bajarlo un poco?"
  // Optical vertical centering: Since the title is rendered in UPPERCASE, it has no descenders.
  // Dominant-baseline="central" places the baseline at the half-em, leaving ~13.5px on top and ~26px below,
  // causing the title to look visibly pushed towards the top edge of the banner block.
  // Shifting down by +6px places the visual cap-height in the true optical center of the block!
  const titleY = Math.round(bannerHeight / 2) + 6 + (card.titleOffsetY || 0);

  // Artwork dimensions calculation:
  // USER FIX: "cuando se sube una imagen y se quiere ajustar la app la recorta, eso no deberia ser asi"
  // Instead of hardcoding 750x1050 with 'slice' (which permanently cuts off parts of the user's photo),
  // we render using the image's natural aspect ratio so 100% of the pixels remain accessible for panning,
  // framing, and zooming without any prior clipping!
  const cardWidth = 750;
  const cardHeight = 1050;
  const cardRatio = cardWidth / cardHeight; // 5/7 ≈ 0.7142857

  const imgRatio = (card.imageWidth && card.imageHeight && card.imageHeight > 0)
    ? (card.imageWidth / card.imageHeight)
    : (card.imageAspectRatio && card.imageAspectRatio > 0 ? card.imageAspectRatio : cardRatio);

  const fitMode = card.imageFit || 'cover';

  let baseRenderW = cardWidth;
  let baseRenderH = cardHeight;

  if (fitMode === 'contain') {
    // Contain: Entire artwork fits inside the card without cutting off any edge
    if (imgRatio >= cardRatio) {
      baseRenderW = cardWidth;
      baseRenderH = Math.round(cardWidth / imgRatio);
    } else {
      baseRenderH = cardHeight;
      baseRenderW = Math.round(cardHeight * imgRatio);
    }
  } else {
    // Cover / Custom: Fills card viewport without pre-cropping.
    // The `<image>` element spans the true geometry so the user can freely pan across
    // the whole illustration (e.g. 1867px wide for 16:9 images) without black voids or lost edges.
    if (imgRatio >= cardRatio) {
      baseRenderH = cardHeight;
      baseRenderW = Math.round(cardHeight * imgRatio);
    } else {
      baseRenderW = cardWidth;
      baseRenderH = Math.round(cardWidth / imgRatio);
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" 
         xmlns:xlink="http://www.w3.org/1999/xlink" 
         viewBox="0 0 750 1050" 
         width="750" 
         height="1050" 
         style="background: #000000; border-radius: 36px; overflow: hidden; display: block;">
      
      <defs>
        <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <clipPath id="card-corner-clip">
          <rect x="0" y="0" width="750" height="1050" rx="36" ry="36"/>
        </clipPath>
      </defs>

      <!-- Main card body container -->
      <g clip-path="url(#card-corner-clip)">
        
        <!-- CARD BACKGROUND ARTWORK -->
        <!-- Preserves full uncropped graphic for smooth panning, zooming, and perfect framing -->
        <g id="art-layer">
          <g transform="translate(375, 525)">
            <g transform="translate(${card.imageOffsetX}, ${card.imageOffsetY}) rotate(${card.imageRotate}) scale(${card.imageScale})">
              <image href="${card.imageUrl}" 
                     x="${-Math.round(baseRenderW / 2)}" 
                     y="${-Math.round(baseRenderH / 2)}" 
                     width="${baseRenderW}" 
                     height="${baseRenderH}" 
                     preserveAspectRatio="none"
                     style="filter: brightness(${card.imageBrightness}%) contrast(${card.imageContrast}%) saturate(${card.imageSaturation}%);" />
            </g>
          </g>
        </g>

        <!-- Top Vignette -->
        <rect x="0" y="0" width="750" height="240" 
              fill="url(#top-vignette)" 
              opacity="0.55" pointer-events="none"/>
        <linearGradient id="top-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </linearGradient>

        <!-- CARD INNER BORDER FRAME (Clean border lines with masterwork RPG corner brackets) -->
        <g id="frame-lines">
          <rect x="24" y="24" width="702" height="1002" rx="24" ry="24" 
                fill="none" 
                stroke="${palette.borderColor}" 
                stroke-width="2.5" 
                stroke-opacity="0.9" />

          <rect x="30" y="30" width="690" height="990" rx="20" ry="20" 
                fill="none" 
                stroke="${palette.borderColor}" 
                stroke-width="1" 
                stroke-opacity="0.35" />

          <!-- Masterwork Corner Accents (4 esquinas reforzadas con remaches y filigrana) -->
          <!-- Top-Left Corner -->
          <path d="M 24,54 L 24,36 C 24,29.4 29.4,24 36,24 L 54,24" fill="none" stroke="${palette.borderColor}" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="36" cy="36" r="2.4" fill="${palette.borderColor}"/>
          <circle cx="35.3" cy="35.3" r="0.9" fill="#ffffff" opacity="0.95"/>
          <!-- Top-Right Corner -->
          <path d="M 696,24 L 714,24 C 720.6,24 726,29.4 726,36 L 726,54" fill="none" stroke="${palette.borderColor}" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="714" cy="36" r="2.4" fill="${palette.borderColor}"/>
          <circle cx="713.3" cy="35.3" r="0.9" fill="#ffffff" opacity="0.95"/>
          <!-- Bottom-Left Corner -->
          <path d="M 24,996 L 24,1014 C 24,1020.6 29.4,1026 36,1026 L 54,1026" fill="none" stroke="${palette.borderColor}" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="36" cy="1014" r="2.4" fill="${palette.borderColor}"/>
          <circle cx="35.3" cy="1013.3" r="0.9" fill="#ffffff" opacity="0.95"/>
          <!-- Bottom-Right Corner -->
          <path d="M 696,1026 L 714,1026 C 720.6,1026 726,1020.6 726,1014 L 726,996" fill="none" stroke="${palette.borderColor}" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="714" cy="1014" r="2.4" fill="${palette.borderColor}"/>
          <circle cx="713.3" cy="1013.3" r="0.9" fill="#ffffff" opacity="0.95"/>
        </g>

        <!-- UPPER RIGHT: ICON CIRCLE (REFINED FANTASY RPG SILHOUETTE - FIXED AT Y: 93px) -->
        <g id="top-right-circle" transform="translate(${circleCenterX}, ${circleCenterY})">
          <!-- Outer delicate bezel ring -->
          <circle cx="0" cy="0" r="${circleRadius + 2}" fill="none" stroke="${palette.borderColor}" stroke-width="1.2" stroke-opacity="0.6"/>
          <!-- Medallion base body -->
          <circle cx="0" cy="0" r="${circleRadius}" fill="${palette.circleBg}" stroke="${palette.borderColor}" stroke-width="2.8"/>
          <!-- Inner engraved rim -->
          <circle cx="0" cy="0" r="${circleRadius - 4}" fill="none" stroke="${palette.borderColor}" stroke-width="1" stroke-opacity="0.35"/>
          
          <!-- Category icon fills ~75-80% of circle -->
          <g transform="scale(1.72) translate(-20, -20)">
            ${categoryIconSvg}
          </g>
        </g>

        <!-- UPPER RIGHT: STARS (BORDERLESS & FLOATING) -->
        <g id="top-right-stars-pill">
          <!-- Star items floating freely without capsule box -->
          ${renderVerticalStars()}
        </g>

        <!-- EXPANDABLE BOTTOM TEXT BOX -->
        <g id="bottom-text-panel">
          
          <!-- USER REQUIREMENT: TITLE BANNER (CLEAN STYLE OF BEFORE WITH 15% TRANSPARENCY) -->
          <g id="pumba-title-banner" transform="translate(32, ${bannerY})">
            <!-- Semi-transparent Solid Banner Background (15% transparency / 85% opacity) -->
            <rect x="0" y="0" width="686" height="${bannerHeight}" rx="4" 
                  fill="${bannerBg}" fill-opacity="0.85" />
            
            <!-- Upper Bevel Highlight Line -->
            <line x1="0" y1="1" x2="686" y2="1" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.2" />

            <!-- Title Text: Left-aligned, optically centered & lowered for perfect visual harmony -->
            <text x="${titleX}" y="${titleY}" 
                  fill="${palette.textTitleColor}" 
                  font-family="${card.titleFont}" 
                  font-size="${effectiveTitleSize}" 
                  font-weight="800" 
                  letter-spacing="1.5"
                  text-anchor="${textAnchor}"
                  dominant-baseline="central"
                  ${useTextLengthForTitle ? 'textLength="635" lengthAdjust="spacingAndGlyphs"' : ''}>
              ${escapeXml(card.title.toUpperCase())}
            </text>

            <!-- Bottom Divider Hairline -->
            <line x1="0" y1="${bannerHeight}" x2="686" y2="${bannerHeight}" 
                  stroke="${palette.borderColor}" stroke-opacity="0.5" stroke-width="1.8" />
          </g>

          <!-- USER REQUIREMENT: LOWER TEXT BACKGROUND WITH VISUAL DEPTH & AMBIENT SHADOW -->
          <!-- Ambient shadow behind lower box -->
          <rect x="29" y="${lowerBoxY + 2}" width="692" height="${lowerBoxHeight + 4}" rx="6" 
                fill="#000000" opacity="0.55" />
          <!-- Semi-transparent black background with delicate rim -->
          <rect x="32" y="${lowerBoxY}" width="686" height="${lowerBoxHeight}" rx="4" 
                fill="rgba(0, 0, 0, 0.72)" stroke="${palette.borderColor}" stroke-width="1" stroke-opacity="0.28" />

          <!-- Description / Rules Text Box (Auto-adjusted font size >= 20px, auto-expanded box upwards if needed) -->
          <g id="description-block" transform="translate(50, ${descriptionOffsetY})">
            <foreignObject x="0" y="0" width="650" height="${descriptionBoxHeight}" style="overflow: visible;">
              <div xmlns="http://www.w3.org/1999/xhtml" 
                   style="font-family: ${card.descriptionFont}; font-size: ${effectiveDescSize}px; color: ${palette.textColor}; line-height: 1.42; font-weight: 500; text-shadow: 0 2px 4px rgba(0,0,0,0.95); white-space: pre-line; word-break: break-word; margin: 0; padding: 0;">
                ${escapeXml(card.description)}
              </div>
            </foreignObject>
          </g>

          <!-- Flavor / Lore Quote with Ornamental Divider (ALWAYS MAINTAINED) -->
          ${card.lore && card.lore.trim() ? `
            <!-- Ornamental Divider Flourish between Rules and Lore -->
            ${(card.showDividerFlourish !== false) ? `
              <g id="lore-flourish-divider" transform="translate(375, ${loreDividerY})">
                <line x1="-130" y1="0" x2="-24" y2="0" stroke="${palette.borderColor}" stroke-width="1.2" stroke-opacity="0.45"/>
                <circle cx="-30" cy="0" r="1.6" fill="${palette.borderColor}" opacity="0.75"/>
                <polygon points="0,-5 5,0 0,5 -5,0" fill="${palette.accentColor}" stroke="${palette.borderColor}" stroke-width="1"/>
                <circle cx="0" cy="0" r="1.4" fill="#ffffff"/>
                <circle cx="30" cy="0" r="1.6" fill="${palette.borderColor}" opacity="0.75"/>
                <line x1="24" y1="0" x2="130" y2="0" stroke="${palette.borderColor}" stroke-width="1.2" stroke-opacity="0.45"/>
              </g>
            ` : ''}

            <g id="lore-block" transform="translate(50, ${loreBlockY})">
              <foreignObject x="0" y="0" width="650" height="${loreForeignHeight}" style="overflow: visible;">
                <div xmlns="http://www.w3.org/1999/xhtml" 
                     style="font-family: ${card.loreFont || "'Spectral', serif"}; font-size: ${effectiveLoreSize}px; font-style: italic; color: ${palette.loreTextColor}; line-height: 1.35; text-shadow: 0 2px 4px rgba(0,0,0,0.95); white-space: pre-line; word-break: break-word; margin: 0; padding: 0;">
                  «${escapeXml(card.lore)}»
                </div>
              </foreignObject>
            </g>
          ` : ''}

          <!-- FOOTER ROW (Clear and unoccluded in bottom corners) -->
          <g id="card-footer" transform="translate(50, 1014)">
            <!-- Left: "Sistema PAPA TUMBAY" -->
            <g>
              <circle cx="6" cy="-4" r="4.5" fill="${palette.accentColor}"/>
              <text x="18" y="0" fill="${palette.borderColor}" font-family="'Outfit', sans-serif" font-size="12.5" font-weight="700" letter-spacing="1.2">
                ${escapeXml(card.systemLabel || 'Sistema PAPA TUMBAY')}
              </text>
            </g>

            <!-- Center: Rarity Diamond -->
            <g transform="translate(325, -5)">
              <polygon points="0,-8 9,0 0,8 -9,0" fill="${palette.accentColor}" stroke="#ffffff" stroke-width="1.2"/>
              <polygon points="0,-4 5,0 0,4 -5,0" fill="#ffffff" opacity="0.75"/>
            </g>

            <!-- Right: Ilustrador y Autor de la carta (Despejado sin recuadros superpuestos) -->
            <g transform="translate(630, 0)">
              <text x="0" y="0" fill="${palette.borderColor}" font-family="'Outfit', sans-serif" font-size="12.5" font-weight="600" text-anchor="end" opacity="0.95">
                ${(() => {
                  const parts: string[] = [];
                  if (card.illustratorName?.trim()) {
                    parts.push(`Ilus: ${escapeXml(card.illustratorName.trim())}`);
                  }
                  if (card.authorName?.trim()) {
                    parts.push(`Autor: ${escapeXml(card.authorName.trim())}`);
                  }
                  if (parts.length > 0) {
                    return parts.join(' · ');
                  }
                  return 'Sistema PAPA TUMBAY';
                })()}
              </text>
            </g>
          </g>

        </g>

        <!-- ADDITIONAL CUSTOM USER TEXT LAYERS -->
        ${renderCustomLayers()}

        <!-- PRINT BLEED & TRIM MARGIN GUIDES (3MM STANDARD FOR CARD PRINTING) -->
        ${options.showBleedGuides ? `
          <g id="print-bleed-guides" pointer-events="none">
            <!-- 3mm Bleed Boundary (Outer 750x1050 px) -->
            <rect x="2" y="2" width="746" height="1046" rx="34" ry="34"
                  fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="8 6" opacity="0.9" />
            
            <!-- Cut Line / Línea de corte real (at 36px / 3mm from edges) -->
            <rect x="36" y="36" width="678" height="978" rx="20" ry="20"
                  fill="none" stroke="#06b6d4" stroke-width="2" stroke-dasharray="6 4" opacity="0.9" />
            
            <!-- Safe Margin / Zona Segura (3mm inside cut line, at 72px) -->
            <rect x="72" y="72" width="606" height="906" rx="14" ry="14"
                  fill="none" stroke="#10b981" stroke-width="1.8" stroke-dasharray="4 4" opacity="0.8" />
            
            <!-- Top Badges showing guide legend -->
            <g transform="translate(48, 16)">
              <rect x="0" y="0" width="168" height="20" rx="6" fill="rgba(15, 23, 42, 0.92)" stroke="#ef4444" stroke-width="1.2"/>
              <text x="84" y="14" fill="#fca5a5" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="700" text-anchor="middle" letter-spacing="0.5">
                ✂️ SANGRADO 3mm (BORDE)
              </text>
            </g>
            <g transform="translate(230, 16)">
              <rect x="0" y="0" width="156" height="20" rx="6" fill="rgba(15, 23, 42, 0.92)" stroke="#06b6d4" stroke-width="1.2"/>
              <text x="78" y="14" fill="#67e8f9" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="700" text-anchor="middle" letter-spacing="0.5">
                LÍNEA DE CORTE (POKER)
              </text>
            </g>
            <g transform="translate(400, 16)">
              <rect x="0" y="0" width="156" height="20" rx="6" fill="rgba(15, 23, 42, 0.92)" stroke="#10b981" stroke-width="1.2"/>
              <text x="78" y="14" fill="#6ee7b7" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="700" text-anchor="middle" letter-spacing="0.5">
                🛡️ ZONA SEGURA (3mm INT)
              </text>
            </g>
          </g>
        ` : ''}

      </g>
    </svg>
  `;
}
