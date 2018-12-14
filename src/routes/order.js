'use strict'
const router = require('koa-router')();

const OrderController = require('../controllers/order/OrderController');


router.post('/add/one',OrderController.addOrderfromStore);
router.post('/add/shopcar',OrderController.addOrderFromCar);
router.post('/cancel/byuser',OrderController.delOrderByUser);


module.exports = router;