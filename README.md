yarn dev
Repository layout

This repository is split into two top-level folders now:

- `frontend/` - the Next.js (React / TypeScript) application. Contains the Next config, `package.json`, `src/` and `public/`.
- `backend/` - the Django backend (Python). This folder was already present and is left intact.

Quick start

Run the frontend (Next.js):

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Run the backend (Django):

```powershell
cd backend
python -m venv .venv        ; # create venv if you don't have one
.\.venv\Scripts\Activate    ; # activate venv on Windows PowerShell
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Notes

- I moved the Next.js app files and top-level configs into `frontend/`. The `backend/` directory was left as-is.
- If you use a different package manager (yarn/pnpm/bun) or a different Python environment layout, adapt the commands above.

If you want me to also update CI, Dockerfiles, or the repo README badges to reflect the new structure, tell me which you'd like and I can make those edits.
