export type Position2D = {
  x: number;
  y: number;
};

export type Side = "home" | "away";

export type PitchMode = "2d" | "3d";

export type PitchSize = "11" | "8" | "7" | "5";

export type PreferredFoot = "left" | "right" | "both";

export type PlayerRole =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "LWB"
  | "RWB"
  | "DMF"
  | "CMF"
  | "AMF"
  | "LMF"
  | "RMF"
  | "LW"
  | "RW"
  | "SS"
  | "CF";

export type FormationCategory =
  | "football11-classic"
  | "football11-modern"
  | "football11-historic"
  | "football11-specific"
  | "football8"
  | "football7"
  | "futsal";

export type FormationSlot = {
  role: PlayerRole;
  x: number;
  y: number;
};

export type FormationSlots11 = readonly [
  FormationSlot,
  FormationSlot,
  FormationSlot,
  FormationSlot,
  FormationSlot,
  FormationSlot,
  FormationSlot,
  FormationSlot,
  FormationSlot,
  FormationSlot,
  FormationSlot,
];

export type Formation = {
  id: string;
  name: string;
  category: FormationCategory;
  description: string;
  strengths: readonly string[];
  weaknesses: readonly string[];
  slots: FormationSlots11;
};

export type Player = {
  id: string;
  team: Side;
  number: number;
  name: string;
  role: PlayerRole;
  px: number;
  py: number;
};
