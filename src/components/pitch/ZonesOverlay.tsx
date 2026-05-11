import type { PitchDimensions } from "@/lib/pitchDimensions";

type Props = {
  dimensions: PitchDimensions;
};

export function ZonesOverlay({ dimensions }: Props) {
  const W = dimensions.width;
  const H = dimensions.length;
  const cols = dimensions.zones.columns;
  const rows = dimensions.zones.rows;
  const cellW = W / cols;
  const cellH = H / rows;

  const fontSize = Math.min(cellW, cellH) * 0.3;
  const strokeWidth = 0.18 * (W / 68);

  const cells: { x: number; y: number; number: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const number = (rows - 1 - row) * cols + col + 1;
      cells.push({ x: col * cellW, y: row * cellH, number });
    }
  }

  return (
    <g pointerEvents="none">
      <rect
        x={0}
        y={0}
        width={W}
        height={H}
        fill="oklch(0.7 0.18 90)"
        opacity={0.05}
      />
      {cells.map((cell) => (
        <g key={cell.number}>
          <rect
            x={cell.x}
            y={cell.y}
            width={cellW}
            height={cellH}
            fill="none"
            stroke="oklch(0.92 0.15 90)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${strokeWidth * 4} ${strokeWidth * 2}`}
            opacity={0.55}
          />
          <text
            x={cell.x + cellW / 2}
            y={cell.y + cellH / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill="oklch(0.95 0.15 90)"
            fontSize={fontSize}
            fontWeight={800}
            opacity={0.8}
            style={{ userSelect: "none" }}
          >
            {cell.number}
          </text>
        </g>
      ))}
    </g>
  );
}
