import { I18nText } from "./gamification";

/**
 * Oyun haritası dünyası/seviyesi
 * Örnek: Sureler Dünyası,Peygamberler Dünyası
 */
export interface MapWorld {
  id: string;
  title: I18nText;
  description: I18nText;
  icon: string;
  order: number;
  theme: "surah" | "prophet" | "dua" | "knowledge";
  totalNodes: number; // Bu dünyada kaç node/lesson var
  requiredXP?: number; // Bu dünyayı açmak için gereken XP (opsiyonel)
}

/**
 * Harita düğümü - her bir ders/adım
 * Haritadaki her nokta bir lesson'ı temsil eder
 */
export interface MapNode {
  id: string;
  worldId: string; // Hangi dünyaya ait
  lessonId: string; // lessonsData veya prophetLessons'daki lesson ID
  order: number; // Dünyada kaçıncı sırada
  position: { x: number; y: number }; // Spiral layout için konum
  isUnlocked: boolean; // Oynanabilir mi?
  isCompleted: boolean; // Tamamlandı mı?
  stars: 0 | 1 | 2 | 3; // Başarı seviyesi (0 = tamamlanmamış)
}

/**
 * Harita ilerleme durumu
 * Kullanıcının haritadaki genel progress'i
 */
export interface MapProgress {
  currentWorldId: string; // Şu anda hangi dünyada
  currentNodeId: string; // Şu anda hangi node'da
  unlockedNodes: string[]; // Unlock edilmiş node ID'leri
  completedNodes: string[]; // Tamamlanmış node ID'leri
  worldProgress: Record<string, number>; // worldId => tamamlanma yüzdesi
}

/**
 * Node completion result
 * Bir node tamamlandığında dönen bilgi
 */
export interface NodeCompletionResult {
  xpEarned: number;
  starsEarned: 1 | 2 | 3;
  nextNodeUnlocked: boolean;
  worldCompleted: boolean;
  newWorldUnlocked: boolean;
}
