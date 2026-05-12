"use client";

import { useEffect, useState } from "react";
import { Canvas, useThree, type ThreeEvent } from "@react-three/fiber";
import { Billboard, OrbitControls, Text } from "@react-three/drei";
import { Plane as ThreePlane, Raycaster, Shape as ThreeShape, Vector2, Vector3 } from "three";
import { usePlayersStore } from "@/stores/playersStore";
import { useEditorStore } from "@/stores/editorStore";
import { useBoardStore } from "@/stores/boardStore";
import { PITCH_DIMENSIONS, type PitchDimensions } from "@/lib/pitchDimensions";
import type { DrawingStroke, EquipmentItem, Player } from "@/types";

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
  const equipment = useBoardStore((s) => s.equipment);
  const strokes = useBoardStore((s) => s.strokes);

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
        <Strokes3D strokes={strokes} dims={dims} />
        <Equipment3D items={equipment} dims={dims} />
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

function Equipment3D({ items, dims }: { items: readonly EquipmentItem[]; dims: PitchDimensions }) {
  return (
    <group>
      {items.map((item) => (
        <EquipmentMesh key={item.id} item={item} dims={dims} />
      ))}
    </group>
  );
}

function EquipmentMesh({ item, dims }: { item: EquipmentItem; dims: PitchDimensions }) {
  const removeEquipment = useBoardStore((s) => s.removeEquipment);
  const tool = useBoardStore((s) => s.tool);
  const worldX = (item.px - 0.5) * dims.width;
  const worldZ = (item.py - 0.5) * dims.length;
  const scale = Math.min(dims.width, dims.length) / 60;

  const onClick = (e: { stopPropagation: () => void }) => {
    if (tool === "eraser") {
      e.stopPropagation();
      removeEquipment(item.id);
    }
  };

  const onContextMenu = (e: {
    stopPropagation: () => void;
    nativeEvent?: { preventDefault?: () => void };
  }) => {
    e.stopPropagation();
    e.nativeEvent?.preventDefault?.();
    removeEquipment(item.id);
  };

  if (item.type === "cone") {
    return (
      <group position={[worldX, 0, worldZ]} onClick={onClick} onContextMenu={onContextMenu}>
        <mesh position={[0, 0.55 * scale, 0]} castShadow>
          <coneGeometry args={[0.55 * scale, 1.1 * scale, 12]} />
          <meshStandardMaterial color="#ff7a00" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.42 * scale, 0]}>
          <cylinderGeometry args={[0.5 * scale, 0.5 * scale, 0.1 * scale, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    );
  }
  if (item.type === "tallcone") {
    return (
      <group position={[worldX, 0, worldZ]} onClick={onClick} onContextMenu={onContextMenu}>
        <mesh position={[0, 1 * scale, 0]} castShadow>
          <cylinderGeometry args={[0.08 * scale, 0.12 * scale, 2 * scale, 8]} />
          <meshStandardMaterial color="#ff7a00" />
        </mesh>
        <mesh position={[0, 0.05 * scale, 0]}>
          <cylinderGeometry args={[0.35 * scale, 0.35 * scale, 0.1 * scale, 12]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    );
  }
  if (item.type === "hurdle") {
    return (
      <group position={[worldX, 0, worldZ]} onClick={onClick} onContextMenu={onContextMenu}>
        <mesh position={[0, 0.5 * scale, 0]} castShadow>
          <boxGeometry args={[2 * scale, 0.1 * scale, 0.1 * scale]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[-0.95 * scale, 0.25 * scale, 0]} castShadow>
          <boxGeometry args={[0.1 * scale, 0.5 * scale, 0.1 * scale]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[0.95 * scale, 0.25 * scale, 0]} castShadow>
          <boxGeometry args={[0.1 * scale, 0.5 * scale, 0.1 * scale]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>
    );
  }
  if (item.type === "minigoal") {
    return (
      <group position={[worldX, 0, worldZ]} onClick={onClick} onContextMenu={onContextMenu}>
        <mesh position={[0, 0.6 * scale, 0]} castShadow>
          <boxGeometry args={[3 * scale, 0.08 * scale, 0.08 * scale]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-1.45 * scale, 0.3 * scale, 0]} castShadow>
          <boxGeometry args={[0.08 * scale, 0.6 * scale, 0.08 * scale]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[1.45 * scale, 0.3 * scale, 0]} castShadow>
          <boxGeometry args={[0.08 * scale, 0.6 * scale, 0.08 * scale]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    );
  }
  if (item.type === "ladder") {
    return (
      <group position={[worldX, 0, worldZ]} onClick={onClick} onContextMenu={onContextMenu}>
        {[-2, -1, 0, 1, 2].map((i) => (
          <mesh key={i} position={[0, 0.025 * scale, i * 0.6 * scale]}>
            <boxGeometry args={[1.4 * scale, 0.03 * scale, 0.06 * scale]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        ))}
      </group>
    );
  }
  if (item.type === "ball") {
    return (
      <group position={[worldX, 0.4 * scale, worldZ]} onClick={onClick} onContextMenu={onContextMenu}>
        <mesh castShadow>
          <sphereGeometry args={[0.4 * scale, 18, 18]} />
          <meshStandardMaterial color="#ffffff" roughness={0.45} />
        </mesh>
        <mesh position={[0.18 * scale, 0.05 * scale, 0]}>
          <sphereGeometry args={[0.1 * scale, 6, 6]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.16 * scale, -0.08 * scale, 0.1 * scale]}>
          <sphereGeometry args={[0.08 * scale, 6, 6]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    );
  }
  if (item.type === "mannequin") {
    return (
      <group position={[worldX, 0, worldZ]} onClick={onClick} onContextMenu={onContextMenu}>
        <mesh position={[0, 0.05 * scale, 0]}>
          <cylinderGeometry args={[0.55 * scale, 0.55 * scale, 0.1 * scale, 12]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 1.2 * scale, 0]} castShadow>
          <cylinderGeometry args={[0.35 * scale, 0.4 * scale, 2.1 * scale, 12]} />
          <meshStandardMaterial color="#9ca3af" roughness={0.7} />
        </mesh>
        <mesh position={[0, 2.5 * scale, 0]} castShadow>
          <sphereGeometry args={[0.32 * scale, 16, 16]} />
          <meshStandardMaterial color="#9ca3af" roughness={0.7} />
        </mesh>
      </group>
    );
  }
  if (item.type === "flag") {
    return (
      <group position={[worldX, 0, worldZ]} onClick={onClick} onContextMenu={onContextMenu}>
        <mesh position={[0, 0.05 * scale, 0]}>
          <cylinderGeometry args={[0.32 * scale, 0.32 * scale, 0.1 * scale, 10]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, 1.4 * scale, 0]} castShadow>
          <cylinderGeometry args={[0.05 * scale, 0.06 * scale, 2.6 * scale, 8]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
        <mesh position={[0.45 * scale, 2.4 * scale, 0]} castShadow>
          <boxGeometry args={[0.9 * scale, 0.55 * scale, 0.04 * scale]} />
          <meshStandardMaterial color="#ef4444" side={2} />
        </mesh>
      </group>
    );
  }
  return null;
}

function Strokes3D({ strokes, dims }: { strokes: readonly DrawingStroke[]; dims: PitchDimensions }) {
  return (
    <group position={[0, 0.08, 0]}>
      {strokes.map((s) => (
        <StrokeSegments key={s.id} stroke={s} dims={dims} />
      ))}
    </group>
  );
}

function StrokeSegments({ stroke, dims }: { stroke: DrawingStroke; dims: PitchDimensions }) {
  if (stroke.points.length < 2) return null;
  const halfW = dims.width / 2;
  const halfH = dims.length / 2;
  const thickness = (dims.width / 68) * 0.5;
  const headLength = thickness * 4;
  const headWidth = thickness * 3;
  const isArrow = stroke.kind === "arrow";

  if (isArrow) {
    const a = stroke.points[0];
    const b = stroke.points[stroke.points.length - 1];
    if (!a || !b) return null;
    const ax = a.x - halfW;
    const az = a.y - halfH;
    const bx = b.x - halfW;
    const bz = b.y - halfH;
    const dx = bx - ax;
    const dz = bz - az;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.001) return null;
    const angle = Math.atan2(dz, dx);
    const trimmedLen = Math.max(len - headLength * 0.6, 0.01);
    const lineMidX = ax + (dx / len) * (trimmedLen / 2);
    const lineMidZ = az + (dz / len) * (trimmedLen / 2);

    return (
      <group>
        <mesh position={[lineMidX, 0, lineMidZ]} rotation={[-Math.PI / 2, 0, -angle]}>
          <planeGeometry args={[trimmedLen, thickness]} />
          <meshBasicMaterial color={stroke.color} transparent opacity={0.95} />
        </mesh>
        <mesh position={[bx, 0, bz]} rotation={[-Math.PI / 2, 0, -angle]}>
          <shapeGeometry
            attach="geometry"
            args={[buildArrowShape(headLength, headWidth)]}
          />
          <meshBasicMaterial color={stroke.color} transparent opacity={0.95} />
        </mesh>
      </group>
    );
  }

  const segments: { x: number; z: number; len: number; angle: number }[] = [];
  for (let i = 1; i < stroke.points.length; i++) {
    const a = stroke.points[i - 1];
    const b = stroke.points[i];
    if (!a || !b) continue;
    const ax = a.x - halfW;
    const az = a.y - halfH;
    const bx = b.x - halfW;
    const bz = b.y - halfH;
    const dx = bx - ax;
    const dz = bz - az;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.001) continue;
    const angle = Math.atan2(dz, dx);
    segments.push({ x: (ax + bx) / 2, z: (az + bz) / 2, len, angle });
  }
  return (
    <group>
      {segments.map((seg, i) => (
        <mesh key={i} position={[seg.x, 0, seg.z]} rotation={[-Math.PI / 2, 0, -seg.angle]}>
          <planeGeometry args={[seg.len, thickness]} />
          <meshBasicMaterial color={stroke.color} transparent opacity={0.92} />
        </mesh>
      ))}
    </group>
  );
}

