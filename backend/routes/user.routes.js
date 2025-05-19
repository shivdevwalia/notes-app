const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) res.send({ msg: "Something went wrong", err: err.message });
      else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "new user has been registered" });
      }
    });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "masai");
          let userReqID = user[0]._id;
          res.send({ msg: "Logged in", token: token, userID : userReqID });
        } else {
          res.send({ msg: "Something went wrong" });
        }
      });
    } else {
      res.send({ msg: "Wrong credentials" });
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err.message });
  }
});

module.exports = { userRouter };
