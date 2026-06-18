# Vishnu R Das — MERN Portfolio

A full-stack personal portfolio inspired by the dark, minimalist design of
[aymanismail.com](https://www.aymanismail.com/) — built with **MongoDB, Express, React,
and Node.js**, plus a login-protected **admin CMS** to manage all content.

> Bilingual/Arabic toggle from the reference site is intentionally excluded.

## Features
- 🧭 Fixed-sidebar layout (avatar, name + verified badge, @handle, theme toggle, icon nav, copyright) — modeled on the reference design
- 🟦 Bento-grid home with animated marquee cards (Projects Showcase, Skills & Tools, About Me, Achievements, Career, Contact)
- 📄 Dedicated pages: Home · About · Career · Projects · Achievements · Contact
- 🌗 Dark / light theme toggle (persisted to localStorage)
- 🗄️ Content served from MongoDB (projects, achievements, profile/about, experience)
- 📬 Working contact form — submissions stored in the DB (optional email notifications)
- 🔐 JWT-protected **admin dashboard** at `/admin` — full CRUD for projects & achievements, edit profile/about/experience, image uploads, and a message inbox
- 🛟 Static fallback content so the site looks complete even before the API is connected

## Tech stack
**Client:** React 19, Vite, React Router, Framer Motion, Axios, lucide-react / react-icons
**Server:** Node, Express, Mongoose, JWT (jsonwebtoken), bcryptjs, express-validator, multer, nodemailer

## Project structure
```
Portfolio/
├── portfolio/      # React client (Vite)
└── server/         # Express + MongoDB API
```

---

## Setup

### 1. Create a MongoDB Atlas database (free)
1. Go to **https://cloud.mongodb.com** and create a free **M0** cluster.
2. **Database Access** → add a database user (username + password).
3. **Network Access** → add your IP, or `0.0.0.0/0` to allow anywhere (dev only).
4. **Connect → Drivers** → copy the connection string, e.g.
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

### 2. Configure the backend
Open `server/.env` and:
- Paste your Atlas string into **`MONGO_URI`** (keep `/portfolio` as the DB name).
- Change **`ADMIN_PASSWORD`** (and optionally `ADMIN_EMAIL` / `ADMIN_NAME`).
- `JWT_SECRET` is already filled with a random value.

```bash
cd server
npm install      # already done
npm run seed     # creates the admin user + sample content
npm run dev      # starts the API on http://localhost:5000
```

### 3. Run the frontend
```bash
cd portfolio
npm install      # already done
npm run dev      # http://localhost:5173
```

The client reads the API base URL from `portfolio/.env` (`VITE_API_URL=http://localhost:5000/api`).

---

## Admin CMS
- Visit **http://localhost:5173/admin/login** (also linked discreetly in the footer).
- Sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`.
- From the dashboard you can:
  - **Projects / Achievements** — create, edit, delete, reorder, upload images
  - **Profile & About** — edit your name, title, hero intro, about text, skills, socials, résumé link
  - **Messages** — read / mark-read / delete contact-form submissions

## Customizing
- **Content:** edit it live in the admin dashboard (changes persist to MongoDB).
- **Accent color / theme:** tweak the CSS variables at the top of `portfolio/src/index.css` (`--accent`, `--bg`, etc.).
- **Photo:** replace `portfolio/src/assets/IMG_4481.PNG`.
- **Contact emails (optional):** fill the `SMTP_*` vars in `server/.env`; otherwise messages are just saved to the DB.

## Production build
```bash
cd portfolio && npm run build   # outputs to portfolio/dist
cd server   && npm start        # serve the API
```
