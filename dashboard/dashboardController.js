const NewsApi = require("newsapi");
const Country = require("../models/Country");

const newsapi = new NewsApi("9e301fa39d544ace888d840476d8417e");

class dashboardRouter {
  async getNews(req, res) {
    try {
      const promies = newsapi.v2.everything({
        q: "travelling",
      });

      let data = await promies.then((res) => res.articles);
      data = data.slice(0, 4);

      res.status(200).json({ news: data });
    } catch (error) {
      res.status(400).json({ msg: "get news error" });
      console.log(error);
    }
  }
  async getAllAgencies(req, res) {
    try {
      const { country } = req.headers;
      let agencies_ = await Country.findOne({ name: country });
      res.status(200).json({ agencies: agencies_.agencies });
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: "get all agencies error" });
    }
  }
}

module.exports = new dashboardRouter();
