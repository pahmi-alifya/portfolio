export type Experience = {
  company: string
  role: string
  period: { start: string; end: string }
  location: string
  current?: boolean
  freelance?: boolean
  jobs: string[]
  techStack: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Deeeplabs',
    role: 'Frontend Engineer',
    period: { start: 'Aug 2025', end: 'Present' },
    location: 'Indonesia',
    current: true,
    jobs: [
      'Frontend development for production-grade applications',
      'Collaborating with cross-functional teams',
    ],
    techStack: ['React Js', 'React Native', 'Zustand', 'GraphQl', 'TanStack Query', 'Refine'],
  },
  {
    company: 'eFishery',
    role: 'Frontend Engineer',
    period: { start: 'Jul 2023', end: 'Dec 2024' },
    location: 'Bandung, Jawa Barat, Indonesia',
    jobs: [
      'Created Delivery Assignment Modules from scratch',
      'Created Merchandiser Modules for Version 2',
      'Created Pricing Calculator Modules from scratch',
      'Created Nomination Coop Modules from scratch',
      'Revamped Purchase Order Modules',
      'Enhanced maintenance mode based on Flagr',
      'Implemented VA Payment Method',
      'Implemented i18n for international expansion',
      'Enhanced Bitbucket Pipeline (CI/CD) for international expansion',
      'Coverage unit test & code reviews',
      'API and GraphQL integration',
    ],
    techStack: ['React Js', 'React Native', 'Zustand', 'GraphQl', 'TanStack Query', 'Refine'],
  },
  {
    company: 'RCTI+',
    role: 'Software Engineer',
    period: { start: 'Mar 2022', end: 'Jun 2023' },
    location: 'Jakarta Barat, Indonesia',
    jobs: [
      'Created new Live Streaming feature from scratch (Video+)',
      'Created Interactive Quiz for Web View from scratch',
      'Implemented Ads integration for Video+',
      'Created web voting & tracker features',
      'Implemented Micro Frontend architecture',
      'Integrated Firebase for chat features',
      'Improved CI/CD pipeline for international deployment',
      'Code reviews and API/GraphQL integration',
    ],
    techStack: ['Next Js', 'Vue Js', 'Redux', 'Zustand', 'GraphQl', 'Firebase'],
  },
  {
    company: 'KawanMabar',
    role: 'React Native Developer',
    period: { start: 'May 2022', end: 'Nov 2022' },
    location: 'Bali, Indonesia',
    freelance: true,
    jobs: [
      'Contributed to KawanMabar App V2 development',
      'Implemented Firebase push notifications',
      'API integration and bug fixing',
    ],
    techStack: ['React Native', 'Redux', 'TypeScript'],
  },
  {
    company: 'Juke Solutions',
    role: 'Software Developer',
    period: { start: 'Jul 2021', end: 'Feb 2022' },
    location: 'Jakarta Raya, Indonesia',
    jobs: [
      'Developed EMIS 4.0 Android application',
      'Created new features and modules',
      'API integration and bug fixing',
    ],
    techStack: ['React Native', 'Redux'],
  },
  {
    company: 'Simlinmas – Kemendagri',
    role: 'Mobile Developer',
    period: { start: 'Jul 2021', end: 'Oct 2021' },
    location: 'Jakarta Raya, Indonesia',
    freelance: true,
    jobs: [
      'Developed Simlinmas Android application from scratch',
      'API integration and bug fixing',
    ],
    techStack: ['React Native', 'Redux'],
  },
  {
    company: 'PT. Qelopak Teknologi Indonesia',
    role: 'Frontend Web Developer',
    period: { start: 'Nov 2020', end: 'May 2021' },
    location: 'Dramaga, Jawa Barat, Indonesia',
    jobs: [
      'Created Laboratory Modules from scratch',
      'Created Radiology Modules from scratch',
      'Created Nurse Modules from scratch',
      'API integration and bug fixing',
    ],
    techStack: ['Next Js', 'Antd', 'Redux'],
  },
]
