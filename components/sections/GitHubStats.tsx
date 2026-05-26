'use client'

import { useEffect, useRef, useState } from 'react'
import { useGitHub } from '@/hooks/useGitHub'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Star, GitFork, Users, BookOpen, ExternalLink } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'

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

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3B82F6',
  JavaScript: '#FBBF24',
  Python: '#34D399',
  Dart: '#22D3EE',
  CSS: '#A78BFA',
  HTML: '#FB7185',
  Swift: '#F97316',
  Kotlin: '#C084FC',
  Ruby: '#F87171',
}
function getLangColor(lang: string) {
  return LANG_COLORS[lang] ?? '#818CF8'
}

export function GitHubStats() {
  const { data, isLoading } = useGitHub()
  const { ref, visible } = useInView()

  const statCards = data
    ? [
        { icon: BookOpen, label: 'Public Repos', value: data.stats.publicRepos },
        { icon: Star, label: 'Total Stars', value: data.stats.totalStars },
        { icon: GitFork, label: 'Total Forks', value: data.stats.totalForks },
        { icon: Users, label: 'Followers', value: data.profile.followers },
      ]
    : []

  const radarData = data?.topLanguages.map((l) => ({ subject: l.name, value: l.count })) ?? []

  return (
    <section
      id="github"
      ref={ref}
      className="section-padding"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, var(--accent-glow) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="section-badge mx-auto inline-flex">Real-time</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            GitHub{' '}
            <span className="gradient-text">Activity</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
            Live stats pulled directly from the GitHub API.
          </p>
          <a
            href="https://github.com/pahmi-alifya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            @pahmi-alifya
            <ExternalLink size={13} />
          </a>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div
              className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statCards.map(({ icon: Icon, label, value }, i) => (
                <div
                  key={label}
                  className="card-surface p-5 text-center"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                  }}
                >
                  <Icon size={20} className="mx-auto mb-3" style={{ color: 'var(--primary)' }} />
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text)' }}
                  >
                    <AnimatedCounter value={value} />
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Language radar + breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Radar chart */}
              <div
                className="card-surface p-6"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: 'opacity 0.6s ease 0.4s',
                }}
              >
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}>
                  TOP LANGUAGES
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                    />
                    <Radar
                      name="Repos"
                      dataKey="value"
                      stroke="var(--primary)"
                      fill="var(--primary)"
                      fillOpacity={0.3}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--text)',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Language bars */}
              <div
                className="card-surface p-6"
                style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}
              >
                <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}>
                  LANGUAGE DISTRIBUTION
                </h3>
                <div className="space-y-3">
                  {data?.topLanguages.map((lang, i) => {
                    const total = data.topLanguages.reduce((s, l) => s + l.count, 0)
                    const pct = Math.round((lang.count / total) * 100)
                    return (
                      <div key={lang.name}>
                        <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: getLangColor(lang.name) }}
                            />
                            {lang.name}
                          </span>
                          <span>{pct}%</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: 'var(--border)' }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: visible ? `${pct}%` : '0%',
                              background: getLangColor(lang.name),
                              transitionDelay: `${i * 100 + 600}ms`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
