import { useState } from 'react';
import { Plus, Pencil, Trash2, Star, Upload } from 'lucide-react';
import Modal from './Modal.jsx';
import { createProject, updateProject, deleteProject, uploadImage } from '../../api/endpoints.js';
import { resolveImage } from '../../api/client.js';

const EMPTY = {
  title: '',
  summary: '',
  description: '',
  image: '',
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
  const [uploading, setUploading] = useState(false);

  const openNew = () => {
    setForm(EMPTY);
    setEditing('new');
  };
  const openEdit = (p) => {
    setForm({ ...EMPTY, ...p, techStack: (p.techStack || []).join(', ') });
    setEditing(p);
  };
  const close = () => setEditing(null);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
    } catch {
      toast('Image upload failed', 'err');
    } finally {
      setUploading(false);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      order: Number(form.order) || 0,
      techStack: form.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
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
              <label>Image</label>
              <div className="uploader">
                {form.image && (
                  <img className="uploader__preview" src={resolveImage(form.image)} alt="" />
                )}
                <label className="btn btn-ghost" style={{ cursor: 'pointer' }}>
                  <Upload size={15} /> {uploading ? 'Uploading…' : 'Upload'}
                  <input type="file" accept="image/*" onChange={onFile} hidden />
                </label>
              </div>
              <input
                name="image"
                value={form.image}
                onChange={update}
                placeholder="…or paste an image URL"
                style={{ marginTop: 10 }}
              />
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
