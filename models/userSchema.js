var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 5;
var Schema = mongoose.Schema;
var registerUserSchema = Schema({
    fname: {
        type: String,
        require: true,
				minlength: 5,
				maxlength: 128,
				validate:validators.isAlpha()
    },
    lname: {
        type: String,
        require: true,
				validate:validators.isAlpha()
    },
    email: {
        type: String,
        require: true,
        unique: true,
				minlength: 8,
				maxlength: 128,
				validate: validators.isEmail()
    },
    password: {
        type: String,
        require: true,
				minlength: 8,
				maxlength: 20
    },
    mobileNo: {
        type: Number,
        require: true,
        unique: true,
				minlength: 10,
				maxlength: 10
    }
}, {collection: "RegisterUser"});
registerUserSchema.statics.saveRegisterUserinfo = function(data, cb) {
		var self = this;
    this.findOne({
        email: data.email
    }, function(error, exist) {
        if (exist) {
            cb(null, 'User already exist!');
        } else {
						var userObj = new self(data);
						console.log("khkkfsdkfsk",userObj);
            userObj.save(cb);
        }
    });
};
registerUserSchema.statics.checkLoginAuthentication = function(logindata, cb) {
    RegisterUser.findOne({ email: logindata.email}, function(err, user) {
        if (err) {
            cb(err, null);
        } else {
            console.log("fghfh", user);
            if (user != null) {
                bcrypt.compare(logindata.password, user.password,cb);
            } else {
                cb(null, "Invalide emailid");
            }
        }
    });
};
registerUserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next(); // only hash the password if it has been modified (or is new)
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) { // generate a salt
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) { // hash the password using our new salt
            if (err) return next(err);
            user.password = hash; // override the cleartext password with the hashed one
            next();
        });
    });
});
var RegisterUser = mongoose.model('RegisterUser', registerUserSchema);
module.exports = RegisterUser;
