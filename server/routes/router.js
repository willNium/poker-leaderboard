const express = require('express');
const router = express.Router();
let ObjectID = require('mongodb').ObjectID;
const dbUtils = require('../db/db');
const db = dbUtils.getDb();

function prepPayoutsResponse(payouts) {
  return payouts.map(payout => {
    return prepPayoutResponse(payout)
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
  return players.map(player => {
    return prepPlayerResponse(player)
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
  if(payout.playerId === null ||
     payout.playerId === undefined ||
     payout.playerId === '')
  {
    throw Error("Player ID is required for payout.");
  }
}

function validatePlayer(player) {
  if(!player.firstName || !player.lastName)
  {
    throw Error("Player name is required.");
  }
}

function transformId(obj) {
  obj['id'] = obj._id;
  delete obj._id;
  return obj;
}

router.get('/players', function(req, res, next) {
  db.collection('players').find().toArray((err, players) => {
    let responseBody = prepPlayersResponse(players);
    res.status(200).json(responseBody);
  });
});

router.get('/player/:id', function(req, res, next) {
  let player = db.collection('players')
    .find({"_id": new ObjectID(req.params.id)})
    .toArray((err, player) => {
      let responseBody = prepPlayerResponse(player[0]);
      res.status(200).json(responseBody);
    })
});

router.put('/player/:id', function(req, res, next) {
  let player = db.collection('players')
    .findOneAndUpdate({"_id": new ObjectID(req.params.id)},
      {$set:
        {firstName: req.body.firstName,
         lastName: req.body.lastName}},
       {returnOriginal: false,
        upsert: true})
    .then( player => {
      let responseBody = prepPlayerResponse(player.value)
      res.status(200).json(responseBody);
    });
});

router.post('/player', function(req, res, next) {
  try {
    validatePlayer(req.body);
  } catch (err) {
    res.status(400).json(...err.message);
  }
  db.collection('players').insertOne(req.body);
  let responseBody = transformId(req.body);
  res.status(201).json(req.body);
});

router.post('/payout', function(req, res, next) {
  try {
    validatePayout(req.body);
  } catch (err) {
    res.status(400).json(...err.message);
  }
  db.collection('payouts').insertOne(req.body);
  let responseBody = transformId(req.body);
  res.status(201).json(req.body);
});

router.get('/payouts', function(req, res, next) {
  db.collection('payouts').find().toArray((err, payouts) => {
    let responseBody = prepPayoutsResponse(payouts);
    res.status(200).json(responseBody);
  });
});

router.get('/payouts/:id', function(req, res, next) {
  let player = db.collection('payouts')
    .find({"playerId": new ObjectID(req.params.id)})
    .toArray((err, payouts) => {
      let responseBody = prepPayoutsResponse(payouts);
      res.status(200).json(responseBody);
    })
});

module.exports = router;
