import { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "../api.js";

const empty = { name: "", email: "", role: "Viewer" };

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const load = () => getUsers().then(setUsers).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    setError("");
    try {
      await addUser(form);
      setForm(empty);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    load();
  };

  return (
    <>
      <h1>Users</h1>

      <div className="form-row">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
        <button onClick={handleAdd}>Add user</button>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td><button className="danger" onClick={() => handleDelete(u.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
