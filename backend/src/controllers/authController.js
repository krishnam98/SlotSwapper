const User = require("../models/User");
const jwtUtil = require("../Utils/jwt");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = new User({ name, email, password });
  await user.save();
  const token = jwtUtil.sign(user);
  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //   console.log(user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwtUtil.sign(user);
  res.status(200).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
};
