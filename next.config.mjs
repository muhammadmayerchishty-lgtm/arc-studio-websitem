import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
    ],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
