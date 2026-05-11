"use client";

import { useEffect } from "react";
import { useBoardStore } from "@/stores/boardStore";
import { useEditorStore } from "@/stores/editorStore";
import { PITCH_DIMENSIONS } from "@/lib/pitchDimensions";

export function usePaletteDragDrop() {
  const paletteDragType = useBoardStore((s) => s.paletteDragType);
  const addEquipment = useBoardStore((s) => s.addEquipment);
  const cancelPaletteDrag = useBoardStore((s) => s.cancelPaletteDrag);

  useEffect(() => {
    if (!paletteDragType) return;

    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "grabbing";

    const handleUp = (e: PointerEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const svg = (target?.closest("svg[data-pitch-svg='true']") ??
        null) as SVGSVGElement | null;
      const contentG = svg?.querySelector(
        "g[data-pitch-content='true']",
      ) as SVGGElement | null;

      if (svg && contentG) {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const ctm = contentG.getScreenCTM();
        if (ctm) {
          const local = pt.matrixTransform(ctm.inverse());
          const format = useEditorStore.getState().pitchFormat;
          const dims = PITCH_DIMENSIONS[format];
          const px = local.x / dims.width;
          const py = local.y / dims.length;
          if (px >= 0 && px <= 1 && py >= 0 && py <= 1) {
            addEquipment(paletteDragType, px, py);
          }
        }
      }
      cancelPaletteDrag();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancelPaletteDrag();
    };

    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.cursor = previousCursor;
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      window.removeEventListener("keydown", handleKey);
    };
  }, [paletteDragType, addEquipment, cancelPaletteDrag]);
}
