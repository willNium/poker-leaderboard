const mongoClient = require('mongodb').MongoClient;
const dbConnectionUrl = 'mongodb://localhost:27017/poker-leaderboard';

let _db;

module.exports = {
  connect: callback => {
    mongoClient.connect(dbConnectionUrl, function(err, db) {
      _db = db;
      return callback(err);
    });
  },
  getDb: () => _db
};

