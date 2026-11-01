const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ---- In-memory data (replace with a real database later) ----
let users = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", role: "Admin" },
  { id: 2, name: "Priya Verma", email: "priya@example.com", role: "Editor" },
  { id: 3, name: "Rohan Gupta", email: "rohan@example.com", role: "Viewer" },
];
let nextId = 4;

// ---- Routes ----
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.get("/api/stats", (req, res) => {
  res.json({
    totalUsers: users.length,
    revenue: 128450,
    orders: 342,
    growth: 12.4,
    monthly: [
      { month: "Jun", sales: 42 },
      { month: "Jul", sales: 58 },
      { month: "Aug", sales: 51 },
      { month: "Sep", sales: 76 },
      { month: "Oct", sales: 90 },
    ],
  });
});

app.get("/api/users", (req, res) => res.json(users));

app.post("/api/users", (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }
  const user = { id: nextId++, name, email, role: role || "Viewer" };
  users.push(user);
  res.status(201).json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!users.some((u) => u.id === id)) {
    return res.status(404).json({ message: "User not found." });
  }
  users = users.filter((u) => u.id !== id);
  res.status(204).end();
});

app.use((req, res) => res.status(404).json({ message: "Route not found." }));

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
