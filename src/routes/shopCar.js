'use strict'
const router = require('koa-router')();

const ShopCarContorller = require('../controllers/shopCar/ShopCarController');

router.post('/add/goods',ShopCarContorller.addGoodsToCar);
router.get('/list',ShopCarContorller.getShopCarListByUserId);
router.post('/del',ShopCarContorller.editShopCarGoods);



module.exports = router;