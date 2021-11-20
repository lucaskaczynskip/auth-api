const { Router } = require('express');

// Controllers
const UserController = require('./app/Controllers/UserController');

const routes = new Router();

routes.get('/user', UserController.show);

module.exports = routes;