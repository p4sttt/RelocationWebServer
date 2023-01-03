const Router = require("express");
const controller = require("./countriesController");

const router = Router();

router.get("/countries", controller.getCountries);
router.get("/user/countries", controller.getUserCountries)
router.post("/country", controller.setCountry);

module.exports = router;
