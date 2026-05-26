export type TechColor = {
  bg: string
  text: string
  border: string
  glow: string
}

export const techColors: Record<string, TechColor> = {
  'React Js': { bg: 'rgba(97,218,251,0.1)', text: '#61DAFB', border: 'rgba(97,218,251,0.4)', glow: 'rgba(97,218,251,0.25)' },
  'React Native': { bg: 'rgba(97,218,251,0.1)', text: '#61DAFB', border: 'rgba(97,218,251,0.4)', glow: 'rgba(97,218,251,0.25)' },
  'Next.js': { bg: 'rgba(255,255,255,0.08)', text: '#e2e8f0', border: 'rgba(255,255,255,0.3)', glow: 'rgba(255,255,255,0.15)' },
  'Next Js': { bg: 'rgba(255,255,255,0.08)', text: '#e2e8f0', border: 'rgba(255,255,255,0.3)', glow: 'rgba(255,255,255,0.15)' },
  'Vue.js': { bg: 'rgba(66,211,146,0.1)', text: '#42D392', border: 'rgba(66,211,146,0.4)', glow: 'rgba(66,211,146,0.25)' },
  'Vue Js': { bg: 'rgba(66,211,146,0.1)', text: '#42D392', border: 'rgba(66,211,146,0.4)', glow: 'rgba(66,211,146,0.25)' },
  'TypeScript': { bg: 'rgba(49,120,198,0.15)', text: '#3B82F6', border: 'rgba(49,120,198,0.4)', glow: 'rgba(49,120,198,0.25)' },
  'GraphQL': { bg: 'rgba(225,0,152,0.1)', text: '#E879F9', border: 'rgba(225,0,152,0.4)', glow: 'rgba(225,0,152,0.25)' },
  'GraphQl': { bg: 'rgba(225,0,152,0.1)', text: '#E879F9', border: 'rgba(225,0,152,0.4)', glow: 'rgba(225,0,152,0.25)' },
  'Firebase': { bg: 'rgba(255,202,40,0.1)', text: '#FBBF24', border: 'rgba(255,202,40,0.4)', glow: 'rgba(255,202,40,0.25)' },
  'Redux': { bg: 'rgba(118,74,188,0.15)', text: '#A78BFA', border: 'rgba(118,74,188,0.4)', glow: 'rgba(118,74,188,0.25)' },
  'Zustand': { bg: 'rgba(255,107,107,0.1)', text: '#F87171', border: 'rgba(255,107,107,0.4)', glow: 'rgba(255,107,107,0.25)' },
  'TanStack Query': { bg: 'rgba(255,65,84,0.1)', text: '#FB7185', border: 'rgba(255,65,84,0.4)', glow: 'rgba(255,65,84,0.25)' },
  'Tailwind CSS': { bg: 'rgba(56,189,248,0.1)', text: '#38BDF8', border: 'rgba(56,189,248,0.4)', glow: 'rgba(56,189,248,0.25)' },
  'Ant Design': { bg: 'rgba(22,119,255,0.1)', text: '#60A5FA', border: 'rgba(22,119,255,0.4)', glow: 'rgba(22,119,255,0.25)' },
  'Antd': { bg: 'rgba(22,119,255,0.1)', text: '#60A5FA', border: 'rgba(22,119,255,0.4)', glow: 'rgba(22,119,255,0.25)' },
  'Refine': { bg: 'rgba(0,128,255,0.1)', text: '#67E8F9', border: 'rgba(0,128,255,0.4)', glow: 'rgba(0,128,255,0.25)' },
  'REST API': { bg: 'rgba(52,211,153,0.1)', text: '#34D399', border: 'rgba(52,211,153,0.4)', glow: 'rgba(52,211,153,0.25)' },
  'i18n': { bg: 'rgba(251,191,36,0.1)', text: '#FCD34D', border: 'rgba(251,191,36,0.4)', glow: 'rgba(251,191,36,0.25)' },
  'CI/CD': { bg: 'rgba(99,102,241,0.1)', text: '#818CF8', border: 'rgba(99,102,241,0.4)', glow: 'rgba(99,102,241,0.25)' },
  'Module Federation': { bg: 'rgba(168,85,247,0.1)', text: '#C084FC', border: 'rgba(168,85,247,0.4)', glow: 'rgba(168,85,247,0.25)' },
  'SSO': { bg: 'rgba(34,211,238,0.1)', text: '#22D3EE', border: 'rgba(34,211,238,0.4)', glow: 'rgba(34,211,238,0.25)' },
}

export function getTechColor(tech: string): TechColor {
  return techColors[tech] ?? {
    bg: 'rgba(99,102,241,0.1)',
    text: '#818CF8',
    border: 'rgba(99,102,241,0.4)',
    glow: 'rgba(99,102,241,0.25)',
  }
}
