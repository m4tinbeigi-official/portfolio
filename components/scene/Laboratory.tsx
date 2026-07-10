'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Grid, Line, Float } from '@react-three/drei';
import { conduitPoints } from './path';

const COLUMNS: [number, number, number][] = [
  [-6, 0, -4], [6, 0, -4],
  [-7, 0, -14], [7, 0, -14],
  [10, 0, -24], [2, 0, -26],
  [18, 0, -32], [-2, 0, -38],
  [-12, 0, -44], [-4, 0, -48],
  [-18, 0, -56], [-8, 0, -58],
  [-12, 0, -72], [-2, 0, -74],
  [-5, 0, -86], [5, 0, -86],
  [-6, 0, -98], [6, 0, -98],
];

function Column({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[0.35, 6, 0.35]} />
        <meshStandardMaterial color="#0a1f16" metalness={0.8} roughness={0.35} />
      </mesh>
      {/* energy core strip */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[0.12, 5.6, 0.42]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <mesh position={[0, 6.15, 0]}>
        <boxGeometry args={[0.7, 0.3, 0.7]} />
        <meshStandardMaterial color="#0d2a1e" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Floating lab debris — beakers abstracted as glowing shapes. */
function Debris() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <group ref={group}>
      {[
        [-14, 5, -30], [16, 6, -40], [-20, 7, -66], [8, 5.5, -70], [12, 7, -12], [-16, 6, -90],
      ].map((p, i) => (
        <Float key={i} speed={1.2 + (i % 3) * 0.4} rotationIntensity={0.8} floatIntensity={1.4}>
          <mesh position={p as [number, number, number]}>
            {i % 2 === 0 ? <icosahedronGeometry args={[0.5, 0]} /> : <octahedronGeometry args={[0.5, 0]} />}
            <meshStandardMaterial
              color={i % 3 === 0 ? '#48e6ff' : '#00ff9d'}
              emissive={i % 3 === 0 ? '#48e6ff' : '#00ff9d'}
              emissiveIntensity={0.9}
              wireframe
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** The laboratory environment: infinite grid floor, columns, energy conduit. */
export default function Laboratory() {
  return (
    <group>
      <Grid
        position={[0, 0, -45]}
        args={[10.5, 10.5]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#0c3b28"
        sectionSize={5}
        sectionThickness={1.1}
        sectionColor="#00ff9d"
        fadeDistance={70}
        fadeStrength={1.5}
        infiniteGrid
        followCamera
      />

      {/* energy conduit tracing the visitor's route */}
      <Line points={conduitPoints} color="#00ff9d" lineWidth={1.5} transparent opacity={0.4} />

      {COLUMNS.map((p, i) => (
        <Column key={i} position={p} />
      ))}

      <Debris />

      {/* zone lights along the route */}
      <pointLight position={[14, 6, -28]} color="#48e6ff" intensity={14} distance={26} decay={2} />
      <pointLight position={[-8, 5, -44]} color="#00ff9d" intensity={14} distance={26} decay={2} />
      <pointLight position={[-14, 7, -62]} color="#48e6ff" intensity={14} distance={26} decay={2} />
      <pointLight position={[0, 6, -80]} color="#00ff9d" intensity={14} distance={26} decay={2} />
    </group>
  );
}
