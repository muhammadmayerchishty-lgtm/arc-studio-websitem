'use client';

import React from 'react';

export const NoirResidence: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Brutalist Wing A (West Monolith) */}
      <mesh castShadow receiveShadow position={[-1.5, 1.25, 0]}>
        <boxGeometry args={[1.8, 2.5, 3.8]} />
        <meshStandardMaterial color="#141414" roughness={0.9} />
      </mesh>

      {/* Brutalist Wing B (East Monolith) */}
      <mesh castShadow receiveShadow position={[1.5, 1.0, 0]}>
        <boxGeometry args={[1.8, 2.0, 3.8]} />
        <meshStandardMaterial color="#171717" roughness={0.9} />
      </mesh>

      {/* Brutalist Connecting Bridge (North Monolith) */}
      <mesh castShadow receiveShadow position={[0, 1.8, -1.3]}>
        <boxGeometry args={[1.6, 1.4, 1.2]} />
        <meshStandardMaterial color="#101010" roughness={0.9} />
      </mesh>

      {/* Signature Vertical Brass Accent Tower Fin */}
      <mesh castShadow position={[-0.55, 1.7, 1.8]}>
        <boxGeometry args={[0.08, 3.4, 0.4]} />
        <meshStandardMaterial color="#c9a36b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Brass Reveal Window Frames */}
      <mesh position={[-1.5, 1.2, 1.91]}>
        <boxGeometry args={[0.9, 1.4, 0.05]} />
        <meshStandardMaterial color="#c9a36b" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[-1.5, 1.2, 1.93]}>
        <planeGeometry args={[0.78, 1.28]} />
        <meshPhysicalMaterial color="#303538" transparent opacity={0.6} roughness={0.1} />
      </mesh>

      {/* Central Open Courtyard Area */}
      <group position={[0, 0, 0.3]}>
        {/* Courtyard Sunken Stone Floor */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.3, 0.04, 1.8]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.8} />
        </mesh>

        {/* Central Brass Reflecting Basin */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.45, 0.5, 0.12, 32]} />
          <meshStandardMaterial color="#c9a36b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.42, 32]} />
          <meshPhysicalMaterial color="#1a252a" transparent opacity={0.85} roughness={0.05} />
        </mesh>

        {/* Central Courtyard Sculptural Tree */}
        <group position={[0, 0.1, -0.5]}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.03, 0.05, 1.4, 8]} />
            <meshStandardMaterial color="#2d2a26" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <dodecahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial color="#3e4a3d" roughness={0.8} />
          </mesh>
        </group>

        {/* Courtyard Warm Upward Spotlight */}
        <pointLight position={[0, 0.4, 0]} color="#dec397" intensity={2.0} distance={4} />
      </group>

      {/* Deep Recessed Entrance Slot with Brass Canopy */}
      <mesh position={[0.4, 0.9, 1.9]}>
        <boxGeometry args={[0.8, 0.06, 0.5]} />
        <meshStandardMaterial color="#c9a36b" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.4, 0.45, 1.65]}>
        <boxGeometry args={[0.7, 0.9, 0.05]} />
        <meshStandardMaterial color="#231a12" roughness={0.6} />
      </mesh>
    </group>
  );
};

export default NoirResidence;
