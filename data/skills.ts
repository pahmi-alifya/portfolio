export type Skill = {
  name: string
  category: string
}

export type SkillCategory = {
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend Web',
    skills: ['React Js', 'Next.js', 'Vue.js', 'Tailwind CSS'],
  },
  {
    label: 'Mobile',
    skills: ['React Native', 'Firebase', 'TypeScript'],
  },
  {
    label: 'State Management',
    skills: ['Redux', 'Zustand', 'TanStack Query'],
  },
  {
    label: 'Backend Integration',
    skills: ['REST API', 'GraphQL'],
  },
  {
    label: 'UI Libraries',
    skills: ['Ant Design', 'Refine'],
  },
  {
    label: 'Tools & DevOps',
    skills: ['Git', 'CI/CD', 'i18n'],
  },
  {
    label: 'Architecture',
    skills: ['Module Federation', 'SSO'],
  },
]

export const allSkills = skillCategories.flatMap((c) => c.skills)
