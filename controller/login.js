var express = require('express'),
router = express.Router(),
RegisterUser = require('../models/userSchema.js');
router.post('/login', function(req,res){
	try
	{
  	var loginData = {
  		email : req.body.email,
  		password : req.body.password,
  	}
    console.log(loginData);
  		RegisterUser.checkLoginAuthentication(loginData,function(err,result){
        if (!err) {
            res.send({"status":true,"msg":result})
        } else {
            res.send({"status":false,"msg":err})
        }
      });
}
catch (e)
{
	console.log(e);
	res.send({"status":false,"msg":"server error"});
}
});
module.exports = router;
