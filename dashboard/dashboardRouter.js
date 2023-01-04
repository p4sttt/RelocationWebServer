const Router = require("express");
const controller = require("./dashboardController");

const router = Router();

router.get("/news", controller.getNews);

module.exports = router;
