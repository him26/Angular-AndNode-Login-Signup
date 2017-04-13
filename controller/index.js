var express = require('express'),
router = express.Router();

console.log("I am in index.js");
router.use(require('./signup'));
router.use(require('./login'));
module.exports = router;
