# Rick Sanchez — Interdimensional 3D Portfolio

Immersive laboratory-themed 3D portfolio for **Rick Sanchez (Matin Beigi)**, built with Next.js 14, React Three Fiber, Three.js, GSAP and Framer Motion. Scroll = a cinematic camera flight through a neon lab: portal → specimen chamber → career timeline → experiment vault → DNA skill helix → trophy chamber → contact portal.

## Stack

Next.js 14 (App Router, static export) · TypeScript · Three.js · @react-three/fiber + drei · GSAP (boot sequence) · Framer Motion (overlay UI) · custom GLSL portal shader.

## Deploy to GitHub Pages (2 minutes)

1. Create a GitHub repo (any name; `<username>.github.io` also works).
2. Push this folder:

   ```bash
   cd rick-sanchez-portfolio
   git init -b main
   git add -A && git commit -m "🧪 open the portal"
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Source → GitHub Actions**.
4. Done. Every push to `main` triggers `.github/workflows/deploy.yml`, which:
   - computes the base path automatically (`/<repo>` for project sites, empty for `<username>.github.io`),
   - builds the static export to `out/`,
   - deploys it to Pages.

No manual base-path editing needed — `next.config.js` reads `NEXT_PUBLIC_BASE_PATH` injected by the workflow.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run preview    # serve ./out locally
```

## Editing your content

Everything — name, roles, dates, projects, skills, achievements, socials — lives in **`data/profile.ts`**. Items marked `TODO` were inferred from public sources (LinkedIn blocks scraping); fix titles and dates there and the whole site (3D labels included) updates.

## Structure

```
app/                 layout, page, global styles
components/
  Experience.tsx     <Canvas> + ScrollControls composition
  Overlay.tsx        HTML content sections (Framer Motion)
  LoadingScreen.tsx  GSAP portal-calibration boot screen
  scene/
    path.ts          camera rail (CatmullRom) + floor conduit
    CameraRig.tsx    scroll-driven cinematic camera + parallax
    PortalGate.tsx   GLSL swirl portal + rings
    Laboratory.tsx   grid floor, columns, debris, lights
    Stations.tsx     about globe, timeline panels, pedestals, trophies
    SkillsHelix.tsx  DNA double helix of skills
data/profile.ts      ALL site content (edit me)
.github/workflows/   GitHub Pages deploy pipeline
```

## Performance notes

Adaptive DPR, no external 3D assets (everything procedural — instant first load), fog-limited draw distance, single canvas, damped scroll. Tested layout is responsive down to mobile; heavy 3D labels use troika text rendered on GPU.
