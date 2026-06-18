import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Award, User, Mail, LogOut, ExternalLink, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { getProfile, getProjects, getAchievements, getMessages } from '../../api/endpoints.js';
import ProjectsPanel from '../../components/admin/ProjectsPanel.jsx';
import AchievementsPanel from '../../components/admin/AchievementsPanel.jsx';
import ProfilePanel from '../../components/admin/ProfilePanel.jsx';
import MessagesPanel from '../../components/admin/MessagesPanel.jsx';
import '../../components/admin/admin.css';

const TABS = [
  { id: 'projects', label: 'Projects', Icon: LayoutGrid },
  { id: 'achievements', label: 'Achievements', Icon: Award },
  { id: 'profile', label: 'Profile & About', Icon: User },
  { id: 'messages', label: 'Messages', Icon: Mail },
];

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('projects');
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = useCallback((msg, type = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2600);
  }, []);

  const loadProjects = useCallback(() => getProjects().then(setProjects).catch(() => {}), []);
  const loadAchievements = useCallback(
    () => getAchievements().then(setAchievements).catch(() => {}),
    []
  );
  const loadProfile = useCallback(() => getProfile().then(setProfile).catch(() => {}), []);
  const loadMessages = useCallback(() => getMessages().then(setMessages).catch(() => {}), []);

  useEffect(() => {
    loadProjects();
    loadAchievements();
    loadProfile();
    loadMessages();
  }, [loadProjects, loadAchievements, loadProfile, loadMessages]);

  const doLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="admin">
      <aside className={`admin__sidebar ${sidebarOpen ? 'admin__sidebar--open' : ''}`}>
        <div className="admin__brand">
          Admin <span />
        </div>

        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`admin__nav-item ${tab === id ? 'admin__nav-item--active' : ''}`}
            onClick={() => {
              setTab(id);
              setSidebarOpen(false);
            }}
          >
            <Icon size={18} /> {label}
            {id === 'messages' && unread > 0 && <span className="admin__nav-badge">{unread}</span>}
          </button>
        ))}

        <div className="admin__sidebar-foot">
          <a href="/" target="_blank" rel="noreferrer" className="admin__nav-item">
            <ExternalLink size={18} /> View site
          </a>
          <button className="admin__nav-item" onClick={doLogout}>
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      <main className="admin__main">
        <button
          className="icon-btn admin__menu-btn"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{ marginBottom: 16 }}
        >
          <Menu size={18} />
        </button>

        {tab === 'projects' && (
          <ProjectsPanel projects={projects} reload={loadProjects} toast={showToast} />
        )}
        {tab === 'achievements' && (
          <AchievementsPanel
            achievements={achievements}
            reload={loadAchievements}
            toast={showToast}
          />
        )}
        {tab === 'profile' &&
          (profile ? (
            <ProfilePanel key={profile._id} profile={profile} reload={loadProfile} toast={showToast} />
          ) : (
            <div className="admin-empty">Loading profile…</div>
          ))}
        {tab === 'messages' && (
          <MessagesPanel messages={messages} reload={loadMessages} toast={showToast} />
        )}
      </main>

      {toast && <div className={`admin-toast admin-toast--${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
