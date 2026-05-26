'use client'

import { useEffect, useRef, useState } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiFirebase,
  SiTypescript,
  SiRedux,
  SiReactquery,
  SiGraphql,
  SiAntdesign,
  SiRefine,
  SiGit,
  SiGithubactions,
  SiWebpack,
} from 'react-icons/si'
import { Globe, ShieldCheck, Languages, Server } from 'lucide-react'
import { skillCategories } from '@/data/skills'
import { getTechColor } from '@/lib/techColors'

type IconComponent = React.ElementType

const SKILL_ICONS: Record<string, IconComponent> = {
  'React Js': SiReact,
  'Next.js': SiNextdotjs,
  'Vue.js': SiVuedotjs,
  'Tailwind CSS': SiTailwindcss,
  'React Native': SiReact,
  'Firebase': SiFirebase,
  'TypeScript': SiTypescript,
  'Redux': SiRedux,
  'Zustand': Server,
  'TanStack Query': SiReactquery,
  'REST API': Globe,
  'GraphQL': SiGraphql,
  'Ant Design': SiAntdesign,
  'Refine': SiRefine,
  'Git': SiGit,
  'CI/CD': SiGithubactions,
  'i18n': Languages,
  'Module Federation': SiWebpack,
  'SSO': ShieldCheck,
}

function useInView(threshold = 0.15) {
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

function SkillCard({ name, index, visible }: { name: string; index: number; visible: boolean }) {
  const color = getTechColor(name)
  const [hovered, setHovered] = useState(false)
  const Icon = SKILL_ICONS[name] ?? Server

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl text-center cursor-default transition-all duration-300"
      style={{
        background: hovered ? color.bg : 'var(--bg-card)',
        border: `1px solid ${hovered ? color.border : 'var(--border)'}`,
        boxShadow: hovered ? `0 0 24px ${color.glow}` : 'none',
        transform: visible
          ? hovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)'
          : 'translateY(20px) scale(0.9)',
        opacity: visible ? 1 : 0,
        transition: `opacity 0.5s ease ${index * 40}ms, transform 0.4s ease ${index * 40}ms, box-shadow 0.3s, background 0.3s, border-color 0.3s`,
      }}
    >
      <Icon
        size={28}
        style={{
          color: hovered ? color.text : 'var(--text-muted)',
          filter: hovered ? `drop-shadow(0 0 6px ${color.text})` : 'none',
          transition: 'color 0.3s, filter 0.3s',
          flexShrink: 0,
        }}
      />
      <span
        className="text-xs font-semibold leading-tight"
        style={{ color: hovered ? color.text : 'var(--text)', transition: 'color 0.3s' }}
      >
        {name}
      </span>
    </div>
  )
}

export function Skills() {
  const { ref, visible } = useInView()

  return (
    <section id="skills" ref={ref} className="section-padding" style={{ background: 'var(--bg)' }}>
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-100 h-100 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right, var(--purple-glow) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="section-badge mx-auto inline-flex">Tech Stack</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
            Tools and technologies I&apos;ve used across web and mobile projects over the years.
          </p>
        </div>

        <div className="space-y-10">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${ci * 80}ms, transform 0.6s ease ${ci * 80}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-px flex-1"
                  style={{ background: 'linear-gradient(to right, var(--border), transparent)' }}
                />
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {cat.label}
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: 'linear-gradient(to left, var(--border), transparent)' }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {cat.skills.map((skill, si) => (
                  <SkillCard
                    key={skill}
                    name={skill}
                    index={ci * 10 + si}
                    visible={visible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
