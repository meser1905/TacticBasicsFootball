import type { EquipmentType } from "@/types";

type Props = {
  type: EquipmentType;
  cx: number;
  cy: number;
  size: number;
};

export function EquipmentShape({ type, cx, cy, size }: Props) {
  if (type === "cone") {
    return (
      <>
        <ellipse cx={cx} cy={cy + size * 0.55} rx={size * 0.7} ry={size * 0.15} fill="black" opacity={0.28} />
        <polygon
          points={`${cx},${cy - size * 1.2} ${cx - size},${cy + size * 0.4} ${cx + size},${cy + size * 0.4}`}
          fill="#ff7a00"
          stroke="#1a1a1a"
          strokeWidth={size * 0.08}
        />
        <line
          x1={cx - size * 0.8}
          y1={cy - size * 0.1}
          x2={cx + size * 0.8}
          y2={cy - size * 0.1}
          stroke="white"
          strokeWidth={size * 0.12}
          opacity={0.9}
        />
      </>
    );
  }
  if (type === "tallcone") {
    return (
      <>
        <ellipse cx={cx} cy={cy + size * 0.55} rx={size * 0.55} ry={size * 0.12} fill="black" opacity={0.28} />
        <line
          x1={cx}
          y1={cy + size * 0.4}
          x2={cx}
          y2={cy - size * 2}
          stroke="#ff7a00"
          strokeWidth={size * 0.4}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy + size * 0.4} r={size * 0.5} fill="#1a1a1a" />
      </>
    );
  }
  if (type === "hurdle") {
    return (
      <g>
        <ellipse cx={cx} cy={cy + size * 0.85} rx={size * 1.5} ry={size * 0.18} fill="black" opacity={0.25} />
        <rect
          x={cx - size * 1.4}
          y={cy - size * 0.9}
          width={size * 2.8}
          height={size * 0.35}
          fill="#fbbf24"
          stroke="#1a1a1a"
          strokeWidth={size * 0.08}
        />
        <rect x={cx - size * 1.4} y={cy + size * 0.3} width={size * 0.3} height={size * 0.5} fill="#fbbf24" />
        <rect x={cx + size * 1.1} y={cy + size * 0.3} width={size * 0.3} height={size * 0.5} fill="#fbbf24" />
      </g>
    );
  }
  if (type === "minigoal") {
    return (
      <g>
        <rect
          x={cx - size * 2.2}
          y={cy - size * 0.4}
          width={size * 4.4}
          height={size * 1.2}
          fill="none"
          stroke="white"
          strokeWidth={size * 0.18}
        />
        <line
          x1={cx - size * 2.2}
          y1={cy + size * 0.8}
          x2={cx + size * 2.2}
          y2={cy + size * 0.8}
          stroke="white"
          strokeWidth={size * 0.18}
        />
      </g>
    );
  }
  if (type === "ladder") {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={cx - size * 0.9}
            y={cy - size * 2 + i * size * 0.8}
            width={size * 1.8}
            height={size * 0.12}
            fill="#fbbf24"
            opacity={0.92}
          />
        ))}
        <line x1={cx - size * 0.9} y1={cy - size * 2} x2={cx - size * 0.9} y2={cy + size * 1.2} stroke="#fbbf24" strokeWidth={size * 0.1} />
        <line x1={cx + size * 0.9} y1={cy - size * 2} x2={cx + size * 0.9} y2={cy + size * 1.2} stroke="#fbbf24" strokeWidth={size * 0.1} />
      </g>
    );
  }
  if (type === "ball") {
    return (
      <g>
        <ellipse cx={cx} cy={cy + size * 0.45} rx={size * 0.45} ry={size * 0.12} fill="black" opacity={0.4} />
        <circle cx={cx} cy={cy} r={size * 0.55} fill="white" stroke="#1a1a1a" strokeWidth={size * 0.07} />
        <polygon
          points={`${cx},${cy - size * 0.3} ${cx + size * 0.27},${cy - size * 0.1} ${cx + size * 0.18},${cy + size * 0.22} ${cx - size * 0.18},${cy + size * 0.22} ${cx - size * 0.27},${cy - size * 0.1}`}
          fill="#1a1a1a"
        />
      </g>
    );
  }
  if (type === "mannequin") {
    return (
      <g>
        <ellipse cx={cx} cy={cy + size * 0.7} rx={size * 0.85} ry={size * 0.18} fill="black" opacity={0.32} />
        <circle cx={cx} cy={cy - size * 1.55} r={size * 0.42} fill="#9ca3af" stroke="#1a1a1a" strokeWidth={size * 0.07} />
        <path
          d={`M ${cx - size * 0.5} ${cy - size * 1} L ${cx + size * 0.5} ${cy - size * 1} L ${cx + size * 0.45} ${cy + size * 0.55} L ${cx - size * 0.45} ${cy + size * 0.55} Z`}
          fill="#9ca3af"
          stroke="#1a1a1a"
          strokeWidth={size * 0.07}
        />
      </g>
    );
  }
  if (type === "flag") {
    return (
      <g>
        <ellipse cx={cx} cy={cy + size * 0.5} rx={size * 0.4} ry={size * 0.1} fill="black" opacity={0.35} />
        <line
          x1={cx}
          y1={cy + size * 0.4}
          x2={cx}
          y2={cy - size * 2.6}
          stroke="#9ca3af"
          strokeWidth={size * 0.18}
          strokeLinecap="round"
        />
        <polygon
          points={`${cx},${cy - size * 2.6} ${cx + size * 1.1},${cy - size * 2.3} ${cx},${cy - size * 2}`}
          fill="#ef4444"
          stroke="#7f1d1d"
          strokeWidth={size * 0.05}
        />
        <circle cx={cx} cy={cy + size * 0.4} r={size * 0.32} fill="#1a1a1a" />
      </g>
    );
  }
  return null;
}

export const EQUIPMENT_CATALOG: { type: EquipmentType; label: string }[] = [
  { type: "cone", label: "Cono" },
  { type: "tallcone", label: "Pica" },
  { type: "hurdle", label: "Valla" },
  { type: "ladder", label: "Escalera" },
  { type: "minigoal", label: "Mini arco" },
  { type: "ball", label: "Pelota" },
  { type: "mannequin", label: "Maniqui" },
  { type: "flag", label: "Banderin" },
];
