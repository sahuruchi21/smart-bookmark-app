# 📌 Smart Bookmark App

A modern full-stack bookmark manager built with **Next.js (App Router)** and **Supabase**.  
Users can securely log in using OAuth (Google/GitHub) and manage personal bookmarks in real-time.

---

## 🚀 Live Demo

🔗 Deployed on Vercel  
(Add your production URL here once stable)

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 16 (App Router)
- **Backend:** Supabase (Auth + PostgreSQL)
- **Authentication:** Google OAuth / GitHub OAuth
- **Database:** Supabase PostgreSQL
- **Deployment:** Vercel
- **Language:** TypeScript
- **Styling:** Tailwind CSS

---

## ✨ Features

- 🔐 Secure OAuth Authentication (Google / GitHub)
- 👤 Persistent Session Handling
- 📌 Add Bookmarks
- 🗑️ Delete Bookmarks
- 📂 User-specific private bookmarks
- ⚡ Production Deployment on Vercel
- 🛡️ Row Level Security (RLS) enabled

---

## 📂 Project Structure

```
smart-bookmark-app/
│
├── app/
│ ├── page.tsx
│ ├── dashboard/
│ │ └── page.tsx
│
├── lib/
│ └── supabase.ts
│
├── public/
├── package.json
├── next.config.ts
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

For production, add the same variables inside **Vercel → Settings → Environment Variables**.

---

## 🧠 Authentication Flow

1. User logs in via Google/GitHub.
2. Supabase handles OAuth and redirects back.
3. Session is stored in browser.
4. `/dashboard` checks session using `supabase.auth.getUser()`.
5. If no user → redirect to `/`.

---

## 🛡️ Database Schema

**Table: bookmarks**

| Column      | Type      |
|------------|----------|
| id         | uuid     |
| title      | text     |
| url        | text     |
| user_id    | uuid     |
| created_at | timestamp|

Row Level Security (RLS) ensures:
- Users can only access their own bookmarks.

---

## 🏗️ How to Run Locally

```bash
git clone https://github.com/sahuruchi21/smart-bookmark-app.git
cd smart-bookmark-app
npm install
npm run dev
Open:
http://localhost:3000
```
## Deployment
1. Import GitHub repository
2. Add environment variables
3. Deploy
---
## Future Improvements

✏️ Edit bookmark feature

🔎 Search functionality

🏷️ Tags & Categories

📱 Responsive mobile UI


---
## Author
Ruchi Sahu
M.Tech (Data Science & AI)
Full-Stack Developer | AI Enthusiast

GitHub: https://github.com/sahuruchi21

