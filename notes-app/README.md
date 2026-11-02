# Notes app (React + React Router + Node + Express)

```
notes-app/
├── server/   Express API, stores notes in notes.json
└── client/   React (Vite) + React Router
```

## Run in development
```bash
npm run install:all   # installs root, server and client deps
npm run dev           # API on :5000, React on :5173 (proxied to the API)
```
Open http://localhost:5173

## Run in production
```bash
npm run build --prefix client
npm start --prefix server   # serves API + built React app on :5000
```

## API
| Method | Path             | Purpose                         |
|--------|------------------|---------------------------------|
| GET    | /api/notes?q=    | List notes (optional search)    |
| GET    | /api/notes/:id   | Get one note                    |
| POST   | /api/notes       | Create (title, content, color)  |
| PUT    | /api/notes/:id   | Update                          |
| DELETE | /api/notes/:id   | Delete                          |

## Routes (React Router)
`/` list + search · `/new` create · `/notes/:id` edit · `*` not found
