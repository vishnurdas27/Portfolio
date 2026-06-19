import { useOutletContext } from 'react-router-dom';
import {
  FolderOpen,
  User,
  Code2,
  Award,
  Briefcase,
  BookOpen,
  Download,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import TiltCard from '../components/TiltCard.jsx';
import { resolveImage } from '../api/client.js';
import defaultAvatar from '../assets/IMG_4481.PNG';
import './Home.css';

export default function Home() {
  const { profile, projects, achievements } = useOutletContext();

  const skills = profile?.skills?.length ? profile.skills : ['React', 'Node.js', 'MongoDB'];
  const experience = profile?.experience?.length
    ? profile.experience
    : [{ company: 'Freelance' }, { company: 'Open Source' }];
  const avatar = resolveImage(profile?.avatar) || defaultAvatar;

  const skillLoop = [...skills, ...skills];
  const careerLoop = [...experience, ...experience];
  const projectLoop = [...projects, ...projects].slice(0, 8);

  return (
    <div className="home">
      {/* ---- Hero ---- */}
      <header className="home-hero">
        <div className="home-hero__top">
          <h1 className="home-hero__title">Hi, I&apos;m {profile?.name || 'Vishnu R Das'}</h1>
          <a
            className="btn home-hero__cv"
            href={profile?.resumeUrl || '/contact'}
            target={profile?.resumeUrl ? '_blank' : undefined}
            rel="noreferrer"
          >
            <Download size={16} /> Download CV
          </a>
        </div>

        <div className="home-hero__meta">
          <span className="home-hero__dot" />
          {profile?.title || 'Full-Stack Developer'}
          {profile?.location && (
            <>
              <span className="home-hero__sep" />
              <MapPin size={15} /> {profile.location}
            </>
          )}
        </div>

        <p className="home-hero__intro">{profile?.heroIntro}</p>
      </header>

      <div className="home__divider" />
      <p className="home__explore">Explore everything I&apos;ve crafted, contributed, and accomplished.</p>

      {/* ---- Bento grid (3D tilt cards) ---- */}
      <div className="bento">
        {/* Projects Showcase — big */}
        <TiltCard to="/projects" className="card bento__projects" max={6}>
          <div className="card__head">
            <span className="card__icon">
              <FolderOpen size={18} />
            </span>
          </div>
          <div className="bento__projects-body">
            <div className="card__text">
              <h3 className="card__title">Projects Showcase</h3>
              <p className="card__desc">A selection of real apps built to solve real problems.</p>
              <span className="card__cta">
                View projects <ArrowUpRight size={15} />
              </span>
            </div>
            <div className="marquee-col">
              <div className="marquee-col__track">
                {projectLoop.map((p, i) => (
                  <ProjectThumb key={i} project={p} />
                ))}
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Skills & Tools */}
        <TiltCard className="card bento__skills">
          <span className="card__icon">
            <Code2 size={18} />
          </span>
          <h3 className="card__title">Skills &amp; Tools</h3>
          <p className="card__desc">Covering web, frontend, and backend technologies.</p>
          <div className="marquee-row">
            <div className="marquee-row__track">
              {skillLoop.map((s, i) => (
                <span key={i} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* About Me */}
        <TiltCard to="/about" className="card bento__about">
          <span className="card__icon">
            <User size={18} />
          </span>
          <h3 className="card__title">About Me</h3>
          <p className="card__desc">Who I am and what I do.</p>
          <div className="bento__about-photos">
            <img src={avatar} alt="" className="bento__about-photo bento__about-photo--back" />
            <img src={avatar} alt="" className="bento__about-photo bento__about-photo--front" />
          </div>
        </TiltCard>

        {/* Achievements */}
        <TiltCard to="/achievements" className="card bento__achieve">
          <span className="card__icon">
            <Award size={18} />
          </span>
          <h3 className="card__title">Achievements</h3>
          <p className="card__desc">Milestones from programs, projects, and communities.</p>
          <span className="card__stat">{achievements?.length || 0}+ milestones</span>
        </TiltCard>

        {/* Career */}
        <TiltCard to="/career" className="card bento__career">
          <span className="card__icon">
            <Briefcase size={18} />
          </span>
          <h3 className="card__title">Career</h3>
          <p className="card__desc">My professional journey and work experience.</p>
          <div className="marquee-row">
            <div className="marquee-row__track marquee-row__track--rev">
              {careerLoop.map((e, i) => (
                <span key={i} className="chip">
                  {e.company}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Contact */}
        <TiltCard to="/contact" className="card bento__contact">
          <span className="card__icon">
            <BookOpen size={18} />
          </span>
          <h3 className="card__title">Contact</h3>
          <p className="card__desc">Have an idea or a role in mind? Let&apos;s talk.</p>
          <span className="card__cta">
            Get in touch <ArrowUpRight size={15} />
          </span>
        </TiltCard>
      </div>
    </div>
  );
}

function ProjectThumb({ project }) {
  const img = resolveImage(project.image);
  return (
    <div className="pthumb">
      {img ? (
        <img src={img} alt={project.title} loading="lazy" />
      ) : (
        <div className="pthumb__ph">
          <span>{(project.title || '?').charAt(0)}</span>
          <em>{project.title}</em>
        </div>
      )}
    </div>
  );
}
