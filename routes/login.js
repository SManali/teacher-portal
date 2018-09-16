const express = require('express');
const login = express.Router();

login.get('/login/', (req,res) =>{
    res.send('Login page');
});

login.post('/login/authenticate', (req, res) =>{
    res.send(" User is authenticate");
});

module.exports = (req, res) => {
    res.send("Login page");
}