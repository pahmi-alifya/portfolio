export interface WorkProject {
  title: string
  description: string
  url: string
}

export const works: WorkProject[] = [
  {
    title: 'Hematin',
    description: 'Personal finance tracker for managing budgets, expenses, and savings goals.',
    url: 'https://hematin.vercel.app/',
  },
  {
    title: 'Media Menulis',
    description: 'Writing platform for publishing and sharing articles online.',
    url: 'http://media-menulis.vercel.app/',
  },
  {
    title: 'Salary Exchange Calculation',
    description: 'Web tool for calculating salary, deductions, and take-home pay.',
    url: 'https://my-salary-exchange.vercel.app/',
  },
  {
    title: 'Rami Games',
    description: 'Online rami card game built for casual multiplayer play.',
    url: 'https://rami-games.vercel.app/',
  },
]
