const router = require("express").Router();
const controller = require("./contract.controller");

router.post("/", controller.save);
router.get("/", controller.find);

module.exports = router;
