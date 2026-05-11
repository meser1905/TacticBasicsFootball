"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
import type { Player } from "@/types";

const PITCH_W = 68;
const PITCH_H = 105;
const LINE_THICKNESS = 0.3;
const LINE_Y = 0.05;

export function Pitch3D() {
  const players = usePlayersStore((s) => s.players);
  const viewMode = useEditorStore((s) => s.viewMode);
  const soloTeam = useEditorStore((s) => s.soloTeam);

  const visible = viewMode === "versus" ? players : players.filter((p) => p.team === soloTeam);

  return (
    <div
      className="mx-auto aspect-[16/10] w-full max-w-[1100px] overflow-hidden rounded-lg border border-border bg-[oklch(0.18_0_0)] shadow-2xl"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas shadows camera={{ position: [0, 95, 75], fov: 38 }}>
        <color attach="background" args={["#0a1612"]} />
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[40, 90, 30]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0005}
          shadow-normalBias={0.05}
          shadow-camera-left={-90}
          shadow-camera-right={90}
          shadow-camera-top={90}
          shadow-camera-bottom={-90}
          shadow-camera-near={1}
          shadow-camera-far={300}
        />
        <PitchGround />
        <PitchLines3D />
        {visible.map((p) => (
          <Player3D key={p.id} player={p} />
        ))}
        <OrbitControls
          target={[0, 0, 0]}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={30}
          maxDistance={220}
          enablePan
        />
      </Canvas>
    </div>
  );
}

function PitchGround() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[PITCH_W * 1.18, PITCH_H * 1.12]} />
        <meshStandardMaterial color="#0a3a1a" roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[PITCH_W, PITCH_H]} />
        <meshStandardMaterial color="#1d7a3e" roughness={1} />
      </mesh>
    </group>
  );
}

function FlatRect({
  width,
  height,
  position,
}: {
  width: number;
  height: number;
  position: [number, number, number];
}) {
  return (
    <mesh position={position} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function FlatRing({
  innerRadius,
  outerRadius,
  position,
  segments = 64,
}: {
  innerRadius: number;
  outerRadius: number;
  position: [number, number, number];
  segments?: number;
}) {
  return (
    <mesh position={position} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[innerRadius, outerRadius, segments]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function PitchLines3D() {
  const halfW = PITCH_W / 2;
  const halfH = PITCH_H / 2;
  const t = LINE_THICKNESS;
  const paW = 40.32;
  const paH = 16.5;
  const gaW = 18.32;
  const gaH = 5.5;
  const penDist = 11;
  const centerR = 9.15;
  return (
    <group position={[0, LINE_Y, 0]}>
      <FlatRect width={PITCH_W} height={t} position={[0, 0, -halfH]} />
      <FlatRect width={PITCH_W} height={t} position={[0, 0, halfH]} />
      <FlatRect width={t} height={PITCH_H} position={[-halfW, 0, 0]} />
      <FlatRect width={t} height={PITCH_H} position={[halfW, 0, 0]} />

      <FlatRect width={PITCH_W} height={t} position={[0, 0, 0]} />

      <FlatRing innerRadius={centerR - t / 2} outerRadius={centerR + t / 2} position={[0, 0, 0]} />
      <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[t * 1.2, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>

      <FlatRect width={paW} height={t} position={[0, 0, halfH - paH]} />
      <FlatRect width={t} height={paH} position={[-paW / 2, 0, halfH - paH / 2]} />
      <FlatRect width={t} height={paH} position={[paW / 2, 0, halfH - paH / 2]} />

      <FlatRect width={paW} height={t} position={[0, 0, -halfH + paH]} />
      <FlatRect width={t} height={paH} position={[-paW / 2, 0, -halfH + paH / 2]} />
      <FlatRect width={t} height={paH} position={[paW / 2, 0, -halfH + paH / 2]} />

      <FlatRect width={gaW} height={t} position={[0, 0, halfH - gaH]} />
      <FlatRect width={t} height={gaH} position={[-gaW / 2, 0, halfH - gaH / 2]} />
      <FlatRect width={t} height={gaH} position={[gaW / 2, 0, halfH - gaH / 2]} />

      <FlatRect width={gaW} height={t} position={[0, 0, -halfH + gaH]} />
      <FlatRect width={t} height={gaH} position={[-gaW / 2, 0, -halfH + gaH / 2]} />
      <FlatRect width={t} height={gaH} position={[gaW / 2, 0, -halfH + gaH / 2]} />

      <mesh position={[0, 0, halfH - penDist]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[t * 1.2, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh position={[0, 0, -halfH + penDist]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[t * 1.2, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
}

function Player3D({ player }: { player: Player }) {
  const setSelectedPlayer = useEditorStore((s) => s.setSelectedPlayer);
  const worldX = (player.px - 0.5) * PITCH_W;
  const worldZ = (player.py - 0.5) * PITCH_H;
  const teamColor = player.team === "home" ? "#3b7ce8" : "#e8523b";
  const skin = "#e9c39a";

  const onClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setSelectedPlayer(player.id);
  };

  return (
    <group position={[worldX, 0, worldZ]} onContextMenu={onClick} onDoubleClick={onClick}>
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.95, 2.6, 14]} />
        <meshStandardMaterial color={teamColor} roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.35, 0]} castShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      <Text
        position={[0, 1.7, 0.96]}
        fontSize={0.9}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="black"
      >
        {String(player.number)}
      </Text>
    </group>
  );
}
