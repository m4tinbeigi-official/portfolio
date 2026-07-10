'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Cinematic "portal calibration" boot sequence.
 * GSAP drives the counter, bar and glitch flicker, then fades the veil.
 */
export default function LoadingScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline();

    tl.to(counter, {
      v: 100,
      duration: 2.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (pctRef.current) {
          pctRef.current.textContent = `CALIBRATING PORTAL · ${Math.round(counter.v)}%`;
        }
      },
    });
    tl.to(barRef.current, { width: '100%', duration: 2.1, ease: 'power2.inOut' }, 0);

    // glitch flickers on the title while charging
    tl.to(titleRef.current, { opacity: 0.25, duration: 0.05, yoyo: true, repeat: 5, repeatDelay: 0.28 }, 0.4);

    tl.to(rootRef.current, {
      opacity: 0,
      duration: 0.7,
      delay: 0.25,
      ease: 'power2.out',
      onComplete: () => setDone(true),
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader-ring" />
      <div className="loader-title" ref={titleRef}>
        RICK SANCHEZ
      </div>
      <div className="loader-bar-track">
        <div className="loader-bar" ref={barRef} />
      </div>
      <div className="loader-pct" ref={pctRef}>
        CALIBRATING PORTAL · 0%
      </div>
    </div>
  );
}
