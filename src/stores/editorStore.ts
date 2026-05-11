import { create } from "zustand";
import type { PitchFormat } from "@/types";
import { defaultFormationForFormat } from "@/lib/formations";
import { usePlayersStore } from "./playersStore";

export type PitchRenderMode = "2d" | "3d";
export type PitchOrientation = "vertical" | "horizontal";
export type ViewMode = "solo" | "versus";
export type Side = "home" | "away";

type EditorState = {
  pitchMode: PitchRenderMode;
  pitchOrientation: PitchOrientation;
  pitchFormat: PitchFormat;
  viewMode: ViewMode;
  soloTeam: Side;
  showZones: boolean;
  selectedPlayerId: string | null;
  setPitchMode: (mode: PitchRenderMode) => void;
  togglePitchMode: () => void;
  setPitchOrientation: (orientation: PitchOrientation) => void;
  togglePitchOrientation: () => void;
  setPitchFormat: (format: PitchFormat) => void;
  setViewMode: (mode: ViewMode) => void;
  setSoloTeam: (team: Side) => void;
  toggleZones: () => void;
  setSelectedPlayer: (id: string | null) => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  pitchMode: "2d",
  pitchOrientation: "vertical",
  pitchFormat: "football11",
  viewMode: "versus",
  soloTeam: "home",
  showZones: false,
  selectedPlayerId: null,
  setPitchMode: (mode) => set({ pitchMode: mode }),
  togglePitchMode: () => set((s) => ({ pitchMode: s.pitchMode === "2d" ? "3d" : "2d" })),
  setPitchOrientation: (orientation) => set({ pitchOrientation: orientation }),
  togglePitchOrientation: () =>
    set((s) => ({
      pitchOrientation: s.pitchOrientation === "vertical" ? "horizontal" : "vertical",
    })),
  setPitchFormat: (format) => {
    if (get().pitchFormat === format) return;
    const defaultFormation = defaultFormationForFormat(format);
    const players = usePlayersStore.getState();
    players.loadFormation(defaultFormation, "home");
    players.loadFormation(defaultFormation, "away");
    set({ pitchFormat: format });
  },
  setViewMode: (mode) => set({ viewMode: mode }),
  setSoloTeam: (team) => set({ soloTeam: team }),
  toggleZones: () => set((s) => ({ showZones: !s.showZones })),
  setSelectedPlayer: (id) => set({ selectedPlayerId: id }),
}));
