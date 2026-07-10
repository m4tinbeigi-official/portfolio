import * as THREE from 'three';

/**
 * Cinematic camera rail through the laboratory.
 * Stop i corresponds to overlay section i (7 sections total).
 * getPoint(i / 6) lands exactly on control point i (CatmullRom property).
 */
export const CAM_STOPS: [number, number, number][] = [
  [0, 2.0, 12],     // 0 hero — facing the portal
  [0, 2.2, -6],     // 1 about — just passed through the portal
  [5, 2.8, -20],    // 2 experience — banking right toward the timeline
  [2, 2.4, -36],    // 3 projects — swinging left to the pedestals
  [-9, 3.0, -52],   // 4 skills — approaching the DNA helix
  [-7, 2.6, -71],   // 5 achievements — the trophy ring
  [0, 2.8, -90],    // 6 contact — final portal
];

export const LOOK_STOPS: [number, number, number][] = [
  [0, 2.2, 0],
  [0, 2.0, -14],
  [14, 2.2, -28],
  [-8, 1.8, -44],
  [-14, 3.0, -62],
  [0, 2.0, -80],
  [0, 2.5, -102],
];

const toV3 = (p: [number, number, number]) => new THREE.Vector3(p[0], p[1], p[2]);

export const camCurve = new THREE.CatmullRomCurve3(CAM_STOPS.map(toV3), false, 'catmullrom', 0.35);
export const lookCurve = new THREE.CatmullRomCurve3(LOOK_STOPS.map(toV3), false, 'catmullrom', 0.35);

/** Glowing energy conduit traced on the lab floor, following the camera rail. */
export const conduitPoints: THREE.Vector3[] = camCurve
  .getPoints(120)
  .map((p) => new THREE.Vector3(p.x, 0.04, p.z));
