const User = require("../models/User");
const jwt = require("jsonwebtoken");
const NewsApi = require("newsapi");

const newsapi = new NewsApi("9e301fa39d544ace888d840476d8417e");

class dashboardRouter {
  async getNews(req, res) {
    try {
      const { token } = req.headers;
      const id = jwt.decode(token).id;

      const user = await User.findById(id);
      const userCountries = user.settings.countries;
      const country =
        userCountries[Math.floor(Math.random() * userCountries.length)];

      const promies = newsapi.v2
        .everything({
          q: "travelling",
        })

        let data = await promies.then(res => res.articles)
        data = data.slice(0, 4)

      res.status(200).json({ news: data });
    } catch (error) {
      res.status(400).json({ msg: "get news error" });
      console.log(error);
    }
  }
}

module.exports = new dashboardRouter();
