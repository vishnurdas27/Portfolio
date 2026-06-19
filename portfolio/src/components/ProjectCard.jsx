import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import TiltCard from './TiltCard.jsx';
import { resolveImage } from '../api/client.js';

export default function ProjectCard({ project }) {
  const img = resolveImage(project.image);

  return (
    <TiltCard className="proj-card" max={7}>
      <div className="proj-card__media">
        {img ? (
          <img src={img} alt={project.title} loading="lazy" />
        ) : (
          <div className="proj-card__ph">
            <span>{(project.title || '?').charAt(0)}</span>
          </div>
        )}
        {project.featured && <span className="proj-card__badge">★ Featured</span>}
      </div>

      <div className="proj-card__body">
        <h3 className="proj-card__title">{project.title}</h3>
        <p className="proj-card__desc">{project.summary || project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="proj-card__tech">
            {project.techStack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}

        {(project.liveUrl || project.repoUrl) && (
          <div className="proj-card__links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live demo <ArrowUpRight size={14} />
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                Code <FaGithub size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </TiltCard>
  );
}
