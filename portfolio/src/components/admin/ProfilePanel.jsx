import { useState } from 'react';
import { Save } from 'lucide-react';
import { updateProfile } from '../../api/endpoints.js';

export default function ProfilePanel({ profile, reload, toast }) {
  const [form, setForm] = useState({
    name: profile?.name || '',
    title: profile?.title || '',
    heroIntro: profile?.heroIntro || '',
    aboutText: profile?.aboutText || '',
    location: profile?.location || '',
    email: profile?.email || '',
    resumeUrl: profile?.resumeUrl || '',
    skills: (profile?.skills || []).join(', '),
    github: profile?.socials?.github || '',
    linkedin: profile?.socials?.linkedin || '',
    twitter: profile?.socials?.twitter || '',
  });
  const [saving, setSaving] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      title: form.title,
      heroIntro: form.heroIntro,
      aboutText: form.aboutText,
      location: form.location,
      email: form.email,
      resumeUrl: form.resumeUrl,
      skills: form.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      socials: { github: form.github, linkedin: form.linkedin, twitter: form.twitter },
    };
    try {
      await updateProfile(payload);
      toast('Profile saved');
      reload();
    } catch (err) {
      toast(err?.response?.data?.message || 'Save failed', 'err');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin__header">
        <div>
          <h1 className="admin__title">Profile &amp; About</h1>
          <p className="admin__subtitle">The content shown in your hero, about and contact sections.</p>
        </div>
      </div>

      <form className="admin-form" onSubmit={save} style={{ maxWidth: 640 }}>
        <div className="admin-form__row">
          <div className="field">
            <label>Name</label>
            <input name="name" value={form.name} onChange={update} />
          </div>
          <div className="field">
            <label>Title</label>
            <input name="title" value={form.title} onChange={update} />
          </div>
        </div>

        <div className="field">
          <label>Hero intro</label>
          <textarea name="heroIntro" value={form.heroIntro} onChange={update} rows={2} />
        </div>

        <div className="field">
          <label>About text</label>
          <textarea name="aboutText" value={form.aboutText} onChange={update} rows={5} />
        </div>

        <div className="admin-form__row">
          <div className="field">
            <label>Location</label>
            <input name="location" value={form.location} onChange={update} />
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={update} />
          </div>
        </div>

        <div className="field">
          <label>Resume URL</label>
          <input name="resumeUrl" value={form.resumeUrl} onChange={update} placeholder="Link to your CV (PDF)" />
        </div>

        <div className="field">
          <label>Skills (comma-separated)</label>
          <textarea name="skills" value={form.skills} onChange={update} rows={2} />
        </div>

        <div className="admin-form__row">
          <div className="field">
            <label>GitHub URL</label>
            <input name="github" value={form.github} onChange={update} />
          </div>
          <div className="field">
            <label>LinkedIn URL</label>
            <input name="linkedin" value={form.linkedin} onChange={update} />
          </div>
        </div>

        <div className="field">
          <label>Twitter URL</label>
          <input name="twitter" value={form.twitter} onChange={update} />
        </div>

        <div className="admin-form__actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} /> {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </>
  );
}
