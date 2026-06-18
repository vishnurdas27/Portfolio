import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Profile from './models/Profile.js';
import Project from './models/Project.js';
import Achievement from './models/Achievement.js';

async function seed() {
  await connectDB(process.env.MONGO_URI);

  // ---- Admin user ----
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const adminName = process.env.ADMIN_NAME || 'Admin';

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    await User.create({
      name: adminName,
      email: adminEmail,
      passwordHash: await User.hashPassword(adminPassword),
    });
    console.log(`✓ Admin created: ${adminEmail}`);
  } else {
    admin.name = adminName;
    admin.passwordHash = await User.hashPassword(adminPassword);
    await admin.save();
    console.log(`✓ Admin updated: ${adminEmail}`);
  }

  // ---- Profile (singleton) ----
  await Profile.deleteMany({});
  await Profile.create({
    name: 'Vishnu R Das',
    handle: '@vishnurdas27',
    title: 'Full-Stack Developer',
    heroIntro:
      'I build robust, scalable web applications with the MERN stack — turning complex ideas into clean, fast, interactive products.',
    aboutText:
      "I'm a full-stack developer specializing in React, Node.js, and MongoDB. I love crafting end-to-end products: thoughtful interfaces on the front, solid APIs and data models on the back. I'm currently open to freelance projects and full-time roles where I can keep shipping things people enjoy using.",
    location: 'India',
    email: 'vishnurdas27@gmail.com',
    resumeUrl: '',
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
    experience: [
      {
        role: 'Full-Stack Developer',
        company: 'Freelance',
        period: '2024 — present',
        description:
          'Designing and building end-to-end web apps for clients with React, Node.js, Express, and MongoDB.',
      },
      {
        role: 'Frontend Developer Intern',
        company: 'TechStartup',
        period: '2023 — 2024',
        description:
          'Built responsive UIs and reusable component libraries; collaborated with designers and the backend team.',
      },
      {
        role: 'Open-Source Contributor',
        company: 'GitHub',
        period: '2023 — present',
        description: 'Contributing fixes and features to JavaScript and React projects.',
      },
    ],
  });
  console.log('✓ Profile seeded');

  // ---- Projects ----
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: 'Action Plan Tracker',
      summary:
        'A full-stack productivity app that pulls in meetings, summarizes agendas, and tracks action items to completion.',
      description:
        'A MERN application integrated with Microsoft Calendar to fetch meetings, auto-summarize agendas, and turn discussion points into trackable action items with owners and due dates.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Microsoft Graph'],
      liveUrl: '',
      repoUrl: 'https://github.com/vishnurdas27',
      featured: true,
      order: 1,
    },
    {
      title: 'DevConnect',
      summary:
        'A social platform for developers to share projects, write posts, and grow their network.',
      description:
        'Realtime feed with JWT auth, profile pages, likes and comments, and image uploads. Built with React, Express, and Socket.IO.',
      techStack: ['React', 'Express', 'MongoDB', 'Socket.IO'],
      liveUrl: '',
      repoUrl: 'https://github.com/vishnurdas27',
      featured: true,
      order: 2,
    },
    {
      title: 'ShopWave E-commerce',
      summary:
        'A modern storefront with cart, checkout, Stripe payments, and an admin dashboard.',
      description:
        'Product catalog with search and filters, a persistent cart, Stripe checkout, order history, and an admin panel for managing inventory.',
      techStack: ['React', 'Redux', 'Node.js', 'Stripe', 'MongoDB'],
      liveUrl: '',
      repoUrl: 'https://github.com/vishnurdas27',
      featured: false,
      order: 3,
    },
    {
      title: 'Weatherly',
      summary:
        'A clean weather dashboard with location search, 7-day forecasts, and saved cities.',
      description:
        'Consumes a weather API to show current conditions, a 7-day forecast, and animated weather states. Fully responsive and fast.',
      techStack: ['React', 'Vite', 'OpenWeather API'],
      liveUrl: '',
      repoUrl: 'https://github.com/vishnurdas27',
      featured: false,
      order: 4,
    },
  ]);
  console.log('✓ Projects seeded');

  // ---- Achievements ----
  await Achievement.deleteMany({});
  await Achievement.insertMany([
    {
      title: 'Full-Stack Web Development Certification',
      organization: 'freeCodeCamp',
      date: '2024',
      description:
        'Completed 300+ hours covering responsive design, JavaScript algorithms, front-end libraries, and back-end APIs.',
      url: '',
      order: 1,
    },
    {
      title: 'Winner — Inter-College Hackathon',
      organization: 'TechFest',
      date: '2023',
      description:
        'Led a team of four to build a real-time collaboration tool and took first place among 40+ teams.',
      url: '',
      order: 2,
    },
    {
      title: 'Open-Source Contributor',
      organization: 'GitHub',
      date: '2023 — present',
      description:
        'Contributed bug fixes and features to several open-source JavaScript and React projects.',
      url: 'https://github.com/vishnurdas27',
      order: 3,
    },
  ]);
  console.log('✓ Achievements seeded');

  await mongoose.connection.close();
  console.log('\n✓ Seed complete. You can now start the server with: npm run dev');
  process.exit(0);
}

seed().catch((err) => {
  console.error('✗ Seed failed:', err.message);
  process.exit(1);
});
