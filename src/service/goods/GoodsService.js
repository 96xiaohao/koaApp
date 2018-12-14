'use strict';

const _ = require('lodash');
const pool = require('../../db/db');
const assert = require('http-assert');

class GoodsService {

    /**
     * 添加商品
     * @param title
     * @param marketPrice
     * @param shopPrice
     * @param promotionPrice
     * @param imgUrl
     * @param pressId
     * @param goodStype
     * @param inventory
     * @param name
     * @returns {Promise<*>}
     */
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

    /**
     * 为商品添加版本信息
     * @param diffPrice
     * @param version
     * @param stock
     * @param publishTime
     * @param goodsId
     * @returns {Promise<*>}
     */
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

    /**
     * 获取商品列表
     * @param titleN
     * @param goodsTypeN
     * @returns {Promise<*>}
     */
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

    /**
     * 根据商品id获得商品的所有版本信息
     * @param id
     * @returns {Promise<*>}
     */
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

    /**
     * 更新商品的促销信息
     * @param goodsId
     * @param promotionStartTime
     * @param promotionEndTime
     * @param promotionPrice
     * @returns {Promise<*>}
     */
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

    /**
     * 根据用户id,商品id,版本id,获取商品的详细信息
     */
    static async getGoodsNT(userId,goodsId,versionId){
        assert(userId, 400, "userId need！");
        assert(goodsId, 400, "goodsId need！");
        assert(versionId, 400, "versionId need！");

        const sql = `select name,title,version from
                    goods g join version v on g.id = v."goodsId"
                    JOIN shopping_cart s on s."versionId" = v.id
                    where "userId" = '${userId}'
                    and g.id = '${goodsId}'
                    and v.id = '${versionId}'`;

        try {
            const {rows} = await pool.query(sql);

            return rows[0]
        }catch (err) {
            console.error("||Error->> |func:(getGoodsNT) errMessage:||",err);
            throw err
        }

        // return pool.query(
        //     `select name,title,version from
        //              goods g join version v on g.id = v."goodsId"
        //              JOIN shopping_cart s on s."versionId" = v.id
        //              where "userId" = '${userId}'
        //              and g.id = '${goodsId}'
        //              and v.id = '${versionId}'
        //  `).then(reslut => reslut.rows);

    }
}

module.exports = GoodsService;