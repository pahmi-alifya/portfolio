import { CONTRIBUTION_LEVEL_INTENSITY, CONTRIBUTION_MONTH_NAMES } from '@/constants/contributions'

export type ContributionDay = { date: string; level: number; count: number }
export type ContributionWeek = (ContributionDay | null)[]
export type StreakInfo = { length: number; start: string | null; end: string | null }

export function levelColor(level: number | undefined) {
  if (!level) return 'var(--border)'
  const pct = CONTRIBUTION_LEVEL_INTENSITY[level]
  return `color-mix(in srgb, var(--primary) ${pct}%, var(--bg-card))`
}

export function buildContributionWeeks(days: ContributionDay[]): ContributionWeek[] {
  const weeks: ContributionWeek[] = []
  let week: ContributionWeek = new Array(7).fill(null)

  days.forEach((day) => {
    const weekday = new Date(`${day.date}T00:00:00`).getDay()
    week[weekday] = day
    if (weekday === 6) {
      weeks.push(week)
      week = new Array(7).fill(null)
    }
  })
  if (week.some(Boolean)) weeks.push(week)

  return weeks
}

export function computeContributionMonthLabels(weeks: ContributionWeek[]) {
  let lastMonth = -1
  return weeks.map((week) => {
    const firstDay = week.find(Boolean)
    if (!firstDay) return ''
    const month = new Date(`${firstDay.date}T00:00:00`).getMonth()
    const label = month !== lastMonth ? CONTRIBUTION_MONTH_NAMES[month] : ''
    lastMonth = month
    return label
  })
}

export function formatContributionDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function computeContributionStreaks(days: ContributionDay[]) {
  let longest: StreakInfo = { length: 0, start: null, end: null }
  let runStart: string | null = null
  let runLength = 0

  days.forEach((day) => {
    if (day.count > 0) {
      if (runLength === 0) runStart = day.date
      runLength += 1
      if (runLength > longest.length) {
        longest = { length: runLength, start: runStart, end: day.date }
      }
    } else {
      runLength = 0
      runStart = null
    }
  })

  const current: StreakInfo = { length: 0, start: null, end: null }
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count === 0) break
    current.length += 1
    current.start = days[i].date
    if (!current.end) current.end = days[i].date
  }

  return { longest, current }
}
