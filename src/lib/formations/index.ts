import type { Formation } from "@/types";
import { formation442, formation433, formation352 } from "./football11";

export const formations: readonly Formation[] = [formation442, formation433, formation352] as const;

export function findFormationById(id: string): Formation | undefined {
  return formations.find((f) => f.id === id);
}

export { formation442, formation433, formation352 };
