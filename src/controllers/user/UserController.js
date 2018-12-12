/**
 * 用户模块块控制器
 */

const UserService = require('../../service/user/UserService');
const Crypto = require('../../lib/cryptoLib');
class UserController {
    /**
     * 添加用户
      * @param ctx
     * @returns {Promise<{}>}
     */
    static async addUser(ctx){
        //关于对象结构赋值的坑，被赋值的便令名和对象内部的对象的键名一致，就可以如第16行写，
        //否则必须指明变量名如 cosnt {id:userId,name: userName} 第56行
        const {nickName,phone} = ctx.request.body;

        if (!nickName || !phone) throw new Error("请求信息不完整");
        let flag = await UserService.addUser(phone,nickName);

        if (flag != 1) return ctx.body = {};

        ctx.body = {
            status : 0,
            message : "添加用户成功",
        }
    }

    /**
     * 删除用户
     * @param ctx
     * @returns {Promise<void>}
     */
    static async delUser(ctx){
        const {id: userId} = ctx.request.body;  //注意只有一个数时，用解析赋值要指定字段

        if (!userId) throw new Error("请求信息不完整")

        let flag = await UserService.delete(userId)
        if (flag) ctx.body = {}

        ctx.body = {
            status : 0,
            message : "删除用户成功",
            userMessage : ctx.request.body,
        }
    }

    /**
     * 修改用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    static async updateUser(ctx){
        const {id} = ctx.request.body;
        const {phone} = ctx.request.body;
        const {nickName} = ctx.request.body;
        const {shopCartId} = ctx.request.body;
        const {orderId} = ctx.request.body;
        var {password} = ctx.request.body;

        const userPhone = phone ? phone : "";
        const userName = nickName ? nickName : "";
        const carId = shopCartId ? shopCartId : "";
        const orderN = orderId ? orderId : "";

        //对密码进行特殊处理
        if(password){
            password = Crypto.getSha1(password);

            const user = await UserService.selectUser(id);
            if (!user) throw new Error("用户不存在");

            const dbpass = user['password'];

            if (password == dbpass) throw new Error("不能使用原密码，请更换")

        }else {
            password = ""
        }

        let flag = await UserService.updateUser(id,userPhone,userName,carId,orderN,password);

        if (flag != 1) {
            ctx.body = {}
        }else {
            ctx.body = {
                status : 0,
                message : "更新用户成功",
            }
        }


    }

    /**
     * 查询用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getUser(ctx){
        const {userId} = ctx.query;

        let result = await UserService.selectUser(userId);

        if (!result){
            ctx.body = {}
        } else {
            ctx.body = {
                status : 0,
                message : "查询单个用户成功",
                data : result
            }
        }
    }

    /**
     * 拉取所有用户的列表
     * @param ctx
     * @returns {Promise<void>}
     */
    static async getUserList(ctx){

        let result = await UserService.selectUserAll();

        if (result.length == 0){
            ctx.body = {}
        } else {
            ctx.body = {
                status : 0,
                message : "获取用户列表成功",
                data : result
            }
        }
    }

    /**
     * 用户登录
     * @param ctx
     * @returns {Promise<void>}
     */
    static async userLogin(ctx){
        const{phone} = ctx.request.body;
        const{password} = ctx.request.body;

        if(!password || !phone) throw new Error("请求数据不完整");

        if(ctx.session.userPhone == phone) throw new Error("您已登录，请不要重复登录");


        let result = await UserService.selectUserByPhone(phone);

        if (!result) throw new Error("用户不存在");
        const dbPassword = result['password'];

        const passwordN = Crypto.getSha1(password);

        if (dbPassword != passwordN){
            ctx.body = {}
        }else {
            ctx.session.userPhone = phone;
            ctx.body = {
                status : 0,
                message : "用户登录成功",
            }
        }


    }




    static async userLoginOut(ctx){
        const{phone} = ctx.request.body;

        if(!phone) throw new Error("请求数据不完整");

        const user = await UserService.selectUserByPhone(phone);

        if (!user) throw new Error("用户不存在");

        if (ctx.session.userPhone) {
            ctx.session.userPhone = ''
        }
        ctx.body = {
            status : 0,
            message : "用户登录注销",
        }
    }

}

module.exports = UserController;