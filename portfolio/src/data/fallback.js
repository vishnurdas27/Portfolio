// Static fallback content sourced from Vishnu's resume + supplied job details.
// Replaced live by the API once the backend is connected.

export const fallbackProfile = {
  name: 'Vishnu R Das',
  handle: '@vishnurdas27',
  title: 'Full-Stack Developer',
  heroIntro:
    'I build responsive, production-ready web apps with the MERN stack and Python — focused on secure authentication, payment integrations, background job scheduling, and cloud deployment on AWS and IBM Cloud.',
  aboutText:
    "I'm a Full-Stack Developer based in Palakkad, Kerala. I work primarily across the MERN stack (MongoDB, Express, React, Node.js) and Python (FastAPI), and I love taking ideas from rough sketches all the way to deployed, working products.\nMy focus is on building responsive web apps with secure authentication, payment-gateway integrations (Stripe, Clerk), background job scheduling, and clean APIs. I've deployed production apps to AWS and IBM Cloud, and I keep an eye on developer experience throughout.\nCurrently I'm pursuing a B.Voc. at CUSAT alongside Nxtwave's Full-Stack Development program, and I'm open to roles where I can keep shipping things people actually use.",
  location: 'Palakkad, Kerala',
  email: 'vishnurdas27@gmail.com',
  phone: '+91 6235372798',
  resumeUrl: '',
  avatar: '',
  socials: {
    github: 'https://github.com/vishnurdas27',
    linkedin: 'https://linkedin.com/in/vishnurdas2004',
    twitter: '',
  },
  skills: [
    // Frontend
    'React.js',
    'JavaScript',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Bootstrap',
    // Backend
    'Node.js',
    'Express.js',
    'Python',
    'FastAPI',
    // Databases
    'MongoDB',
    'PostgreSQL',
    'SQLite',
    // Tools & Cloud
    'Git',
    'AWS',
    'IBM Cloud',
    'Postman',
    'Inngest',
    'Stripe',
    'Clerk',
  ],
  experience: [
    {
      role: 'Software Developer',
      company: 'Saint-Gobain Sefpro',
      period: 'Current',
      description:
        'Building and maintaining internal full-stack tools that streamline operations and reporting workflows across the business.',
    },
    {
      role: 'Data Analyst Intern',
      company: 'Saint-Gobain',
      period: 'Internship',
      description:
        'Worked with operational and process data to build reports and dashboards that supported decision-making across teams.',
    },
    {
      role: 'AI/ML Developer Intern',
      company: 'IBM SkillsBuild — Project-Based Internship',
      period: 'Jul 2025 — Aug 2025',
      description:
        'Built a RAG-based AI/ML chatbot for disease diagnosis and wellness support using IBM Cloud, Watson Studio, and NLP tools. Contributed to UN SDG 3 (Good Health and Well-being) through accessible tech.',
    },
  ],
  education: [
    {
      degree: 'Full-Stack Development',
      institution: 'Nxtwave Disruptive Technologies',
      period: 'Apr 2024 — Ongoing',
      location: 'Remote',
      score: '',
    },
    {
      degree: 'Bachelor of Vocation (B.Voc.)',
      institution: 'Cochin University of Science and Technology',
      period: '2023 — 2026',
      location: 'Ernakulam',
      score: 'CGPA: 8.34',
    },
    {
      degree: 'Intermediate MPC (Class XII)',
      institution: 'Jawahar Navodaya Vidyalaya',
      period: '2022 — 2023',
      location: 'Palakkad',
      score: '83.6%',
    },
    {
      degree: 'Secondary School Certificate (Class X)',
      institution: 'Jawahar Navodaya Vidyalaya',
      period: '2020 — 2021',
      location: 'Palakkad',
      score: '82.2%',
    },
  ],
};

