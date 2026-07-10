/** @type {import('next').NextConfig} */

// Base path is injected by the GitHub Actions workflow:
//   - project site (github.com/<user>/<repo>)  -> "/<repo>"
//   - user site   (<user>.github.io repo)      -> ""
// Locally it defaults to "" so `npm run dev` just works.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',            // static export -> ./out (required for GitHub Pages)
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,         // folder/index.html URLs, safest on Pages
  images: { unoptimized: true }, // no image optimization server on Pages
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

module.exports = nextConfig;
