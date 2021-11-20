const mongoose = require('mongoose');

class Connection {
  constructor() {
    this.connectionMongoDB();
  }

  connectionMongoDB() {
    this.mongoDBConnection = mongoose.connect("mongodb://localhost/auth-api", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then()
    .catch((error) => console.log(error))
  }
}

module.exports = new Connection();