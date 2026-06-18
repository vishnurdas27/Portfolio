import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { resolveImage } from '../api/client.js';

export default function ProjectCard({ project, index }) {
  const img = resolveImage(project.image);

  return (
    <motion.article
      className="pcard"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pcard__media">
        {img ? (
          <img src={img} alt={project.title} loading="lazy" />
        ) : (
          <div className="pcard__placeholder">
            <span>{(project.title || '?').charAt(0)}</span>
          </div>
        )}
        {project.featured && <span className="pcard__featured">★ Featured</span>}
      </div>

      <div className="pcard__body">
        <h3 className="pcard__title">{project.title}</h3>
        <p className="pcard__summary">{project.summary || project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="pcard__tech">
            {project.techStack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="pcard__links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pcard__link">
              Live demo <ArrowUpRight size={15} />
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="pcard__link">
              Code <Github size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
