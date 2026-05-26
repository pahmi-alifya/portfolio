'use client'

import { useEffect, useRef, useState } from 'react'
import { experiences } from '@/data/experience'
import { TechBadge } from '@/components/ui/TechBadge'
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function ExperienceCard({
  exp,
  index,
  isLast,
  visible,
}: {
  exp: (typeof experiences)[0]
  index: number
  isLast: boolean
  visible: boolean
}) {
  const [expanded, setExpanded] = useState(index === 0)
  const isEven = index % 2 === 0

  return (
    <div
      className="relative flex gap-6 md:gap-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-8">
        {/* Dot */}
        <div
          className="relative w-4 h-4 rounded-full flex-shrink-0 z-10 mt-5"
          style={{
            background: exp.current ? 'var(--primary)' : 'var(--bg-card)',
            border: `2px solid ${exp.current ? 'var(--primary)' : 'var(--border)'}`,
            boxShadow: exp.current ? '0 0 12px var(--primary-glow)' : 'none',
          }}
        >
          {exp.current && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: 'var(--primary)',
                opacity: 0.4,
                animation: 'pulse-ring 1.5s ease-out infinite',
              }}
            />
          )}
        </div>
        {/* Line */}
        {!isLast && (
          <div
            className="flex-1 w-px mt-1"
            style={{
              background: 'linear-gradient(to bottom, var(--border), transparent)',
              minHeight: '24px',
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-8 rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${exp.current ? 'var(--primary)' : 'var(--border)'}`,
          boxShadow: exp.current ? '0 0 20px var(--primary-glow)' : 'none',
        }}
      >
        {/* Card header */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3
                className="text-base font-bold"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text)' }}
              >
                {exp.role}
              </h3>
              {exp.current && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--primary-glow)', color: 'var(--primary)', border: '1px solid var(--primary)' }}
                >
                  Current
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--accent)' }}>{exp.company}</span>
              <span>·</span>
              <span>{exp.period.start} – {exp.period.end}</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {exp.location}
              </span>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {exp.techStack.map((tech, ti) => (
                <TechBadge key={tech} tech={tech} delay={visible ? ti * 50 : 0} animate={visible} />
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 mt-1" style={{ color: 'var(--text-faint)' }}>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>

        {/* Expandable job list */}
        {expanded && (
          <div
            className="px-5 pb-5 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <ul className="mt-4 space-y-2">
              {exp.jobs.map((job) => (
                <li
                  key={job}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: 'var(--primary)' }}
                  />
                  {job}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export function Experience() {
  const { ref, visible } = useInView()

  return (
    <section
      id="experience"
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* Glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at left, var(--primary-glow) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="section-badge mx-auto inline-flex">Career</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Work{' '}
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: 'var(--text-muted)' }}>
            My professional journey — click a card to expand details.
          </p>
        </div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={`${exp.company}-${exp.period.start}`}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
