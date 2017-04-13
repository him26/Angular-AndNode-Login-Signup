var express = require('express'),
router = express.Router();
RegisterUser = require('../models/userSchema.js');

router.post('/signup', function(req,res){
	console.log("Inside get signup");
	try
	{
		console.log("request data is ",req.body);
		var data = req.body ;
  	RegisterUser.saveRegisterUserinfo(data,function(err,result){
			if(!err)
			{
				res.send({"status":true,"msg":result})
			}
			else
      {
				res.send({"status":false,"msg":err})
			}
		});
	}
	catch (e)
	{
		console.log(e);
		res.send([{"status":false,"message":"server error"}]);
	}
});
module.exports = router;
