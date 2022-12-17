const Router = require("express");
const controller = require("./userController");

const router = Router();

router.post("/settings", controller.setSettings);
router.get("/settings", controller.getSettings);
router.get("/user", controller.getUser);
router.get("/users", controller.getUsers);
router.get("/skhdfbask", controller.createTag);

module.exports = router;
