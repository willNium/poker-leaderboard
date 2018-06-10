const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
const dbUtils = require('./db/db');

dbUtils.connect((err) => {
  const server = express();
  const router = require('./routes/router');

  server.use(cors())
  server.use(bodyParser.urlencoded())
  server.use(bodyParser.json())
  server.use('/', router);

  server.listen(5000)
})
