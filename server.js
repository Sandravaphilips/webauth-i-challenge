const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const helmet = require('helmet');
const cors = require('cors');

const UsersRoutes =  require('./users/users-router');
const ApiRoutes = require('./api/api-routes')

const server = express();

const sessionConfig = {
  name: 'userSession',
  secret: 'make it a little long and keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, 
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require('./data/db-config'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/restricted', restricted, UsersRoutes);
server.use('/api', ApiRoutes);

function restricted(req, res, next) {
  if(req.session && req.headers.authorization) {
    next()
  }  else {
    res.status(400).json({ message: 'Please login and try again' })
  }
  
}

module.exports = server;
