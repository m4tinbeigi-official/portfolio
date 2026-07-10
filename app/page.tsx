'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';

// Three.js must never render on the server / at export time
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });

function Hud() {
  return (
    <>
      <div className="hud hud--tl">
        RS_LABS // PORTFOLIO.EXE
        <br />
        <span style={{ opacity: 0.6 }}>v4.2.0 — build C137</span>
      </div>
      <div className="hud hud--tr">
        <span className="dot" />
        DIMENSION C-137 · ONLINE
        <br />
        <span style={{ opacity: 0.6 }}>SUBJECT: M. BEIGI</span>
      </div>
      <div className="hud hud--bc">
        SCROLL TO ENTER THE LAB
        <span className="scroll-line" />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <Experience />
      <Hud />
    </main>
  );
}
