'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { camCurve, lookCurve } from './path';

/**
 * Scroll-driven cinematic camera: flies along a CatmullRom rail,
 * with damped easing and subtle mouse parallax.
 */
export default function CameraRig() {
  const scroll = useScroll();
  const lookTarget = useRef(new THREE.Vector3(0, 2.2, 0));
  const posTarget = useRef(new THREE.Vector3());
  const lookNow = useRef(new THREE.Vector3(0, 2.2, 0));

  useFrame((state, delta) => {
    const t = THREE.MathUtils.clamp(scroll.offset, 0, 1);

    camCurve.getPoint(t, posTarget.current);
    lookCurve.getPoint(t, lookTarget.current);

    // mouse parallax
    const px = state.pointer.x * 0.6;
    const py = state.pointer.y * 0.35;

    const k = 1 - Math.exp(-4.5 * delta); // frame-rate independent damping
    state.camera.position.lerp(
      posTarget.current.clone().add(new THREE.Vector3(px, py, 0)),
      k
    );
    lookNow.current.lerp(
      lookTarget.current.clone().add(new THREE.Vector3(px * 1.4, py * 0.8, 0)),
      k
    );
    state.camera.lookAt(lookNow.current);
  });

  return null;
}
