import Project from '../models/Project.js';

export async function listProjects(req, res) {
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  res.json(projects);
}

export async function getProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
}

export async function createProject(req, res) {
  const project = await Project.create(req.body);
  res.status(201).json(project);
}

export async function updateProject(req, res) {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
}

export async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
}
