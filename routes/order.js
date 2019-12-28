var express = require('express');
var orderRouter = express.Router();
const order = require('../models/orderModel');
const bodyParser = require('body-parser');
orderRouter.use(bodyParser.json());
var auth = require('./auth');
/* GET users listing. */
orderRouter
.get('/', (req, res, next) => {
    const token = req.body.token;
    auth(token)
    .then((result)=>
    {
        order.find({})
        .then((dishes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .catch((err)=>
    {
        console.log(err.status);
    });
});

module.exports = orderRouter;