'use client';

import React from 'react';

export const VillaAurora: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Ground Floor Main Living Pavilion (Black Slate & Glazing) */}
      <mesh castShadow receiveShadow position={[-0.5, 0.75, 0]}>
        <boxGeometry args={[4.2, 1.5, 3.2]} />
        <meshStandardMaterial color="#1e1d1b" roughness={0.7} />
      </mesh>

      {/* Front Floor-to-Ceiling Glazed Facade */}
      <mesh position={[-0.45, 0.75, 1.62]}>
        <planeGeometry args={[3.8, 1.35]} />
        <meshPhysicalMaterial
          color="#d2e5ed"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Warm Interior Glow Light */}
      <pointLight position={[-0.5, 0.9, 0.2]} intensity={1.5} distance={5} color="#dec397" />

      {/* Cantilevered Walnut Second Floor Volume */}
      <mesh castShadow receiveShadow position={[0.8, 2.0, -0.2]}>
        <boxGeometry args={[3.6, 1.2, 2.8]} />
        <meshStandardMaterial color="#36281e" roughness={0.6} />
      </mesh>

      {/* Second Floor Master Bedroom Ribbon Window */}
      <mesh position={[0.8, 2.0, 1.22]}>
        <planeGeometry args={[3.2, 0.7]} />
        <meshPhysicalMaterial
          color="#d2e5ed"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Signature Floating Flat Roof (Deep Cantilever) */}
      <group position={[0.4, 2.7, 0]}>
        {/* Main Cantilever Slab (Black Slate) */}
        <mesh castShadow receiveShadow position={[0, 0.08, 0]}>
          <boxGeometry args={[5.8, 0.16, 4.4]} />
          <meshStandardMaterial color="#121110" roughness={0.6} metalness={0.2} />
        </mesh>
        {/* Walnut Underside Cladding */}
        <mesh position={[0, -0.01, 0]}>
          <boxGeometry args={[5.7, 0.02, 4.3]} />
          <meshStandardMaterial color="#543c2a" roughness={0.5} />
        </mesh>
        {/* Brass Edge Detail Trims */}
        <mesh position={[0, 0.08, 2.21]}>
          <boxGeometry args={[5.82, 0.17, 0.03]} />
          <meshStandardMaterial color="#c9a36b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Slender Structural Brass Columns Supporting the Floating Roof */}
      <mesh position={[-2.2, 1.35, 1.8]}>
        <cylinderGeometry args={[0.04, 0.04, 2.7, 16]} />
        <meshStandardMaterial color="#c9a36b" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[-2.2, 1.35, -1.8]}>
        <cylinderGeometry args={[0.04, 0.04, 2.7, 16]} />
        <meshStandardMaterial color="#c9a36b" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Outdoor Reflecting Pool with Water Shader Surface */}
      <group position={[-1.2, 0.02, 2.8]}>
        {/* Pool Basin Rim */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[3.2, 0.12, 1.4]} />
          <meshStandardMaterial color="#1b1a18" roughness={0.8} />
        </mesh>
        {/* Water Surface Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[3.0, 1.2]} />
          <meshPhysicalMaterial
            color="#2a5360"
            emissive="#122f3b"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
            roughness={0.05}
            metalness={0.1}
          />
        </mesh>
        {/* Underwater Pool Luminaire */}
        <pointLight position={[0, 0.1, 0]} color="#429dbb" intensity={0.9} distance={3} />
      </group>

      {/* Floating Wooden Stepping Stones */}
      {[-0.8, -0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0.06, 3.7]}>
          <boxGeometry args={[0.5, 0.04, 0.4]} />
          <meshStandardMaterial color="#543c2a" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};

export default VillaAurora;
