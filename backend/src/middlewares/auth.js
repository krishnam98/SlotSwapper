const User = require("../models/User");
const jwtUtil = require("../Utils/jwt");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwtUtil.verify(token);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = auth;
