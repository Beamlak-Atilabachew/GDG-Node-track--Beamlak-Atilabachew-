// server2.js
const http = require('http');

const PORT = 4000;

// In-memory student array
let students = [];
let nextId = 1;

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // GET /students → return all students
    if (method === "GET" && url === "/students") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(students));
    }

    // POST /students → add new student
    if (method === "POST" && url === "/students") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const data = JSON.parse(body);
            const student = {
                id: nextId++,
                name: data.name
            };

            students.push(student);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(student));
        });
        return;
    }

    // PUT /students/:id → update name
    if (method === "PUT" && url.startsWith("/students/")) {
        const id = parseInt(url.split("/")[2]);

        let body = "";
        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            const data = JSON.parse(body);
            const student = students.find(s => s.id === id);

            if (!student) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                return res.end("Student not found");
            }

            student.name = data.name;

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(student));
        });

        return;
    }

    // DELETE /students/:id
    if (method === "DELETE" && url.startsWith("/students/")) {
        const id = parseInt(url.split("/")[2]);
        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("Student not found");
        }

        students.splice(index, 1);

        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end("Student deleted successfully");
    }

    // DEFAULT
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route Not Found");
});

server.listen(PORT, () => {
    console.log(`Student API server running on port ${PORT}`);
});
