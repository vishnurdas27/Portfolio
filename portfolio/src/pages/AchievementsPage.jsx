import { useOutletContext } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './Pages.css';

export default function AchievementsPage() {
  const { achievements } = useOutletContext();

  return (
    <div>
      <div className="page-head">
        <h1 className="page-head__title">Achievements</h1>
        <p className="page-head__sub">Milestones, certifications, and recognition along the way.</p>
        <div className="page-head__divider" />
      </div>

      <div className="timeline">
        {achievements.map((a, i) => (
          <div className="timeline__item" key={a._id || i}>
            <span className="timeline__marker" />
            <div className="timeline__content">
              <div className="timeline__meta">
                {a.date && <span className="timeline__date">{a.date}</span>}
                {a.organization && <span className="timeline__org">{a.organization}</span>}
              </div>
              <h3 className="timeline__title">
                {a.title}
                {a.url && (
                  <a href={a.url} target="_blank" rel="noreferrer" aria-label={`Open ${a.title}`}>
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </h3>
              {a.description && <p className="timeline__desc">{a.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
