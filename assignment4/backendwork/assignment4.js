const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const userData = [
    {
        id: 101,
        name: "cm",
        email: "cmrj88@gmail.com"
    },
    {
        id: 102,
        name: "pm",
        email: "pmrj88@gmail.com"
    },
    {
        id: 103,
        name: "chandan",
        email: "chandan@gmail.com"
    }
];

app.get("/user", (req, res) => {
    res.status(200).json({
        message: "data recieved",
        userData
    });
});

app.post("/create", (req, res) => {
    const { name, email, rollNo, branch, year } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "name and email are required" });
    }

    const newuser = {
        id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 101,
        name,
        email,
        rollNo,
        branch,
        year
    };

    userData.push(newuser);

    res.status(200).json({
        message: "user created successfully",
        newuser,
        userData
    });
});


app.put("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = userData.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    userData[index] = { ...userData[index], ...req.body };

    res.status(200).json({
        message: "User updated successfully",
        updatedUser: userData[index],
        userData
    });
});

app.put("/user", (req, res) => {
    const id = parseInt(req.body.id);
    const index = userData.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    userData[index] = { ...userData[index], ...req.body };

    res.status(200).json({
        message: "User updated successfully",
        updatedUser: userData[index],
        userData
    });
});

app.delete("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = userData.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = userData.splice(index, 1)[0];

    res.status(200).json({
        message: "User deleted successfully",
        deletedUser,
        userData
    });
});


app.delete("/user", (req, res) => {
    const id = parseInt(req.body.id);
    const index = userData.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = userData.splice(index, 1)[0];

    res.status(200).json({
        message: "User deleted successfully",
        deletedUser,
        userData
    });
});

app.listen(3000, () => {
    console.log("Server is running on port number 3000");
});