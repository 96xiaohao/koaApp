'use strict';

const user = require('../db/user');
const _ = require('lodash');
const userOP = require('../db/user');

class UserService {

    /**
     * 添加用户
     * @param userId
     * @param userName
     * @param age
     * @returns {Promise<*>}
     */
    static async add(userId,userName,age){

        let res = userOP.addUser(userId,userName,age)
        return res
    }

    /**
     * 删除用户
     * @param userId
     * @returns {Promise<void>}
     */
    static async delete(userId){

        let res = userOP.delUser(userId);
        return res
    }

    /**
     * 更新用户
     * @param userId
     * @param userName
     * @returns {Promise<*>}
     */
    static async update(userId,userName){

        let res = userOP.updateUser(userId,userName);
        return res
    }

    /**
     * 查询用户
     * @param userId
     * @returns {Promise<void>}
     */
    static async select(userId){

        let res = userOP.selectUser(userId);
        return res
    }

}
module.exports = UserService;