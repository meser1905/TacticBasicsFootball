import type { FormationCategory, PitchFormat } from "@/types";

export type PitchDimensions = {
  format: PitchFormat;
  label: string;
  width: number;
  length: number;
  playersPerTeam: number;
  penaltyArea: { width: number; depth: number };
  goalArea: { width: number; depth: number };
  penaltySpot: number;
  centerCircle: number;
  cornerArc: number;
  zones: { columns: number; rows: number };
};

export const PITCH_DIMENSIONS: Record<PitchFormat, PitchDimensions> = {
  football11: {
    format: "football11",
    label: "Futbol 11",
    width: 68,
    length: 105,
    playersPerTeam: 11,
    penaltyArea: { width: 40.32, depth: 16.5 },
    goalArea: { width: 18.32, depth: 5.5 },
    penaltySpot: 11,
    centerCircle: 9.15,
    cornerArc: 1,
    zones: { columns: 5, rows: 4 },
  },
  football8: {
    format: "football8",
    label: "Futbol 8",
    width: 45,
    length: 65,
    playersPerTeam: 8,
    penaltyArea: { width: 26, depth: 9 },
    goalArea: { width: 11, depth: 3 },
    penaltySpot: 8,
    centerCircle: 6,
    cornerArc: 0.5,
    zones: { columns: 4, rows: 3 },
  },
  football7: {
    format: "football7",
    label: "Futbol 7",
    width: 30,
    length: 50,
    playersPerTeam: 7,
    penaltyArea: { width: 18, depth: 7 },
    goalArea: { width: 7, depth: 2 },
    penaltySpot: 7,
    centerCircle: 5,
    cornerArc: 0.5,
    zones: { columns: 3, rows: 3 },
  },
  futsal: {
    format: "futsal",
    label: "Futsal",
    width: 20,
    length: 40,
    playersPerTeam: 5,
    penaltyArea: { width: 14, depth: 6 },
    goalArea: { width: 5, depth: 1.5 },
    penaltySpot: 6,
    centerCircle: 3,
    cornerArc: 0.25,
    zones: { columns: 3, rows: 2 },
  },
};

export function getFormatFromCategory(category: FormationCategory): PitchFormat {
  if (category.startsWith("football11")) return "football11";
  if (category === "football8") return "football8";
  if (category === "football7") return "football7";
  return "futsal";
}

export const PITCH_FORMATS: readonly PitchFormat[] = [
  "football11",
  "football8",
  "football7",
  "futsal",
] as const;
