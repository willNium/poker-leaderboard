'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var dbUtils = require('../db/db');
var db = dbUtils.getDb();

console.log(ObjectID);

function prepPayoutsResponse(payouts) {
  return payouts.map(function (payout) {
    return prepPayoutResponse(payout);
  });
};

function prepPayoutResponse(payout) {
  return {
    id: payout._id,
    playerId: payout.playerId || '',
    amount: payout.amount || ''
  };
};

function prepPlayersResponse(players) {
  return players.map(function (player) {
    return prepPlayerResponse(player);
  });
};

function prepPlayerResponse(player) {
  return {
    id: player._id,
    firstName: player.firstName || '',
    lastName: player.lastName || '',
    photo: player.photo || ''
  };
};

function validatePayout(payout) {
  if (payout.playerId === null || payout.playerId === undefined || payout.playerId === '') {
    throw Error("Player ID is required for payout.");
  }
}

function validatePlayer(player) {
  if (!player.firstName || !player.lastName) {
    throw Error("Player name is required.");
  }
}

function transformId(obj) {
  obj['id'] = obj._id;
  delete obj._id;
  return obj;
}

router.get('/players', function (req, res, next) {
  db.collection('players').find().toArray(function (err, players) {
    var responseBody = prepPlayersResponse(players);
    res.status(200).json(responseBody);
  });
});

router.get('/player/:id', function (req, res, next) {
  console.log(req.params.id);
  var player = db.collection('players').find({ "_id": new ObjectID(req.params.id) }).toArray(function (err, player) {
    var responseBody = prepPlayerResponse(player[0]);
    res.status(200).json(responseBody);
  });
});

router.put('/player/:id', function (req, res, next) {
  console.log(req.params.id);
  var player = db.collection('players').findOneAndUpdate({ "_id": new ObjectID(req.params.id) }, { $set: { firstName: req.body.firstName,
      lastName: req.body.lastName } }, { returnOriginal: false,
    upsert: true }).then(function (player) {
    console.log(player);
    var responseBody = prepPlayerResponse(player.value);
    res.status(200).json(responseBody);
  });
});

router.post('/player', function (req, res, next) {
  try {
    validatePlayer(req.body);
  } catch (err) {
    var _res$status;

    (_res$status = res.status(400)).json.apply(_res$status, _toConsumableArray(err.message));
  }
  db.collection('players').insertOne(req.body);
  var responseBody = transformId(req.body);
  res.status(201).json(req.body);
});

router.post('/payout', function (req, res, next) {
  try {
    validatePayout(req.body);
  } catch (err) {
    var _res$status2;

    (_res$status2 = res.status(400)).json.apply(_res$status2, _toConsumableArray(err.message));
  }
  db.collection('payouts').insertOne(req.body);
  var responseBody = transformId(req.body);
  res.status(201).json(req.body);
});

router.get('/payouts', function (req, res, next) {
  db.collection('payouts').find().toArray(function (err, payouts) {
    var responseBody = prepPayoutsResponse(payouts);
    res.status(200).json(responseBody);
  });
});

router.get('/payouts/:id', function (req, res, next) {
  console.log(req.params.id);
  var player = db.collection('payouts').find({ "playerId": new ObjectID(req.params.id) }).toArray(function (err, payouts) {
    var responseBody = prepPayoutsResponse(payouts);
    res.status(200).json(responseBody);
  });
});

module.exports = router;