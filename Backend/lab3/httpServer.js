import http from "http";
const userdata = [{ id: 1, name: "abs", email: " ayush@gmail.com" }]
const server = http.createServer((req, res) => {
    // res.status = 201;
    // res.setHeader('content-Type', 'text/plain');
    // res.end("hello sever");
    const url = req.url;
    const method = req.method;
    if (url == "/msg" && method == "GET") {
        res.end("welcome massage from server");
    }
    else if (url == "/sys" && method == "GET") {
        res.end("this is system imformation");
    }
    else if (url == "/data" && method == "GET") {
        res.end(JSON.stringify(userdata));
    }
})

server.listen(3005, () => {
    console.log("server is running on port number 3005");
})