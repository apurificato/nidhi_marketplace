require('dotenv').config();
const { verify } = require('jsonwebtoken');
const { User } = require('../models');
const context = async ({ req, res }) => {
  // Parse JWT token from request cookies
  const token = req.cookies.token;
  console.log('token: '+ token)
  console.log(process.env.JWT_SECRET)
  if (token) {
      try {
          // Verify and decode the JWT token
          const decoded = verify(token, process.env.JWT_SECRET);
          // Get the user associated with the token
          const user = await User.findById(decoded.id);
          // Add the authenticated user to the context
          return { req, res, user };
      } catch (error) {
          console.error('Error parsing JWT token:', error.message);
      }
  }
  return {res};
}

module.exports = context
