'use client';

import React, { useRef, useState, useEffect, Suspense, Component, ErrorInfo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { TurntableBase } from './TurntableBase';
import { VillaAurora } from './VillaAurora';
import { NoirResidence } from './NoirResidence';
import { DuneHouse } from './DuneHouse';
import { LumenPenthouse } from './LumenPenthouse';
import { ArcPavilion } from './ArcPavilion';

// Bespoke architectural camera viewpoints for each home
const CAMERA_VIEWPOINTS: [number, number, number][] = [
  [0, 5.5, 11],       // Villa Aurora: balanced perspective of cantilever and pool
  [-3.2, 5.8, 10.5],  // Noir Residence: angled view of monolithic black massing and courtyard
  [3.2, 5.4, 10.5],   // Dune House: portico arches and pergola terrace
  [0, 6.8, 11.5],     // Lumen Penthouse: high-rise glass crown and panoramic rotunda
  [3.0, 5.2, 10.5],   // Arc Pavilion: sweeping curved roof and brass ribbon
];

function CameraController({
  activeProjectIndex,
  isInteracting,
  reducedMotion = false,
}: {
  activeProjectIndex: number;
  isInteracting: boolean;
  reducedMotion?: boolean;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...CAMERA_VIEWPOINTS[activeProjectIndex]));

  useEffect(() => {
    targetPos.current.set(...CAMERA_VIEWPOINTS[activeProjectIndex]);
    if (reducedMotion) {
      camera.position.set(...CAMERA_VIEWPOINTS[activeProjectIndex]);
    }
  }, [activeProjectIndex, camera, reducedMotion]);

  useFrame((_, delta) => {
    if (!isInteracting && !reducedMotion) {
      camera.position.lerp(targetPos.current, Math.min(delta * 2.0, 0.08));
    }
  });

  return null;
}

// Turntable Rotation Controller
function RotatingScene({
  activeProjectIndex,
  isInteracting,
  reducedMotion = false,
}: {
  activeProjectIndex: number;
  isInteracting: boolean;
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !isInteracting && !reducedMotion) {
      // Gentle turntable rotation
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <TurntableBase />

      {/* Render active procedural house */}
      {activeProjectIndex === 0 && <VillaAurora />}
      {activeProjectIndex === 1 && <NoirResidence />}
      {activeProjectIndex === 2 && <DuneHouse />}
      {activeProjectIndex === 3 && <LumenPenthouse />}
      {activeProjectIndex === 4 && <ArcPavilion />}
    </group>
  );
}

// Error Boundary with static image fallback
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackImage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ProjectCanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ProjectsCanvas 3D Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-basalt-surface rounded-[20px] overflow-hidden border border-brass/20">
          <img
            src={this.props.fallbackImage || '/images/hero-villa.jpg'}
            alt="Arc Studio Villa Architecture"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="relative z-10 p-6 text-center max-w-sm bg-basalt/80 backdrop-blur-md rounded-2xl border border-brass/30">
            <span className="font-mono text-xs uppercase tracking-widest text-brass">
              Architectural Render
            </span>
            <h4 className="font-display text-2xl text-bone mt-2 font-light">
              Interactive 3D Preview
            </h4>
            <p className="font-body text-xs text-smoke mt-2">
              Viewing static architectural capture.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

interface ProjectsCanvasProps {
  activeProjectIndex: number;
  className?: string;
  isTransitioning?: boolean;
}

export const ProjectsCanvas: React.FC<ProjectsCanvasProps> = ({
  activeProjectIndex,
  className = '',
  isTransitioning = false,
}) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [dpr, setDpr] = useState<number>(1.5);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', motionListener);

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile lower dpr for high FPS
      setDpr(mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      media.removeEventListener('change', motionListener);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <ProjectCanvasErrorBoundary fallbackImage="/images/hero-villa.jpg">
      <div
        className={`relative w-full h-full min-h-[460px] sm:min-h-[580px] rounded-[20px] overflow-hidden transition-all duration-500 will-change-transform ${
          isTransitioning ? 'opacity-40 blur-sm scale-[0.99]' : 'opacity-100 blur-0 scale-100'
        } ${className}`}
      >
        <Canvas
          camera={{ position: [0, 6, 11], fov: 42 }}
          dpr={dpr}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          shadows={!isMobile}
        >
          {/* Ambient Lighting & Dusk Atmosphere */}
          <ambientLight intensity={0.65} color="#ece4d6" />

          {/* Warm Sun Directional Light */}
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.8}
            color="#ffe6c4"
            castShadow={!isMobile}
            shadow-mapSize-width={isMobile ? 512 : 1024}
            shadow-mapSize-height={isMobile ? 512 : 1024}
            shadow-bias={-0.0001}
          />

          {/* Warm Brass Specular Rim Light */}
          <pointLight
            position={[-8, 4, -8]}
            intensity={2.8}
            color="#dfc295"
            distance={25}
          />
          <pointLight
            position={[8, 3, -6]}
            intensity={1.8}
            color="#c9a36b"
            distance={20}
          />

          <Suspense fallback={null}>
            {/* Dusk HDR-like Environment Preset */}
            <Environment preset="sunset" />

            {/* Camera Viewpoint Smooth Lerp Transition */}
            <CameraController
              activeProjectIndex={activeProjectIndex}
              isInteracting={isInteracting}
              reducedMotion={reducedMotion}
            />

            {/* Rotating Turntable with Active House */}
            <RotatingScene
              activeProjectIndex={activeProjectIndex}
              isInteracting={isInteracting}
              reducedMotion={reducedMotion}
            />

            {/* Soft Contact Shadows on Turntable Floor */}
            <ContactShadows
              position={[0, -0.16, 0]}
              opacity={0.65}
              scale={16}
              blur={2.4}
              far={4}
              color="#000000"
            />
          </Suspense>

          {/* User Interaction Controls: Drag to Rotate */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={6}
            maxDistance={20}
            enableDamping={true}
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 - 0.05} // Do not dip below foundation slab
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
          />
        </Canvas>
      </div>
    </ProjectCanvasErrorBoundary>
  );
};

export default ProjectsCanvas;
