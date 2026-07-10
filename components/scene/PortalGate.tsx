'use client';

import { useMemo, useRef } from 'react';
// (material is driven directly via the memoized instance below)
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec2 c = vUv - 0.5;
    float r = length(c) * 2.0;
    float a = atan(c.y, c.x);

    float swirl = a + uTime * 0.9 + (1.0 - r) * 7.0;
    float bands = sin(swirl * 3.0 + r * 12.0 - uTime * 2.4) * 0.5 + 0.5;
    float core = smoothstep(0.55, 0.0, r);

    vec3 deep  = vec3(0.00, 0.45, 0.22);
    vec3 neon  = vec3(0.00, 1.00, 0.42);
    vec3 flash = vec3(0.65, 1.00, 0.85);
    vec3 col = mix(deep, neon, bands);
    col = mix(col, flash, core * 0.8);

    float alpha = smoothstep(1.0, 0.82, r) * (0.35 + 0.65 * bands);
    alpha = max(alpha, core);
    gl_FragColor = vec4(col, alpha);
  }
`;

interface PortalGateProps {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
}

/** Swirling green portal: shader disc + emissive rings + sparkles + light. */
export default function PortalGate({ position = [0, 2.2, 0], scale = 1.6, rotationY = 0 }: PortalGateProps) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { uTime: { value: 0 } },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (ringA.current) ringA.current.rotation.z = state.clock.elapsedTime * 0.35;
    if (ringB.current) ringB.current.rotation.z = -state.clock.elapsedTime * 0.22;
  });

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* swirling event horizon */}
      <mesh>
        <circleGeometry args={[1.35, 64]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* rotating containment rings */}
      <mesh ref={ringA}>
        <torusGeometry args={[1.5, 0.045, 16, 96]} />
        <meshStandardMaterial color="#00ff9d" emissive="#00ff9d" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[1.68, 0.02, 12, 96]} />
        <meshStandardMaterial color="#48e6ff" emissive="#48e6ff" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>

      <Sparkles count={60} scale={4} size={4} speed={0.5} color="#7dffc9" />
      <pointLight color="#00ff9d" intensity={26} distance={22} decay={2} />
    </group>
  );
}
