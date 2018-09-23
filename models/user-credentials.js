const mongoose = require('mongoose');

const UserLoginModel = new mongoose.Schema({
  userId : {type:String},
  password : {type:String},
  created_at:{type:Date}
});

module.exports = mongoose.model('credentials', UserLoginModel);
