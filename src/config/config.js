var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'yeomanmongodb'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/miBaseDeDatosMongo',
    TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto",
    redisPort: 6379,
    redisHost: 'localhost'
  },

  test: {
    root: rootPath,
    app: {
      name: 'yeomanmongodb'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/yeomanmongodb-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'yeomanmongodb'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/yeomanmongodb-production'
  }
};

module.exports = config[env];
