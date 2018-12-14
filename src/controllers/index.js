'use strict'
/*
控制器调度入口，只调度，不做逻辑处理
 */
const User = require('./user/index');
const Goods = require('./goods/index');
const shopCar = require('./shopCar/index');
const order = require('./order/index');

module.exports = {
    User,
    Goods,
    shopCar,
    order
}
