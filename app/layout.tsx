import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rick Sanchez — Interdimensional Portfolio',
  description:
    'Immersive 3D laboratory portfolio of Rick Sanchez (Matin Beigi) — Software Engineer, PHP & WordPress specialist, open-source maintainer and community builder.',
  keywords: ['Matin Beigi', 'Rick Sanchez', 'portfolio', 'PHP', 'WordPress', 'developer', '3D'],
};

export const viewport: Viewport = {
  themeColor: '#020409',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
