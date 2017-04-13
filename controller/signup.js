var express = require('express'),
router = express.Router();
 RegisterUser = require('../models/userSchema.js');
 // signup = new signupClass();
 // console.log("RegisterUser",RegisterUser);
router.post('/signup', function(req,res){
	console.log("Inside get signup");
	try
	{
		console.log("request data is ",req.body);
		var data = {
			fname : req.body.fname,
			lname : req.body.lname,
			email : req.body.email,
			createPass : req.body.createPass,
			mobno : req.body.mobno,
		};
  	RegisterUser.saveRegisterUserinfo(data,function(err,result){
			if(!err)
			{
				res.send({"status":true,"msg":result})
			}
			else {
				res.send({"status":false,"msg":"something is wrong!"})
			}
		})
	}
	catch (e)
	{
		console.log(e);
		res.send([{"status":false,"message":"server error"}]);
	}
});
module.exports = router;
