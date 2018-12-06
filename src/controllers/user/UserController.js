/**
 * 用户模块块控制器
 */

const UserService = require('../../service/user/UserService');

class UserController {
    /**
     * 添加用户
      * @param ctx
     * @returns {Promise<{}>}
     */
    static async addUser(ctx){
        //关于对象结构赋值的坑，被赋值的便令名和对象内部的对象的键名一致，就可以如第16行写，
        //否则必须指明变量名如 cosnt {id:userId,name: userName} 第56行
        const {userId,userName,userAge} = ctx.request.body;

        if (!userId || !userName || !userAge) throw new Error("请求信息不完整");

        let flag = await UserService.add(userId,userName,userAge);
        if (flag) return ctx.body = {};

        ctx.body = {
            status : 0,
            message : "添加用户成功",
            userMessage : ctx.request.body,
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
        const {id:userId, name:userName} = ctx.request.body;

        if (!userId || !userName) throw new Error("请求信息不完整")

        let flag = await UserService.update(userId,userName);
        if (flag) ctx.body = {};

        ctx.body = {
            status : 0,
            message : "更新用户成功",
            userMessage : ctx.request.body,
        }
    }

    /**
     * 查询用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    static async selectUser(ctx){
        const {id:userId} = ctx.query;

        if(!userId) throw new Error("请求数据不完整")

        let flag = await UserService.select(userId)
        if (flag) ctx.body = {}
        ctx.body = {
            status : 0,
            message : "查询用户成功",
            userMessage : ctx.query,
        }


    }

    /**
     * 用户登录
      * @param ctx
     * @returns {Promise<void>}
     */
    static async userLogin(ctx){
        const{id,username} = ctx.request.body;
        if(!id || !username) throw new Error("请求数据不完整");

        let flag = await UserService.select(userId)

        if (flag) ctx.body = {};

        ctx.session.user = username;

        ctx.body = {
            status : 0,
            message : "用户登录成功",
            userMessage : ctx.request.body,
        }
    }

    static async userLoginOut(ctx){
        const{id, username} = ctx.request.body;
        if(!id || !username) throw new Error("请求数据不完整");

        if (ctx.session.user == username){
                
        }



    }

}

module.exports = UserController;