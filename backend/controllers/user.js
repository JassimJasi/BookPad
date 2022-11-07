const {
  validateEmail,
  validateLength,
  validateUserName,
} = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "invalid email address" });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists,try with different email address",
      });
    }
    if (!validateLength(password, 6, 100)) {
      return res
        .status(400)
        .json({ message: "password must be altleat 6 characters" });
    }
    if (!validateLength(first_name, 6, 30)) {
      return res
        .status(400)
        .json({ message: "first name must between 6 and 30 characters" });
    }
    if (!validateLength(last_name, 6, 30)) {
      return res
        .status(400)
        .json({ message: "last name must between 6 and 30 characters" });
    }
    //encrpting password
    const cryptedPassword = await bcrypt.hash(password, 12);
    console.log(cryptedPassword);

    //unque username
    let tempUsername = first_name + last_name;
    let newUsername = await validateUserName(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success, Please activate your email to start",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//activate account
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "this email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been activated successfully..." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//loging
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "This email address is not found" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "invalid credentials   " });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      //message: "Login Success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.auth = (req, res) => {
  res.json("hello");
};
