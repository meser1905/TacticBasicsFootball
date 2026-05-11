import type { Formation, FormationCategory } from "@/types";
import {
  formation442,
  formation442Rombo,
  formation433,
  formation4231,
  formation352,
  formation532,
  formation451,
  formation343,
  formation4141,
  formation4321,
  formation4222,
  formation3421,
  formation3412,
  formation433Falso9,
  formation2323,
  formation3241,
  formation235,
  formationWM,
  formationCatenaccio,
  formation541,
  formation325,
  formation424,
} from "./football11";

export const formations: readonly Formation[] = [
  formation442,
  formation442Rombo,
  formation433,
  formation4231,
  formation352,
  formation532,
  formation451,
  formation343,
  formation4141,
  formation4321,
  formation4222,
  formation3421,
  formation3412,
  formation433Falso9,
  formation2323,
  formation3241,
  formation235,
  formationWM,
  formationCatenaccio,
  formation541,
  formation325,
  formation424,
] as const;

export function findFormationById(id: string): Formation | undefined {
  return formations.find((f) => f.id === id);
}

export const formationCategoryLabels: Record<FormationCategory, string> = {
  "football11-classic": "Clasicas",
  "football11-modern": "Modernas",
  "football11-historic": "Historicas",
  "football11-specific": "Especificas",
  football8: "Futbol 8",
  football7: "Futbol 7",
  futsal: "Futsal",
};

export function groupFormationsByCategory(): {
  category: FormationCategory;
  label: string;
  items: Formation[];
}[] {
  const groups = new Map<FormationCategory, Formation[]>();
  for (const f of formations) {
    const list = groups.get(f.category) ?? [];
    list.push(f);
    groups.set(f.category, list);
  }
  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    label: formationCategoryLabels[category],
    items,
  }));
}

export {
  formation442,
  formation442Rombo,
  formation433,
  formation4231,
  formation352,
  formation532,
  formation451,
  formation343,
  formation4141,
  formation4321,
  formation4222,
  formation3421,
  formation3412,
  formation433Falso9,
  formation2323,
  formation3241,
  formation235,
  formationWM,
  formationCatenaccio,
  formation541,
  formation325,
  formation424,
};
