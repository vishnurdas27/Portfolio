import { useOutletContext } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard.jsx';
import './Pages.css';

export default function ProjectsPage() {
  const { projects } = useOutletContext();

  return (
    <div>
      <div className="page-head">
        <h1 className="page-head__title">Featured Projects</h1>
        <p className="page-head__sub">
          A curated selection of projects I&apos;ve worked on, showcasing my skills in web
          development.
        </p>
        <div className="page-head__divider" />
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p._id || i} project={p} />
        ))}
      </div>
    </div>
  );
}
