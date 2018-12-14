/**
 * 购物车模块块控制器
 */

const ShopCarService = require('../../service/shopCar/ShopCarService');
const UserService = require('../../service/user/UserService');
const GoodsService = require('../../service/goods/GoodsService');
const OrderService = require('../../service/order/OrderService');
const pool = require('../../db/db');
const _ = require('lodash');
const bluebird = require('bluebird');
const co = require('co');



class OrderController {

    /**
     * 从单个商城直接结算，生成单个商品订单入库，同时返回商品信息和结算价格，同时对应商品版本表中对应版本库存量修改
     */

    static async addOrderfromStore(ctx){
        const {goodsId} = ctx.request.body;
        const {paymentPrice} = ctx.request.body;
        const {goodsCount} = ctx.request.body;
        const {versionId} =  ctx.request.body;
        const {userId} = ctx.request.body;

        if (!goodsId || !paymentPrice || !goodsCount || !versionId || !userId ) {
            throw new Error("请求数据缺失")
        }

        //PG事务开启，使用完释放
        const db = await pool.connect();

        try {
            await db.query('BEGIN');

            await OrderService.insertOrder(goodsCount,paymentPrice,userId,goodsId,versionId);

            await OrderService.updateGoodsStock(goodsId,versionId,Number(goodsCount));

            await db.query('COMMIT');

        } catch (err) {
            await db.query('ROLLBACK');
            throw err;
        } finally {
            db.release()
        }


        ctx.body = {
            "status" : 0,
            "message" : "生成订单成功",
        }

    }

    /**
     * 从购物车结算，接受参数userId和购物车中要结算的商品信息和多个商品的总价，
     * 订单状态默认未支付同时对应商品版本表中对应版本库存量修改，同时从购车中删除商品
     */

    static async addOrderFromCar(ctx){
        const {userId} = ctx.request.body;
        const {shopCarArry} = ctx.request.body;

        if (!userId || !shopCarArry) throw new Error("请求数据缺失");

        //PG事务开启，使用完释放
        const db = await pool.connect();

        _.forEach(shopCarArry, async goodsData =>{
            try {

                await db.query('BEGIN');
                await OrderService.insertOrder(goodsData["goodsCount"],goodsData["paymentPrice"],userId,goodsData["goodsId"],goodsData["versionId"]);
                await OrderService.updateGoodsStock(goodsData["goodsId"],goodsData["versionId"],Number(goodsData["goodsCount"]));
                await db.query('COMMIT');

            } catch (err) {
                await db.query('ROLLBACK');
                throw err;
            }
            /*
            finally {
                db.release()
            }
             */

        });

        // const data = shopCarArry.map( async goodsData =>{
        //     const goods = await GoodsService.getGoodsNT(userId,goodsData["goodsId"],goodsData["versionId"]);
        //
        //     return _.assignIn(goodsData,goods);
        // });

        // const a = bluebird.map(shopCarArry,async goodsData =>{
        //         const goods = await GoodsService.getGoodsNT(userId,goodsData["goodsId"],goodsData["versionId"]);
        //
        //         return _.assignIn(goodsData,goods);
        // });


        /*
        reduce 语法实现
        total    必需。初始值, 或者计算结束后的返回值。
        currentValue    必需。当前元素
        currentIndex    可选。当前元素的索引
        arr    可选。当前元素所属的数组对象。
        */
        const sumPrice = shopCarArry.reduce( (total, currentValue, currentIndex, arr) =>{
            return total + Number(currentValue.paymentPrice);
        }, 0);

        const res = {};
        res["sumPrice"] = sumPrice;
        res["orderData"] = shopCarArry;

        ctx.body = {
            "status" : 0,
            "message" : "购物车生成订单成功",
            "data" : res
        }

    }

    /**
     * 点击付款按，钮获得支付成功信息后，修改商品状态为待发货
     */

    /**
     * 查询待支付订单，判断所有待支付订单的创建时间距离现在的时间，如果超过30分钟，删除订单，同时对应型号库存修改
     */

    /**
     * 取消订单，一个商品一个订单，单个商品取消，同时修改库存
     */

    static async delOrderByUser(ctx){

        const {orderId} = ctx.request.body;
        const {goodsId} = ctx.request.body;
        const {versionId} =  ctx.request.body;
        const {userId} = ctx.request.body;
        const {goodsCount} = ctx.request.body;

        if (!orderId || !goodsId || !versionId || !userId ||!goodsCount ) {
            throw new Error("请求数据缺失")
        }

        const order = await OrderService.getOrderbyId(orderId);

        if (!order) throw new Error("订单不存在");

        //PG事务开启，使用完释放
        const db = await pool.connect();

        try {

            await db.query('BEGIN');
            await OrderService.delOrderBy(orderId,userId);
            await OrderService.updateGoodsStockAdd(goodsId,versionId,Number(goodsCount));
            await db.query('COMMIT');

        } catch (err) {
            await db.query('ROLLBACK');
            throw err;
        } finally {
            db.release()
        }

        ctx.body = {
            "status" : 0,
            "message" : "取消订单成功"
        }

    }




}

module.exports = OrderController;