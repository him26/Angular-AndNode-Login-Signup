var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var loginAuthenticationSchema = mongoose.Schema({
	email : {
		type : String,
		require : true,
    unique : true
	},
	password : {
		type : String,
		require : true
	},
});
loginAuthenticationSchema.statics.checkLoginAuthentication = function(logindata,cb){
console.log(logindata.email);
console.log(logindata.password);
  RegisterUser.findOne({ email: logindata.email }, function(err, user) {
    if (err)
    {
          cb(err,null);
    }
    else
    {     console.log("fghfh",user);
        if (user != null) {
          if (user.createPass === logindata.password)
                 {
                    cb(null,"password validate");
                 }
                 else {
                    cb(null,"password Invalidate");
                 }
        } else {
            cb(null,"Invalide emailid");
        }

    }
});
}
var LoginUser = mongoose.model('LoginUser', loginAuthenticationSchema);
module.exports = LoginUser;


// if (data.val() !== null) {
//   data.forEach(function(snap) {
//     var temp = snap.val();
//     if (temp.createPass === password) {
//       console.log("valid password");
//       self.emit("loginsuccess",null,temp);
//     } else {
//       console.log("invalid password");
//       self.emit("loginsuccess","Invalid password",null);
//     }
//   });
// } else {
//   console.log("invalid email");
//   self.emit("loginsuccess","Invalid emailName",null);
// }
/*
// for (var i = 0; i < user.length; i++) {
//   user[i].
//   if ( user[0].createPass == logindata.password) {
//       console.log("password success");
//   }
// }

//     console.log(user);
//     // if(!user){
//     //   console.log("Invalid password");
//     //     // cb(null,"Invalid password");
//     //   }
//     // else if(logindata.password == user.createPass){
//     //   console.log("password validate");
//     //
//     // }
// else{
//   console.log("logged in Successfully");
// // cb(null,"logged in Successfully");
// }
*/
