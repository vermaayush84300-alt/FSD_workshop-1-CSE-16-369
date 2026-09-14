import express from "express";
// import dotenv from "dotenv";
// import cars from "cars";
const app = express();
const userData = [{
    id: 101,
    name: "Abc",
    email: "cm@abes.call.in"
}];

app.get("/users", (req, res) => {
    res.status(200).json({
        massage: "welcome user"
    });
});

// app.delete()
// app.post()
// app.put()
app.listen(4000, () => {
    console.log("Server is running on port number 4000");
})

