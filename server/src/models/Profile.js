import mongoose from 'mongoose';

// Single-document collection holding the site owner's profile / "About" content.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Your Name' },
    handle: { type: String, default: '' },
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
    experience: {
      type: [
        {
          role: { type: String, default: '' },
          company: { type: String, default: '' },
          period: { type: String, default: '' },
          description: { type: String, default: '' },
        },
      ],
      default: [],
    },
    education: {
      type: [
        {
          degree: { type: String, default: '' },
          institution: { type: String, default: '' },
          period: { type: String, default: '' },
          location: { type: String, default: '' },
          score: { type: String, default: '' },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
