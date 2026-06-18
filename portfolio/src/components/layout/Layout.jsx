import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import { getProfile, getProjects, getAchievements } from '../../api/endpoints.js';
import { fallbackProfile, fallbackProjects, fallbackAchievements } from '../../data/fallback.js';
import './Layout.css';

export default function Layout() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [achievements, setAchievements] = useState(fallbackAchievements);
  const { pathname } = useLocation();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Sidebar profile={profile} />
      <main className="layout__main">
        <div className="layout__content">
          <Outlet context={{ profile, projects, achievements }} />
        </div>
      </main>
    </div>
  );
}
