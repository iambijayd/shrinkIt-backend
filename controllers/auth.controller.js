const { User } = require("../models/users");
const { generateToken } = require("../service/auth");

async function handleSignUp(req, res) {
  let userData = req.body;
  await User.create({
    email: userData.email,
    password: userData.password,
    urls: [],
  });
  let userToken = generateToken(userData);
  res.cookie("__auth_token", userToken, { maxAge: 3600000, httpOnly: false });
  return res.status(201).json({ success: "SignUp Successful" });
}

async function handleLogIn(req, res) {
  let { email, password } = req.body;
  let user = await User.find({ email: `${email}`, password: `${password}` });
  if (!user.length) {
    res.status(404).json({ error: "Email or password didnot match" });
  } else {
    let userToken = generateToken(req.body);
    console.log(userToken);
    res.cookie("__auth_token", userToken, { maxAge: 3600000, httpOnly: false });
    res.status(200).json({ message: "LoggedIn Successfully" });
  }
}

module.exports = {
  handleSignUp,
  handleLogIn,
};
