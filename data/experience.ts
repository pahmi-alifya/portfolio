export type Experience = {
  company: string
  role: string
  period: { start: string; end: string }
  location: string
  current?: boolean
  freelance?: boolean
  summary?: string
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
    summary:
      'As a Frontend Engineer, I designed and built scalable web and mobile applications using React, TypeScript, and React Native, implementing role-based access control, Zustand state management, and TanStack Query caching, while creating an internal reusable SSO authentication library (AWS Cognito/Azure AD), integrated analytics and data export features, maintained high code quality via Vitest unit tests, and collaborated closely with cross-functional teams on feature delivery and technical documentation.',
    jobs: [
      'Designed and built scalable web and mobile applications using React, TypeScript, and React Native',
      'Implemented role-based access control (RBAC)',
      'Managed state with Zustand and data caching with TanStack Query',
      'Created an internal reusable SSO authentication library (AWS Cognito / Azure AD)',
      'Integrated analytics and data export features',
      'Maintained high code quality with Vitest unit tests',
      'Collaborated with cross-functional teams on feature delivery and technical documentation',
    ],
    techStack: ['React Js', 'TypeScript', 'Refine', 'React Native', 'Zustand', 'TanStack Query', 'Vitest', 'AWS Cognito', 'Azure AD', 'i18n'],
  },
  {
    company: 'eFishery',
    role: 'Frontend Engineer',
    period: { start: 'Jul 2023', end: 'Dec 2024' },
    location: 'Bandung, Jawa Barat, Indonesia',
    summary:
      'As a Frontend Engineer, I built Delivery Assignment, Pricing Calculator, and Nomination Coop modules from scratch, developed Merchandiser Modules V2, and revamped Purchase Order modules using React, React Native, Refine, Zustand, and TanStack Query, while implementing a VA payment method, Flagr-based maintenance mode, and i18n plus Bitbucket CI/CD enhancements for international expansion, handling API and GraphQL integration, and maintaining code quality through unit tests and code reviews.',
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
    techStack: ['React Js', 'React Native', 'Zustand', 'GraphQl', 'TanStack Query', 'Refine', 'Vitest', 'i18n', 'CI/CD',],
  },
  {
    company: 'RCTI+',
    role: 'Software Engineer',
    period: { start: 'Mar 2022', end: 'Jun 2023' },
    location: 'Jakarta Barat, Indonesia',
    summary:
      'As a Software Engineer, I built the Video+ live streaming feature and an interactive web view quiz from scratch using Next.js and Vue.js, integrated ads into Video+, created web voting and tracker features, implemented a micro frontend architecture with Module Federation, integrated Firebase for chat, improved the CI/CD pipeline for international deployment, and handled API/GraphQL integration and code reviews.',
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
    techStack: ['Next Js', 'Vue Js', 'Redux', 'Zustand', 'GraphQl', 'Firebase', 'Module Federation'],
  },
  {
    company: 'KawanMabar',
    role: 'React Native Developer',
    period: { start: 'May 2022', end: 'Nov 2022' },
    location: 'Bali, Indonesia',
    summary:
      'As a freelance React Native Developer, I contributed to the development of KawanMabar App V2 using React Native, Redux, and TypeScript, implementing Firebase push notifications, integrating APIs, and fixing bugs.',
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
    summary:
      'As a Software Developer, I developed the EMIS 4.0 Android application using React Native and Redux, building new features and modules, integrating APIs, and fixing bugs.',
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
    summary:
      'As a freelance Mobile Developer, I developed the Simlinmas Android application for the Ministry of Home Affairs (Kemendagri) from scratch using React Native and Redux, including API integration and bug fixing.',
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
    summary:
      'As a Frontend Web Developer, I built Laboratory, Radiology, and Nurse modules from scratch for a healthcare web application using Next.js, Ant Design, and Redux, along with API integration and bug fixing.',
    jobs: [
      'Created Laboratory Modules from scratch',
      'Created Radiology Modules from scratch',
      'Created Nurse Modules from scratch',
      'API integration and bug fixing',
    ],
    techStack: ['Next Js', 'Antd', 'Redux'],
  },
]
