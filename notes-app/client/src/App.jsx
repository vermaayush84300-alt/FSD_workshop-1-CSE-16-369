import { Routes, Route, NavLink, Link, Outlet } from "react-router-dom";
import NotesList from "./pages/NotesList.jsx";
import NoteEditor from "./pages/NoteEditor.jsx";

function Layout() {
  return (
    <>
      <header className="bar">
        <Link to="/" className="brand">Notes</Link>
        <nav>
          <NavLink to="/" end>All notes</NavLink>
          <NavLink to="/new" className="btn">New note</NavLink>
        </nav>
      </header>
      <main className="page"><Outlet /></main>
    </>
  );
}

function NotFound() {
  return (
    <div className="empty">
      <h2>Page not found</h2>
      <p>That address doesn’t lead anywhere. <Link to="/">Go to your notes</Link>.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<NotesList />} />
        <Route path="new" element={<NoteEditor />} />
        <Route path="notes/:id" element={<NoteEditor />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
