'use strict';

var mongoClient = require('mongodb').MongoClient;
var dbConnectionUrl = 'mongodb://localhost:27017/poker-leaderboard';

var _db = void 0;

module.exports = {
  connect: function connect(callback) {
    mongoClient.connect(dbConnectionUrl, function (err, db) {
      _db = db;
      console.log('connected to mongo');
      return callback(err);
    });
  },
  getDb: function getDb() {
    return _db;
  }
};