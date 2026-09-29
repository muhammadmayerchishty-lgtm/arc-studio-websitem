'use client';

import React from 'react';
import * as THREE from 'three';

export const TurntableBase: React.FC = () => {
  return (
    <group position={[0, -0.05, 0]}>
      {/* Basalt Circular Foundation Slab */}
      <mesh receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[6.5, 6.7, 0.3, 64]} />
        <meshStandardMaterial
          color="#151412"
          roughness={0.8}
          metalness={0.15}
        />
      </mesh>

      {/* Outer Polished Brass Architectural Rim */}
      <mesh position={[0, -0.15, 0]}>
        <torusGeometry args={[6.6, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#c9a36b"
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>

      {/* Inner Accent Inset Ring */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 5.83, 64]} />
        <meshBasicMaterial color="#c9a36b" opacity={0.3} transparent />
      </mesh>

      {/* Minimalist Architectural Trees */}
      <group position={[-4.5, 0, -2.5]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 1.6, 8]} />
          <meshStandardMaterial color="#4a3f35" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <coneGeometry args={[0.5, 1.4, 8]} />
          <meshStandardMaterial color="#4a5240" roughness={0.8} />
        </mesh>
      </group>

      <group position={[-4.8, 0, -1.2]}>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 1.2, 8]} />
          <meshStandardMaterial color="#4a3f35" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <coneGeometry args={[0.4, 1.1, 8]} />
          <meshStandardMaterial color="#555c48" roughness={0.8} />
        </mesh>
      </group>

      <group position={[4.6, 0, 2.2]}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 1.8, 8]} />
          <meshStandardMaterial color="#4a3f35" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <coneGeometry args={[0.55, 1.5, 8]} />
          <meshStandardMaterial color="#444d3b" roughness={0.8} />
        </mesh>
      </group>

      <group position={[4.2, 0, 3.4]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 1.0, 8]} />
          <meshStandardMaterial color="#4a3f35" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.35, 0.9, 8]} />
          <meshStandardMaterial color="#58634c" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

export default TurntableBase;
