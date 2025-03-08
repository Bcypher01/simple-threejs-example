"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

interface ThreeSceneProps {
  rotationSpeed: number;
  wireframe: boolean;
  geometry: string;
  lightColor: string;
}

export default function ThreeScene({
  rotationSpeed,
  wireframe,
  geometry,
  lightColor,
}: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 75, near: 0.1, far: 10 }}
      className="w-full h-full"
    >
      <color attach="background" args={["#111"]} />

      <hemisphereLight args={[lightColor, "#aa5500"]} intensity={1} />
      <directionalLight position={[1, 1, 1]} intensity={0.5} />

      <SceneObject
        rotationSpeed={rotationSpeed}
        wireframe={wireframe}
        geometry={geometry}
      />

      <OrbitControls enableDamping dampingFactor={0.03} />
    </Canvas>
  );
}

function SceneObject({
  rotationSpeed,
  wireframe,
  geometry,
}: {
  rotationSpeed: number;
  wireframe: boolean;
  geometry: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireMeshRef = useRef<THREE.Mesh>(null);

  // Animation loop
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
    }
  });

  // Helper function to create the right geometry
  const getGeometry = () => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "sphere":
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case "torus":
        return <torusGeometry args={[0.7, 0.3, 16, 32]} />;
      case "icosahedron":
      default:
        return <icosahedronGeometry args={[0.8, 1]} />;
    }
  };

  return (
    <group>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial color="#ffffff" flatShading />

        {wireframe && (
          <mesh ref={wireMeshRef} scale={1.001}>
            {getGeometry()}
            <meshBasicMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        )}
      </mesh>
    </group>
  );
}
