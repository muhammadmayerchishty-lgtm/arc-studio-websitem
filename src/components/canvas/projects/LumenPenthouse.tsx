'use client';

import React from 'react';

export const LumenPenthouse: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Lower Sub-Structure Core (Gulberg Glass High-Rise Crown) */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 1.2, 32]} />
        <meshStandardMaterial color="#1a1d20" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Main Penthouse Tier 1: Floor-to-Ceiling Panoramic Glass Rotunda */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.9, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#d5e8f0"
          transparent
          opacity={0.3}
          roughness={0.05}
          metalness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Internal Penthouse Core & Architectural Columns */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.9, 16]} />
        <meshStandardMaterial color="#2d2822" roughness={0.7} />
      </mesh>

      {/* Glowing Warm Interior Chandelier Light */}
      <pointLight position={[0, 1.65, 0]} color="#dec397" intensity={2.5} distance={5} />

      {/* Architectural Brass Perimeter Mullions */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 1.88;
        const z = Math.sin(rad) * 1.88;
        return (
          <mesh key={idx} position={[x, 1.6, z]}>
            <cylinderGeometry args={[0.025, 0.025, 0.9, 8]} />
            <meshStandardMaterial color="#c9a36b" metalness={0.9} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Interstitial Floating Slab with Sweeping Curved Terrace */}
      <group position={[0, 2.1, 0]}>
        {/* Main Floor Slab */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.08, 32]} />
          <meshStandardMaterial color="#151719" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Curved Balustrade Glass */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[2.48, 2.48, 0.6, 32, 1, true]} />
          <meshPhysicalMaterial color="#cde4f0" transparent opacity={0.25} roughness={0.05} />
        </mesh>
        {/* Brass Cap Railing */}
        <mesh position={[0, 0.65, 0]}>
          <torusGeometry args={[2.48, 0.02, 12, 64]} />
          <meshStandardMaterial color="#c9a36b" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Upper Penthouse Mezzanine & Sky Lounge */}
      <mesh position={[0, 2.7, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 1.0, 32, 1, true]} />
        <meshPhysicalMaterial color="#d5e8f0" transparent opacity={0.35} roughness={0.05} />
      </mesh>

      {/* Cantilevered Sculptural Sky Canopy Roof */}
      <mesh castShadow position={[0, 3.3, 0]}>
        <cylinderGeometry args={[2.8, 1.6, 0.15, 32]} />
        <meshStandardMaterial color="#0d0e10" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Brass Underside Inset */}
      <mesh position={[0, 3.21, 0]}>
        <cylinderGeometry args={[2.7, 2.7, 0.02, 32]} />
        <meshStandardMaterial color="#c9a36b" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Spire Architectural Fin */}
      <mesh position={[0, 3.9, 0]}>
        <cylinderGeometry args={[0.015, 0.04, 1.2, 8]} />
        <meshStandardMaterial color="#c9a36b" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  );
};

export default LumenPenthouse;
