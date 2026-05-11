import type { PitchDimensions } from "@/lib/pitchDimensions";

const STROKE = 0.22;

type Props = {
  dimensions: PitchDimensions;
};

export function PitchLines({ dimensions }: Props) {
  const W = dimensions.width;
  const H = dimensions.length;
  const paW = dimensions.penaltyArea.width;
  const paH = dimensions.penaltyArea.depth;
  const gaW = dimensions.goalArea.width;
  const gaH = dimensions.goalArea.depth;
  const penDist = dimensions.penaltySpot;
  const centerR = dimensions.centerCircle;
  const cornerR = dimensions.cornerArc;

  const paX = (W - paW) / 2;
  const gaX = (W - gaW) / 2;

  const stroke = STROKE * (W / 68);
  const line = "var(--pitch-line)";

  const drawPenaltyArc = penDist < paH;
  const archHalfChord = drawPenaltyArc
    ? Math.sqrt(centerR * centerR - (paH - penDist) * (paH - penDist))
    : 0;

  return (
    <g fill="none" stroke={line} strokeWidth={stroke} strokeLinecap="round">
      <rect x={0} y={0} width={W} height={H} />
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} />
      <circle cx={W / 2} cy={H / 2} r={centerR} />
      <circle cx={W / 2} cy={H / 2} r={stroke * 1.4} fill={line} />

      <rect x={paX} y={H - paH} width={paW} height={paH} />
      <rect x={paX} y={0} width={paW} height={paH} />

      <rect x={gaX} y={H - gaH} width={gaW} height={gaH} />
      <rect x={gaX} y={0} width={gaW} height={gaH} />

      <circle cx={W / 2} cy={H - penDist} r={stroke * 1.4} fill={line} />
      <circle cx={W / 2} cy={penDist} r={stroke * 1.4} fill={line} />

      {drawPenaltyArc && (
        <>
          <path
            d={`M ${W / 2 - archHalfChord} ${H - paH} A ${centerR} ${centerR} 0 0 1 ${W / 2 + archHalfChord} ${H - paH}`}
          />
          <path
            d={`M ${W / 2 - archHalfChord} ${paH} A ${centerR} ${centerR} 0 0 0 ${W / 2 + archHalfChord} ${paH}`}
          />
        </>
      )}

      <path d={`M ${cornerR} 0 A ${cornerR} ${cornerR} 0 0 1 0 ${cornerR}`} />
      <path d={`M ${W - cornerR} 0 A ${cornerR} ${cornerR} 0 0 0 ${W} ${cornerR}`} />
      <path d={`M 0 ${H - cornerR} A ${cornerR} ${cornerR} 0 0 0 ${cornerR} ${H}`} />
      <path d={`M ${W - cornerR} ${H} A ${cornerR} ${cornerR} 0 0 0 ${W} ${H - cornerR}`} />
    </g>
  );
}
