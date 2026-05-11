export type Position2D = {
  x: number;
  y: number;
};

export type PitchMode = "2d" | "3d";

export type PitchSize = "11" | "8" | "7" | "5";

export type Side = "home" | "away";

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
