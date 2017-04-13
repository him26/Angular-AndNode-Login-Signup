var mongoose = require('mongoose');

//connect to local mongodb database
var db = "mongodb://localhost/registerUserInfo"
module.exports = mongoose;
module.exports = function () {
  mongoose.connect(db,function (err) {
    if (err) {
      console.error(err);
    }
  });
  mongoose.connection.once('connected', function() {
  	console.log("Connected to database")
  });
};
