const jwt = require('jsonwebtoken');
const config = require('../../config/auth');
const { promisify } = require('util');

module.exports = async (req, res, next) {
  const auth = res.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Unauthorized action."
    })
  }

  const [, token] = auth.split(' ');

  try {
    const decode = await promisify(jwt.verify)(token, config.secret);

    if (!decode) {
      return res.status(401).json({
        error: true,
        code: 130,
        message: "Invalid token."
      })
    } else {
      req.user_id = decode.id;
      next();
    }
  } catch {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Expired token."
    })
  }
}