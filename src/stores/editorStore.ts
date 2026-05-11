import { create } from "zustand";

export type PitchRenderMode = "2d" | "3d";
export type PitchOrientation = "vertical" | "horizontal";
export type ViewMode = "solo" | "versus";
export type Side = "home" | "away";

type EditorState = {
  pitchMode: PitchRenderMode;
  pitchOrientation: PitchOrientation;
  viewMode: ViewMode;
  soloTeam: Side;
  selectedPlayerId: string | null;
  setPitchMode: (mode: PitchRenderMode) => void;
  togglePitchMode: () => void;
  setPitchOrientation: (orientation: PitchOrientation) => void;
  togglePitchOrientation: () => void;
  setViewMode: (mode: ViewMode) => void;
  setSoloTeam: (team: Side) => void;
  setSelectedPlayer: (id: string | null) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  pitchMode: "2d",
  pitchOrientation: "vertical",
  viewMode: "versus",
  soloTeam: "home",
  selectedPlayerId: null,
  setPitchMode: (mode) => set({ pitchMode: mode }),
  togglePitchMode: () => set((s) => ({ pitchMode: s.pitchMode === "2d" ? "3d" : "2d" })),
  setPitchOrientation: (orientation) => set({ pitchOrientation: orientation }),
  togglePitchOrientation: () =>
    set((s) => ({
      pitchOrientation: s.pitchOrientation === "vertical" ? "horizontal" : "vertical",
    })),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSoloTeam: (team) => set({ soloTeam: team }),
  setSelectedPlayer: (id) => set({ selectedPlayerId: id }),
}));
