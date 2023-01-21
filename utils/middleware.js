let jwt = require('jsonwebtoken');
const Users = require('../models/user.model');
let checkToken = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.SECRET);

      let user = await Users.findOne({
        where: {
          email: decoded.email
        }, attributes: { exclude: ['password'] }
      });
      if (user.email === undefined) {
        throw "Token invalid";
      }
      console.log("users", user);
      req.user = user;
      next();
    } else {
      throw "No token";
    }
  } catch (error) {
    console.error(error);
    res.status(400);
    res.json({
      success: false,
      message: "Authentication failed",
      error
    });
  };
};

module.exports = {
  checkToken,
}