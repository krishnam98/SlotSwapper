const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = process.env;

const sign = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

const verify = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { sign, verify };
