// ============================================================
//  EDIT ME — all site content lives in this one file.
//  Sourced from public GitHub/web data; LinkedIn blocks full
//  scraping, so items marked TODO should be corrected by you.
// ============================================================

export interface Role {
  company: string;
  role: string;
  period: string;
  points: string[];
}

export interface Project {
  name: string;
  codename: string;
  description: string;
  tech: string[];
  link: string;
  stat?: string;
}

export interface Skill {
  name: string;
  level: number; // 0–100
}

export const profile = {
  name: 'Rick Sanchez',
  realName: 'Matin Beigi',
  title: 'Software Engineer · PHP & WordPress Alchemist',
  tagline: 'I turn caffeine into code and break the boundaries — one project at a time.',
  location: 'Dimension C-137 · Working from home',
  email: 'm4tinbeigi@gmail.com',

  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/matinbeigi/' },
    { label: 'GitHub', url: 'https://github.com/m4tinbeigi-official' },
    { label: 'X / Twitter', url: 'https://twitter.com/m4tinbeigi' },
    { label: 'Instagram', url: 'https://instagram.com/m4tinbeigi' },
    { label: 'ricksanchez.ir', url: 'https://ricksanchez.ir' },
  ],

  about: [
    'Coding enthusiast building cool things with PHP and WordPress at the core — but fluent across the stack, from JavaScript front-ends to REST APIs.',
    'Beyond the terminal: active in marketing, developer community and event management. Known on LinkedIn as the guy who actually shows up, posts, and connects people.',
    'Maintainer of 206 public repositories and counting. WUBBA LUBBA DUB DUB.',
  ],

  // TODO: correct titles & dates from your LinkedIn export
  experience: [
    {
      company: 'Zibal',
      role: 'Software Engineer',
      period: '2024 — Present',
      points: [
        'Engineering at one of Iran’s leading payment gateway platforms.',
        'Payment integrations, developer tooling and merchant-facing features.',
      ],
    },
    {
      company: 'Zhaket',
      role: 'WordPress Developer',
      period: '2021 — 2023',
      points: [
        'Built and shipped products for the largest Persian WordPress marketplace.',
        'Plugin & theme development, WooCommerce, marketplace ecosystem.',
      ],
    },
    {
      company: 'Open Source & Community',
      role: 'Maintainer · Event Organizer',
      period: 'Ongoing',
      points: [
        'Creator of FreeMovie (170+ ⭐) and RS-Player.',
        'Organizes developer meetups and community events; active LinkedIn voice for the Persian dev scene.',
      ],
    },
  ] as Role[],

  projects: [
    {
      name: 'FreeMovie',
      codename: 'EXPERIMENT-001',
      description: 'Your freedom in entertainment — open-source movie discovery platform with a community of contributors.',
      tech: ['JavaScript', 'API', 'Open Source'],
      link: 'https://github.com/FreeMovieIR/freemovieir.github.io',
      stat: '173+ GitHub stars',
    },
    {
      name: 'RS-Player',
      codename: 'EXPERIMENT-002',
      description: 'Custom media player engineered from scratch. Lightweight, embeddable, Rick-approved.',
      tech: ['JavaScript', 'HTML5 Media'],
      link: 'https://github.com/m4tinbeigi-official/RS-Player',
      stat: '8 stars',
    },
    {
      name: 'T2I',
      codename: 'EXPERIMENT-003',
      description: 'Text-to-image generator for Instagram content — automating the boring parts of publishing.',
      tech: ['HTML', 'Canvas'],
      link: 'https://github.com/m4tinbeigi-official/t2i',
    },
    {
      name: '206 Public Repos',
      codename: 'THE-ARCHIVE',
      description: 'A whole multiverse of experiments: WordPress plugins, bots, tools and prototypes.',
      tech: ['PHP', 'WordPress', 'JS', 'Python'],
      link: 'https://github.com/m4tinbeigi-official?tab=repositories',
    },
  ] as Project[],

  skills: [
    { name: 'PHP', level: 95 },
    { name: 'WordPress', level: 95 },
    { name: 'WooCommerce', level: 88 },
    { name: 'JavaScript', level: 85 },
    { name: 'HTML / CSS', level: 90 },
    { name: 'REST APIs', level: 86 },
    { name: 'MySQL', level: 82 },
    { name: 'Git & GitHub', level: 90 },
    { name: 'Python', level: 70 },
    { name: 'SEO & Marketing', level: 80 },
    { name: 'Event Management', level: 85 },
    { name: 'Community Building', level: 92 },
  ] as Skill[],

  achievements: [
    { title: 'Pull Shark', detail: 'GitHub achievement — merged PRs at scale' },
    { title: 'Starstruck ×2', detail: 'Repository loved by the community' },
    { title: 'YOLO', detail: 'Merged without review. Obviously.' },
    { title: 'Quickdraw', detail: 'Fastest close in the west' },
    { title: 'Pair Extraordinaire', detail: 'Co-authored excellence' },
    { title: 'GitHub Developer Program', detail: 'Official member' },
    { title: '245+ Followers', detail: 'GitHub community reach' },
    { title: 'Community Events', detail: 'Organizer of Persian dev meetups' },
  ],

  contact: {
    heading: 'Open a portal to me',
    line: 'Got a project from another dimension? A job that needs a mad scientist? The portal is open.',
  },
};

export type Profile = typeof profile;
