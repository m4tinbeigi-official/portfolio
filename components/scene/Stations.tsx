'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Billboard, Sparkles } from '@react-three/drei';
import { profile } from '@/data/profile';

const NEON = '#00ff9d';
const SOFT = '#7dffc9';
const CYAN = '#48e6ff';

/* ------------------------------------------------------------------ */
/* ABOUT — holographic specimen globe                                  */
/* ------------------------------------------------------------------ */
export function AboutStation({ position }: { position: [number, number, number] }) {
  const sphere = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sphere.current) sphere.current.rotation.y = t * 0.3;
    if (rings.current) {
      rings.current.rotation.x = t * 0.4;
      rings.current.rotation.z = t * 0.25;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh ref={sphere}>
          <sphereGeometry args={[1.1, 24, 24]} />
          <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={0.5} wireframe toneMapped={false} />
        </mesh>
        <group ref={rings}>
          <mesh>
            <torusGeometry args={[1.6, 0.015, 8, 64]} />
            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.45, 0.015, 8, 64]} />
            <meshStandardMaterial color={SOFT} emissive={SOFT} emissiveIntensity={1.2} toneMapped={false} />
          </mesh>
        </group>
      </Float>
      <Billboard position={[0, 2.4, 0]}>
        <Text fontSize={0.28} color={SOFT} anchorX="center" letterSpacing={0.2} outlineWidth={0.008} outlineColor={NEON}>
          SUBJECT: M.BEIGI
        </Text>
      </Billboard>
      <Sparkles count={40} scale={5} size={3} speed={0.4} color={SOFT} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* EXPERIENCE — floating holo-panels timeline                          */
/* ------------------------------------------------------------------ */
export function TimelineStations({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {profile.experience.map((xp, i) => {
        const x = (i - 1) * 4.2;
        const z = Math.abs(i - 1) * -1.5;
        return (
          <Float key={xp.company} speed={1.1 + i * 0.2} rotationIntensity={0.12} floatIntensity={0.7}>
            <group position={[x, 0.4 * (i % 2), z]} rotation={[0, -0.25 + i * 0.25, 0]}>
              {/* panel */}
              <mesh>
                <planeGeometry args={[3.2, 2]} />
                <meshStandardMaterial
                  color="#02120b"
                  emissive={NEON}
                  emissiveIntensity={0.12}
                  transparent
                  opacity={0.55}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* frame */}
              <mesh>
                <boxGeometry args={[3.3, 2.1, 0.04]} />
                <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={0.9} wireframe toneMapped={false} />
              </mesh>
              <Text position={[0, 0.55, 0.05]} fontSize={0.26} color={SOFT} anchorX="center" letterSpacing={0.06} maxWidth={2.9}>
                {xp.company}
              </Text>
              <Text position={[0, 0.12, 0.05]} fontSize={0.17} color={CYAN} anchorX="center" letterSpacing={0.1} maxWidth={2.9}>
                {xp.role}
              </Text>
              <Text position={[0, -0.28, 0.05]} fontSize={0.13} color="#6fae94" anchorX="center" letterSpacing={0.14}>
                {xp.period}
              </Text>
              {/* base beam */}
              <mesh position={[0, -1.6, 0]}>
                <cylinderGeometry args={[0.03, 0.14, 1.2, 8]} />
                <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={0.8} transparent opacity={0.5} toneMapped={false} />
              </mesh>
            </group>
          </Float>
        );
      })}
      <Billboard position={[0, 2.6, 0]}>
        <Text fontSize={0.34} color={SOFT} anchorX="center" letterSpacing={0.24} outlineWidth={0.01} outlineColor={NEON}>
          CAREER TIMELINE
        </Text>
      </Billboard>
      <Sparkles count={50} scale={9} size={3} speed={0.3} color={NEON} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* PROJECTS — hologram pedestals                                       */
/* ------------------------------------------------------------------ */
function Pedestal({ position, name, index }: { position: [number, number, number]; name: string; index: number }) {
  const gem = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (gem.current) {
      gem.current.rotation.y = state.clock.elapsedTime * (0.5 + index * 0.12);
      gem.current.position.y = 1.7 + Math.sin(state.clock.elapsedTime * 1.4 + index) * 0.12;
    }
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.55, 0.75, 0.7, 24]} />
        <meshStandardMaterial color="#0a1f16" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 24]} />
        <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1.8} toneMapped={false} />
      </mesh>
      {/* hologram beam */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.5, 1.6, 24, 1, true]} />
        <meshBasicMaterial color={NEON} transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={gem} position={[0, 1.7, 0]}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.1} wireframe toneMapped={false} />
      </mesh>
      <Billboard position={[0, 2.6, 0]}>
        <Text fontSize={0.2} color={SOFT} anchorX="center" letterSpacing={0.12}>
          {name}
        </Text>
      </Billboard>
    </group>
  );
}

export function ProjectPedestals({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {profile.projects.map((p, i) => {
        const angle = (i / profile.projects.length) * Math.PI * 2;
        const r = 3.4;
        return (
          <Pedestal
            key={p.name}
            index={i}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            name={p.name}
          />
        );
      })}
      <Billboard position={[0, 3.6, 0]}>
        <Text fontSize={0.34} color={SOFT} anchorX="center" letterSpacing={0.24} outlineWidth={0.01} outlineColor={NEON}>
          EXPERIMENT VAULT
        </Text>
      </Billboard>
      <Sparkles count={60} scale={8} size={3.4} speed={0.35} color={CYAN} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* ACHIEVEMENTS — orbiting trophy ring                                 */
/* ------------------------------------------------------------------ */
export function AchievementRing({ position }: { position: [number, number, number] }) {
  const ring = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ring.current) ring.current.rotation.y = state.clock.elapsedTime * 0.12;
  });
  const items = profile.achievements;
  return (
    <group position={position}>
      <group ref={ring}>
        {items.map((a, i) => {
          const angle = (i / items.length) * Math.PI * 2;
          const r = 3.6;
          return (
            <group key={a.title} position={[Math.cos(angle) * r, Math.sin(i * 1.7) * 0.5, Math.sin(angle) * r]}>
              <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.8}>
                <mesh>
                  <octahedronGeometry args={[0.34, 0]} />
                  <meshStandardMaterial
                    color={i % 2 === 0 ? NEON : CYAN}
                    emissive={i % 2 === 0 ? NEON : CYAN}
                    emissiveIntensity={1.2}
                    toneMapped={false}
                  />
                </mesh>
              </Float>
              <Billboard position={[0, 0.75, 0]}>
                <Text fontSize={0.14} color={SOFT} anchorX="center" letterSpacing={0.1} maxWidth={2}>
                  {a.title}
                </Text>
              </Billboard>
            </group>
          );
        })}
      </group>
      <Billboard position={[0, 2.8, 0]}>
        <Text fontSize={0.34} color={SOFT} anchorX="center" letterSpacing={0.24} outlineWidth={0.01} outlineColor={NEON}>
          TROPHY CHAMBER
        </Text>
      </Billboard>
      <Sparkles count={50} scale={8} size={3} speed={0.4} color={SOFT} />
    </group>
  );
}
