'use client'

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'

type TiltCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxTilt?: number
  glare?: boolean
  radius?: string
  /** Resting tilt (degrees) applied even without pointer interaction — makes the card look 3D at rest. */
  baseRotateX?: number
  baseRotateY?: number
  /** Extra scale applied on hover, on top of the tilt. */
  hoverScale?: number
}

export function TiltCard({
  children,
  className,
  style,
  maxTilt = 10,
  glare = true,
  radius = '16px',
  baseRotateX = 0,
  baseRotateY = 0,
  hoverScale = 1,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const springConfig = { stiffness: 260, damping: 22, mass: 0.5 }
  const rotateX = useSpring(useTransform(py, [0, 1], [baseRotateX + maxTilt, baseRotateX - maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(px, [0, 1], [baseRotateY - maxTilt, baseRotateY + maxTilt]), springConfig)
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${useTransform(px, (v) => `${v * 100}%`)} ${useTransform(py, (v) => `${v * 100}%`)}, rgba(255,255,255,0.12), transparent 55%)`

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ perspective: 1000, ...style }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative' }}
        whileHover={hoverScale !== 1 ? { scale: hoverScale } : undefined}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.5 }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glareBackground, borderRadius: radius, mixBlendMode: 'overlay' }}
          />
        )}
      </motion.div>
    </div>
  )
}
