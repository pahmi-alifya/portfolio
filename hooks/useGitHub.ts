import useSWR from 'swr'

type GitHubData = {
  profile: {
    login: string
    name: string
    bio: string
    avatarUrl: string
    publicRepos: number
    followers: number
    following: number
  }
  stats: {
    totalStars: number
    totalForks: number
    publicRepos: number
  }
  topLanguages: Array<{ name: string; count: number }>
  contributions: {
    total: number
    days: Array<{ date: string; level: number; count: number }>
  }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useGitHub() {
  const { data, error, isLoading } = useSWR<GitHubData>('/api/github', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 60000 * 60,
  })

  return { data, error, isLoading }
}
