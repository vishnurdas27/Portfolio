import { useOutletContext } from 'react-router-dom';
import { resolveImage } from '../api/client.js';
import defaultAvatar from '../assets/IMG_4481.PNG';
import './Pages.css';

export default function AboutPage() {
  const { profile } = useOutletContext();
  const paragraphs = (profile?.aboutText || '').split('\n').filter(Boolean);
  const avatar = resolveImage(profile?.avatar) || defaultAvatar;

  return (
    <div>
      <div className="page-head">
        <h1 className="page-head__title">About Me</h1>
        <p className="page-head__sub">Who I am, what I do, and what I care about.</p>
        <div className="page-head__divider" />
      </div>

      <div className="about-page">
        <div className="about-page__bio">
          {paragraphs.length ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{profile?.aboutText}</p>
          )}

          {profile?.skills?.length > 0 && (
            <>
              <h3 className="about-page__subtitle">Tech I work with</h3>
              <div className="about-page__skills">
                {profile.skills.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="about-page__card">
          <img src={avatar} alt={profile?.name || 'Portrait'} className="about-page__photo" />
          <ul className="about-page__facts">
            <li>
              <span>Name</span>
              {profile?.name}
            </li>
            <li>
              <span>Role</span>
              {profile?.title}
            </li>
            {profile?.location && (
              <li>
                <span>Location</span>
                {profile.location}
              </li>
            )}
            {profile?.email && (
              <li>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}
