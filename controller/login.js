var express = require('express'),
router = express.Router(),
RegisterUser = require('../models/userSchema.js');
var conn = require("../config/config.js");
var jwt = require('jsonwebtoken');

router.post('/login', function(req,res){
	try
	{
  		RegisterUser.checkLoginAuthentication(req.body,function(err,user){
				if (!err) {
					if (user != null) {
							var datapass = {
								givenpass : req.body.password,
								extractedpass : user.password
							};
							RegisterUser.comparePassword(datapass,function(err,result){
										if (!err) {
											if (result)
											{
												var token = jwt.sign( {id:user.userid}, conn.secret,{
																	expiresIn: 86400 // expires in 24 hours
																});
												res.send({"status":true,"msg":"password matched","token":token});
											}
											else
											{
												res.send({"status":false,"msg":"password unmatched"});
											}
										}
										else
										{
												res.send({"status":false,"msg":"comparison error"+err});
										}
								});
				     }
						 else
						 {
							 res.send({"status":false,"msg":"email id invalid"});
				     }
				} else {
					// console.log("no user find");
					res.send({"status":false,"msg":"email check error"});
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
