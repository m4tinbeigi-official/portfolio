'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard, Line, Sparkles } from '@react-three/drei';
import { profile } from '@/data/profile';

const NEON = '#00ff9d';
const SOFT = '#7dffc9';
const CYAN = '#48e6ff';

const TURNS = Math.PI * 3.5;
const HEIGHT = 6;
const RADIUS = 1.5;

function helixPoint(t: number, phase: number): THREE.Vector3 {
  const angle = t * TURNS + phase;
  return new THREE.Vector3(Math.cos(angle) * RADIUS, t * HEIGHT - HEIGHT / 2, Math.sin(angle) * RADIUS);
}

/** Rotating DNA double-helix — each skill is a glowing node on a strand. */
export default function SkillsHelix({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  const { strandA, strandB, nodes } = useMemo(() => {
    const a: THREE.Vector3[] = [];
    const b: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      a.push(helixPoint(t, 0));
      b.push(helixPoint(t, Math.PI));
    }
    const n = profile.skills.map((s, i) => {
      const t = i / Math.max(profile.skills.length - 1, 1);
      return { skill: s, pos: helixPoint(t, i % 2 === 0 ? 0 : Math.PI) };
    });
    return { strandA: a, strandB: b, nodes: n };
  }, []);

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <group position={position}>
      <group ref={group}>
        <Line points={strandA} color={NEON} lineWidth={2} transparent opacity={0.8} />
        <Line points={strandB} color={CYAN} lineWidth={2} transparent opacity={0.8} />
        {nodes.map(({ skill, pos }, i) => (
          <group key={skill.name} position={pos}>
            <mesh>
              <sphereGeometry args={[0.14 + (skill.level / 100) * 0.1, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? NEON : CYAN}
                emissive={i % 2 === 0 ? NEON : CYAN}
                emissiveIntensity={1.4}
                toneMapped={false}
              />
            </mesh>
            <Billboard position={[0, 0.38, 0]}>
              <Text fontSize={0.16} color={SOFT} anchorX="center" letterSpacing={0.08}>
                {skill.name}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>
      <Billboard position={[0, 4.2, 0]}>
        <Text fontSize={0.34} color={SOFT} anchorX="center" letterSpacing={0.24} outlineWidth={0.01} outlineColor={NEON}>
          SKILL GENOME
        </Text>
      </Billboard>
      <Sparkles count={70} scale={7} size={3} speed={0.4} color={NEON} />
      <pointLight color={NEON} intensity={10} distance={16} decay={2} />
    </group>
  );
}
