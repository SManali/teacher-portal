const mongoose = require('mongoose');

const TokenModel = new mongoose.Schema({
  userId : {type:String},
  token : {type:String},
  updated_at:{type:Date}
});

module.exports = mongoose.model('token', TokenModel);