function buildArrowShape(length: number, width: number) {
  const shape = new ThreeShape();
  shape.moveTo(0, 0);
  shape.lineTo(-length, width / 2);
  shape.lineTo(-length, -width / 2);
  shape.lineTo(0, 0);
  return shape;
}

function Player3D({ player, dims }: { player: Player; dims: PitchDimensions }) {
  const { camera, gl } = useThree();
  const setSelectedPlayer = useEditorStore((s) => s.setSelectedPlayer);
  const setDraggingPlayer = useEditorStore((s) => s.setDraggingPlayer);
  const movePlayer = usePlayersStore((s) => s.movePlayer);
  const [dragging, setDragging] = useState(false);

  const worldX = (player.px - 0.5) * dims.width;
  const worldZ = (player.py - 0.5) * dims.length;
  const teamColor = player.team === "home" ? "#1e40af" : "#b91c1c";
  const teamHighlight = player.team === "home" ? "#3b82f6" : "#ef4444";
  const shortsColor = "#f1f5f9";
  const socksColor = player.team === "home" ? "#1e3a8a" : "#7f1d1d";
  const skinColor = "#e3b48a";
  const hairColor = "#241c14";
  const bootsColor = "#111111";

  const scale = Math.min(dims.width, dims.length) / 50;

  const legR = 0.17 * scale;
  const legOffset = legR * 1.35;
  const bootH = 0.16 * scale;
  const bootDepth = 0.55 * scale;
  const bootWidth = 0.36 * scale;
  const sockH = 0.42 * scale;
  const thighH = 0.55 * scale;
  const shortsH = 0.42 * scale;
  const torsoH = 1.05 * scale;
  const torsoRBottom = 0.42 * scale;
  const torsoRTop = 0.6 * scale;
  const armR = 0.14 * scale;
  const upperArmH = 0.55 * scale;
  const forearmH = 0.5 * scale;
  const handR = 0.13 * scale;
  const neckR = 0.18 * scale;
  const neckH = 0.16 * scale;
  const headR = 0.38 * scale;
  const armAngle = 0.16;

  const bootCenterY = bootH / 2;
  const sockCenterY = bootH + sockH / 2;
  const thighCenterY = bootH + sockH + thighH / 2;
  const shortsBottomY = bootH + sockH + thighH;
  const shortsCenterY = shortsBottomY + shortsH / 2;
  const torsoBottomY = shortsBottomY + shortsH;
  const torsoCenterY = torsoBottomY + torsoH / 2;
  const shoulderY = torsoBottomY + torsoH;
  const neckCenterY = shoulderY + neckH / 2;
  const headCenterY = shoulderY + neckH + headR;
  const hairCenterY = headCenterY + headR * 0.18;
  const labelHeight = headCenterY + headR + 0.55 * scale;

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

  const labelText = (player.name ? player.name : player.role).toUpperCase();
  const sides: { dir: number; key: string }[] = [
    { dir: -1, key: "L" },
    { dir: 1, key: "R" },
  ];

  return (
    <group
      position={[worldX, 0, worldZ]}
      onPointerDown={onPointerDown}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
    >
      {sides.map(({ dir, key }) => (
        <group key={`leg-${key}`} position={[dir * legOffset, 0, 0]}>
          <mesh position={[0, bootCenterY, bootDepth * 0.2]} castShadow>
            <boxGeometry args={[bootWidth, bootH, bootDepth]} />
            <meshStandardMaterial color={bootsColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, sockCenterY, 0]} castShadow>
            <cylinderGeometry args={[legR * 1.05, legR * 1.15, sockH, 12]} />
            <meshStandardMaterial color={socksColor} roughness={0.85} />
          </mesh>
          <mesh position={[0, thighCenterY, 0]} castShadow>
            <cylinderGeometry args={[legR * 1.15, legR * 1.05, thighH, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, shortsCenterY, 0]} castShadow>
        <cylinderGeometry args={[torsoRBottom * 1.05, torsoRBottom * 1.15, shortsH, 16]} />
        <meshStandardMaterial color={shortsColor} roughness={0.7} />
      </mesh>

      <mesh position={[0, torsoCenterY, 0]} castShadow>
        <cylinderGeometry args={[torsoRTop, torsoRBottom, torsoH, 18]} />
        <meshStandardMaterial
          color={teamColor}
          roughness={0.55}
          metalness={0.1}
          emissive={dragging ? teamHighlight : "#000000"}
          emissiveIntensity={dragging ? 0.35 : 0}
        />
      </mesh>

      <mesh position={[0, torsoBottomY + torsoH * 0.78, 0]} castShadow>
        <torusGeometry args={[torsoRTop * 0.92, torsoRTop * 0.1, 8, 24]} />
        <meshStandardMaterial color={teamHighlight} roughness={0.5} />
      </mesh>

      {sides.map(({ dir, key }) => (
        <group
          key={`arm-${key}`}
          position={[dir * (torsoRTop + armR * 0.4), shoulderY - armR * 0.3, 0]}
          rotation={[0, 0, dir * armAngle]}
        >
          <mesh position={[0, -upperArmH / 2, 0]} castShadow>
            <cylinderGeometry args={[armR, armR * 0.9, upperArmH, 12]} />
            <meshStandardMaterial
              color={teamColor}
              roughness={0.55}
              metalness={0.1}
            />
          </mesh>
          <mesh position={[0, -upperArmH - forearmH / 2, 0]} castShadow>
            <cylinderGeometry args={[armR * 0.85, armR * 0.75, forearmH, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, -upperArmH - forearmH, 0]} castShadow>
            <sphereGeometry args={[handR, 14, 14]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, neckCenterY, 0]} castShadow>
        <cylinderGeometry args={[neckR, neckR * 1.1, neckH, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.75} />
      </mesh>

      <mesh position={[0, headCenterY, 0]} castShadow>
        <sphereGeometry args={[headR, 24, 24]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      <mesh position={[0, hairCenterY, 0]} castShadow>
        <sphereGeometry args={[headR * 1.05, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color={hairColor} roughness={0.95} />
      </mesh>

      <Billboard position={[0, labelHeight, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[1.6 * scale, 0.9 * scale]} />
          <meshBasicMaterial color="#0a0a0a" transparent opacity={0.78} />
        </mesh>
        <mesh position={[-0.55 * scale, 0, -0.01]}>
          <planeGeometry args={[0.5 * scale, 0.9 * scale]} />
          <meshBasicMaterial color={teamColor} />
        </mesh>
        <Text
          position={[-0.55 * scale, 0, 0]}
          fontSize={0.6 * scale}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02 * scale}
          outlineColor="black"
          fontWeight="bold"
        >
          {String(player.number)}
        </Text>
        <Text
          position={[0.1 * scale, 0, 0]}
          fontSize={0.32 * scale}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015 * scale}
          outlineColor="black"
          maxWidth={1 * scale}
          fontWeight="bold"
        >
          {labelText}
        </Text>
      </Billboard>
    </group>
  );
}
