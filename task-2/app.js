import express from 'express';
import { stat } from 'fs';
const app = express();
const PORT = 5000;

app.get("/home",(req,res)=>{
    res.send("<h1 style = 'color:green'>Hey,This is home page.</h1>");
});

app.get("/about",(req,res)=>{
    res.send("We are gonna create express app.");
});

app.get("/students/:studentId",(req,res)=>{
    const studentId =req.params.studentId;
    const department = req.query.department;

res.json({
    id: studentId,
    department : department ,
    status : "Active"
});
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});