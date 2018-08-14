const router = require("express").Router();
const { authPassword, sendAuthEmail,authEmail } = require("./mypage.controller");

router.post("/authPassword",authPassword);
router.post("/sendAuthEmail",sendAuthEmail);
router.get("/authEmail", authEmail);

module.exports = router;