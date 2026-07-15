import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ variable: '--font-space-grotesk', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pahmi Alifya Bahri — Frontend Engineer',
  description:
    'Frontend Engineer with 5+ years of experience building scalable web and mobile applications. Proficient in React.js, Next.js, and React Native.',
  keywords: ['Frontend Engineer', 'React.js', 'Next.js', 'React Native', 'Web Developer', 'Pahmi Alifya Bahri'],
  authors: [{ name: 'Pahmi Alifya Bahri', url: 'https://github.com/pahmi-alifya' }],
  creator: 'Pahmi Alifya Bahri',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Pahmi Alifya Bahri — Frontend Engineer',
    description: 'Frontend Engineer with 5+ years building scalable web & mobile apps.',
    siteName: 'Pahmi Alifya Bahri Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pahmi Alifya Bahri — Frontend Engineer',
    description: 'Frontend Engineer with 5+ years building scalable web & mobile apps.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased min-h-screen overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
