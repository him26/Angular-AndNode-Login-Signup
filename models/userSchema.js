var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var registerUserSchema = mongoose.Schema({
	fname : {
		type : String,
		require : true
	},
  lname : {
    type : String,
    require : true
  },
	email : {
		type : String,
		require : true,
    unique : true
	},
	createPass : {
		type : String,
		require : true
	},
  mobno : {
    type : Number,
    require : true,
    unique : true
  },
  created_at: {
    type:Date,
  },
  updated_at: {
     Date
  }
},
{collection:"registerUserSchema"});

registerUserSchema.statics.saveRegisterUserinfo = function (data,cb) {
var userObj = new this({
			fname:data.fname,
			lname:data.lname,
			email:data.email,
			createPass:data.createPass,
			mobno:data.mobno
	});
this.findOne({email:data.email}, function (error,exist) {
	if(exist){
		cb(null,'User already exist!');
	}
	else{
		userObj.save(function(err, result){
			if(err){
				cb(err,null);
			}else{
				cb(null,'Successfully Registered');
			}
		});
	}
});
};
registerUserSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});
var RegisterUser = mongoose.model('RegisterUser', registerUserSchema);
module.exports = RegisterUser;
