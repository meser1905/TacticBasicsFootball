"use client";

import { useRef } from "react";
import { PitchLines } from "./PitchLines";
import { ZonesOverlay } from "./ZonesOverlay";
import { DrawingLayer2D } from "./DrawingLayer2D";
import { Equipment2D } from "./Equipment2D";
import { Player2D } from "@/components/players/Player2D";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
import { useBoardStore } from "@/stores/boardStore";
import { PITCH_DIMENSIONS } from "@/lib/pitchDimensions";
import { cn } from "@/lib/utils";

export function Pitch2D() {
  const players = usePlayersStore((s) => s.players);
  const orientation = useEditorStore((s) => s.pitchOrientation);
  const viewMode = useEditorStore((s) => s.viewMode);
  const soloTeam = useEditorStore((s) => s.soloTeam);
  const format = useEditorStore((s) => s.pitchFormat);
  const showZones = useEditorStore((s) => s.showZones);

  const tool = useBoardStore((s) => s.tool);
  const startStroke = useBoardStore((s) => s.startStroke);
  const appendStrokePoint = useBoardStore((s) => s.appendStrokePoint);
  const finishStroke = useBoardStore((s) => s.finishStroke);
  const addEquipment = useBoardStore((s) => s.addEquipment);
  const selectedEquipmentType = useBoardStore((s) => s.selectedEquipmentType);
  const equipment = useBoardStore((s) => s.equipment);

  const svgRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<SVGGElement>(null);
  const drawingRef = useRef(false);

  const dims = PITCH_DIMENSIONS[format];
  const W = dims.width;
  const H = dims.length;

  const visiblePlayers =
    viewMode === "versus" ? players : players.filter((p) => p.team === soloTeam);

  const horizontal = orientation === "horizontal";
  const viewBox = horizontal ? `0 0 ${H} ${W}` : `0 0 ${W} ${H}`;
  const contentTransform = horizontal ? `translate(0, ${W}) rotate(-90)` : "";

  const getCanonicalPoint = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    const content = contentRef.current;
    if (!svg || !content) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = content.getScreenCTM();
    if (!ctm) return null;
    return pt.matrixTransform(ctm.inverse());
  };

  const onSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (tool === "none" || tool === "eraser") return;
    const p = getCanonicalPoint(e);
    if (!p) return;
    if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) return;

    if (tool === "marker") {
      drawingRef.current = true;
      startStroke({ x: p.x, y: p.y });
      svgRef.current?.setPointerCapture(e.pointerId);
    } else if (tool === "cone") {
      addEquipment(selectedEquipmentType, p.x / W, p.y / H);
    }
  };

  const onSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (tool !== "marker" || !drawingRef.current) return;
    const p = getCanonicalPoint(e);
    if (!p) return;
    appendStrokePoint({ x: p.x, y: p.y });
  };

  const onSvgPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (tool === "marker" && drawingRef.current) {
      drawingRef.current = false;
      finishStroke();
      if (svgRef.current?.hasPointerCapture(e.pointerId)) {
        svgRef.current.releasePointerCapture(e.pointerId);
      }
    }
  };

  const playerLayerPointerEvents = tool === "none" ? "auto" : "none";
  const svgCursor =
    tool === "marker" ? "crosshair" : tool === "cone" ? "copy" : tool === "eraser" ? "not-allowed" : "default";

  return (
    <div
      className={cn(
        "mx-auto w-full overflow-hidden rounded-lg border border-border bg-pitch shadow-2xl",
        horizontal ? "max-w-[1100px]" : "max-w-[640px]",
      )}
      style={{ aspectRatio: horizontal ? `${H} / ${W}` : `${W} / ${H}` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Cancha tactica ${dims.label}`}
        data-pitch-svg="true"
        style={{ cursor: svgCursor, touchAction: tool !== "none" ? "none" : "auto" }}
        onPointerDown={onSvgPointerDown}
        onPointerMove={onSvgPointerMove}
        onPointerUp={onSvgPointerUp}
        onPointerCancel={onSvgPointerUp}
      >
        <defs>
          <pattern
            id="grass-stripes"
            x="0"
            y="0"
            width={W}
            height={H / 10}
            patternUnits="userSpaceOnUse"
          >
            <rect width={W} height={H / 10} fill="var(--pitch)" />
            <rect width={W} height={H / 20} fill="var(--pitch-dark)" opacity={0.35} />
          </pattern>
        </defs>
        <g ref={contentRef} transform={contentTransform} data-pitch-content="true">
          <rect width={W} height={H} fill="url(#grass-stripes)" />
          <PitchLines dimensions={dims} />
          {showZones && <ZonesOverlay dimensions={dims} />}
          <DrawingLayer2D dimensions={dims} />
          <g>
            {equipment.map((item) => (
              <Equipment2D key={item.id} item={item} dimensions={dims} />
            ))}
          </g>
          <g style={{ pointerEvents: playerLayerPointerEvents }}>
            {visiblePlayers.map((p) => (
              <Player2D key={p.id} player={p} dimensions={dims} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
