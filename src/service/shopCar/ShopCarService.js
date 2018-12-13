'use strict';

const _ = require('lodash');
const pool = require('../../db/db');
const assert = require('http-assert');


class ShopCarService {

    /**
     * 向购物车中添加商品
     * @param buyPrice
     * @param userId
     * @param goodsCount
     * @param goodsId
     * @param versionId
     * @returns {Promise<*>}
     */
    static async insertGoodsToCar(buyPrice,userId,goodsCount,goodsId,versionId){
        assert(buyPrice, 400, "buyPrice need !")
        assert(userId, 400, "userId need !")
        assert(goodsCount, 400, "goodsCount need !")
        assert(goodsId, 400, "goodsId need !")
        assert(versionId, 400, "versionId need !")

        const sql = `insert into shopping_cart ("buyPrice","userId", "goodsCount", "goodsId", "versionId") 
        values ('${buyPrice}','${userId}','${goodsCount}','${goodsId}','${versionId}')`;

        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(insertGoodsToCar) errMessage:||",err);
            throw err
        }

    }

    /**
     * 根据用户id获取购物车商品信息
     */
    static async getShopCarListByUserId(userId){
        assert(userId, 400, "userId need");

        const sql = `select g.name,"buyPrice",s."goodsCount",version,s."goodsId",s."versionId",s.id
                    from goods g join shopping_cart s on g.id = s."goodsId" 
                    join version v on s."versionId" = v.id 
                    where "userId" = '${userId}'`;

        try {
            const {rows} = await pool.query(sql);

            return rows
        }catch (err) {
            console.error("||Error->> |func:(getShopCarListByUserId) errMessage:||",err);
            throw err
        }

    }

    /**
     * 修改购物车中指定商品的购买数量或删除商品
     */
    static async editShopGoods(shopCarId,userId,goodsCountN){
        assert(shopCarId, 400, "shopCarId need !");
        assert(userId, 400, "userId need !");

        var sql = ""
        if (goodsCountN) {
            sql = `update shopping_cart set "goodsCount" = '${goodsCountN}' 
                    where id = '${shopCarId}' 
                  and "userId" = '${userId}'`;
        }else {
            sql = `delete from shopping_cart 
                    where id = '${shopCarId}' 
                    and "userId" = '${userId}'`;
        }

        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(insertGoodsToCar) errMessage:||",err);
            throw err
        }

    }


}

module.exports = ShopCarService;
