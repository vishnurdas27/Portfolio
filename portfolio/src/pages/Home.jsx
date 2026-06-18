import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Projects from '../components/Projects.jsx';
import Achievements from '../components/Achievements.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import { getProfile, getProjects, getAchievements } from '../api/endpoints.js';
import { fallbackProfile, fallbackProjects, fallbackAchievements } from '../data/fallback.js';

export default function Home() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [achievements, setAchievements] = useState(fallbackAchievements);

  // Hydrate from the API; keep fallbacks if the backend isn't reachable yet.
  useEffect(() => {
    getProfile()
      .then((d) => d && setProfile({ ...fallbackProfile, ...d }))
      .catch(() => {});
    getProjects()
      .then((d) => Array.isArray(d) && d.length && setProjects(d))
      .catch(() => {});
    getAchievements()
      .then((d) => Array.isArray(d) && d.length && setAchievements(d))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Achievements achievements={achievements} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
