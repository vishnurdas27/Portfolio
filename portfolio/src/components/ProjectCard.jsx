import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import TiltCard from './TiltCard.jsx';
import { resolveImage } from '../api/client.js';

export default function ProjectCard({ project }) {
  // Prefer the new images array; fall back to the legacy single image field
  const rawImages = Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : project.image
      ? [project.image]
      : [];
  const images = rawImages.map(resolveImage).filter(Boolean);
  const [index, setIndex] = useState(0);

  const total = images.length;
  const hasMultiple = total > 1;

  // Stop the click from bubbling up to the tilt card / parent link
  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + total) % total);
  };
  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % total);
  };

  return (
    <TiltCard className="proj-card" max={7}>
      <div className="proj-card__media">
        {total > 0 ? (
          <>
            <img
              key={images[index]}
              src={images[index]}
              alt={project.title}
              loading="lazy"
              className="proj-card__img"
            />
            {hasMultiple && (
              <>
                <button
                  type="button"
                  className="proj-carousel__btn proj-carousel__btn--prev"
                  onClick={prev}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="proj-carousel__btn proj-carousel__btn--next"
                  onClick={next}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="proj-carousel__dots">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={
                        'proj-carousel__dot' + (i === index ? ' proj-carousel__dot--active' : '')
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIndex(i);
                      }}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
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
