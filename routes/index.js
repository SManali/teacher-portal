const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  console.log('index.js >>>>>>>>>>>>>>>>.');
  //res.send("test");
  res.render('index', { title: 'Teacher Portal' });
});

module.exports = router;