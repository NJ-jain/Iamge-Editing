var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/photo');
var userSchema = mongoose.Schema({
  profilePic : {
    type : String , 
    default : ""
  }
})
module.exports = mongoose.model('user' , userSchema);