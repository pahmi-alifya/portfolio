'use client'

import { useEffect, useRef, useState } from 'react'
import { useGitHub } from '@/hooks/useGitHub'
import { Star, GitFork, ExternalLink, Code2 } from 'lucide-react'
import { GithubIcon } from '@/components/ui/SocialIcons'

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

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3B82F6',
  JavaScript: '#FBBF24',
  Python: '#34D399',
  Dart: '#22D3EE',
  CSS: '#A78BFA',
  HTML: '#FB7185',
  Swift: '#F97316',
  Kotlin: '#C084FC',
}
function getLangColor(lang: string) {
  return LANG_COLORS[lang] ?? '#818CF8'
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'today'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

export function Projects() {
  const { data, isLoading } = useGitHub()
  const { ref, visible } = useInView()

  return (
    <section id="projects" ref={ref} className="section-padding" style={{ background: 'var(--bg)' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, var(--purple-glow) 0%, transparent 70%)' }}
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
          <div className="section-badge mx-auto inline-flex">Open Source</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
            Top repositories from GitHub, sorted by latest activity.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="card-surface p-5 h-44"
                style={{ animation: 'glow-pulse 1.5s ease infinite', animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        ) : !data?.topRepos.length ? (
          <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
            <Code2 size={48} className="mx-auto mb-4 opacity-30" />
            <p>No public repositories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.topRepos.map((repo, i) => (
              <div
                key={repo.id}
                className="card-surface p-5 flex flex-col gap-3 group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                }}
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <GithubIcon size={16} />
                    <span
                      className="font-semibold text-sm truncate"
                      style={{ color: 'var(--text)', fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {repo.name}
                    </span>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                    style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}
                    aria-label={`Open ${repo.name}`}
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed flex-1 line-clamp-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {repo.description || 'No description provided.'}
                </p>

                {/* Topics */}
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--primary-glow)', color: 'var(--primary)', border: '1px solid var(--primary-glow)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-faint)' }}>
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: getLangColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={11} />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={11} />
                      {repo.forks}
                    </span>
                  </div>
                  <span>{timeAgo(repo.updatedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View all */}
        <div className="text-center mt-10">
          <a
            href="https://github.com/pahmi-alifya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 glow-border"
            style={{ color: 'var(--text)' }}
          >
            <GithubIcon size={16} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
