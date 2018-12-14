'use strict';

const _ = require('lodash');
const pool = require('../../db/db');
const assert = require('http-assert');


class OrderService {

    /**
     * 向订单表中插入数据
     */
    static async insertOrder(goodsCount,paymentPrice,userId,goodsId,versionId){

        assert(goodsCount, 400, "goodsCount need !");
        assert(paymentPrice, 400, "paymentPrice need !");
        assert(userId, 400, "userId need !");
        assert(goodsId, 400, "goodsId need !");
        assert(versionId, 400, "versionId need !")

        const sql = `insert into "order" ("goodsCount", "paymentPrice", "userId", "goodsId", "versionId") 
                    values ('${goodsCount}','${paymentPrice}','${userId}','${goodsId}','${versionId}')`;

        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(insertOrder) errMessage:||",err);
            throw err
        }
    }

    /**
     * 减少被结算商品的库存信息
     */

    static async updateGoodsStock(goodsId,versionId,goodsCount){
        assert(goodsId, 400, "goodsId need !");
        assert(versionId, 400, "versionId need !");
        assert(goodsCount, 400, "goodsCount need !");

        const sql =  `update version set stock = stock - ${goodsCount} where id = '${versionId}' and "goodsId" = '${goodsId}';`

        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(updateGoodsStock) errMessage:||",err);
            throw err
        }

    }

    /**
     * 根据roderId删除对应订单
     */
    static async delOrderBy(orderId,userId){
        assert(orderId, 400, 'orderId need');
        assert(userId, 400, 'userId need');


        const sql = `delete from "order" where id = '${orderId}' and "userId" = '${userId}'`;

        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(delOrderBy) errMessage:||",err);
            throw err
        }
    }

    /**
     * 增加某个商品型号的库存
     */
    static async updateGoodsStockAdd(goodsId,versionId,goodsCount){

        assert(goodsId, 400, "goodsId need !");
        assert(versionId, 400, "versionId need !");
        assert(goodsCount, 400, "goodsCount need !");

        const sql =  `update version set stock = stock + ${goodsCount} where id = '${versionId}' and "goodsId" = '${goodsId}';`;

        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(updateGoodsStockAdd) errMessage:||",err);
            throw err
        }
    }

    /*
    根据订单id查询订单
     */
    static async getOrderbyId(id){
        assert(id, 400, "id need")

        const sql = `select * from "order" where id = '${id}'`;

        try {
            const {rows} = await pool.query(sql);

            return rows[0]
        }catch (err) {
            console.error("||Error->> |func:(getOrderbyId) errMessage:||",err);
            throw err
        }

    }
}

module.exports = OrderService;