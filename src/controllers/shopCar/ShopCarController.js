/**
 * 购物车模块块控制器
 */

const ShopCarService = require('../../service/shopCar/ShopCarService');
const UserService = require('../../service/user/UserService');
const GoodsService = require('../../service/goods/GoodsService');

class ShopCarController {

    /**
     * 向购物车中添加商品
     */
    static async addGoodsToCar(ctx){
        const {buyPrice} = ctx.request.body;
        const {userId} = ctx.request.body;
        const {goodsCount} = ctx.request.body;
        const {goodsId} = ctx.request.body;
        const {versionId} = ctx.request.body;

        if (!buyPrice || !userId || !goodsCount || !goodsId|| !versionId) throw new Error("请求数据缺失");

        const user = await UserService.selectUser(userId);
        if (!user) throw new Error("用户不存在")

        const goods = await GoodsService.getGoodsById(goodsId);
        if (!goods) throw new Error("所选商品不存在")

        const flag = await ShopCarService.insertGoodsToCar(buyPrice,userId,goodsCount,goodsId,versionId)

        if (flag != 1) throw new Error("商品加入购物车失败")

        ctx.body = {
            "status" : 0,
            "message" : "商品加入购物车成功"
        }
    }

    /**
     * 拉取购物车详情
     */
    static async getShopCarListByUserId(ctx){

        const {userId} = ctx.query;

        if (!userId) throw new Error("请求参数缺失！");

        const user = await UserService.selectUser(userId);

        if (!user)  throw new Error("该用户不存在");

        /*
        根据要户id获取到用户购物车中的商品信息（加入购物车时的价格，商品名称，商品型号，商品数量）
         */
        const goodsData = await ShopCarService.getShopCarListByUserId(userId);

        if (!goodsData) throw new Error("拉取购物车信息失败！")

        ctx.body = {
            "status" : 0,
            "message" : "拉取购物车信息成功",
            "data" : goodsData
        }
    }

    /**
     * 操作购物车，删除或者修改商品数量
     * @param ctx
     * @returns {Promise<void>}
     */
    static async editShopCarGoods(ctx){
        const {shopCarId} = ctx.request.body;
        const {userId} = ctx.request.body;
        const {goodsCount} = ctx.request.body;

        const goodsCountN = goodsCount ? goodsCount : "";

        console.log(shopCarId,userId);
        if (!userId || !shopCarId) throw new Error("请求数据缺失");

        const user = await UserService.selectUser(userId);
        if (!user) throw new Error("用户不存在");


        const flag = await ShopCarService.editShopGoods(shopCarId,userId,goodsCountN);

        if (flag != 1) throw new Error("操作购物车商品失败");

        ctx.body = {
            "status" : 0,
            "message" : "操作购物车商品成功",
        }
    }




}

module.exports = ShopCarController;

