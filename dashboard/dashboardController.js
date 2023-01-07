const NewsApi = require("newsapi");
const Country = require("../models/Country");

const newsapi = new NewsApi("9e301fa39d544ace888d840476d8417e");

class dashboardRouter {
  async getNews(req, res) {
    try {
      const promise = newsapi.v2.topHeadlines({
        // q: "travelling OR journey",
        sources: 'bbc-news,the-verge',
        language: 'en',
        pageSize: 4,
        page: 1
      });
      const news = await promise.then((res) => res.articles);

      res.status(200).json({ news: news });
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
      console.log(error);
      res.status(400).json({ msg: "get all agencies error" });
    }
  }
}

module.exports = new dashboardRouter();
