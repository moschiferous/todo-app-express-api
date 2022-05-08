require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todo');
app.use('/', usersRouter);
app.use('/todo', todoRouter);

module.exports = app;