export const fallbackProjects = [
  {
    _id: 'p1',
    title: 'Action Plan Tracker',
    summary:
      'A full-stack productivity app that syncs Microsoft Calendar meetings, summarizes agendas, and turns discussion points into trackable action items.',
    description:
      'MERN application integrated with Microsoft Graph to fetch calendar meetings, sanitize and display agendas, and convert decisions into action items with owners and due dates. Includes a meeting detail drawer, attendees view, and a sync flow tied to a connected Microsoft account.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Microsoft Graph'],
    liveUrl: '',
    repoUrl: 'https://github.com/vishnurdas27',
    featured: true,
    order: 1,
  },
  {
    _id: 'p2',
    title: 'Kaido',
    summary:
      'A focused productivity / habit-tracking app with a clean React frontend and a Node.js backend.',
    description:
      'A personal project exploring streak-style productivity and habit tracking with daily check-ins, progress visualization, and persistent storage.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: '',
    repoUrl: 'https://github.com/vishnurdas27',
    featured: true,
    order: 2,
  },
  {
    _id: 'p3',
    title: 'Badminton Court Booking System',
    summary:
      'Full-stack booking platform with dynamic pricing, coach registration, equipment tracking, and an admin dashboard.',
    description:
      'A full-stack web app for managing court bookings, coach assignments, and equipment availability. Implements dynamic pricing rules based on court selection, time slots, and demand, plus secure user authentication and an admin dashboard for courts and pricing.',
    techStack: ['React', 'Express.js', 'Node.js', 'MongoDB'],
    liveUrl: '',
    repoUrl: 'https://github.com/vishnurdas27',
    featured: true,
    order: 3,
  },
  {
    _id: 'p4',
    title: 'CineSpot — Movie Booking App',
    summary:
      'A full-stack movie ticketing platform with Stripe payments, multi-session auth via Clerk, and background jobs via Inngest.',
    description:
      'Users browse movies, select seats, and pay through Stripe with webhook-confirmed status. Supports multi-session authentication (Email, Social, Phone) using Clerk, with Inngest scheduling background jobs to automate booking confirmations.',
    techStack: ['React', 'Node.js', 'Tailwind', 'Stripe', 'Clerk', 'Inngest'],
    liveUrl: '',
    repoUrl: 'https://github.com/vishnurdas27',
    featured: true,
    order: 4,
  },
];

export const fallbackAchievements = [
  {
    _id: 'a1',
    title: 'First Place — Entrepreneurship Business Idea Competition',
    organization: 'Entrepreneurship Bootcamp, CUSAT',
    date: 'Feb 2025',
    description:
      'Coordinated the event and secured first place in the Entrepreneurship Business Idea Competition at CUSAT.',
    url: '',
    order: 1,
  },
  {
    _id: 'a2',
    title: 'Full-Stack Development Certificate',
    organization: 'NxtWave',
    date: '2024',
    description:
      'Certified in building scalable web apps with React, Node.js, and MongoDB — covering frontend, backend, and database management.',
    url: '',
    order: 2,
  },
  {
    _id: 'a3',
    title: 'AWS Hands-on Workshop',
    organization: 'NxtWave',
    date: '2024',
    description:
      'Hands-on experience building and deploying applications on AWS using EC2, RDS, Route 53, S3, and CloudFront.',
    url: '',
    order: 3,
  },
  {
    _id: 'a4',
    title: 'Generative AI & Model Context Protocol (MCP) Workshops',
    organization: 'NxtWave',
    date: '2024',
    description:
      'Completed workshops on Generative AI and the Model Context Protocol — covering AI architecture, prompts, and tool/protocol integration.',
    url: '',
    order: 4,
  },
  {
    _id: 'a5',
    title: 'Talentime’39 Participant',
    organization: 'School of Management Studies (SMS), CUSAT',
    date: '2024',
    description:
      "Participated in South India's largest management fest, organized by SMS CUSAT — showcasing leadership and analytical skills.",
    url: '',
    order: 5,
  },
];
