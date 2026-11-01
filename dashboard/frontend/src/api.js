// All backend calls live here. "/api" is proxied to http://localhost:5000 by Vite.
async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Something went wrong.");
  }
  return res.status === 204 ? null : res.json();
}

export const getStats = () => request("/api/stats");
export const getUsers = () => request("/api/users");
export const addUser = (user) =>
  request("/api/users", { method: "POST", body: JSON.stringify(user) });
export const deleteUser = (id) => request(`/api/users/${id}`, { method: "DELETE" });
