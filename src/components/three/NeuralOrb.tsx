"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A glowing wireframe icosahedron ("neural core") wrapped in a slowly
 * rotating point cloud. Rendered inside a transparent R3F canvas so it sits
 * over the hero background. Loaded via dynamic import (ssr: false).
 * Optimized to use native React Three Fiber elements instead of Drei.
 */
function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.25;
      mesh.current.rotation.x += delta * 0.12;
      // bobbing/float simulation (Float speed=1.4, floatIntensity=1.2, rotationIntensity=0.6)
      mesh.current.position.y = Math.sin(time * 1.4) * 0.15;
      mesh.current.rotation.z = Math.sin(time * 0.7) * 0.1;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.4;
      inner.current.position.y = Math.sin(time * 1.4) * 0.15;
    }
  });

  return (
    <group>
      {/* Outer glowing wireframe shell */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Inner solid core with emissive glow */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </group>
  );
}

function ParticleCloud({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute points on a fuzzy sphere shell
      const r = 2.6 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#3b82f6"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function NeuralOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={1.2} color="#a855f7" />

      <Core />
      <ParticleCloud />
    </Canvas>
  );
}
