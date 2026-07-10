'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Stars, AdaptiveDpr, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import CameraRig from './scene/CameraRig';
import ShipCompanion from './scene/ShipCompanion';
import Laboratory from './scene/Laboratory';
import PortalGate from './scene/PortalGate';
import SkillsHelix from './scene/SkillsHelix';
import { AboutStation, TimelineStations, ProjectPedestals, AchievementRing } from './scene/Stations';
import Overlay from './Overlay';

export default function Experience() {
  return (
    <div className="canvas-wrap">
      <Canvas
        camera={{ fov: 55, near: 0.1, far: 220, position: [0, 2, 12] }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020409']} />
        <fog attach="fog" args={['#020409', 16, 95]} />

        <ambientLight intensity={0.28} />
        <hemisphereLight args={['#0e3b2a', '#020409', 0.5]} />

        <ScrollControls pages={7} damping={0.18}>
          <CameraRig />
          <ShipCompanion />

          <Laboratory />

          {/* 0 — HERO */}
          <PortalGate position={[0, 2.2, 0]} scale={1.6} />

          {/* 1 — ABOUT */}
          <AboutStation position={[0, 2, -14]} />

          {/* 2 — EXPERIENCE */}
          <TimelineStations position={[14, 2.2, -28]} />

          {/* 3 — PROJECTS */}
          <ProjectPedestals position={[-8, 0, -44]} />

          {/* 4 — SKILLS */}
          <SkillsHelix position={[-14, 3, -62]} />

          {/* 5 — ACHIEVEMENTS */}
          <AchievementRing position={[0, 2, -80]} />

          {/* 6 — CONTACT */}
          <PortalGate position={[0, 2.5, -102]} scale={2.2} />

          <Scroll html style={{ width: '100%' }}>
            <Overlay />
          </Scroll>
        </ScrollControls>

        <Stars radius={130} depth={60} count={2400} factor={4} saturation={0} fade speed={0.5} />

        {/* cinematic grade: HDR bloom on all emissive/neon surfaces + vignette */}
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.95} luminanceThreshold={0.85} luminanceSmoothing={0.25} />
          <Vignette eskil={false} offset={0.18} darkness={0.72} />
        </EffectComposer>

        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
    </div>
  );
}
