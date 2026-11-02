import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../api.js";

const COLORS = ["white", "sage", "sky", "sand", "rose"];

export default function NoteEditor() {
  const { id } = useParams(); // undefined on /new
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "", color: "white" });
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api.get(id).then(setNote).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [id]);

  const set = (field) => (e) => setNote((n) => ({ ...n, [field]: e.target.value }));

  async function save(e) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      id ? await api.update(id, note) : await api.create(note);
      navigate("/");
    } catch (err) {
      setError(err.message); setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this note?")) return;
    await api.remove(id);
    navigate("/");
  }

  if (loading) return <p className="muted">Loading…</p>;

  return (
    <form className={`editor c-${note.color}`} onSubmit={save}>
      <input className="title" placeholder="Title" value={note.title} onChange={set("title")} autoFocus />
      <textarea placeholder="Write something…" rows={14} value={note.content} onChange={set("content")} />
      <div className="colors" role="radiogroup" aria-label="Note color">
        {COLORS.map((c) => (
          <button
            type="button" key={c} role="radio" aria-checked={note.color === c} aria-label={c}
            className={`swatch c-${c} ${note.color === c ? "on" : ""}`}
            onClick={() => setNote((n) => ({ ...n, color: c }))}
          />
        ))}
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="actions">
        <button className="btn" disabled={saving}>{saving ? "Saving…" : "Save note"}</button>
        <Link to="/" className="ghost">Cancel</Link>
        {id && <button type="button" className="link-danger push" onClick={remove}>Delete</button>}
      </div>
    </form>
  );
}
