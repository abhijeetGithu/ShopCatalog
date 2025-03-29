"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import {
  MeshTransmissionMaterial,
  Float,
  Cloud,
  Sphere,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Environment,
  Caustics,
  BakeShadows,
  AccumulativeShadows,
  RandomizedLight,
  useTexture
} from "@react-three/drei"
import * as THREE from "three"

interface AnimatedShapeProps {
  mouse: React.MutableRefObject<[number, number]>
}

function LiquidOrb({ mouse }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime / 4)
    meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime / 2)
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouse.current[0] / 50,
      0.03
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mouse.current[1] / 50,
      0.03
    )
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.6}
      floatIntensity={0.8}
    >
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.5}
          chromaticAberration={0.6}
          anisotropy={0.5}
          distortion={0.8}
          distortionScale={0.3}
          temporalDistortion={0.4}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </Sphere>
    </Float>
  )
}

function BioLuminescence({ count = 100 }) {
  const particles = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (!particles.current) return
    particles.current.rotation.y = state.clock.elapsedTime * 0.05
    particles.current.rotation.x = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <float32BufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 20)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.6}
        vertexColors
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// ... existing imports ...

export default function HeroBackground() {
    const mouse = useRef<[number, number]>([0, 0])
  
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      mouse.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      ]
    }
  
    return (
      <div
        onMouseMove={handleMouseMove}
        className="absolute inset-0 -z-10 opacity-90"
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#0f0a1e']} />
          <fog attach="fog" args={['#0f0a1e', 8, 25]} />
          <ambientLight intensity={0.2} />
          
          <Environment preset="night" />
          <AccumulativeShadows temporal frames={100}>
            <RandomizedLight amount={8} position={[5, 5, -10]} />
          </AccumulativeShadows>
  
          <LiquidOrb mouse={mouse} />
          <BioLuminescence />
          
          <Cloud
            opacity={0.3}
            speed={0.3}
            width={10}
            depth={1.5}
            segments={20}
          />
  
          <Caustics
            color="#4c1d95"
            position={[0, 0, 0]}
            intensity={0.4}
            ratio={0.8}
          />
          
          <BakeShadows />
        </Canvas>
      </div>
    )
  }