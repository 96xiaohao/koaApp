'use strict';

const _ = require('lodash');
const pool = require('../../db/db');
const assert = require('http-assert');

class GoodsService {

    static async insertGoods(title,marketPrice,shopPrice,promotionPrice,imgUrl,pressId,goodStype,inventory,name){

        assert(title, 400, "title need!");
        assert(marketPrice, 400, "marketPrice need!");
        assert(shopPrice, 400, "shopPrice need!");
        assert(promotionPrice, 400, "promotionPrice need!");
        assert(imgUrl, 400, "imgUrl need!");
        assert(pressId, 400, "pressId need!");
        assert(goodStype, 400, "goodStype need!");
        assert(inventory, 400, "inventory need!");
        assert(name, 400, "name need!");

        const sql = `insert into goods (title, "marketPrice", "shopPrice", "promotionPrice", "imgUrl", "pressId","goodStype",name) 
                    values ('${title}','${marketPrice}','${shopPrice}','${promotionPrice}','${imgUrl}','${pressId}','${goodStype}','${name}')`;

            try {
                const {rowCount} = await pool.query(sql);

                return rowCount
            }catch (err) {
                console.error("||Error->> |func:(insertGoods) errMessage:||",err);
                throw err
            }
    }

    static async insertGoodsVersion(diffPrice,version,stock,publishTime,goodsId){
        assert(diffPrice, 400, "diffPrice need!");
        assert(version, 400, "version need!");
        assert(stock, 400, "stock need!");
        assert(publishTime, 400, "publishTime need!");
        assert(goodsId, 400, "goodsId need!");

        const sql = `insert into version ("diffPrice", version, "publishTime", "goodsId", stock) values ('${diffPrice}','${version}',to_timestamp(${publishTime/1000}),'${goodsId}','${stock}')`

        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(insertGoodsVersion) errMessage:||",err);
            throw err
        }

    }

    static async getGoodsListBy(titleN,goodsTypeN){

        var sql = `select * from goods`;
        if (titleN) {
            sql = `select * from goods where title = '${titleN}'`
        }
        if(goodsTypeN){
            sql = `select * from goods where "goodStype" = '${goodsTypeN}'`
        }
        console.log(titleN,goodsTypeN)
        if (titleN && goodsTypeN) {
            sql = `select * from goods where title = '${titleN}' and "goodStype" = '${goodsTypeN}' `
        }
        console.log(sql)

        try {
            const {rows} = await pool.query(sql);

            return rows
        }catch (err) {
            console.error("||Error->> |func:(getGoodsListBy) errMessage:||",err);
            throw err
        }
    }

    /**
     * 根据商品id查询商品的基本信息
     */
    static async getGoodsById(id){

        assert(id, 400, "need id !")
        const sql = `select * from goods where id = '${id}'`;

        try {
            const {rows} = await pool.query(sql);

            return rows[0]
        }catch (err) {
            console.error("||Error->> |func:(getGoodsById) errMessage:||",err);
            throw err
        }

    }

    static async getVersionDataByGoodsId(id){
        assert(id, 400, "need id !");
        const sql = `select * from version where "goodsId" = '${id}'`;

        try {
            const {rows} = await pool.query(sql);

            return rows
        }catch (err) {
            console.error("||Error->> |func:(getVersionDataByGoodsId) errMessage:||",err);
            throw err
        }
    }

    static async updateGoodsPromotion(goodsId,promotionStartTime,promotionEndTime,promotionPrice){
        assert(goodsId, 400, "need goodsId");
        assert(promotionStartTime, 400, "need promotionStartTime");
        assert(promotionEndTime, 400, "need promotionEndTime");
        assert(promotionPrice, 400, "need promotionPrice");

        const sql = `update goods set 
            "promotionStartTime" = to_timestamp('${promotionStartTime/1000}'), 
            "promotionEndTime" = to_timestamp('${promotionEndTime/1000}'),
            "promotionPrice" = '${promotionPrice}'  where id = '${goodsId}'`;

        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(updateGoodsPromotion) errMessage:||",err);
            throw err
        }

    }
}

module.exports = GoodsService;