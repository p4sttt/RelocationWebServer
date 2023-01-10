const Router = require("express");
const controller = require("./dashboardController");

const router = Router();

router.post("/agency", controller.setAgency);
router.get("/news", controller.getNews);
router.get("/agencies", controller.getAllAgencies);

module.exports = router;
