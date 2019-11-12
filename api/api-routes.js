const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

const router = express.Router()

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.cookie = req.session.id;
          res.status(200).json({message: `Hello ${user.username}! Now, you can view your profile`, payload: req.cookie })
        } else {
          res.status(401).json({ message: 'Please check your credentials and try again' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      })
});

router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.json('you can not leave, actually')
        } else {
          res.json('goodbye, sad to see you go')
        }
      })
    } else {
      res.end();
    }
})

module.exports = router;