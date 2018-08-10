const router = require("express").Router();
const { send, read } = require("./message.controller");

router.post("/send",send);
router.get("/read", read);

module.exports = router;