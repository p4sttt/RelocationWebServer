const Country = require("../models/Country");

class countriesRouter {
  async getCountries(req, res) {
    const countries = await Country.find({});

    res.status(200).json({ countries: countries });
    try {
    } catch (error) {
      res.status(200).json({ msg: "get countries error" });
    }
  }
  async setCountry(req, res) {
    try {
      const { name, img, temperatures, tags } = req.body;

      const country = new Country({
        name: name,
        img: img,
        temperatures: temperatures,
        tags: tags,
      });
      country.save();

      res.status(200).json({ msg: "success" });
    } catch (error) {
      res.status(200).json({ msg: "set countries error" });
    }
  }
}

module.exports = new countriesRouter();
