const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./users/users-model');
const helmet = require('helmet');
const cors = require('cors');
const UsersRoutes =  require('./users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/restricted', restricted, UsersRoutes);

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
    const {username, password} = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({message: `Hello ${user.username}! Now, you can view your profile`})
        } else {
          res.status(401).json({ message: 'Please check your credentials and try again' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      })
});

function restricted(req, res, next) {
    const {username, password} = req.headers
    
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Please check your credentials and try again' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      })
}

module.exports = server;
