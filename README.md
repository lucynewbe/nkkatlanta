# NKK Atlanta — Full-Stack Website

**Nrupathunga Kannada Koota** | Greater Atlanta Kannada Community since 1973

---

## 🗂️ Project Structure

```
nkk-react/
├── frontend/          ← React 18 + Vite (public website)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── StatCounter.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLayout.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── context/AuthContext.jsx  ← JWT auth state
│   │   ├── hooks/useApi.js          ← fetch wrapper + scroll reveal
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx            ← Full leadership table, charity history
│   │   │   ├── Team.jsx             ← Dynamic from API
│   │   │   ├── Events.jsx           ← Dynamic from API
│   │   │   ├── Membership.jsx
│   │   │   ├── Sponsors.jsx         ← Dynamic from API
│   │   │   ├── Scholarship.jsx
│   │   │   ├── Contact.jsx          ← Local forms: contact, volunteer, feedback
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminEvents.jsx   ← Full CRUD
│   │   │       ├── AdminTeam.jsx     ← Full CRUD
│   │   │       ├── AdminSponsors.jsx ← Full CRUD
│   │   │       └── AdminMessages.jsx ← View / delete
│   │   ├── styles/index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/hero-bg.png
│   └── vite.config.js    ← /api proxy → localhost:4000
│
├── backend/           ← Node.js + Express + SQLite
│   ├── db/
│   │   ├── database.js   ← Schema + seed data
│   │   └── nkk.db        ← Auto-generated SQLite file
│   ├── routes/
│   │   ├── auth.js       ← POST /api/auth/login, verify
│   │   ├── events.js     ← CRUD /api/events
│   │   ├── team.js       ← CRUD /api/team
│   │   ├── sponsors.js   ← CRUD /api/sponsors
│   │   └── contact.js    ← POST /api/contact, admin GET
│   ├── middleware/authenticate.js  ← JWT verification
│   ├── server.js
│   └── package.json
│
└── README.md  ← You are here
```

---

## 🚀 Local Development (Quick Start)

### Prerequisites
- Node.js 18+
- npm

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
# Running at http://localhost:4000
# Default Admin: admin / nkk@admin2026
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# Running at http://localhost:5173
```

### 3. Access the App
| URL | Description |
|-----|------------|
| http://localhost:5173 | Public website |
| http://localhost:5173/admin | Admin panel (requires login) |
| http://localhost:4000/api/health | Backend health check |

---

## 🔐 Admin Access

Default credentials (change in production!):
- **Username**: `admin`
- **Password**: `nkk@admin2026`

The admin panel is at `/admin`. You can:
- ✏️ Add / edit / delete **Events**
- 👥 Add / edit / delete **Team Members** (Trustees & EC)
- 🤝 Add / edit / delete **Sponsors** (per year, by tier)
- ✉️ View and delete **Contact Form Submissions**

---

## 🌐 API Reference

All protected routes require `Authorization: Bearer <token>`.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/events` | Public | List all active events |
| POST | `/api/events` | Admin | Create new event |
| PUT | `/api/events/:id` | Admin | Update event |
| DELETE | `/api/events/:id` | Admin | Soft-delete event |
| GET | `/api/team` | Public | List team members |
| POST | `/api/team` | Admin | Add member |
| PUT | `/api/team/:id` | Admin | Update member |
| DELETE | `/api/team/:id` | Admin | Soft-delete member |
| GET | `/api/sponsors?year=2026` | Public | List sponsors by year |
| POST | `/api/sponsors` | Admin | Add sponsor |
| POST | `/api/contact` | Public | Submit contact form |
| GET | `/api/contact` | Admin | View submissions |
| POST | `/api/auth/login` | Public | Login → JWT |
| GET | `/api/admin/stats` | Admin | Dashboard stats |

---

## ☁️ Deployment Guide (Free Hosting)

### Option A — Render.com (Recommended)

