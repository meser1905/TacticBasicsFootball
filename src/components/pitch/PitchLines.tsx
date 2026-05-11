const W = 68;
const H = 105;
const STROKE = 0.22;
const PA_W = 40.32;
const PA_H = 16.5;
const PA_X = (W - PA_W) / 2;
const GA_W = 18.32;
const GA_H = 5.5;
const GA_X = (W - GA_W) / 2;
const CENTER_R = 9.15;
const PEN_DIST = 11;
const PEN_ARC_R = 9.15;
const CORNER_R = 1;
const ARC_HALF_CHORD = Math.sqrt(PEN_ARC_R * PEN_ARC_R - (PA_H - PEN_DIST) * (PA_H - PEN_DIST));

export function PitchLines() {
  const line = "var(--pitch-line)";
  return (
    <g fill="none" stroke={line} strokeWidth={STROKE} strokeLinecap="round">
      <rect x={0} y={0} width={W} height={H} />
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} />
      <circle cx={W / 2} cy={H / 2} r={CENTER_R} />
      <circle cx={W / 2} cy={H / 2} r={STROKE * 1.4} fill={line} />

      <rect x={PA_X} y={H - PA_H} width={PA_W} height={PA_H} />
      <rect x={PA_X} y={0} width={PA_W} height={PA_H} />

      <rect x={GA_X} y={H - GA_H} width={GA_W} height={GA_H} />
      <rect x={GA_X} y={0} width={GA_W} height={GA_H} />

      <circle cx={W / 2} cy={H - PEN_DIST} r={STROKE * 1.4} fill={line} />
      <circle cx={W / 2} cy={PEN_DIST} r={STROKE * 1.4} fill={line} />

      <path
        d={`M ${W / 2 - ARC_HALF_CHORD} ${H - PA_H} A ${PEN_ARC_R} ${PEN_ARC_R} 0 0 1 ${W / 2 + ARC_HALF_CHORD} ${H - PA_H}`}
      />
      <path
        d={`M ${W / 2 - ARC_HALF_CHORD} ${PA_H} A ${PEN_ARC_R} ${PEN_ARC_R} 0 0 0 ${W / 2 + ARC_HALF_CHORD} ${PA_H}`}
      />

      <path d={`M ${CORNER_R} 0 A ${CORNER_R} ${CORNER_R} 0 0 1 0 ${CORNER_R}`} />
      <path d={`M ${W - CORNER_R} 0 A ${CORNER_R} ${CORNER_R} 0 0 0 ${W} ${CORNER_R}`} />
      <path d={`M 0 ${H - CORNER_R} A ${CORNER_R} ${CORNER_R} 0 0 0 ${CORNER_R} ${H}`} />
      <path d={`M ${W - CORNER_R} ${H} A ${CORNER_R} ${CORNER_R} 0 0 0 ${W} ${H - CORNER_R}`} />
    </g>
  );
}
