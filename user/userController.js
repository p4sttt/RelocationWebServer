const User = require("../models/User");
const Tag = require("../models/Tag");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const getIdFromAcessToken = (token) => {
  return jwt.decode(token);
};

class userRouter {
  async setSettings(req, res) {
    try {
      const { token } = req.headers;
      const { temperature, tags, countries } = req.body;
      const { id } = getIdFromAcessToken(token);

      const settings = {
        temperature: temperature,
        tags: tags,
        countries: countries,
      };

      await User.findByIdAndUpdate(id, { settings });

      return res.status(200).json(settings);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "set settings error" });
    }
  }
  async getSettings(req, res) {
    try {
      const { token } = req.headers;
      const { id } = getIdFromAcessToken(token);

      const { settings } = await User.findOne({ _id: id });

      return res.status(200).json({ settings: settings });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "get settings error" });
    }
  }
  async getUser(req, res) {
    try {
      const { token } = req.headers;
      const { id } = getIdFromAcessToken(token);

      const {email, name, img, settings} = await User.findOne({ _id: id });
      const user = {
        email: email,
        name: name,
        img: img,
        settings: settings
      }

      return res.status(200).json({ user: user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "get user info error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find({});

      return res.status(200).json({ users: users });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "get users error" });
    }
  }
  async createTag(req, res) {
    try {
      const tags = [
        "Architecture",
        "History",
        "Art",
        "Technology",
        "Nature",
        "Sea",
        "Gothic",
        "Romanesque",
        "Classicism",
        "Baroque",
        "Sights",
        "Team Sports",
        "Walking",
      ];
      tags.forEach((_tag) => {
        const tag = new Tag({ tag: _tag });
        tag.save();
      });

      return res.status(200).json({ msg: "success" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "error" });
    }
  }
  async getTags(req, res) {
    try {
      const tags = await Tag.find({});

      res.status(200).json(tags);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "get tags error" });
    }
  }
  async getCountries(req, res) {
    try {
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "get countries error" });
    }
  }
  async deleteAccount(req, res) {
    try {
      const { token } = req.headers;
      const { id } = getIdFromAcessToken(token);
      const deletedUser = await User.findByIdAndDelete(id)
      res.status(200).json({msg: "success"})
    } catch (error) {
      res.status(400).json({ msg: "dalete account error" });
    }
  }
}

module.exports = new userRouter();
