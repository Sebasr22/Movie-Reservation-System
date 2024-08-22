'use strict';

const userRouter = require('./user.router');
const movieRouter = require('./movie.router');
const showtimeRouter = require('./showtime.router');

module.exports = (app) => {
  app.use(userRouter);
  app.use(movieRouter);
  app.use(showtimeRouter);
};