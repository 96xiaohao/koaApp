'use strict'

const router = require('koa-router')();
const Controller = require('../controllers');


router.prefix('/store');         //路由前缀


router.use('/user', require('./user').routes());      //加载用户xh子路由
router.use('/goods',require('./goods').routes());     //加载商品子路由
router.use('/shopcar',require('./shopCar').routes()); // 加载购物车子路由



// 一些公共路由
// router.get('/state', );


router.get('/a',(ctx,next) =>{
    console.log("hello");
});

router.get('/', function (ctx, next) {
    ctx.body="Hello Koa";
});





module.exports = router;