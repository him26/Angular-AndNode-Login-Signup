var express  =  require("express"),
app          =  express();
bodyParser   =  require("body-parser");
connection = require("./config/config.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./controller'));

var port = process.env.PORT ||4000;
app.listen(port,function () {
  connection();
  console.log("listning from the port" +port);
});
