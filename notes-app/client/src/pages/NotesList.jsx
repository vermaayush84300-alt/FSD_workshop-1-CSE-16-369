import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api.js";

export default function NotesList() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [notes, setNotes] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const t = setTimeout(() => {
      api.list(q).then((d) => !ignore && setNotes(d)).catch((e) => !ignore && setError(e.message));
    }, 200); // debounce search
    return () => { ignore = true; clearTimeout(t); };
  }, [q]);

  async function remove(id) {
    if (!confirm("Delete this note?")) return;
    try {
      await api.remove(id);
      setNotes((n) => n.filter((x) => x.id !== id));
    } catch (e) { setError(e.message); }
  }

  return (
    <>
      <input
        className="search"
        type="search"
        placeholder="Search notes"
        aria-label="Search notes"
        value={q}
        onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {})}
      />
      {error && <p className="error" role="alert">{error}</p>}
      {notes === null && !error && <p className="muted">Loading…</p>}
      {notes?.length === 0 && (
        <div className="empty">
          <h2>{q ? "No matches" : "No notes yet"}</h2>
          <p>{q ? "Try a different search." : <>Write your first one with <Link to="/new">New note</Link>.</>}</p>
        </div>
      )}
      <ul className="grid">
        {notes?.map((n) => (
          <li key={n.id} className={`note c-${n.color}`}>
            <Link to={`/notes/${n.id}`} className="note-link">
              <h3>{n.title || "Untitled"}</h3>
              <p>{n.content}</p>
            </Link>
            <footer>
              <time>{new Date(n.updatedAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</time>
              <button className="link-danger" onClick={() => remove(n.id)}>Delete</button>
            </footer>
          </li>
        ))}
      </ul>
    </>
  );
}
