var express = require("express"),
    app = express(),
bodyParser = require("body-parser"),
connection = require("./config/config.js");
// console.log(connection.secret);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(require('./controller'));

var port = process.env.PORT || 4000;
app.listen(port, function() {
    connection.mongoconn();
    console.log("listning from the port" + port);
});
