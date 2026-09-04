# InstaSphere Frontend v2

Frontend-only Instagram-style UI built with React + Vite.

## What's fixed

- Removed the unwanted horizontal page scrollbar.
- Story strip hides its browser scrollbar.
- Search is clickable and opens a working search page.
- Search input filters suggested users.
- Home, Explore, Reels, Messages, Notifications, Create and Profile navigation now switch views.
- Follow buttons toggle between Follow and Following.
- Like and Save buttons work.
- Comment input accepts and clears a comment.
- Light / Dark / System theme works and persists in localStorage.
- Responsive desktop, tablet and mobile layouts.

## Run

```bash
npm install
copy .env.example .env
npm run dev
```

Open http://localhost:5173

This frontend can later connect to the separate InstaSphere backend through `VITE_API_URL`.
