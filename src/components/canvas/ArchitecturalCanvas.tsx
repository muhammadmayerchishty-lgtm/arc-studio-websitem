'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function ArchitecturalStructure() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={[0, 0, 0]}>
        {/* Subtle geometric architectural rings and arcs */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.2, 0.015, 16, 100, Math.PI * 1.8]} />
          <meshStandardMaterial
            color="#dec397"
            metalness={0.8}
            roughness={0.2}
            emissive="#c9a36b"
            emissiveIntensity={0.25}
          />
        </mesh>

        <mesh rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[2.5, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#c9a36b"
            metalness={0.9}
            roughness={0.3}
            wireframe={true}
          />
        </mesh>

        {/* Minimalist central architectural wireframe prism */}
        <mesh>
          <octahedronGeometry args={[1.6, 0]} />
          <meshStandardMaterial
            color="#dfc295"
            wireframe={true}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

export const ArchitecturalCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ece4d6" />
        <pointLight position={[-10, -5, -5]} intensity={0.8} color="#c9a36b" />
        <ArchitecturalStructure />
      </Canvas>
    </div>
  );
};

export default ArchitecturalCanvas;
