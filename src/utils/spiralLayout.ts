/**
 * Spiral Layout Algoritması
 * Candy Crush/Duolingo tarzı sarmal harita düzeni için pozisyon hesaplaması
 */

export interface Position {
  x: number;
  y: number;
}

export interface SpiralLayoutOptions {
  /** Başlangıç noktası X koordinatı (varsayılan: 200) */
  centerX?: number;
  /** Başlangıç noktası Y koordinatı (varsayılan: 300) */
  centerY?: number;
  /** Node'lar arası mesafe (varsayılan: 100) */
  spacing?: number;
  /** Her dönüşte açı artışı (radyan, varsayılan: Math.PI / 4) */
  angleStep?: number;
  /** Spiral genişleme hızı (varsayılan: 1.2) */
  expansionRate?: number;
}

/**
 * Arch imedean spiral kullanarak node pozisyonları hesaplar
 *
 * Spiral formülü: r(θ) = a + b*θ
 * - a: başlangıç yarıçapı
 * - b: spiral genişleme oranı
 * - θ: açı (radyan)
 *
 * @param nodeCount - Kaç node için pozisyon hesaplanacak
 * @param options - Spiral layout seçenekleri
 * @returns Position array - Her node için {x, y} koordinatları
 */
export function calculateSpiralPositions(
  nodeCount: number,
  options: SpiralLayoutOptions = {},
): Position[] {
  const {
    centerX = 200,
    centerY = 300,
    spacing = 100,
    angleStep = Math.PI / 4, // 45 derece
    expansionRate = 1.2,
  } = options;

  const positions: Position[] = [];

  // İlk node merkeze yakın başlar
  let currentAngle = 0;
  let currentRadius = spacing * 0.3; // Başlangıç yarıçapı küçük

  for (let i = 0; i < nodeCount; i++) {
    // Polar koordinatlardan Kartezyen koordinatlara dönüşüm
    const x = centerX + currentRadius * Math.cos(currentAngle);
    const y = centerY + currentRadius * Math.sin(currentAngle);

    positions.push({ x, y });

    // Bir sonraki node için açı ve yarıçapı güncelle
    currentAngle += angleStep;
    currentRadius += (spacing / (2 * Math.PI)) * expansionRate;
  }

  return positions;
}

/**
 * Responsive yatay (mobil) spiral - ekran genişliğine göre
 * Mobil cihazlarda zigzag layout kullanıyoruz (daha görsel ve anlaşılır)
 */
export function calculateMobileSpiralPositions(
  nodeCount: number,
  screenWidth: number = 375, // iPhone SE genişliği
): Position[] {
  return calculateZigzagPositions(nodeCount, screenWidth);
}

/**
 * Tablet/Desktop için geniş zigzag layout
 */
export function calculateDesktopSpiralPositions(
  nodeCount: number,
  screenWidth: number = 1024,
): Position[] {
  const positions: Position[] = [];
  const leftMargin = 150;
  const rightMargin = screenWidth - 150;
  const verticalSpacing = 140;

  let currentX = screenWidth / 2;
  let currentY = 120;
  let direction = 1;

  for (let i = 0; i < nodeCount; i++) {
    positions.push({ x: currentX, y: currentY });
    currentY += verticalSpacing;

    if (i % 2 === 0) {
      currentX = direction > 0 ? rightMargin : leftMargin;
    } else {
      currentX = screenWidth / 2;
      direction *= -1;
    }
  }

  return positions;
}

/**
 * Ekran boyutuna göre otomatik zigzag layout seç
 * Tüm ekran boyutları için zigzag kullanıyoruz - daha görsel ve anlaşılır
 */
export function calculateResponsiveSpiralPositions(
  nodeCount: number,
  screenWidth: number,
): Position[] {
  if (screenWidth < 640) {
    // Mobil
    return calculateMobileSpiralPositions(nodeCount, screenWidth);
  } else if (screenWidth < 1024) {
    // Tablet - orta boy zigzag
    const positions: Position[] = [];
    const leftMargin = 120;
    const rightMargin = screenWidth - 120;
    const verticalSpacing = 130;

    let currentX = screenWidth / 2;
    let currentY = 110;
    let direction = 1;

    for (let i = 0; i < nodeCount; i++) {
      positions.push({ x: currentX, y: currentY });
      currentY += verticalSpacing;

      if (i % 2 === 0) {
        currentX = direction > 0 ? rightMargin : leftMargin;
      } else {
        currentX = screenWidth / 2;
        direction *= -1;
      }
    }

    return positions;
  } else {
    // Desktop
    return calculateDesktopSpiralPositions(nodeCount, screenWidth);
  }
}

/**
 * Zigzag (S-shape) alternatif layout
 * Daha basit, yukarıdan aşağıya zig-zag şeklinde
 * Candy Crush/Duolingo tarzı görsel düzen
 */
export function calculateZigzagPositions(
  nodeCount: number,
  screenWidth: number = 375,
): Position[] {
  const positions: Position[] = [];
  const leftMargin = 80;
  const rightMargin = screenWidth - 80;
  const verticalSpacing = 120; // Node'lar arası dikey mesafe

  let currentX = screenWidth / 2; // Ortada başla
  let currentY = 100; // Yukarıdan başla
  let direction = 1; // 1 = sağa, -1 = sola

  for (let i = 0; i < nodeCount; i++) {
    positions.push({ x: currentX, y: currentY });

    // Sonraki pozisyon
    currentY += verticalSpacing;

    if (i % 2 === 0) {
      // Sağa veya sola kay
      currentX = direction > 0 ? rightMargin : leftMargin;
    } else {
      // Ortaya dön
      currentX = screenWidth / 2;
      direction *= -1; // Yönü değiştir
    }
  }

  return positions;
}

/**
 * İki pozisyon arasındaki mesafeyi hesapla
 */
export function calculateDistance(pos1: Position, pos2: Position): number {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * SVG path string oluştur (node'lar arası çizgi için)
 * Quadratic bezier curve kullanarak yumuşak çizgi
 */
export function createPathBetweenNodes(start: Position, end: Position): string {
  // Kontrol noktası: iki nokta arasında hafif kavis
  const controlX = (start.x + end.x) / 2 + (end.y - start.y) * 0.1;
  const controlY = (start.y + end.y) / 2 - (end.x - start.x) * 0.1;

  return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
}
