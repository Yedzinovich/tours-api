const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globarErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) middlewares
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globarErrorHandler);

module.exports = app;
