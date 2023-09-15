const express = require('express');
const user = require('../routes/user');

module.exports = function(app) {
  app
    .use(express.json())
    .use('/user', user)
}