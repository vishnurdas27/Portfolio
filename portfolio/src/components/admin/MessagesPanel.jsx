import { Check, Trash2, Mail } from 'lucide-react';
import { markMessageRead, deleteMessage } from '../../api/endpoints.js';

export default function MessagesPanel({ messages, reload, toast }) {
  const markRead = async (m) => {
    try {
      await markMessageRead(m._id, !m.read);
      reload();
    } catch {
      toast('Update failed', 'err');
    }
  };

  const remove = async (m) => {
    if (!window.confirm(`Delete message from ${m.name}?`)) return;
    try {
      await deleteMessage(m._id);
      toast('Message deleted');
      reload();
    } catch {
      toast('Delete failed', 'err');
    }
  };

  const fmt = (d) =>
    new Date(d).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <>
      <div className="admin__header">
        <div>
          <h1 className="admin__title">Messages</h1>
          <p className="admin__subtitle">
            {messages.filter((m) => !m.read).length} unread · {messages.length} total
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="admin-empty">
          <Mail size={22} style={{ marginBottom: 8, opacity: 0.6 }} />
          <div>No messages yet. Submissions from your contact form will appear here.</div>
        </div>
      ) : (
        <div className="admin__list">
          {messages.map((m) => (
            <div className={`msg ${m.read ? '' : 'msg--unread'}`} key={m._id}>
              <div className="msg__head">
                <div>
                  <span className="msg__from">{m.name}</span>{' '}
                  <a href={`mailto:${m.email}`} className="msg__email">
                    &lt;{m.email}&gt;
                  </a>
                </div>
                <span className="msg__date">{fmt(m.createdAt)}</span>
              </div>
              {m.subject && <div className="msg__subject">{m.subject}</div>}
              <div className="msg__body">{m.message}</div>
              <div className="msg__actions">
                <button className="icon-btn" onClick={() => markRead(m)} aria-label="Toggle read">
                  <Check size={16} />
                </button>
                <button
                  className="icon-btn icon-btn--danger"
                  onClick={() => remove(m)}
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
