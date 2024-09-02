'use strict';

const userRouter = require('./user.router');
const movieRouter = require('./movie.router');
const showtimeRouter = require('./showtime.router');
const seatRouter = require('./seat.router');
const reservationRouter = require('./reservation.router');

module.exports = (app) => {
  app.use(userRouter);
  app.use(movieRouter);
  app.use(showtimeRouter);
  app.use(seatRouter);
  app.use(reservationRouter);
};