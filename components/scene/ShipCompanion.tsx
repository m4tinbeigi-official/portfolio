'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScroll, Sparkles } from '@react-three/drei';
import { camCurve } from './path';

const UP = new THREE.Vector3(0, 1, 0);
const NEON = '#00ff9d';
const CYAN = '#48e6ff';

/**
 * The saucer. A procedural flying-saucer wingman that escorts the visitor
 * through the whole lab — flying slightly ahead of the camera rail,
 * bobbing, banking and spinning its rim. Tiny blue-haired pilot included.
 */
export default function ShipCompanion() {
  const ship = useRef<THREE.Group>(null);
  const rim = useRef<THREE.Group>(null);
  const engine = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  const pos = useRef(new THREE.Vector3(4, 4.5, 6));
  const dest = useRef(new THREE.Vector3());
  const railPoint = useRef(new THREE.Vector3());
  const tangent = useRef(new THREE.Vector3());
  const side = useRef(new THREE.Vector3());
  const lookPt = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!ship.current) return;
    const time = state.clock.elapsedTime;

    // fly slightly ahead of the camera along the rail, offset to the side
    const t = THREE.MathUtils.clamp(scroll.offset + 0.05, 0, 1);
    camCurve.getPoint(t, railPoint.current);
    camCurve.getTangent(t, tangent.current).normalize();
    side.current.crossVectors(tangent.current, UP).normalize();

    dest.current
      .copy(railPoint.current)
      .addScaledVector(side.current, 3.4)
      .addScaledVector(UP, 2.3 + Math.sin(time * 1.2) * 0.3);

    const k = 1 - Math.exp(-2.6 * delta);
    pos.current.lerp(dest.current, k);
    ship.current.position.copy(pos.current);

    // face direction of travel, with a lazy banking roll
    lookPt.current.copy(pos.current).add(tangent.current);
    ship.current.lookAt(lookPt.current);
    ship.current.rotation.z += Math.sin(time * 0.85) * 0.12;

    if (rim.current) rim.current.rotation.y = time * 1.6;
    if (engine.current) {
      const m = engine.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.6 + Math.sin(time * 6) * 0.5;
    }
  });

  return (
    <group ref={ship} scale={1.1}>
      {/* hull */}
      <mesh scale={[1, 0.32, 1]}>
        <sphereGeometry args={[1.15, 32, 24]} />
        <meshStandardMaterial color="#2a3a32" metalness={0.9} roughness={0.28} />
      </mesh>

      {/* spinning rim with nav lights */}
      <group ref={rim}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.18, 0.13, 12, 48]} />
          <meshStandardMaterial color="#141f19" metalness={0.85} roughness={0.35} />
        </mesh>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.18, 0, Math.sin(a) * 1.18]}>
              <sphereGeometry args={[0.07, 10, 10]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? NEON : CYAN}
                emissive={i % 2 === 0 ? NEON : CYAN}
                emissiveIntensity={2.2}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>

      {/* glass dome */}
      <mesh position={[0, 0.26, 0]}>
        <sphereGeometry args={[0.54, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={CYAN}
          transparent
          opacity={0.28}
          emissive={CYAN}
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* tiny pilot silhouette (white coat, spiky blue hair) */}
      <group position={[0, 0.3, 0]}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.09, 0.12, 0.2, 10]} />
          <meshStandardMaterial color="#e8f2ec" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color="#d9e8dd" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.36, 0]} scale={[1.4, 0.7, 1.4]}>
          <icosahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#9ad7e8" roughness={0.4} />
        </mesh>
      </group>

      {/* engine glow */}
      <mesh ref={engine} position={[0, -0.34, 0]}>
        <cylinderGeometry args={[0.3, 0.44, 0.16, 24]} />
        <meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1.8} toneMapped={false} />
      </mesh>
      <pointLight position={[0, -0.7, 0]} color={NEON} intensity={9} distance={11} decay={2} />

      {/* exhaust particles */}
      <Sparkles count={24} scale={[1.6, 1.2, 1.6]} size={3} speed={1.2} color="#7dffc9" position={[0, -0.8, 0]} />
    </group>
  );
}
