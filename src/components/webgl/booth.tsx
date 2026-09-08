"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";
import { EVENT } from "@/content/media";

const RED = new THREE.Color("#ed1a3b");
const STEEL = new THREE.Color("#c9cdd1");

/** The backlit panel's "R" mark and the floor decal's booth code are both
 *  drawn on a 2D canvas and used as textures -- no SVG trace, no Box3, no
 *  post-mount measurement of any geometry. Every value here is a plain,
 *  hardcoded draw call against a fixed-size canvas. */
function useMarkTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#0f1012";
    ctx.fillRect(0, 0, 512, 512);
    ctx.beginPath();
    ctx.arc(256, 256, 190, 0, Math.PI * 2);
    ctx.fillStyle = "#ed1a3b";
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 260px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("R", 258, 280);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function useBoothCodeTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#e2e4e1";
    ctx.fillRect(0, 0, 1024, 256);
    ctx.fillStyle = "#ed1a3b";
    ctx.font = "700 130px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`BOOTH ${EVENT.booth}`, 512, 138);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Truss() {
  const W = 1.6;
  const H = 1.5;
  const beam = 0.045;
  return (
    <group>
      {[-W / 2, W / 2].map((x) => (
        <mesh key={x} position={[x, H / 2, 0]}>
          <boxGeometry args={[beam, H, beam]} />
          <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, H, 0]}>
        <boxGeometry args={[W + beam, beam, beam]} />
        <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.35} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[(s * W) / 2, H - 0.16, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#2a2c2f" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Panel() {
  const tex = useMarkTexture();
  return (
    <mesh position={[0, 0.78, -0.08]}>
      <planeGeometry args={[1.32, 1.32]} />
      <meshStandardMaterial map={tex} emissive={RED} emissiveIntensity={0.35} emissiveMap={tex} roughness={0.5} />
    </mesh>
  );
}

function FloorDecal() {
  const tex = useBoothCodeTexture();
  return (
    <mesh position={[0, 0.003, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.1, 0.275]} />
      <meshBasicMaterial map={tex} transparent />
    </mesh>
  );
}

function Floor() {
  return (
    <mesh position={[0, -0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.2, 3.2]} />
      <meshStandardMaterial color="#dcdedb" roughness={0.4} metalness={0.08} />
    </mesh>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const azimuth = useRef(0.4);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      azimuth.current += dx * 0.006;
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useFrame((_, dt) => {
    if (!dragging.current) azimuth.current += dt * 0.12;
    if (group.current) group.current.rotation.y = azimuth.current;
  });

  return (
    <group ref={group}>
      <Floor />
      <Truss />
      <Panel />
      <FloorDecal />
      <spotLight position={[-0.7, 1.55, 0.5]} angle={0.55} penumbra={0.6} intensity={9} color="#fff6ec" />
      <spotLight position={[0.7, 1.55, 0.5]} angle={0.55} penumbra={0.6} intensity={9} color="#fff6ec" />
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#eceeeb"]} />
      <fog attach="fog" args={["#eceeeb", 3.4, 6.5]} />
      <Rig />
      <ambientLight intensity={0.65} />
      <directionalLight position={[2, 3, 2]} intensity={0.4} />
    </>
  );
}

export function Booth() {
  const [ready, setReady] = useState<boolean | null>(null);
  const { lost, bind } = useWebglHealth();

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const ctx = c.getContext("webgl2") || c.getContext("webgl");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(!!ctx);
    } catch {
      setReady(false);
    }
  }, []);

  return (
    <div className="booth-host relative aspect-square w-full min-w-0 overflow-hidden rounded-sm bg-panel-2 sm:aspect-[16/9]">
      {ready && !lost ? (
        <Canvas
          camera={{ position: [1.9, 1.7, 2.6], fov: 40 }}
          dpr={[1, 1.5]}
          onCreated={({ gl, camera }) => {
            camera.lookAt(0, 0.55, 0);
            bind(gl.domElement);
          }}
        >
          <Scene />
        </Canvas>
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center">
          <p className="fine text-muted">WebGL unavailable.</p>
        </div>
      )}
    </div>
  );
}
