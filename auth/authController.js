const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { model } = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken")

const generateAcessToken = id => {
  return jwt.sign({id}, process.env.JWT_KEY)
}

class authRouter {
  async registration(req, res) {
    try {
      const { email, name, password } = req.body;

      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res.status(400).json({ msg: "user already exist" });
      }
      const salt = bcrypt.genSaltSync(5);
      const hashPassword = bcrypt.hashSync(password, salt);

      const user = new User({
        email: email,
        name: name,
        password: hashPassword,
      });
      user.save();

      const token = generateAcessToken(user._id)

      return res.status(200).json(token)
    } catch (error) {
      res.status(400).json({ msg: "registration error" });
      console.log(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "user not found" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ msg: "incorrect password" });
      }

      const token = generateAcessToken(user._id)

      return res.status(200).json({
        token: token
      })
    } catch (error) {
      res.status(400).json({ msg: "login error" });
      console.log(error);
    }
  }

}

module.exports = new authRouter();
