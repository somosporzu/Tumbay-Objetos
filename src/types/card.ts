export type ItemCategory = 
  | 'arma' 
  | 'armadura' 
  | 'objeto' 
  | 'pocion' 
  | 'pergamino' 
  | 'accesorio';

export interface CardStat {
  id: string;
  label: string;
  value: string;
}

export interface CustomTextLayer {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | '500' | '700' | '900';
  fontStyle: 'normal' | 'italic';
  color: string;
  x: number;
  y: number;
  align: 'left' | 'center' | 'right';
  hasBackground?: boolean;
  backgroundColor?: string;
  backgroundBorderColor?: string;
}

export interface CardPalette {
  id: string;
  name: string;
  borderColor: string;       // Color de los bordes externos e internos
  accentColor: string;       // Color del icono del círculo superior y detalles
  glowColor: string;         // Resplandor de marcos y estrellas
  textBoxBg: string;         // Fondo del panel de texto (rgba o hex)
  titleBannerBg?: string;    // Fondo de la placa de título (estilo Pumba)
  textTitleColor: string;    // Color del título principal
  textColor: string;         // Color del texto de cuerpo
  loreTextColor: string;     // Color de la cita/lore
  badgeBg: string;           // Fondo de los tags/pills
  badgeTextColor: string;    // Texto de los tags
  circleBg: string;          // Fondo del círculo del icono
  starsColor: string;        // Color de las estrellas de rareza
}

export interface CardData {
  id: string;
  name: string;
  category: ItemCategory;
  rarityStars: number; // 1 to 5
  
  // Title
  title: string;
  titleFont: string;
  titleSize: number;
  titleAlign?: 'left' | 'center' | 'right';
  titleOffsetY?: number; // Ajuste vertical manual del título (positivo = más abajo)
  
  // Title Banner Style
  titleBannerStyle: 'pumba' | 'minimal' | 'underline';
  titleBannerColor?: string;
  
  // Description / Rules
  description: string;
  descriptionFont: string;
  descriptionSize: number;
  
  // Flavor / Lore text
  lore: string;
  loreFont: string;
  loreSize: number;
  
  // Footer
  systemLabel: string; // "Sistema PAPA TUMBAY"
  illustratorName?: string; // Nombre del ilustrador (opcional, antes del autor)
  authorName: string; // Nombre del autor
  
  // Illustration
  imageUrl: string;
  imageScale: number;
  imageOffsetX: number;
  imageOffsetY: number;
  imageRotate: number;
  imageBrightness: number;
  imageContrast: number;
  imageSaturation: number;
  imageWidth?: number;
  imageHeight?: number;
  imageAspectRatio?: number;
  imageFit?: 'cover' | 'contain' | 'custom';
  
  // Layout Options
  autoAdjustText?: boolean; // Auto-ajustar fuentes (min 20px) y expandir cuadro hacia arriba si es necesario
  textBoxHeightBonus: number;
  circlePosY?: number; // Position Y of the category circle (default 108)
  rightCrossSize?: number; // Size of right cross in title banner (default 22.2, +20% enlarged)
  showRarityBorder: boolean; // false by default
  showOrnamentTopLeft: boolean;
  topLeftOrnamentType: 'star' | 'number' | 'none';
  topLeftNumberValue: string;
  showHorizontalStars: boolean;
  showDividerFlourish?: boolean; // Subtle fantasy divider between description and lore
  
  // Palette & styling
  palette: CardPalette;
  
  // Additional custom text layers
  customLayers: CustomTextLayer[];
}
