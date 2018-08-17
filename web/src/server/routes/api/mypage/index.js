const router = require("express").Router();
const { sendAuthEmail,authEmail } = require("./mypage.controller");

router.post("/sendAuthEmail",sendAuthEmail);
router.get("/authEmail", authEmail);

module.exports = router;