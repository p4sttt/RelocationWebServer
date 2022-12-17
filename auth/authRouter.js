const Router = require("express");
const controller = require("./authController");
const { check } = require("express-validator");

const router = Router();

router.post("/auth/registration", controller.registration);
router.post("/auth/login", controller.login);

module.exports = router;
