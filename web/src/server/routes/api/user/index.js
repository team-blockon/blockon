const router = require("express").Router();
const controller = require("./user.controller");

router.get("/list", controller.list);

module.exports = router;
