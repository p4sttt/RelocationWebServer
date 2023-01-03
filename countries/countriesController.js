const Country = require("../models/Country");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getIdFromAcessToken = (token) => {
  return jwt.decode(token);
};

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
  async getUserCountries(req, res) {
    try {
      const { token } = req.headers;
      const { id } = getIdFromAcessToken(token);
      const user = await User.findById(id);
      const countries = user.settings.countries
      const userCountries = [];

      for(const country of countries){
        userCountries.push(await Country.findOne({"name": country}))
      }

      res.status(200).json({ userCountries });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "get countries error" });
    }
  }
}

module.exports = new countriesRouter();
