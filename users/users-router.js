const express = require('express');
const bcrypt = require('bcryptjs')

const Users = require('./users-model.js');

const server = express.Router();

server.post('/api/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 15)
  const newUser = {
    username: req.body.username,
    password: hash,
  };

  Users.add(newUser)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Hello ${user.username}! Welcome to your profile` });
      } else {
        res.status(401).json({ message: 'Please check your credentials and try again' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


