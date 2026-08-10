export interface WorkProject {
  title: string
  description: string
  url: string
}

export const works: WorkProject[] = [
  {
    title: 'Hematin',
    description:
      'AI-powered daily financial tracking app that helps users record and monitor everyday income and expenses, combining simple bookkeeping with AI-assisted insights for personal budgeting.',
    url: 'https://hematin.vercel.app/',
  },
  {
    title: 'Media Menulis',
    description:
      'Scientific essay writing learning platform based on the Knows SGM pedagogical model from Universitas Negeri Jakarta, with 5 structured learning stages, multimodal materials, 5-aspect essay rubric assessment, and class discussion forums.',
    url: 'http://media-menulis.vercel.app/',
  },
  {
    title: 'Salary Exchange Calculation',
    description:
      'SalaryX ("Know Your Real Pay") helps professionals paid in cross-border currencies see how exchange rate shifts erode their real purchasing power, using historical ECB rate data across 30+ currencies, a raise calculator to restore lost value, an interactive scenario simulator, and PDF export for negotiations — all computed locally in-browser with no sign-up required.',
    url: 'https://my-salary-exchange.vercel.app/',
  },
  {
    title: 'Rami Games',
    description:
      'Camera-based interactive gaming platform that turns webcam-captured body movement and gestures into gameplay input, replacing traditional keyboard or controller controls.',
    url: 'https://rami-games.vercel.app/',
  },
  {
    title: 'Sahabat Ibadah',
    description:
      'All-in-one Islamic companion app offering prayer time schedules, Quran reading, Qibla direction finder, daily supplications, and Zakat calculation and guidance to support daily religious practice.',
    url: 'https://sahabat-ibadah.vercel.app/',
  },
]
