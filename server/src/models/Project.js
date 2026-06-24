import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' }, // kept for backwards compat — use `images` for carousels
    images: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
