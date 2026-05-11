"use client";

import { useEffect, useState } from "react";
import { Canvas, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Plane as ThreePlane, Raycaster, Vector2, Vector3 } from "three";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
import { PITCH_DIMENSIONS, type PitchDimensions } from "@/lib/pitchDimensions";
import type { Player } from "@/types";

const LINE_Y = 0.05;
const ZONE_Y = 0.04;

const DRAG_PLANE = new ThreePlane(new Vector3(0, 1, 0), 0);
const dragRaycaster = new Raycaster();
const tempNdc = new Vector2();
const tempHit = new Vector3();

export function Pitch3D() {
  const players = usePlayersStore((s) => s.players);
  const viewMode = useEditorStore((s) => s.viewMode);
  const soloTeam = useEditorStore((s) => s.soloTeam);
  const format = useEditorStore((s) => s.pitchFormat);
  const showZones = useEditorStore((s) => s.showZones);
  const isDraggingPlayer = useEditorStore((s) => s.isDraggingPlayer);

  const dims = PITCH_DIMENSIONS[format];
  const visible = viewMode === "versus" ? players : players.filter((p) => p.team === soloTeam);

  const cameraDistance = Math.max(dims.width, dims.length) * 1.1;

  return (
    <div
      className="mx-auto aspect-[16/10] w-full max-w-[1100px] overflow-hidden rounded-lg border border-border bg-[oklch(0.18_0_0)] shadow-2xl"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas shadows camera={{ position: [0, cameraDistance, cameraDistance * 0.8], fov: 38 }}>
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
          shadow-camera-left={-dims.length * 0.7}
          shadow-camera-right={dims.length * 0.7}
          shadow-camera-top={dims.length * 0.7}
          shadow-camera-bottom={-dims.length * 0.7}
          shadow-camera-near={1}
          shadow-camera-far={dims.length * 3}
        />
        <PitchGround dims={dims} />
        <PitchLines3D dims={dims} />
        {showZones && <Zones3D dims={dims} />}
        {visible.map((p) => (
          <Player3D key={p.id} player={p} dims={dims} />
        ))}
        <OrbitControls
          enabled={!isDraggingPlayer}
          target={[0, 0, 0]}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={dims.length * 0.3}
          maxDistance={dims.length * 2.5}
          enablePan
        />
      </Canvas>
    </div>
  );
}

function PitchGround({ dims }: { dims: PitchDimensions }) {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[dims.width * 1.18, dims.length * 1.12]} />
        <meshStandardMaterial color="#0a3a1a" roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[dims.width, dims.length]} />
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
}: {
  innerRadius: number;
  outerRadius: number;
  position: [number, number, number];
}) {
  return (
    <mesh position={position} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

function PitchLines3D({ dims }: { dims: PitchDimensions }) {
  const W = dims.width;
  const H = dims.length;
  const halfW = W / 2;
  const halfH = H / 2;
  const t = 0.3 * (W / 68);
  const paW = dims.penaltyArea.width;
  const paH = dims.penaltyArea.depth;
  const gaW = dims.goalArea.width;
  const gaH = dims.goalArea.depth;
  const penDist = dims.penaltySpot;
  const centerR = dims.centerCircle;
  return (
    <group position={[0, LINE_Y, 0]}>
      <FlatRect width={W} height={t} position={[0, 0, -halfH]} />
      <FlatRect width={W} height={t} position={[0, 0, halfH]} />
      <FlatRect width={t} height={H} position={[-halfW, 0, 0]} />
      <FlatRect width={t} height={H} position={[halfW, 0, 0]} />

      <FlatRect width={W} height={t} position={[0, 0, 0]} />

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

function Zones3D({ dims }: { dims: PitchDimensions }) {
  const W = dims.width;
  const H = dims.length;
  const cols = dims.zones.columns;
  const rows = dims.zones.rows;
  const cellW = W / cols;
  const cellH = H / rows;
  const fontSize = Math.min(cellW, cellH) * 0.32;

  const cells: { x: number; z: number; number: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const number = row * cols + col + 1;
      const x = -W / 2 + cellW * (col + 0.5);
      const z = -H / 2 + cellH * (row + 0.5);
      cells.push({ x, z, number });
    }
  }

  return (
    <group position={[0, ZONE_Y, 0]}>
      {cells.map((c) => (
        <group key={c.number} position={[c.x, 0, c.z]}>
          <mesh rotation-x={-Math.PI / 2}>
            <planeGeometry args={[cellW * 0.97, cellH * 0.97]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.08} />
          </mesh>
          <Text
            position={[0, 0.05, 0]}
            rotation-x={-Math.PI / 2}
            fontSize={fontSize}
            color="#fde68a"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.04}
            outlineColor="black"
          >
            {String(c.number)}
          </Text>
        </group>
      ))}
    </group>
  );
}

function Player3D({ player, dims }: { player: Player; dims: PitchDimensions }) {
  const { camera, gl } = useThree();
  const setSelectedPlayer = useEditorStore((s) => s.setSelectedPlayer);
  const setDraggingPlayer = useEditorStore((s) => s.setDraggingPlayer);
  const movePlayer = usePlayersStore((s) => s.movePlayer);
  const [dragging, setDragging] = useState(false);

  const worldX = (player.px - 0.5) * dims.width;
  const worldZ = (player.py - 0.5) * dims.length;
  const teamColor = player.team === "home" ? "#3b7ce8" : "#e8523b";
  const skin = "#e9c39a";

  const scale = Math.min(dims.width, dims.length) / 50;
  const bodyR = 0.85 * scale;
  const bodyH = 2.6 * scale;
  const headR = 0.7 * scale;

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      tempNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      tempNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      dragRaycaster.setFromCamera(tempNdc, camera);
      const hit = dragRaycaster.ray.intersectPlane(DRAG_PLANE, tempHit);
      if (hit) {
        const px = tempHit.x / dims.width + 0.5;
        const py = tempHit.z / dims.length + 0.5;
        movePlayer(player.id, px, py);
      }
    };

    const handleUp = () => {
      setDragging(false);
      setDraggingPlayer(false);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [dragging, camera, gl, dims, movePlayer, player.id, setDraggingPlayer]);

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.button === 2) return;
    e.stopPropagation();
    setDragging(true);
    setDraggingPlayer(true);
  };

  const onContextMenu = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    e.nativeEvent.preventDefault?.();
    setSelectedPlayer(player.id);
  };

  const onDoubleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setSelectedPlayer(player.id);
  };

  return (
    <group
      position={[worldX, 0, worldZ]}
      onPointerDown={onPointerDown}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
    >
      <mesh position={[0, bodyH / 2, 0]} castShadow>
        <cylinderGeometry args={[bodyR, bodyR * 1.1, bodyH, 14]} />
        <meshStandardMaterial
          color={teamColor}
          roughness={0.6}
          emissive={dragging ? teamColor : "#000000"}
          emissiveIntensity={dragging ? 0.3 : 0}
        />
      </mesh>
      <mesh position={[0, bodyH + headR * 0.9, 0]} castShadow>
        <sphereGeometry args={[headR, 16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      <Text
        position={[0, bodyH / 2, bodyR + 0.05]}
        fontSize={bodyR * 1.1}
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
