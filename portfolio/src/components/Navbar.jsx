import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const initials = (profile?.name || 'VRD')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 3)
    .join('');

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__logo" aria-label="Home">
          <span className="nav__logo-mark">{initials}</span>
          <span className="nav__logo-dot" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          {profile?.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary nav__resume"
            >
              Resume <ArrowUpRight size={16} />
            </a>
          ) : (
            <a href="#contact" className="btn btn-primary nav__resume">
              Get in touch
            </a>
          )}

          <button
            className="nav__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`nav__mobile ${open ? 'nav__mobile--open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav__mobile-link" onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href={profile?.resumeUrl || '#contact'}
          target={profile?.resumeUrl ? '_blank' : undefined}
          rel="noreferrer"
          className="btn btn-primary"
          onClick={() => setOpen(false)}
        >
          {profile?.resumeUrl ? 'Resume' : 'Get in touch'}
        </a>
      </div>
    </header>
  );
}
