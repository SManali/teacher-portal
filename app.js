//To load config
require("dotenv").config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const routes = require('./routes/index');
const loginRoutes = require('./routes/login');
const studentsRoutes = require('./routes/students');

//mongoose.connect(`mongodb://${config.db_server}/${config.db_name}`)

const app = express();

//view engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routers path
app.use('/vendor', express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('*', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
//   cache.start((merr) => {
//     if (merr) {
//       app.close();
//       throw merr;
//     }
//   });
  // error handlers
  
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
      });
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
    });
  });
  
module.exports = app;