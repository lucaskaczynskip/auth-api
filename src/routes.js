const { Router } = require('express');

// Controllers
const UserController = require('./app/Controllers/UserController');
const LoginController = require('./app/Controllers/LoginController');

const routes = new Router();

// User routes
routes.get('/user', UserController.show);
routes.post('/user', UserController.store);

// Login route
routes.post('/login', LoginController.index);

module.exports = routes;