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
    const [profileRes, reposRes] = await Promise.all([
      fetch(`${BASE}/users/${GITHUB_USER}`, { headers, next: { revalidate: 3600 } }),
      fetch(`${BASE}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 3600 } }),
    ])

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error('GitHub API error')
    }

    const profile = await profileRes.json()
    const repos = await reposRes.json()

    // Compute stats
    const totalStars = repos.reduce((acc: number, r: { stargazers_count: number }) => acc + (r.stargazers_count ?? 0), 0)
    const totalForks = repos.reduce((acc: number, r: { forks_count: number }) => acc + (r.forks_count ?? 0), 0)

    // Top repos by latest update, excluding forks
    const topRepos = [...repos]
      .filter((r: { fork: boolean }) => !r.fork)
      .sort((a: { updated_at: string }, b: { updated_at: string }) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 6)
      .map((r: {
        id: number; name: string; description: string; html_url: string;
        stargazers_count: number; forks_count: number; language: string;
        updated_at: string; topics: string[];
      }) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updatedAt: r.updated_at,
        topics: r.topics ?? [],
      }))

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
      topRepos,
      topLanguages,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
  }
}
