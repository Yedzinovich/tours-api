const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// 1) middlewares
app.use(morgan('dev'));

app.use(express.json()); //middleware middle of req and res

app.use((req, res, next) => {
    console.log('hello');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);  
  
module.exports = app;

