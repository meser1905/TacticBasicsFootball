"use client";

import dynamic from "next/dynamic";

const Pitch3DLazy = dynamic(() => import("./Pitch3D").then((m) => ({ default: m.Pitch3D })), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex aspect-[16/10] w-full max-w-[1100px] items-center justify-center rounded-lg border border-border bg-[oklch(0.18_0_0)] text-muted-foreground">
      Cargando vista 3D...
    </div>
  ),
});

export function Pitch3D() {
  return <Pitch3DLazy />;
}
