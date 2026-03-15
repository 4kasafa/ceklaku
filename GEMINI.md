# GEMINI.md - Cek Laku Versi HP (Frontend)

## Project Overview
**Cek Laku Versi HP** is a mobile-optimized React frontend designed to provide a fast and efficient dashboard for monitoring transaction data. It is built using modern web technologies to ensure a smooth user experience on mobile devices, including Progressive Web App (PWA) support.

### Key Features
- **Mobile-First Dashboard:** Optimized for mobile display with a clean, card-based UI.
- **PWA Support:** Can be installed on mobile devices for a native app-like experience.
- **Desktop Redirect:** Shows a QR code on desktop screens (>= 1024px) to encourage mobile usage, with an option to continue on desktop.

### Key Technologies
- **React 19:** UI library.
- **Vite 7:** Build tool and development server.
- **Tailwind CSS 4:** Styling via utility classes.
- **Lucide React:** Icon set.
- **Vite PWA:** PWA integration (service workers, manifest).
- **AuthContext:** Centralized state management for authentication and dashboard data.

### Architecture
- **`src/contexts/AuthContext.jsx`**: Manages user authentication, token persistence in `localStorage`, and dashboard data fetching.
- **`src/services/api.js`**: Contains API request logic, including login, health checks, and dashboard data retrieval.
- **`src/components/`**: Modularized UI components for dashboard sections (Header, Cards, Score, Details, etc.).
- **`src/App.jsx`**: Main application logic, routing (conditional rendering), and PWA installation handling.

---

## Building and Running

### Prerequisites
- Node.js (latest LTS recommended)
- `.env` file with `VITE_API_BASE_URL` (e.g., `https://ceklakuversihp.onrender.com`)

### Commands
- **Start Development Server:**
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:5173`. API requests to `/api` are proxied to the backend.

- **Build for Production:**
  ```bash
  npm run build
  ```
  The production assets will be generated in the `dist/` directory.

- **Linting:**
  ```bash
  npm run lint
  ```

- **Preview Production Build:**
  ```bash
  npm run preview
  ```

---

## Development Conventions

### Authentication Flow
- Tokens are stored in `localStorage` under `dashboard_token`.
- Token expiration is tracked via `dashboard_expires_at`.
- Use the `useAuth` hook from `AuthContext` to check `isAuthenticated` and access `dashboardData`.

### API Integration
- All API calls should be added to `src/services/api.js`.
- The frontend uses a proxy `/api` in development (configured in `vite.config.js`) and a redirect in Netlify (configured in `netlify.toml`).

### Desktop Redirect
- The app detects desktop screens (>= 1024px) via `window.innerWidth`.
- If unauthenticated on desktop, it displays `src/components/DesktopRedirect.jsx` with a QR code pointing to the app.
- Users can bypass this by clicking "Lanjut buka disini".

### Styling & UI
- Follow the mobile-first approach using Tailwind CSS 4 utility classes.
- Maintain consistent spacing and rounded corners (`rounded-2xl` is common) to match the existing aesthetic.
- Interactive elements should use the `cyan` and `blue` color palette as seen in `App.jsx`.

### PWA Support
- Manifest and service worker settings are located in `vite.config.js`.
- Assets for PWA (icons) are located in the `public/` folder.

### API Endpoint Reference (from Quickstart)
- **Base URL:** `https://ceklakuversihp.onrender.com`
- **POST `/auth/login`**: Authenticate user.
- **GET `/dashboard`**: Retrieve transaction data (requires Bearer token).
- **GET `/health`**: Check backend status.
