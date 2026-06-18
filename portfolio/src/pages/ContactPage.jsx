import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { sendMessage } from '../api/endpoints.js';
import './Pages.css';

export default function ContactPage() {
  const { profile } = useOutletContext();
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
      setStatus({
        state: 'error',
        msg: err?.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const socials = [
    profile?.socials?.github && { Icon: FaGithub, href: profile.socials.github, label: 'GitHub' },
    profile?.socials?.linkedin && {
      Icon: FaLinkedin,
      href: profile.socials.linkedin,
      label: 'LinkedIn',
    },
    profile?.socials?.twitter && { Icon: FaTwitter, href: profile.socials.twitter, label: 'Twitter' },
  ].filter(Boolean);

  return (
    <div>
      <div className="page-head">
        <h1 className="page-head__title">Get in touch</h1>
        <p className="page-head__sub">
          Have a project in mind, a role to fill, or just want to say hi? My inbox is always open.
        </p>
        <div className="page-head__divider" />
      </div>

      <div className="contact-page">
        <div className="contact-page__info">
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="contact-page__email">
              <HiOutlineMail size={20} />
              {profile.email}
            </a>
          )}
          {socials.length > 0 && (
            <div className="contact-page__socials">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <form className="contact-page__form" onSubmit={submit}>
          <div className="contact-page__row">
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" value={form.name} onChange={update} required />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="c-subject">Subject</label>
            <input id="c-subject" name="subject" value={form.subject} onChange={update} />
          </div>
          <div className="field">
            <label htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              name="message"
              rows={5}
              value={form.message}
              onChange={update}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending…' : 'Send message'}
            <Send size={16} />
          </button>

          {status.state === 'success' && (
            <p className="contact-page__status contact-page__status--ok">
              <CheckCircle2 size={16} /> {status.msg}
            </p>
          )}
          {status.state === 'error' && (
            <p className="contact-page__status contact-page__status--err">
              <AlertCircle size={16} /> {status.msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
