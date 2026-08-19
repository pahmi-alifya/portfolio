import { NextResponse } from 'next/server'

const GITHUB_USER = 'pahmi-alifya'
const BASE = 'https://api.github.com'

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

export async function GET() {
  try {
    const [profileRes, reposRes, contributionsRes] = await Promise.all([
      fetch(`${BASE}/users/${GITHUB_USER}`, { headers, next: { revalidate: 3600 } }),
      fetch(`${BASE}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 3600 },
      }),
    ])

    if (!profileRes.ok || !reposRes.ok || !contributionsRes.ok) {
      throw new Error('GitHub API error')
    }

    const profile = await profileRes.json()
    const repos = await reposRes.json()
    const contributionsHtml = await contributionsRes.text()

    // Contribution calendar (mirrors the heatmap on a GitHub profile page)
    const dayCells = [...contributionsHtml.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g)]
    const tooltips = [...contributionsHtml.matchAll(/class="sr-only position-absolute">((?:No|\d+) contributions? on [^<]*)<\/tool-tip>/g)]
    const days = dayCells
      .map(([, date, level], i) => {
        const tooltip = tooltips[i]?.[1] ?? ''
        const countMatch = tooltip.match(/^(\d+)/)
        return { date, level: Number(level), count: countMatch ? Number(countMatch[1]) : 0 }
      })
      .sort((a, b) => a.date.localeCompare(b.date))
    const totalMatch = contributionsHtml.match(/<h2[^>]*>\s*([\d,]+)\s*\n?\s*contributions/)
    const totalContributions = totalMatch ? Number(totalMatch[1].replace(/,/g, '')) : 0

    // Compute stats
    const totalStars = repos.reduce((acc: number, r: { stargazers_count: number }) => acc + (r.stargazers_count ?? 0), 0)
    const totalForks = repos.reduce((acc: number, r: { forks_count: number }) => acc + (r.forks_count ?? 0), 0)

    // Language breakdown
    const langCount: Record<string, number> = {}
    for (const r of repos) {
      if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1
    }
    const topLanguages = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }))

    return NextResponse.json({
      profile: {
        login: profile.login,
        name: profile.name,
        bio: profile.bio,
        avatarUrl: profile.avatar_url,
        publicRepos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
      },
      stats: { totalStars, totalForks, publicRepos: profile.public_repos },
      topLanguages,
      contributions: { total: totalContributions, days },
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
  }
}
