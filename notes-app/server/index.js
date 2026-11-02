const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "notes.json");

app.use(express.json());

// --- tiny JSON-file "database" ---
async function readNotes() {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8"));
  } catch {
    return [];
  }
}
const writeNotes = (notes) => fs.writeFile(DB_FILE, JSON.stringify(notes, null, 2));

const COLORS = ["white", "sage", "sky", "sand", "rose"];
function validate(body) {
  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "");
  const color = COLORS.includes(body.color) ? body.color : "white";
  if (!title && !content.trim()) return { error: "A note needs a title or some text." };
  return { value: { title, content, color } };
}

// --- routes ---
app.get("/api/notes", async (req, res) => {
  const q = String(req.query.q ?? "").toLowerCase();
  let notes = await readNotes();
  if (q) notes = notes.filter((n) => (n.title + " " + n.content).toLowerCase().includes(q));
  notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const note = (await readNotes()).find((n) => n.id === req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found." });
  res.json(note);
});

app.post("/api/notes", async (req, res) => {
  const { value, error } = validate(req.body);
  if (error) return res.status(400).json({ error });
  const now = new Date().toISOString();
  const note = { id: randomUUID(), ...value, createdAt: now, updatedAt: now };
  const notes = await readNotes();
  notes.push(note);
  await writeNotes(notes);
  res.status(201).json(note);
});

app.put("/api/notes/:id", async (req, res) => {
  const { value, error } = validate(req.body);
  if (error) return res.status(400).json({ error });
  const notes = await readNotes();
  const i = notes.findIndex((n) => n.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "Note not found." });
  notes[i] = { ...notes[i], ...value, updatedAt: new Date().toISOString() };
  await writeNotes(notes);
  res.json(notes[i]);
});

app.delete("/api/notes/:id", async (req, res) => {
  const notes = await readNotes();
  const next = notes.filter((n) => n.id !== req.params.id);
  if (next.length === notes.length) return res.status(404).json({ error: "Note not found." });
  await writeNotes(next);
  res.status(204).end();
});

// --- serve the built React app in production (works on Express 4 and 5) ---
const dist = path.join(__dirname, "../client/dist");
app.use(express.static(dist));
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) return next();
  res.sendFile(path.join(dist, "index.html"), (err) => err && next());
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));