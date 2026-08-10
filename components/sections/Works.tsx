'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Globe } from 'lucide-react'
import { works, type WorkProject } from '@/data/works'

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

function getPreviewUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
}

function WorkCard({ work, delay }: { work: WorkProject; delay: number }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-surface overflow-hidden flex flex-col group"
      style={{ animation: `badge-reveal 0.5s ease ${delay}ms both` }}
    >
      <div
        className="relative aspect-video w-full overflow-hidden"
        style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}
      >
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getPreviewUrl(work.url)}
            alt={`Preview of ${work.title}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Globe size={32} style={{ color: 'var(--text-faint)' }} />
          </div>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: 'rgba(2,8,23,0.55)' }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'var(--primary)', color: '#fff' }}
          >
            <ExternalLink size={14} />
            Visit Site
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)' }}
            >
              <Globe size={16} style={{ color: 'var(--accent)' }} />
            </div>
            <span
              className="font-semibold text-base truncate"
              style={{ color: 'var(--text)', fontFamily: 'var(--font-space-grotesk)' }}
            >
              {work.title}
            </span>
          </div>
          <ExternalLink
            size={16}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: 'var(--primary)' }}
          />
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {work.description}
        </p>

        <span
          className="text-xs font-medium truncate pt-3 border-t mt-auto"
          style={{ borderColor: 'var(--border)', color: 'var(--text-faint)' }}
        >
          {work.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
      </div>
    </a>
  )
}

export function Works() {
  const { ref, visible } = useInView()

  return (
    <section ref={ref} className="section-padding" style={{ background: 'var(--bg)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, var(--accent-glow) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="section-badge mx-auto inline-flex">Side Projects</div>
          <h1 className="section-title" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Web Projects{' '}
            <span className="gradient-text">Showcase</span>
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
            A selection of personal side projects built for fun and self-learning, not affiliated with any employer or client work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((work, i) => (
            <WorkCard key={work.url} work={work} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
