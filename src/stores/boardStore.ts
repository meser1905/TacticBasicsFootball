import { create } from "zustand";
import type { DrawingStroke, DrawingTool, EquipmentItem, EquipmentType } from "@/types";

let strokeCounter = 0;
let equipmentCounter = 0;

function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value));
}

type BoardState = {
  tool: DrawingTool;
  color: string;
  selectedEquipmentType: EquipmentType;
  paletteDragType: EquipmentType | null;
  strokes: DrawingStroke[];
  activeStroke: DrawingStroke | null;
  equipment: EquipmentItem[];
  setTool: (t: DrawingTool) => void;
  setColor: (c: string) => void;
  selectEquipmentType: (t: EquipmentType) => void;
  startPaletteDrag: (t: EquipmentType) => void;
  cancelPaletteDrag: () => void;
  startStroke: (point: { x: number; y: number }) => void;
  appendStrokePoint: (point: { x: number; y: number }) => void;
  finishStroke: () => void;
  removeStroke: (id: string) => void;
  addEquipment: (type: EquipmentType, px: number, py: number) => void;
  moveEquipment: (id: string, px: number, py: number) => void;
  removeEquipment: (id: string) => void;
  clearDrawings: () => void;
  clearEquipment: () => void;
  clearAll: () => void;
  loadEquipmentFromMaterials: (materials: readonly { name: string; count: number }[]) => void;
};

const PALETTE_DEFAULT = "#fbbf24";

export const useBoardStore = create<BoardState>((set, get) => ({
  tool: "none",
  color: PALETTE_DEFAULT,
  selectedEquipmentType: "cone",
  paletteDragType: null,
  strokes: [],
  activeStroke: null,
  equipment: [],
  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
  selectEquipmentType: (type) => set({ selectedEquipmentType: type, tool: "cone" }),
  startPaletteDrag: (type) => set({ paletteDragType: type }),
  cancelPaletteDrag: () => set({ paletteDragType: null }),
  startStroke: (point) => {
    strokeCounter += 1;
    set({
      activeStroke: {
        id: `stroke-${Date.now()}-${strokeCounter}`,
        color: get().color,
        points: [point],
      },
    });
  },
  appendStrokePoint: (point) => {
    const active = get().activeStroke;
    if (!active) return;
    set({
      activeStroke: { ...active, points: [...active.points, point] },
    });
  },
  finishStroke: () => {
    const active = get().activeStroke;
    if (!active) return;
    if (active.points.length < 2) {
      set({ activeStroke: null });
      return;
    }
    set((state) => ({
      strokes: [...state.strokes, active],
      activeStroke: null,
    }));
  },
  removeStroke: (id) =>
    set((state) => ({ strokes: state.strokes.filter((s) => s.id !== id) })),
  addEquipment: (type, px, py) => {
    equipmentCounter += 1;
    set((state) => ({
      equipment: [
        ...state.equipment,
        { id: `eq-${Date.now()}-${equipmentCounter}`, type, px: clamp(px), py: clamp(py) },
      ],
    }));
  },
  moveEquipment: (id, px, py) =>
    set((state) => ({
      equipment: state.equipment.map((e) =>
        e.id === id ? { ...e, px: clamp(px), py: clamp(py) } : e,
      ),
    })),
  removeEquipment: (id) =>
    set((state) => ({ equipment: state.equipment.filter((e) => e.id !== id) })),
  clearDrawings: () => set({ strokes: [], activeStroke: null }),
  clearEquipment: () => set({ equipment: [] }),
  clearAll: () => set({ strokes: [], activeStroke: null, equipment: [] }),
  loadEquipmentFromMaterials: (materials) => {
    const items: EquipmentItem[] = [];
    materials.forEach((m, mi) => {
      const type = inferEquipmentTypeFromName(m.name);
      if (!type) return;
      for (let i = 0; i < m.count; i++) {
        equipmentCounter += 1;
        const row = Math.floor(i / 5);
        const col = i % 5;
        items.push({
          id: `eq-${Date.now()}-${equipmentCounter}`,
          type,
          px: 0.3 + col * 0.1,
          py: 0.4 + mi * 0.08 + row * 0.05,
        });
      }
    });
    set({ equipment: items });
  },
}));

function inferEquipmentTypeFromName(name: string): EquipmentType | null {
  const n = name.toLowerCase();
  if (n.includes("escalera")) return "ladder";
  if (n.includes("valla")) return "hurdle";
  if (
    n.includes("mini-porter") ||
    n.includes("mini porter") ||
    n.includes("portera chica") ||
    n.includes("porteria chica") ||
    n.includes("porteria peq") ||
    n.includes("porteria de futsal")
  )
    return "minigoal";
  if (n.includes("maniqui") || n.includes("dummy")) return "mannequin";
  if (n.includes("banderin") || n.includes("bandera")) return "flag";
  if (n.includes("balon") || n.includes("pelota")) return "ball";
  if (n.includes("cono alto") || n.includes("pica")) return "tallcone";
  if (n.includes("cono")) return "cone";
  return null;
}
