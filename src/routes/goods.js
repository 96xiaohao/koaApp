'use strict'
const router = require('koa-router')();

const GoodsController = require('../controllers/goods/GoodsController');


router.post('/add',GoodsController.addGoods);
router.post('/version/add',GoodsController.addGoodsVersion);
router.get('/list',GoodsController.getGoodsList);
router.get('/data/version',GoodsController.getGoodsById);
router.post('/edit/promotion',GoodsController.editGoodsPromotion);






module.exports = router;