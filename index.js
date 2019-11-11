const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const UsersRoutes =  require('./users/users-router');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/', UsersRoutes);

app

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
