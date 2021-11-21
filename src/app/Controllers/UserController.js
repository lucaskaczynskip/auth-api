const User = require('../Models/User');
const yup = require('yup');
const bcrypt = require('bcryptjs');

class UserController {
  async show(req, res) {
    const { id } = req.params;

    await User.findById(id).then((user) => {
      return res.status(200).json({
        error: false,
        user
      })
    })
    .catch(err => {
      return res.status(400).json({
        error: true,
        message: err
      })
    })
  }

  async index(req, res) {   
    await User.find().then((users) => {
      return res.status(200).json({
        error: false,
        users
      })
    })
    .catch(err => {
      return res.status(400).json({
        error: true,
        message: err
      })
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

  async update(req, res) {
    const { id } = req.params;

    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(400).json({
        error: true,
        message: "Id user not exists."
      })
    }

    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: false,
        message: "Invalid data."
      })
    }

    const { name, email, password } = req.body;

    let data = { name, email, password };
    data.password = await bcrypt.hash(data.password, 8);
    
    await User.findByIdAndUpdate(id, data).then(() => {
      return res.status(200).json({
        error: false,
        message: "User has been updated.",
        data
      })
    })
    .catch(err => {
      return res.status(400).json({
        error: true,
        message: err
      })
    })
  }

  async drop(req, res) {
    const { id } = req.params;

    await User.findByIdAndDelete(id)
      .then(user => {
        return res.status(200).json({
          error: false,
          message: "User has been deleted.",
          user: {
            name: user.name,
            email: user.email
          }
        })
      })
      .catch(err => {
        return res.status(400).json({
          error: false,
          message: err
        })
      })
  }
}

module.exports = new UserController();