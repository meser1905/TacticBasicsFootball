import type { Formation, FormationCategory, PitchFormat } from "@/types";
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
import { f8_331, f8_232, f8_322, f8_2131 } from "./football8";
import { f7_231, f7_321, f7_2121, f7_132 } from "./football7";
import { futsal_121, futsal_22, futsal_31, futsal_40 } from "./futsal";
import { getFormatFromCategory } from "../pitchDimensions";

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
  f8_331,
  f8_232,
  f8_322,
  f8_2131,
  f7_231,
  f7_321,
  f7_2121,
  f7_132,
  futsal_121,
  futsal_22,
  futsal_31,
  futsal_40,
] as const;

export function findFormationById(id: string): Formation | undefined {
  return formations.find((f) => f.id === id);
}

export function formationsForFormat(format: PitchFormat): Formation[] {
  return formations.filter((f) => getFormatFromCategory(f.category) === format);
}

export function defaultFormationForFormat(format: PitchFormat): Formation {
  const list = formationsForFormat(format);
  const fallback = list[0];
  if (!fallback) throw new Error(`No formations available for format ${format}`);
  return fallback;
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

export function groupFormationsByCategory(format?: PitchFormat): {
  category: FormationCategory;
  label: string;
  items: Formation[];
}[] {
  const list = format ? formationsForFormat(format) : Array.from(formations);
  const groups = new Map<FormationCategory, Formation[]>();
  for (const f of list) {
    const arr = groups.get(f.category) ?? [];
    arr.push(f);
    groups.set(f.category, arr);
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
  f8_331,
  f8_232,
  f8_322,
  f8_2131,
  f7_231,
  f7_321,
  f7_2121,
  f7_132,
  futsal_121,
  futsal_22,
  futsal_31,
  futsal_40,
};
