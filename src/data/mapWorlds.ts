import { MapWorld } from "@/types/gameMap";

/**
 * Oyun haritası dünyaları
 * Her dünya bir tema etrafında organize edilmiş lesson'ları içerir
 */
export const mapWorlds: MapWorld[] = [
  {
    id: "world_surahs",
    title: {
      tr: "Sureler Dünyası",
      en: "World of Surahs",
      ar: "عالم السور",
    },
    description: {
      tr: "Kuran-ı Kerim surelerini adım adım öğren",
      en: "Learn Quranic Surahs step by step",
      ar: "تعلم سور القرآن الكريم خطوة بخطوة",
    },
    icon: "📖",
    order: 1,
    theme: "surah",
    totalNodes: 3, // Şu anda lessonsData'da 3 lesson var (Fatiha 1, 2, 3)
    // İlk dünya her zaman açık, requiredXP yok
  },
  {
    id: "world_prophets",
    title: {
      tr: "Peygamberler Dünyası",
      en: "World of Prophets",
      ar: "عالم الأنبياء",
    },
    description: {
      tr: "Peygamberlerin hayatlarını ve öğütlerini öğren",
      en: "Learn the lives and teachings of the Prophets",
      ar: "تعلم حياة الأنبياء وتعاليمهم",
    },
    icon: "⭐",
    order: 2,
    theme: "prophet",
    totalNodes: 10, // 10 peygamber dersi olacak
    requiredXP: 150, // Sureler dünyasını bitirince (3 lesson * ~50 XP) açılır
  },
];

/**
 * ID ile world bul
 */
export function getWorldById(worldId: string): MapWorld | undefined {
  return mapWorlds.find((world) => world.id === worldId);
}

/**
 * Sıradaki world'ü al
 */
export function getNextWorld(currentWorldId: string): MapWorld | undefined {
  const currentWorld = getWorldById(currentWorldId);
  if (!currentWorld) return undefined;

  return mapWorlds.find((world) => world.order === currentWorld.order + 1);
}

/**
 * İlk world'ü al
 */
export function getFirstWorld(): MapWorld {
  return mapWorlds[0]; // Sureler Dünyası
}
