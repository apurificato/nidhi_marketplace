require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
  } catch (err) {
    console.error(err);
  }

  next();
};

module.exports = authMiddleware;