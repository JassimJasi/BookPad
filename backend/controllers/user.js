const {
  validateEmail,
  validateLength,
  validateUserName,
} = require("../helpers/validation");
const User = require("../models/User");
const Code = require("../models/Code");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const generateCode = require("../helpers/generateCode");

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
    sendVerificationEmail(user.email, user.first_name, url); //used to send verification file to mail

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
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);

    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation ",
      });
    }
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
    console.log("-->", error);
    res.status(500).json({ message: "Network Error" });
  }
};
//resend email verification code
exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id; //we get req/user.id from the authUser middlwares
    const user = await User.findById(id);
    if (user.verified === true) {
      return res.status(400).json({ message: "Account already activated" });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    ); //used to re-send verification file to mail
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res
      .status(200)
      .json({ message: "Email verification code has been send to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//find user
exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "Account does not exists." });
    }
    return res.status(200).json({ email: user.email, picture: user.picture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5); //to generate new code
    const saveCode = await new Code({
      code,
      user: user._id,
    }).save(); //adding to db
    sendResetCode(user.email, user.first_name, code);
    res.status(200).json({ message: "Reset code has been send to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const dbCode = await Code.findOne({ user: user._id });
    //console.log(dbCode.code, "----", code);
    if (dbCode.code !== code) {
      return res.status(400).json({
        message: "Verification code is wrong..",
      });
    }
    return res
      .status(200)
      .json({ message: "Reset code has been varified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//change password
exports.changePassword = async (req, res) => {
  const { email, password } = req.body;
  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate({ email }, { password: cryptedPassword });
  return res.status(200).json({ mesage: "Done" });
};

// get Profile
exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username }).select("-password");
    if (!profile) {
      return res.json({ ok: false });
    }
    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .sort({ createdAt: -1 });
    res.json({ ...profile.toObject(), posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to update profile
exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// to update Cover
exports.updateCover = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
