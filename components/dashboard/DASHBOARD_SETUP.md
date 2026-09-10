# Dashboard integration

Replace the files in `components/dashboard/` with the files in this folder and copy
`lib/dashboard-api.ts` into your frontend `lib/` folder.

## One required Crop Check change

Your current CropCheck keeps the selected city in React state, but does not persist it.
In `handleSelectCity`, immediately after:

```ts
setCity(selectedName)
setCitySearch(selectedName)
```

add:

```ts
localStorage.setItem('trix_selected_city', selectedName)
window.dispatchEvent(new Event('trix-city-changed'))
```

This lets the Dashboard use the same city after the user leaves Crop Check.

## Backend

No new secret is needed. The Dashboard uses:

- GET /scan-history
- GET /analysis-summary?scan_id=...
- GET /weather?city=...

The browser only calls your FastAPI backend. Do NOT put OPENWEATHER_API_KEY or
SUPABASE_SERVICE_KEY in the frontend.

Optional production setup:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

For local development, the code already defaults to that URL.

## Run

Backend:

```powershell
cd "C:\Crop management\SIH-backend"
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Frontend: use your existing Next.js command, normally:

```powershell
npm run dev
```

After starting both, select a city in Crop Check, run at least one analysis, then open
Dashboard. Refreshing the dashboard will fetch the real Supabase scan history and
latest risk analysis.
