var express = require('express');
var dishRouter = express.Router();
const order = require('../models/orderModel');
const bodyParser = require('body-parser');
dishRouter.use(bodyParser.json());

/* GET users listing. */
dishRouter
.post('/',(req, res, next) => {
  order.create(req.body)
  .then((dish) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dish);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.get('/count', (req, res, next) => {
  order.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes.length);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;
