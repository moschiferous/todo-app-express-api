require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

var authRouter = require('./routes/auth');
var todoRouter = require('./routes/todo');
app.use('/', authRouter);
app.use('/todo', todoRouter);

module.exports = app;