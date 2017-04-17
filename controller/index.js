var express = require('express'),
router = express.Router();

console.log("I am in index.js");
router.use(require('./signup'));
router.use(require('./login'));
// router.use(require('./authenticate'));

router.use("/readProfile",require('./authenticate'),require('./userprofile'));

module.exports = router;
