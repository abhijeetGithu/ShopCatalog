"use client"

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'

export default function AnimatedBackground() {
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const y = useTransform(scrollY, [0, 1000], [0, -200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])

  useEffect(() => {
    const generateShapes = () => {
      return Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }))
    }

    const shapes = generateShapes()
    shapes.forEach((shape) => {
      controls.start((i) => ({
        x: [`${shape.x}%`, `${(shape.x + 20) % 100}%`],
        y: [`${shape.y}%`, `${(shape.y + 20) % 100}%`],
        transition: {
          duration: shape.duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: shape.delay,
        },
      }))
    })
  }, [controls])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-indigo-900/20" />
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={controls}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              ${['rgba(167,139,250,0.3)', 'rgba(192,132,252,0.3)', 'rgba(129,140,248,0.3)'][i % 3]}, 
              transparent)`,
            filter: 'blur(4px)',
          }}
        />
      ))}
      <div className="absolute inset-0 backdrop-blur-[100px]" />
    </motion.div>
  )
}