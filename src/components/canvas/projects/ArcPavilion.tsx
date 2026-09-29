'use client';

import React from 'react';

export const ArcPavilion: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Central Double-Height Glass Salon Pavilion */}
      <mesh castShadow receiveShadow position={[0, 0.9, 0]}>
        <boxGeometry args={[3.6, 1.8, 2.6]} />
        <meshStandardMaterial color="#1a1816" roughness={0.7} />
      </mesh>

      {/* Panoramic Glazing Panels on all 4 Sides */}
      <mesh position={[0, 0.9, 1.32]}>
        <planeGeometry args={[3.4, 1.6]} />
        <meshPhysicalMaterial
          color="#d0e2ec"
          transparent
          opacity={0.35}
          roughness={0.08}
          metalness={0.15}
        />
      </mesh>
      <mesh position={[0, 0.9, -1.32]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.4, 1.6]} />
        <meshPhysicalMaterial
          color="#d0e2ec"
          transparent
          opacity={0.35}
          roughness={0.08}
          metalness={0.15}
        />
      </mesh>

      {/* Interior Warm Hearth Light */}
      <pointLight position={[0, 0.9, 0]} color="#dec397" intensity={2.0} distance={5} />

      {/* Signature Curved Sweeping Roof: Architectural Arc Vault */}
      <group position={[0, 1.9, 0]}>
        {/* Curving Torus Segment forming the Sweeping Arc Roof */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -0.6, 0]}>
          <cylinderGeometry args={[2.8, 2.8, 3.8, 48, 1, true, 0, Math.PI * 0.45]} />
          <meshStandardMaterial color="#121211" roughness={0.5} metalness={0.3} side={2} />
        </mesh>

        {/* Polished Brass Architectural Arc Ribbon Spanning Across the Pavilion */}
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.045, 16, 64, Math.PI * 0.9]} />
          <meshStandardMaterial color="#c9a36b" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.7, 1.4]} rotation={[0, 0, 0]}>
          <torusGeometry args={[2.5, 0.045, 16, 64, Math.PI * 0.9]} />
          <meshStandardMaterial color="#c9a36b" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* Slender Brass Support Trusses */}
      {[-1.6, 1.6].map((x, idx) => (
        <group key={idx} position={[x, 1.0, 1.4]}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.035, 2.0, 16]} />
            <meshStandardMaterial color="#c9a36b" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Stepped Water Reflecting Pool Basin */}
      <group position={[0, 0.02, 2.3]}>
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[4.4, 0.1, 1.5]} />
          <meshStandardMaterial color="#181716" roughness={0.8} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <planeGeometry args={[4.2, 1.3]} />
          <meshPhysicalMaterial
            color="#274b59"
            emissive="#0d2833"
            emissiveIntensity={0.25}
            transparent
            opacity={0.85}
            roughness={0.05}
          />
        </mesh>
        <pointLight position={[0, 0.15, 0]} color="#4bb9d6" intensity={1.0} distance={3.5} />
      </group>
    </group>
  );
};

export default ArcPavilion;