1. **Push to GitHub** (create a new repo, push the `nkk-react/` directory)

2. **Backend** (Render Web Service):
   - Build command: `cd backend && npm install`
   - Start command: `node server.js`
   - Environment: `PORT=4000`, `JWT_SECRET=<your-secret>`, `FRONTEND_URL=<your-frontend-url>`
   - Free tier note: service sleeps after 15 min of inactivity (wakes on first request ~30s)

3. **Frontend** (Render Static Site):
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
   - Environment: `VITE_API_URL=<your-render-backend-url>`

4. **Update** `vite.config.js` for production:
   ```js
   // Use VITE_API_URL env var in production
   // In components, replace '/api' with import.meta.env.VITE_API_URL + '/api'
   ```

### Option B — Railway.app + Vercel

- **Backend**: Deploy to [Railway.app](https://railway.app) — $5/month free credit
- **Frontend**: Deploy to [Vercel](https://vercel.com) — completely free static hosting

### Option C — Vercel + Supabase (Scalable Upgrade)

For production with persistent storage:
1. Replace SQLite with **Supabase PostgreSQL** (free 500MB)
2. Deploy backend as **Vercel serverless functions** or keep on Railway
3. Update queries to use `pg` instead of `better-sqlite3`

---

## 🛠️ Adding New Features

### Add a New Dynamic Content Type (example: Gallery)
1. **Backend**: Add table in `backend/db/database.js`, add routes in `backend/routes/gallery.js`, register in `server.js`
2. **Frontend**: Create `frontend/src/pages/Gallery.jsx`, add route in `App.jsx`
3. **Admin**: Create `frontend/src/pages/admin/AdminGallery.jsx`, add link in `AdminLayout.jsx`

### Add a New Page
1. Create `frontend/src/pages/MyPage.jsx`
2. Add `<Route path="/my-page" element={<PublicLayout><MyPage /></PublicLayout>} />` in `App.jsx`
3. Add link in `Navbar.jsx` and `Footer.jsx`

### Change Admin Password
```bash
cd backend
node -e "const b=require('bcryptjs'); console.log(b.hashSync('newpassword', 10))"
# Then update the hash directly in the DB:
sqlite3 db/nkk.db "UPDATE admin_users SET password_hash='<hash>' WHERE username='admin'"
```

### Add a Custom Environment Variable
- Backend: add to `.env` file, load with `process.env.MY_VAR`
- Frontend: prefix with `VITE_`, access with `import.meta.env.VITE_MY_VAR`

---

## 📋 Database Notes

SQLite file is at `backend/db/nkk.db`. To inspect:
```bash
# View all events
sqlite3 backend/db/nkk.db "SELECT * FROM events"

# View all team members
sqlite3 backend/db/nkk.db "SELECT name, role, category FROM team_members"

# View contact submissions
sqlite3 backend/db/nkk.db "SELECT first_name, email, subject FROM contact_submissions ORDER BY created_at DESC"
```

> **Note**: SQLite works great for demos and small deployments (< 100K rows). For a high-traffic production site, migrate to PostgreSQL (Supabase, Railway, or AWS RDS).

---

## 🎨 Design System

The design is in `frontend/src/styles/index.css`. Key tokens:

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-primary` | `#c8841a` | Saffron gold |
| `--color-accent` | `#7c3aed` | Royal purple |
| `--color-bg` | `#0a0612` | Dark background |
| `--font-heading` | Playfair Display | Section titles |
| `--font-body` | Inter | Body text |
| `--font-kannada` | Noto Sans Kannada | Kannada text |

---

## 📞 NKK Contact Info

- **Address**: 11585 Jones Bridge Road, Ste 420 PMB1238, Johns Creek, GA 30022
- **Phone**: (470) 645-2147
- **Email**: info@atlantakannada.org
- **Website**: [atlantakannada.org](https://www.atlantakannada.org)
- **Status**: IRS 501(c)(3) Non-Profit Organization
