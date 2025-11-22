# NgBoard – Angular 20 Auth + Roles Demo

NgBoard is a small but realistic dashboard built with **Angular 20**, focusing on:

- Modern Angular patterns (standalone components, `input()` / `output()`, signals)
- Firebase **email/password authentication**
- **Role-based access control** (user vs admin) with guards
- Protected routes and clean layout for a real-world style dashboard

This repo is part of my ongoing Full-Stack TypeScript / Angular learning journey.

---

## 🔐 Demo Access

This app is locked down for demo use — public sign-up is disabled.

Use these credentials (or your own demo accounts if you change them):

```text
Admin:
  email: admin@ngboard-demo.com
  password: ********

User:
  email: user@ngboard-demo.com
  password: ********
```

> ⚠️ These are **demo accounts only**. In Firebase, the corresponding `users/{uid}` documents have roles:
> `role: "admin"` or `role: "user"`.

---

## ✨ Features

- **Angular 20 (standalone app)**
  - Standalone components
  - `input()` / `output()` for parent–child communication
  - Signals for local state (`signal`, `computed`)
  - New control flow: `@if`, `@for`

- **Authentication & Roles**
  - Firebase email/password login
  - `AuthService` built on signals
  - `authGuard` to protect routes
  - `roleGuard` for role-based access (e.g. `/settings` as admin-only)

- **Routing & Layout**
  - Feature routes: `/dashboard`, `/tasks`, `/profile`, `/settings`
  - 404 page for unknown routes
  - Header with dynamic auth state (login link vs user chip + logout)
  - Simple page transition animation

---

## 🧱 Tech Stack

- **Frontend**
  - Angular 20
  - Standalone components + signals
  - SCSS for styling

- **Backend / Services**
  - Firebase Authentication (email/password)
  - Firestore for user profiles & roles

- **Tooling**
  - TypeScript
  - Angular CLI
  - Git + GitHub

---

## 🚀 Running Locally

### 1. Clone the repo

```bash
git clone git@github.com:YOUR_USERNAME/ngboard-angular-auth-demo.git
cd ngboard-angular-auth-demo
```

### 2. Install dependencies

```bash
pnpm install
# or: npm install
```

### 3. Configure Firebase

Create `src/app/firebase.ts` (or update it) with your Firebase config:

```ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);
```

> For a demo project, API keys can stay in the repo, but it’s best to **restrict** them in your Firebase console (allowed domains, etc.).

### 4. Start dev server

```bash
ng serve
```

App runs at: `http://localhost:4200`

---

## 🌍 Deployment

This app is currently deployed as a **CSR** (client-side rendered) Angular app on a free hosting provider.

Build:

```bash
ng build --configuration production
```

Check `angular.json` for the exact `outputPath` (usually something like `dist/ngboard-angular-auth-demo`).

For **Netlify**:

- Build command: `ng build --configuration production`
- Publish directory: `dist/ngboard-angular-auth-demo`

Add a `netlify.toml` SPA redirect if needed:

```toml
[build]
  command = "ng build --configuration production"
  publish = "dist/ngboard-angular-auth-demo"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🧭 Roadmap / Learning Goals

- [x] Standalone Angular 20 app structure
- [x] Signals + modern control flow
- [x] Firebase auth + role-based guards
- [ ] SSR (Angular Universal) pass
- [ ] Unit + integration tests

---

## 📬 Feedback

If you have suggestions on improving the architecture, auth flow, or testing strategy, feel free to open an issue or reach out.
