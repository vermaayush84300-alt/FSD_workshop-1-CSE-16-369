async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong.");
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  list: (q = "") => request(`/api/notes${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  get: (id) => request(`/api/notes/${id}`),
  create: (note) => request("/api/notes", { method: "POST", body: JSON.stringify(note) }),
  update: (id, note) => request(`/api/notes/${id}`, { method: "PUT", body: JSON.stringify(note) }),
  remove: (id) => request(`/api/notes/${id}`, { method: "DELETE" }),
};
