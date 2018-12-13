/**
 * 商品模块块控制器
 */
const GoodsService = require('../../service/goods/GoodsService');
const Crypto = require('../../lib/cryptoLib');

class GoodsController {
    /**
     * 向商品表中添加商品
     */
    static async addGoods(ctx){

        const {title} = ctx.request.body;
        const {marketPrice} = ctx.request.body;
        const {shopPrice} = ctx.request.body;
        const {promotionPrice} = ctx.request.body;
        const {imgUrl} = ctx.request.body;
        const {pressId} = ctx.request.body;
        const {goodStype} = ctx.request.body;
        const {inventory} = ctx.request.body;
        const {name} = ctx.request.body;

        const flag = await GoodsService.insertGoods(title,marketPrice,shopPrice,promotionPrice,imgUrl,pressId,goodStype,inventory,name)

        if (flag != 1){
            return ctx.body = {};
        } else {
            ctx.body = {
                status : 0,
                message : "添加商品成功",
            }
        }
    }


    /**
    获取所有列表全部，根据类型，根据标题，
     */
    static async getGoodsList(ctx){
        const {title} = ctx.query;
        const {goodsType} = ctx.query;

        const titleN = title ? title : "";
        const goodsTypeN = goodsType ? goodsType : "";

        console.log(title,goodsType)
        const result = await GoodsService.getGoodsListBy(titleN,goodsTypeN);

        if (result.length == 0)ctx.body = {};

        ctx.body = {
            "status" : 0,
            "message" : "获取商品列表成功",
            "data" : result
        }
    }

    /**
     * 根据商品id 查看商品详情
     */
    static async getGoodsById(ctx){

        const {id} = ctx.query;

        if (!id) throw new Error('缺少请求参数')

        const goodsData = await GoodsService.getGoodsById(id)
        if (!goodsData) throw new Error("该商品不存在");

        const versionData = await GoodsService.getVersionDataByGoodsId(id);
        if(!versionData) throw new Error("获取该商品版本信息失败")
        goodsData["versionArry"] = versionData

        ctx.body = {
            "status" : 0,
            "message" : "获取商品详情成功",
            "data" : goodsData
        }

    }

    /**
     * 设置商品的促销开始时间和促销结束时间,以及促销价格
     * 促销时间段：2019-1-1 00：00：00 - 2019-1-1 24:00:00
     */
    static async editGoodsPromotion(ctx){
        const {goodsId} = ctx.request.body;
        const {promotionStartTime} = ctx.request.body;
        const {promotionEndTime} = ctx.request.body;
        const {promotionPrice} = ctx.request.body;

        if(!goodsId||!promotionStartTime||!promotionEndTime||!promotionPrice)throw new Error("缺少请求数据");

        const flag = await GoodsService.updateGoodsPromotion(goodsId,promotionStartTime,promotionEndTime,promotionPrice)

        if (flag != 1) throw new Error("设置促销信息失败")

        ctx.body = {
            "status" : 0,
            "message" : "设置促销信息成功"
        }

    }

    /**
     * 修改商品的库存
      */

    /**
     * 添加商品的版本信息
     */

    static async addGoodsVersion(ctx) {
        const {goodsId} = ctx.request.body;
        const {versionArry} = ctx.request.body;
        console.log(goodsId)
        console.log(versionArry)
        if(!goodsId || !versionArry ) throw new Error("缺少请求数据");

        versionArry.forEach(async version =>{
           var flag = await GoodsService.insertGoodsVersion(version["diffPrice"],version["version"],version["stock"],version["publishTime"],goodsId)
        });

        ctx.body = {
            "status" : 0,
            "message" : "添加商品版本信息成功",
        };








    }

}

module.exports = GoodsController;