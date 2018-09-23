const express = require('express');

const router = express.Router();
const {
    addStudent,
    deleteStudent,
    getAllStudent
} = require('../controller/students');

router.post('/add', (req, res) => {
    const data = req.body.data;
    addStudent(data).then(() => {
        res.status(200).json("Add student successful");
    }, err => {
        res.status(500).json(err);
    });
});

router.post('/delete', (req, res) => {
    const data = req.body.data;
    const uniqueId = data.uniqueId;
    deleteStudent(uniqueId).then(() => {
        res.status(200).json(`stuent ${uniqueId} deleted.`);
    }, err => {
        res.status(500).json(`Error in student ${uniqueId} deletion`);
    });
});

router.get('/allStudents', (req, res) => {
    getAllStudent().then((doc) => {
        res.status(200).json(doc);
    }, err => {
        res.status(500).json('Error in fetching student details');
    });
});

module.exports = router;