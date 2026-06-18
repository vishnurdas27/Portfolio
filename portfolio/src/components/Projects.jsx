import Reveal from './Reveal.jsx';
import ProjectCard from './ProjectCard.jsx';
import './Projects.css';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal>
          <span className="section-label">02 — Projects</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">Featured work</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="section-intro">A selection of things I&apos;ve designed and built recently.</p>
        </Reveal>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p._id || i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
