import Message from '../models/Message.js';
import { sendContactEmail } from '../utils/email.js';

// Public: a visitor submits the contact form.
export async function createMessage(req, res) {
  const { name, email, subject, message } = req.body;
  const doc = await Message.create({ name, email, subject, message });

  // Fire-and-forget email notification (optional; never blocks the response).
  sendContactEmail({ name, email, subject, message }).catch((e) =>
    console.warn('Contact email not sent:', e.message)
  );

  res.status(201).json({ message: 'Thanks! Your message has been sent.', id: doc._id });
}

// Admin: inbox.
export async function listMessages(req, res) {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
}

export async function markRead(req, res) {
  const msg = await Message.findByIdAndUpdate(
    req.params.id,
    { read: req.body.read ?? true },
    { new: true }
  );
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  res.json(msg);
}

export async function deleteMessage(req, res) {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  res.json({ message: 'Message deleted' });
}
