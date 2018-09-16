const express = require('express');
const students = express.Router();

students.get('/student', (req,res) =>{
    res.send('Students page');
});

module.exports = (req, res) => {
    res.send("Login page");
}