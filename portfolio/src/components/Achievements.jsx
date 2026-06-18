import Reveal from './Reveal.jsx';
import { ArrowUpRight } from 'lucide-react';
import './Achievements.css';

export default function Achievements({ achievements }) {
  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <Reveal>
          <span className="section-label">03 — Achievements</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">Milestones &amp; recognition</h2>
        </Reveal>

        <div className="timeline">
          {achievements.map((a, i) => (
            <Reveal key={a._id || i} delay={0.04 * i} className="timeline__item">
              <span className="timeline__marker" />
              <div className="timeline__content">
                <div className="timeline__meta">
                  {a.date && <span className="timeline__date">{a.date}</span>}
                  {a.organization && <span className="timeline__org">{a.organization}</span>}
                </div>
                <h3 className="timeline__title">
                  {a.title}
                  {a.url && (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noreferrer"
                      className="timeline__link"
                      aria-label={`Open ${a.title}`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </h3>
                {a.description && <p className="timeline__desc">{a.description}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
