import { useState } from 'react';
import { Save } from 'lucide-react';
import { updateProfile } from '../../api/endpoints.js';

export default function ProfilePanel({ profile, reload, toast }) {
  const [form, setForm] = useState({
    name: profile?.name || '',
    handle: profile?.handle || '',
    title: profile?.title || '',
    heroIntro: profile?.heroIntro || '',
    aboutText: profile?.aboutText || '',
    location: profile?.location || '',
    email: profile?.email || '',
    resumeUrl: profile?.resumeUrl || '',
    avatar: profile?.avatar || '',
    skills: (profile?.skills || []).join(', '),
    github: profile?.socials?.github || '',
    linkedin: profile?.socials?.linkedin || '',
    twitter: profile?.socials?.twitter || '',
  });
  const [experience, setExperience] = useState(
    (profile?.experience || []).map((e) => ({
      role: e.role || '',
      company: e.company || '',
      period: e.period || '',
      description: e.description || '',
    }))
  );
  const [education, setEducation] = useState(
    (profile?.education || []).map((e) => ({
      degree: e.degree || '',
      institution: e.institution || '',
      period: e.period || '',
      location: e.location || '',
      score: e.score || '',
    }))
  );
  const [saving, setSaving] = useState(false);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const updateExp = (i, key, value) =>
    setExperience((list) => list.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)));
  const addExp = () =>
    setExperience((list) => [...list, { role: '', company: '', period: '', description: '' }]);
  const removeExp = (i) => setExperience((list) => list.filter((_, idx) => idx !== i));

  const updateEdu = (i, key, value) =>
    setEducation((list) => list.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)));
  const addEdu = () =>
    setEducation((list) => [
      ...list,
      { degree: '', institution: '', period: '', location: '', score: '' },
    ]);
  const removeEdu = (i) => setEducation((list) => list.filter((_, idx) => idx !== i));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      handle: form.handle,
      title: form.title,
      heroIntro: form.heroIntro,
      aboutText: form.aboutText,
      location: form.location,
      email: form.email,
      resumeUrl: form.resumeUrl,
      avatar: form.avatar,
      skills: form.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      socials: { github: form.github, linkedin: form.linkedin, twitter: form.twitter },
      experience: experience.filter((e) => e.role || e.company),
      education: education.filter((e) => e.degree || e.institution),
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
          <label>Handle (shown under your name in the sidebar)</label>
          <input name="handle" value={form.handle} onChange={update} placeholder="@yourhandle" />
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
          <label>Avatar URL</label>
          <div className="uploader">
            {form.avatar && (
              <img
                className="uploader__preview"
                src={form.avatar}
                alt=""
                style={{ borderRadius: '50%' }}
              />
            )}
            <input
              name="avatar"
              value={form.avatar}
              onChange={update}
              placeholder="Paste a Cloudinary image URL"
              style={{ flex: 1 }}
            />
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: 6 }}>
            Upload to Cloudinary, then paste the delivery URL here. Leave empty to use the default avatar.
          </p>
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

        {/* Experience (Career page) */}
        <div className="field">
          <label>Experience (Career page)</label>
          <div className="exp-editor">
            {experience.map((exp, i) => (
              <div className="exp-entry" key={i}>
                <div className="admin-form__row">
                  <input
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => updateExp(i, 'role', e.target.value)}
                  />
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExp(i, 'company', e.target.value)}
                  />
                </div>
                <input
                  placeholder="Period (e.g. 2023 — present)"
                  value={exp.period}
                  onChange={(e) => updateExp(i, 'period', e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  rows={2}
                  value={exp.description}
                  onChange={(e) => updateExp(i, 'description', e.target.value)}
                />
                <button type="button" className="btn exp-entry__remove" onClick={() => removeExp(i)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn" onClick={addExp}>
              + Add experience
            </button>
          </div>
        </div>

        {/* Education (About page) */}
        <div className="field">
          <label>Education (About page)</label>
          <div className="exp-editor">
            {education.map((edu, i) => (
              <div className="exp-entry" key={i}>
                <div className="admin-form__row">
                  <input
                    placeholder="Degree / Programme"
                    value={edu.degree}
                    onChange={(e) => updateEdu(i, 'degree', e.target.value)}
                  />
                  <input
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => updateEdu(i, 'institution', e.target.value)}
                  />
                </div>
                <div className="admin-form__row">
                  <input
                    placeholder="Period (e.g. 2023 — 2026)"
                    value={edu.period}
                    onChange={(e) => updateEdu(i, 'period', e.target.value)}
                  />
                  <input
                    placeholder="Location"
                    value={edu.location}
                    onChange={(e) => updateEdu(i, 'location', e.target.value)}
                  />
                </div>
                <input
                  placeholder="Score / CGPA (optional)"
                  value={edu.score}
                  onChange={(e) => updateEdu(i, 'score', e.target.value)}
                />
                <button type="button" className="btn exp-entry__remove" onClick={() => removeEdu(i)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn" onClick={addEdu}>
              + Add education
            </button>
          </div>
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
