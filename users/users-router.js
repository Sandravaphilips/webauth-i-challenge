const express = require('express');
// const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const router = express.Router();

router.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.json(err));
});

module.exports = router;
