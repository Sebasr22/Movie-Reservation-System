'use strict';

const userRouter = require('./user.router');
const movieRouter = require('./movie.router');

module.exports = (app) => {
  app.use(userRouter);
  app.use(movieRouter);
};