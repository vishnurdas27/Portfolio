import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

export default function Footer({ profile }) {
  const year = new Date().getFullYear();

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
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="footer__name">
            {profile?.name || 'Vishnu R Das'}
            <span className="footer__dot" />
          </a>
          <p className="footer__tag">{profile?.title || 'Full-Stack Developer'}</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#achievements">Achievements</a>
          <a href="#contact">Contact</a>
        </nav>

        {socials.length > 0 && (
          <div className="footer__socials">
            {socials.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="container footer__bottom">
        <span>
          © {year} {profile?.name || 'Vishnu R Das'}. All rights reserved.
        </span>
        <span className="footer__built">
          Built with the MERN stack ·{' '}
          <Link to="/admin/login" className="footer__admin">
            Admin
          </Link>
        </span>
      </div>
    </footer>
  );
}
