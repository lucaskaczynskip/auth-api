class UserController {
  show(req, res) {
    res.status(200).json({
      message: 'Here'
    })
  }
}

module.exports = new UserController();