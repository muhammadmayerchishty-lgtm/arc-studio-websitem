'use client';

import React from 'react';

export const DuneHouse: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Main Ground Pavilion: Sand Stucco Finish */}
      <mesh castShadow receiveShadow position={[-0.2, 1.1, 0]}>
        <boxGeometry args={[4.4, 2.2, 3.4]} />
        <meshStandardMaterial color="#d4c8b6" roughness={0.95} />
      </mesh>

      {/* Arched Portico Feature: Row of 3 Arched Openings */}
      {[-1.2, 0, 1.2].map((xOffset, i) => (
        <group key={i} position={[xOffset, 0, 1.72]}>
          {/* Arch Pier Left */}
          <mesh position={[-0.35, 0.75, 0]}>
            <boxGeometry args={[0.16, 1.5, 0.1]} />
            <meshStandardMaterial color="#cbbfa9" roughness={0.9} />
          </mesh>
          {/* Arch Pier Right */}
          <mesh position={[0.35, 0.75, 0]}>
            <boxGeometry args={[0.16, 1.5, 0.1]} />
            <meshStandardMaterial color="#cbbfa9" roughness={0.9} />
          </mesh>
          {/* Semicircular Arch Top */}
          <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.42, 0.42, 0.1, 24, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#cbbfa9" roughness={0.9} />
          </mesh>
          {/* Inset Glazing behind Arch */}
          <mesh position={[0, 0.9, -0.05]}>
            <planeGeometry args={[0.7, 1.6]} />
            <meshPhysicalMaterial color="#c5d8e0" transparent opacity={0.4} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Second Floor Setback: Sand Stucco Suite */}
      <mesh castShadow receiveShadow position={[0.4, 2.7, -0.3]}>
        <boxGeometry args={[2.8, 1.2, 2.2]} />
        <meshStandardMaterial color="#e0d5c3" roughness={0.9} />
      </mesh>

      {/* Roof Terrace with Brass Balustrade on First Floor */}
      <group position={[-1.2, 2.21, 0.6]}>
        {/* Terrace Tiled Floor */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[2.0, 0.02, 1.8]} />
          <meshStandardMaterial color="#c4b69f" roughness={0.8} />
        </mesh>
        {/* Perimeter Brass Parapet Railing */}
        <mesh position={[-0.95, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.7, 1.8]} />
          <meshStandardMaterial color="#c9a36b" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.35, 0.85]}>
          <boxGeometry args={[1.9, 0.7, 0.04]} />
          <meshStandardMaterial color="#c9a36b" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Slender Timber Shade Pergola */}
        <group position={[0, 1.4, 0]}>
          {[-0.6, -0.2, 0.2, 0.6].map((z, j) => (
            <mesh key={j} position={[0, 0, z]}>
              <boxGeometry args={[1.9, 0.05, 0.08]} />
              <meshStandardMaterial color="#66533f" roughness={0.7} />
            </mesh>
          ))}
          {/* Pergola Support Posts */}
          <mesh position={[-0.9, -0.7, 0.8]}>
            <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
            <meshStandardMaterial color="#c9a36b" metalness={0.8} />
          </mesh>
          <mesh position={[0.9, -0.7, 0.8]}>
            <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
            <meshStandardMaterial color="#c9a36b" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Terracotta Decorative Planters */}
      {[-1.8, 1.8].map((xp, k) => (
        <group key={k} position={[xp, 0.25, 2.1]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.16, 0.5, 16]} />
            <meshStandardMaterial color="#94573b" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.26, 12, 12]} />
            <meshStandardMaterial color="#55604b" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Warm Ambient Internal Lantern */}
      <pointLight position={[0.4, 2.5, 0.8]} color="#f0d5a3" intensity={1.8} distance={4} />
    </group>
  );
};

export default DuneHouse;
