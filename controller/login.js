var express = require('express'),
router = express.Router(),
login = require('../models/loginSchema');
router.post('/login', function(req,res){
	try
	{
  	var loginData = {
  		email : req.body.email,
  		password : req.body.password,
  	}
    console.log(loginData);
  		login.checkLoginAuthentication(loginData,function(err,result){
        if (!err) {
            res.send({"status":true,"msg":result})
        } else {
            res.send({"status":true,"msg":"your credentials are wrong!"})
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
