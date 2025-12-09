// server1.js
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // HOME ROUTE
    if (method === "GET" && url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end("Welcome to the Home Page");
    }

    // INFO ROUTE
    if (method === "GET" && url === "/info") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end("This is the information page");
    }

    // SUBMIT ROUTE (POST JSON)
    if (method === "POST" && url === "/submit") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const json = JSON.parse(body);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(json));
        });

        return;
    }

    // DEFAULT
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found");
});

server.listen(PORT, () => {
    console.log(`Server 1 running on port ${PORT}`);
});
