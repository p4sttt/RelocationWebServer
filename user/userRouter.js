const Router = require("express");
const controller = require("./userController");

const router = Router();

router.post("/settings", controller.setSettings);
router.post("/country", )
router.get("/settings", controller.getSettings);
router.get("/user", controller.getUser);
router.get("/users", controller.getUsers);
router.get("/tags", controller.getTags)
router.get("/skhdfbask", controller.createTag);
router.get("/s/countries", controller.getCountries)
router.get("/deleteaccount", controller.deleteAccount)

module.exports = router;
