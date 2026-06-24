import { useState } from 'react';
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react';
import Modal from './Modal.jsx';
import { createProject, updateProject, deleteProject } from '../../api/endpoints.js';
import { resolveImage } from '../../api/client.js';

const EMPTY = {
  title: '',
  summary: '',
  description: '',
  image: '',
  images: [],
  techStack: '',
  liveUrl: '',
  repoUrl: '',
  featured: false,
  order: 0,
};

export default function ProjectsPanel({ projects, reload, toast }) {
  const [editing, setEditing] = useState(null); // null | 'new' | project
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setForm(EMPTY);
    setEditing('new');
  };
  const openEdit = (p) => {
    // Merge old single `image` into the images array so older projects edit cleanly
    const existing = Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : p.image
        ? [p.image]
        : [];
    setForm({
      ...EMPTY,
      ...p,
      images: existing,
      techStack: (p.techStack || []).join(', '),
    });
    setEditing(p);
  };
  const close = () => setEditing(null);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // Carousel image URL handlers
  const updateImage = (i, value) =>
    setForm((f) => ({ ...f, images: f.images.map((url, idx) => (idx === i ? value : url)) }));
  const addImage = () =>
    setForm((f) => ({ ...f, images: [...f.images, ''] }));
  const removeImage = (i) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const cleanedImages = form.images.map((s) => s.trim()).filter(Boolean);
    const payload = {
      ...form,
      order: Number(form.order) || 0,
      techStack: form.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      images: cleanedImages,
      // Keep `image` in sync with the first image so older fallback code still works
      image: cleanedImages[0] || '',
    };
    try {
      if (editing === 'new') {
        await createProject(payload);
        toast('Project created');
      } else {
        await updateProject(editing._id, payload);
        toast('Project updated');
      }
      close();
      reload();
    } catch (err) {
      toast(err?.response?.data?.message || 'Save failed', 'err');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try {
      await deleteProject(p._id);
      toast('Project deleted');
      reload();
    } catch {
      toast('Delete failed', 'err');
    }
  };

  return (
    <>
      <div className="admin__header">
        <div>
          <h1 className="admin__title">Projects</h1>
          <p className="admin__subtitle">{projects.length} total</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>
          <Plus size={16} /> New project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="admin-empty">No projects yet. Add your first one.</div>
      ) : (
        <div className="admin__list">
          {projects.map((p) => (
            <div className="admin-row" key={p._id}>
              <div className="admin-row__main">
                <div className="admin-row__title">
                  {p.featured && <Star size={14} className="text-accent" />}
                  {p.title}
                </div>
                <div className="admin-row__sub">{p.summary}</div>
              </div>
              <div className="admin-row__actions">
                <button className="icon-btn" onClick={() => openEdit(p)} aria-label="Edit">
                  <Pencil size={16} />
                </button>
                <button
                  className="icon-btn icon-btn--danger"
                  onClick={() => remove(p)}
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal title={editing === 'new' ? 'New project' : 'Edit project'} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            <div className="field">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={update} required />
            </div>
            <div className="field">
              <label>Summary</label>
              <input name="summary" value={form.summary} onChange={update} />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={update} rows={3} />
            </div>

            <div className="field">
              <label>Images (carousel)</label>
              <div className="img-list">
                {form.images.length === 0 && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-faint)' }}>
                    No images yet. Click below to add one.
                  </p>
                )}
                {form.images.map((url, i) => (
                  <div className="img-list__row" key={i}>
                    {url ? (
                      <img className="uploader__preview" src={resolveImage(url)} alt="" />
                    ) : (
                      <div className="uploader__preview img-list__empty">{i + 1}</div>
                    )}
                    <input
                      value={url}
                      onChange={(e) => updateImage(i, e.target.value)}
                      placeholder="Paste a Cloudinary image URL"
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      className="icon-btn icon-btn--danger"
                      onClick={() => removeImage(i)}
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button type="button" className="btn" onClick={addImage}>
                  <Plus size={14} /> Add image
                </button>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', marginTop: 6 }}>
                Add multiple Cloudinary URLs — they&apos;ll show up as a carousel on the project card.
              </p>
            </div>

            <div className="field">
              <label>Tech stack (comma-separated)</label>
              <input
                name="techStack"
                value={form.techStack}
                onChange={update}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="admin-form__row">
              <div className="field">
                <label>Live URL</label>
                <input name="liveUrl" value={form.liveUrl} onChange={update} />
              </div>
              <div className="field">
                <label>Repo URL</label>
                <input name="repoUrl" value={form.repoUrl} onChange={update} />
              </div>
            </div>

            <div className="admin-form__row">
              <div className="field">
                <label>Order</label>
                <input name="order" type="number" value={form.order} onChange={update} />
              </div>
              <label className="admin-form__check" style={{ alignSelf: 'end', paddingBottom: 12 }}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={update}
                />
                Featured project
              </label>
            </div>

            <div className="admin-form__actions">
              <button type="button" className="btn btn-ghost" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save project'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
