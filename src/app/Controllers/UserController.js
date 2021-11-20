const User = require('../Models/User');
const yup = require('yup');
const bcrypt = require('bcryptjs');

class UserController {
  show(req, res) {
    res.status(200).json({
      message: 'Here'
    })
  }

  async store(req, res) {
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Invalid data."
      })
    }

    const { name, email, password } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        error: true,
        message: "User already exists."
      })
    }

    const data = { name, email, password };
    data.password = await bcrypt.hash(data.password, 8);

    const user = User.create(data, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: err
        })
      }

      res.status(200).json({
        error: false,
        message: "Successfully registered user.",
        user: {
          ...data
        }
      })
    })

    return user;
  }
}

module.exports = new UserController();