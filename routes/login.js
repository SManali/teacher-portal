const express = require('express');
const loginSchema = require('../models/user-credentials');
const {
    authenticateUser,
    addUser
} = require('./login');

const router = express.Router();

router.post('/createUser', (req, res) => {
    const data = req.body.data;
    addUser(data.userId, data.password).then(() => {
        res.status(200).json("User succesfully created");
    }, (err) => {
        console.error(err);
        res.status(500).json(err.message);
    });
});

router.post('/authenticateUser', (req, res) => {
    const data = req.body.data;
    authenticateUser(data.userId, data.password).then((data) => {
        res.status(200).json(data);
    }, (err) => {
        res.status(403).json(err.message);
    });
});

module.exports = router;