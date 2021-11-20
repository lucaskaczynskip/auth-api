const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');

class LoginController {
  async index(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        error: true,
        message: "User already exists."
      })
    }

    if (!(await bcrypt.compare(password ,userExists.password))) {
      return res.status(400).json({
        error: true,
        message: "Email or password incorrect."
      })
    }

    return res.status(200).json({
      error: false,
      user: {
        name: userExists.name,
        email: userExists.email,
      },
      token: jwt.sign(
        { id: userExists._id }, 
        config.secret, 
        { expiresIn: config.expireIn }
      )
    })
  }
}

module.exports = new LoginController();