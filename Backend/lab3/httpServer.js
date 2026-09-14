import http from "http";

const userdata = [{ id: 1, name: "abs", email: "ayush@gmail.com" }];

const server = http.createServer(async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url == "/msg" && method == "GET") {
        res.end("welcome message from server");
    }
    else if (url == "/sys" && method == "GET") {
        res.end("this is system information");
    }
    else if (url == "/data" && method == "GET") {
        res.end(JSON.stringify(userdata));
    }
    else if (url == "/create" && method == "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const newdata = JSON.parse(body);
            const newuserdata = {
                id: newdata.id,
                name: newdata.name,
                email: newdata.email
            };
            userdata.push(newuserdata);
            res.end("data uploaded successfully");
        });
    }
});

server.listen(3000, () => {
    console.log("server is running on port number 3000");
});
