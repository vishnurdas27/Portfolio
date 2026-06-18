// Static fallback content so the site renders beautifully even before the
// backend/Atlas is connected. Once the API responds, this is replaced by live data.

export const fallbackProfile = {
  name: 'Vishnu R Das',
  title: 'Full-Stack Developer',
  heroIntro:
    'I build robust, scalable web applications with the MERN stack — turning complex ideas into clean, fast, interactive products.',
  aboutText:
    "I'm a full-stack developer specializing in React, Node.js, and MongoDB. I love crafting end-to-end products: thoughtful interfaces on the front, solid APIs and data models on the back. I'm currently open to freelance projects and full-time roles where I can keep shipping things people enjoy using.",
  location: 'India',
  email: 'vishnurdas27@gmail.com',
  resumeUrl: '',
  avatar: '',
  socials: {
    github: 'https://github.com/vishnurdas27',
    linkedin: 'https://www.linkedin.com/in/vishnurdas27',
    twitter: 'https://twitter.com/vishnurdas27',
  },
  skills: [
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'REST APIs',
    'Git & GitHub',
  ],
};

export const fallbackProjects = [
  {
    _id: 'f1',
    title: 'Action Plan Tracker',
    summary:
      'A full-stack productivity app that pulls in meetings, summarizes agendas, and tracks action items to completion.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Microsoft Graph'],
    liveUrl: '',
    repoUrl: 'https://github.com/vishnurdas27',
    featured: true,
  },
  {
    _id: 'f2',
    title: 'DevConnect',
    summary: 'A social platform for developers to share projects, write posts, and grow their network.',
    techStack: ['React', 'Express', 'MongoDB', 'Socket.IO'],
    liveUrl: '',
    repoUrl: 'https://github.com/vishnurdas27',
    featured: true,
  },
  {
    _id: 'f3',
    title: 'ShopWave E-commerce',
    summary: 'A modern storefront with cart, checkout, Stripe payments, and an admin dashboard.',
    techStack: ['React', 'Redux', 'Node.js', 'Stripe', 'MongoDB'],
    liveUrl: '',
    repoUrl: 'https://github.com/vishnurdas27',
    featured: false,
  },
  {
    _id: 'f4',
    title: 'Weatherly',
    summary: 'A clean weather dashboard with location search, 7-day forecasts, and saved cities.',
    techStack: ['React', 'Vite', 'OpenWeather API'],
    liveUrl: '',
    repoUrl: 'https://github.com/vishnurdas27',
    featured: false,
  },
];

export const fallbackAchievements = [
  {
    _id: 'a1',
    title: 'Full-Stack Web Development Certification',
    organization: 'freeCodeCamp',
    date: '2024',
    description:
      'Completed 300+ hours covering responsive design, JavaScript algorithms, front-end libraries, and back-end APIs.',
    url: '',
  },
  {
    _id: 'a2',
    title: 'Winner — Inter-College Hackathon',
    organization: 'TechFest',
    date: '2023',
    description:
      'Led a team of four to build a real-time collaboration tool and took first place among 40+ teams.',
    url: '',
  },
  {
    _id: 'a3',
    title: 'Open-Source Contributor',
    organization: 'GitHub',
    date: '2023 — present',
    description:
      'Contributed bug fixes and features to several open-source JavaScript and React projects.',
    url: 'https://github.com/vishnurdas27',
  },
];
