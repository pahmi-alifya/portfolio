'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true)

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const isDark = resolvedTheme === 'dark'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl border-b'
            : 'bg-transparent border-b border-transparent'
        )}
        style={{
          background: scrolled
            ? isDark
              ? 'rgba(2,8,23,0.85)'
              : 'rgba(248,250,252,0.85)'
            : 'transparent',
          borderColor: scrolled ? 'var(--border)' : 'transparent',
          boxShadow: scrolled ? '0 0 24px var(--primary-glow)' : 'none',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-bold text-lg"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--primary-glow)', border: '1px solid var(--primary)' }}
            >
              <Code2 size={16} style={{ color: 'var(--primary)' }} />
            </div>
            <span className="gradient-text">PAB</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    'text-sm font-medium transition-all duration-200 relative py-1',
                    activeSection === href.replace('#', '')
                      ? 'text-[var(--primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  )}
                >
                  {label}
                  {activeSection === href.replace('#', '') && (
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'var(--primary)' }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--primary)',
                color: '#fff',
                boxShadow: '0 0 16px var(--primary-glow)',
              }}
            >
              Hire Me
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col pt-16"
          style={{ background: isDark ? 'rgba(2,8,23,0.97)' : 'rgba(248,250,252,0.97)' }}
        >
          <ul className="flex flex-col items-center justify-center flex-1 gap-6">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-semibold transition-colors"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    color: activeSection === href.replace('#', '') ? 'var(--primary)' : 'var(--text)',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center px-8 py-3 rounded-xl text-lg font-semibold mt-4"
                style={{ background: 'var(--primary)', color: '#fff' }}
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
