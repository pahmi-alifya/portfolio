'use client'

import { getTechColor } from '@/lib/techColors'

interface TechBadgeProps {
  tech: string
  delay?: number
  animate?: boolean
}

export function TechBadge({ tech, delay = 0, animate = true }: TechBadgeProps) {
  const color = getTechColor(tech)

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{
        background: color.bg,
        color: color.text,
        border: `1px solid ${color.border}`,
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
        animation: animate ? `badge-reveal 0.4s ease forwards` : undefined,
        opacity: animate ? 0 : 1,
      }}
    >
      {tech}
    </span>
  )
}
