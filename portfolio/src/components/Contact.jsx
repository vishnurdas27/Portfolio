import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { sendMessage } from '../api/endpoints.js';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import './Contact.css';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: '' });
    try {
      const res = await sendMessage(form);
      setStatus({ state: 'success', msg: res.message || 'Thanks! Your message has been sent.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
      setStatus({ state: 'error', msg });
    }
  };

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
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <span className="section-label">04 — Contact</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">Let&apos;s work together</h2>
        </Reveal>

        <div className="contact__grid">
          <Reveal delay={0.1} className="contact__info">
            <p className="contact__lead">
              Have a project in mind, a role to fill, or just want to say hi? My inbox is always
              open — I&apos;ll get back to you as soon as I can.
            </p>

            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="contact__email">
                <HiOutlineMail size={20} />
                {profile.email}
              </a>
            )}

            {socials.length > 0 && (
              <div className="contact__socials">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact__social"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.15} className="contact__form-wrap">
            <form className="contact__form" onSubmit={submit}>
              <div className="contact__row">
                <div className="field">
                  <label htmlFor="c-name">Name</label>
                  <input
                    id="c-name"
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-subject">Subject</label>
                <input
                  id="c-subject"
                  name="subject"
                  value={form.subject}
                  onChange={update}
                  placeholder="What's this about?"
                />
              </div>

              <div className="field">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder="Tell me a little about it…"
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary contact__submit"
                disabled={status.state === 'loading'}
              >
                {status.state === 'loading' ? 'Sending…' : 'Send message'}
                <Send size={16} />
              </button>

              {status.state === 'success' && (
                <p className="contact__status contact__status--ok">
                  <CheckCircle2 size={16} /> {status.msg}
                </p>
              )}
              {status.state === 'error' && (
                <p className="contact__status contact__status--err">
                  <AlertCircle size={16} /> {status.msg}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
