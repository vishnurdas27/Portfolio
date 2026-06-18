import Reveal from './Reveal.jsx';
import './About.css';

export default function About({ profile }) {
  const skills = profile?.skills || [];
  const paragraphs = (profile?.aboutText || '').split('\n').filter(Boolean);

  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal>
          <span className="section-label">01 — About</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">A bit about me</h2>
        </Reveal>

        <div className="about__grid">
          <Reveal delay={0.1} className="about__text">
            {paragraphs.length ? (
              paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>{profile?.aboutText}</p>
            )}
          </Reveal>

          <Reveal delay={0.15} className="about__panel">
            <h3 className="about__panel-title">Tech I work with</h3>
            <div className="about__skills">
              {skills.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
