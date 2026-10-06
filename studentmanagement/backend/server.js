const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

const PORT = 5000;

// Allow React frontend to communicate with backend
app.use(cors());

// Read JSON data sent by frontend
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Student Management System API is running"
    });
});

// Student routes
app.use("/api/students", studentRoutes);

// Invalid route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});