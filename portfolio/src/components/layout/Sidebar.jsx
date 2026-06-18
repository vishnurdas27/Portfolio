import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  User,
  Briefcase,
  FolderOpen,
  Award,
  BookOpen,
  Moon,
  Sun,
  Menu,
  X,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { resolveImage } from '../../api/client.js';
import defaultAvatar from '../../assets/IMG_4481.PNG';
import './Sidebar.css';

const NAV = [
  { to: '/', label: 'Home', Icon: Home, end: true },
  { to: '/about', label: 'About', Icon: User },
  { to: '/career', label: 'Career', Icon: Briefcase },
  { to: '/projects', label: 'Projects', Icon: FolderOpen },
  { to: '/achievements', label: 'Achievements', Icon: Award },
  { to: '/contact', label: 'Contact', Icon: BookOpen },
];

export default function Sidebar({ profile }) {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const avatar = resolveImage(profile?.avatar) || defaultAvatar;
  const handle =
    profile?.handle ||
    (profile?.socials?.github ? '@' + profile.socials.github.split('/').filter(Boolean).pop() : '');
  const year = new Date().getFullYear();

  return (
    <>
      {/* Mobile top bar */}
      <div className="sidebar-topbar">
        <div className="sidebar-topbar__id">
          <img src={avatar} alt="" className="sidebar-topbar__avatar" />
          <span>{profile?.name || 'Vishnu R Das'}</span>
        </div>
        <div className="sidebar-topbar__actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button
            className="theme-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__inner">
          {/* Profile */}
          <div className="sidebar__profile">
            <img src={avatar} alt={profile?.name || 'Avatar'} className="sidebar__avatar" />
            <div className="sidebar__name">
              {profile?.name || 'Vishnu R Das'}
              <BadgeCheck size={18} className="sidebar__verified" />
            </div>
            {handle && <div className="sidebar__handle">{handle}</div>}

            <button className="theme-toggle sidebar__theme" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>

          <div className="sidebar__divider" />

          {/* Nav */}
          <nav className="sidebar__nav">
            {NAV.map(({ to, label, Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} className="sidebar__link-icon" />
                <span>{label}</span>
                <ArrowRight size={15} className="sidebar__link-arrow" />
              </NavLink>
            ))}
          </nav>

          <div className="sidebar__divider" />

          <footer className="sidebar__footer">
            <div>© {year}</div>
            <div>{profile?.name || 'Vishnu R Das'}. All rights reserved.</div>
          </footer>
        </div>
      </aside>

      {open && <div className="sidebar__backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
