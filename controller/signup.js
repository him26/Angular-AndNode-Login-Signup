var express = require('express'),
    router = express.Router();
RegisterUser = require('../models/userSchema.js');

router.post('/signup', function(req, res) {
    try {
        var data = req.body;
        RegisterUser.saveRegisterUserInfo(data, function(err, result) {
            if (!err) {
							if (!result) {
								res.send({"status": true,"msg": "user email id already exist!"});
							}
							else {
								res.send({"status": true,"msg": "data is saved!"});
							}
            } else {
                if (err == undefined) {
                    res.send({"status": false,"msg": "data is not saved"});
                } else {
                    var validationErrors = [];
                    var errormsg = JSON.stringify(err);
                    var convertmsg = JSON.parse(errormsg).errors;
                    for (var key in convertmsg) {
                        validationErrors.push(convertmsg[key].message);
                    }
                    res.send({"status": false,"msg": validationErrors});
                }
            }
        });
    } catch (e) {
        console.log(e);
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
