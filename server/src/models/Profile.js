import mongoose from 'mongoose';

// Single-document collection holding the site owner's profile / "About" content.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Your Name' },
    title: { type: String, default: 'Full-Stack Developer' },
    heroIntro: { type: String, default: '' },
    aboutText: { type: String, default: '' },
    location: { type: String, default: '' },
    email: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    avatar: { type: String, default: '' },
    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
