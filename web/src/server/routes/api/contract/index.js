const router = require("express").Router();
const { rightEmail } = require("./contract.controller");

router.post("/", rightEmail );

module.exports = router;
