//To load config
require("dotenv").config();

const express = require('express');
const loginRoutes = require('./routes/login');
const studentsRoutes = require('./routes/students');

const app = express();
const port = process.env.PORT;

//Routers path
app.get('/login', loginRoutes);
app.get('/students', studentsRoutes );
app.use('/', (req, res) => {
    res.redirect('/login');
});


app.listen(port, () => {
    console.log(`App listening on port, ${port}`)
});