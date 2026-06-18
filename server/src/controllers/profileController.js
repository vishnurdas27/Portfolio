import Profile from '../models/Profile.js';

// The profile is a singleton document — create a default one on first access.
async function getOrCreateProfile() {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  return profile;
}

export async function getProfile(req, res) {
  const profile = await getOrCreateProfile();
  res.json(profile);
}

export async function updateProfile(req, res) {
  const profile = await getOrCreateProfile();

  const fields = [
    'name',
    'title',
    'heroIntro',
    'aboutText',
    'location',
    'email',
    'resumeUrl',
    'avatar',
    'skills',
  ];
  for (const f of fields) {
    if (req.body[f] !== undefined) profile[f] = req.body[f];
  }

  if (req.body.socials) {
    const { github, linkedin, twitter } = req.body.socials;
    if (github !== undefined) profile.socials.github = github;
    if (linkedin !== undefined) profile.socials.linkedin = linkedin;
    if (twitter !== undefined) profile.socials.twitter = twitter;
  }

  await profile.save();
  res.json(profile);
}
