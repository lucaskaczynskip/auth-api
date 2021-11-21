const { Router } = require('express');

// Controllers
const UserController = require('./app/Controllers/UserController');
const LoginController = require('./app/Controllers/LoginController');
const Authenticate = require('./app/Middlewares/Authenticate');

const routes = new Router();

// User routes
routes.get('/user', Authenticate, UserController.index);
routes.get('/user/:id', Authenticate, UserController.show);
routes.post('/user', UserController.store);
routes.delete('/user/:id', Authenticate, UserController.drop);
routes.put('/user/:id', Authenticate, UserController.update);

// Login route
routes.post('/login', LoginController.index);

module.exports = routes;