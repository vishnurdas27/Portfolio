import Achievement from '../models/Achievement.js';

export async function listAchievements(req, res) {
  const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 });
  res.json(achievements);
}

export async function createAchievement(req, res) {
  const achievement = await Achievement.create(req.body);
  res.status(201).json(achievement);
}

export async function updateAchievement(req, res) {
  const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
  res.json(achievement);
}

export async function deleteAchievement(req, res) {
  const achievement = await Achievement.findByIdAndDelete(req.params.id);
  if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
  res.json({ message: 'Achievement deleted' });
}
