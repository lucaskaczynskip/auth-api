const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const routes = require('./routes');

require('./config/connection');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));

    this.app.use((req, res, next) => {
      res.header("Acess-Controll-Allow-Origin", "*");
      res.header("Acess-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Acess-Controll-Allow-Headers", "Acess, Content-type, Authorization, Acept, Origin, X-Requested-With");

      this.app.use(cors());
      next();
    })
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;