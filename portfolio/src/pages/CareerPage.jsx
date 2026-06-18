import { useOutletContext } from 'react-router-dom';
import './Pages.css';

export default function CareerPage() {
  const { profile } = useOutletContext();
  const experience = profile?.experience || [];

  return (
    <div>
      <div className="page-head">
        <h1 className="page-head__title">Career</h1>
        <p className="page-head__sub">My professional journey and work experience.</p>
        <div className="page-head__divider" />
      </div>

      {experience.length === 0 ? (
        <p className="page-empty">Experience coming soon.</p>
      ) : (
        <div className="timeline">
          {experience.map((e, i) => (
            <div className="timeline__item" key={i}>
              <span className="timeline__marker" />
              <div className="timeline__content">
                <div className="timeline__meta">
                  {e.period && <span className="timeline__date">{e.period}</span>}
                  {e.company && <span className="timeline__org">{e.company}</span>}
                </div>
                <h3 className="timeline__title">{e.role}</h3>
                {e.description && <p className="timeline__desc">{e.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
