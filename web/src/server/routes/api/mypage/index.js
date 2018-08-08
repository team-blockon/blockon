const router = require("express").Router();
const { authPassword } = require("./mypage.controller");

router.post("/authPassword",authPassword);

module.exports = router;