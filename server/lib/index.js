'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var dbUtils = require('./db/db');

dbUtils.connect(function (err) {
  var server = express();
  var router = require('./routes/router');

  server.use(cors());
  server.use(bodyParser.urlencoded());
  server.use(bodyParser.json());
  server.use('/', router);

  server.listen(5000);
});