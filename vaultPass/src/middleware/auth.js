// this answers the question are you logged in

const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;