const NewsApi = require("newsapi");
const Agency = require("../models/Agency");

const newsapi = new NewsApi("9e301fa39d544ace888d840476d8417e");

class dashboardRouter {
  async getNews(req, res) {
    try {
      const promise = newsapi.v2.topHeadlines({
        sources: "bbc-news,the-verge",
        language: "en",
        pageSize: 4,
        page: 1,
      });
      const news = await promise.then((res) => res.articles);

      res.status(200).json({ news: news });
    } catch (error) {
      res.status(400).json({ msg: "get news error" });
    }
  }
  async getAllAgencies(req, res) {
    try {
      const { country } = req.headers;
      const agencies = await Agency.find({ country: country });
      res.status(200).json({ agencies: agencies });
    } catch (error) {
      res.status(400).json({ msg: "get all agencies error" });
    }
  }
  async setAgency(req, res) {
    try {
      const {name, description, country, logo} = req.body
      const agency = new Agency({
        name: name,
        description: description,
        country: country,
        logo: logo
      })
      agency.save()
      res.status(200).json({msg: "success"})
    } catch (error) {
      res.status(400).json({msg: "set agency error"})
    }
  }
}

module.exports = new dashboardRouter();
