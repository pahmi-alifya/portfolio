import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Code2 } from 'lucide-react'
import { Works } from '@/components/sections/Works'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Web Projects Showcase — Pahmi Alifya Bahri',
  description: 'A showcase of web applications previously built and shipped by Pahmi Alifya Bahri.',
}

export default function WorksPage() {
  return (
    <>
      <header
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
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
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--text)]"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </div>
      </header>

      <main>
        <Works />
      </main>
      <Footer />
    </>
  )
}
