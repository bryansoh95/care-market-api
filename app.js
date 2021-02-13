const express = require('express');
const body_parser = require('body-parser');
const routes = require('./app/routes');

const app = express();

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(routes);

module.exports = app;