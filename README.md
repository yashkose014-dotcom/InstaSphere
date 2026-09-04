# InstaSphere — Instagram Clone

A full-stack Instagram-style social media project with a polished responsive frontend and an authentication-ready Node/Express backend.

## Included

- React + Vite frontend
- Responsive Instagram-style feed
- Stories UI
- Likes, comments and saves UI
- Follow suggestions
- Light / Dark / System theme
- Node.js + Express API
- MongoDB + Mongoose models
- JWT authentication
- Posts, likes, comments and follow API
- Separate frontend and backend folders

## Run frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend: http://localhost:5173

## Run backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend: http://localhost:5000

For a real database, set `MONGODB_URI` in `backend/.env`.

## Next modules

Stories persistence, reels upload, Cloudinary media storage, real-time messaging with Socket.IO, notifications, search/explore, saved collections, moderation and admin dashboard can be added on top of this foundation.
