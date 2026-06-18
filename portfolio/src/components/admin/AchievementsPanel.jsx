import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Modal from './Modal.jsx';
import {
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../../api/endpoints.js';

const EMPTY = { title: '', organization: '', date: '', description: '', url: '', order: 0 };

export default function AchievementsPanel({ achievements, reload, toast }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const openNew = () => {
    setForm(EMPTY);
    setEditing('new');
  };
  const openEdit = (a) => {
    setForm({ ...EMPTY, ...a });
    setEditing(a);
  };
  const close = () => setEditing(null);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editing === 'new') {
        await createAchievement(payload);
        toast('Achievement created');
      } else {
        await updateAchievement(editing._id, payload);
        toast('Achievement updated');
      }
      close();
      reload();
    } catch (err) {
      toast(err?.response?.data?.message || 'Save failed', 'err');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (a) => {
    if (!window.confirm(`Delete "${a.title}"?`)) return;
    try {
      await deleteAchievement(a._id);
      toast('Achievement deleted');
      reload();
    } catch {
      toast('Delete failed', 'err');
    }
  };

  return (
    <>
      <div className="admin__header">
        <div>
          <h1 className="admin__title">Achievements</h1>
          <p className="admin__subtitle">{achievements.length} total</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>
          <Plus size={16} /> New achievement
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="admin-empty">No achievements yet.</div>
      ) : (
        <div className="admin__list">
          {achievements.map((a) => (
            <div className="admin-row" key={a._id}>
              <div className="admin-row__main">
                <div className="admin-row__title">{a.title}</div>
                <div className="admin-row__sub">
                  {[a.date, a.organization].filter(Boolean).join(' · ')}
                </div>
              </div>
              <div className="admin-row__actions">
                <button className="icon-btn" onClick={() => openEdit(a)} aria-label="Edit">
                  <Pencil size={16} />
                </button>
                <button
                  className="icon-btn icon-btn--danger"
                  onClick={() => remove(a)}
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
        <Modal
          title={editing === 'new' ? 'New achievement' : 'Edit achievement'}
          onClose={close}
        >
          <form className="admin-form" onSubmit={save}>
            <div className="field">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={update} required />
            </div>
            <div className="admin-form__row">
              <div className="field">
                <label>Organization</label>
                <input name="organization" value={form.organization} onChange={update} />
              </div>
              <div className="field">
                <label>Date</label>
                <input name="date" value={form.date} onChange={update} placeholder="2024" />
              </div>
            </div>
            <div className="field">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={update} rows={3} />
            </div>
            <div className="admin-form__row">
              <div className="field">
                <label>Link URL</label>
                <input name="url" value={form.url} onChange={update} />
              </div>
              <div className="field">
                <label>Order</label>
                <input name="order" type="number" value={form.order} onChange={update} />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="button" className="btn btn-ghost" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
