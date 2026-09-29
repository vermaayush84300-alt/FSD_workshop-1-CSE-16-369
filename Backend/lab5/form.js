import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, "users.json");

// Signup
app.post("/signup", (req, res) => {
    let users = JSON.parse(
        fs.readFileSync(file, "utf8")
    );

    // Make sure users is an array
    if (!Array.isArray(users)) {
        users = [];
    }

    users.push(req.body);

    fs.writeFileSync(
        file,
        JSON.stringify(users, null, 2)
    );

    res.json({
        message: "Signup successful"
    });
});

// Login
app.post("/login", (req, res) => {
    const users = JSON.parse(
        fs.readFileSync(file, "utf8")
    );

    const user = users.find(
        (u) =>
            u.username === req.body.username &&
            u.password === req.body.password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    res.json({
        message: "Login successful",
        user: user
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});