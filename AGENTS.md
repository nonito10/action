# Notes for agents

- Stack: React 18 + Vite 6 (plain JS/JSX), frontend only, no backend, no database, no external secrets. State persists in the browser's `localStorage` (`action.items`).
- Run: `docker compose -f docker-compose.base44.yml up -d`. Host port 3000 maps to Vite on 5173 inside the `web` container.
- The repo is bind-mounted at `/app`; `node_modules` lives in a named Docker volume. The container runs `npm ci` on every start, so **after changing `package.json` commit the updated `package-lock.json`** (`npm ci` fails if they drift) and restart the service: `docker compose -f docker-compose.base44.yml restart web`.
- `vite.config.js` sets `allowedHosts: true` (the preview proxy's hostname rotates) and `watch.usePolling` (bind mounts don't deliver file events). Keep both.
- Verify: `curl -s localhost:3000/src/App.jsx` should return an unhashed transformed module (proves the dev server, not a prebuilt bundle, is serving).
