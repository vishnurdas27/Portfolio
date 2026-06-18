import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import heroPhoto from '../assets/IMG_4481.PNG';
import './Hero.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ profile }) {
  const socials = [
    profile?.socials?.github && { Icon: FaGithub, href: profile.socials.github, label: 'GitHub' },
    profile?.socials?.linkedin && {
      Icon: FaLinkedin,
      href: profile.socials.linkedin,
      label: 'LinkedIn',
    },
    profile?.socials?.twitter && {
      Icon: FaTwitter,
      href: profile.socials.twitter,
      label: 'Twitter',
    },
    profile?.email && { Icon: HiOutlineMail, href: `mailto:${profile.email}`, label: 'Email' },
  ].filter(Boolean);

  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <motion.div className="hero__text" variants={container} initial="hidden" animate="show">
          <motion.div className="hero__badge" variants={item}>
            <span className="hero__badge-dot" />
            Available for work
          </motion.div>

          <motion.p className="hero__greeting" variants={item}>
            Hi, I&apos;m
          </motion.p>

          <motion.h1 className="hero__name" variants={item}>
            {profile?.name || 'Vishnu R Das'}
            <span className="hero__period">.</span>
          </motion.h1>

          <motion.h2 className="hero__title" variants={item}>
            {profile?.title || 'Full-Stack Developer'}
          </motion.h2>

          <motion.p className="hero__intro" variants={item}>
            {profile?.heroIntro ||
              'I build robust, scalable web applications with the MERN stack.'}
          </motion.p>

          <motion.div className="hero__cta" variants={item}>
            <a href="#projects" className="btn btn-primary">
              View my work
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </motion.div>

          {socials.length > 0 && (
            <motion.div className="hero__socials" variants={item}>
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="hero__social"
                  aria-label={label}
                >
                  <Icon size={19} />
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <motion.span
            className="hero__ring hero__ring--1"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="hero__ring hero__ring--2"
            animate={{ rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="hero__photo-wrap"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={heroPhoto} alt={profile?.name || 'Portrait'} className="hero__photo" />
          </motion.div>

          {profile?.location && (
            <div className="hero__location">
              <MapPin size={14} />
              {profile.location}
            </div>
          )}
        </motion.div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span>Scroll</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
