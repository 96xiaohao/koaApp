'use strict';

const _ = require('lodash');
// const userOP = require('../../db/user');
const pool = require('../../db/db');
const assert = require('http-assert');


class UserService {
    /**
     * 添加新用户
     * @param phone
     * @param nickName
     * @returns {Promise<*>}
     */
    static async addUser(phone,nickName){
        assert(phone, 400, "phone need!");
        assert(nickName, 400, "nickName need!");

        const sql = `insert into "user"("phone","nickName") values ($1,$2)`

        try {
            const {rowCount} = await pool.query(sql,[phone,nickName]);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(addUser) errMessage:||",err);
            throw err
        }
    }

    /**
     * 更新用户数据
     * @param userId
     * @param userPhone
     * @param userName
     * @param carId
     * @param orderN
     * @returns {Promise<*>}
     */
    static async updateUser(userId,userPhone,userName,carId,orderN,password){
        assert(userId, 400, "userId need!");


        var sql = `update "user" set `;
        var sql3 = "";

        if (userPhone){
            sql3 = sql3 + `phone = '${userPhone}',`;
        }
        if (userName) {
            sql3 = sql3 + `"nickName" = '${userName}',`;
        }
        if (carId) {
            sql3 = sql3 + `"shopCartId" = '${carId}',`;
        }
        if (orderN) {
            sql3 = sql3 + `"orderId" = '${orderN}',`;
        }
        if (password) {
            sql3 = sql3 + `"password" = '${password}',`
        }

        sql3 = sql3.substring(0, sql3.lastIndexOf(','));

        const sql2 = ` where id = '${userId}'`;

        sql = sql + sql3 + sql2;
        try {
            const {rowCount} = await pool.query(sql);

            return rowCount
        }catch (err) {
            console.error("||Error->> |func:(updateUser) errMessage:||",err);
            throw err
        }
    }

    /**
     * 查询单个用户的数据
     * @param userId
     * @returns {Promise<*>}
     */
    static async selectUser(userId){
        assert(userId, 400, "userId need!");

        const sql = `select * from "user" where id = '${userId}'`;

        try {
            const {rows} = await pool.query(sql);

            return rows[0]
        }catch (err) {
            console.error("||Error->> |func:(selectUser) errMessage:||",err);
            throw err
        }
    }

    /**
     * 获取用户的列表
      * @returns {Promise<*>}
     */
    static async selectUserAll(){

        const sql = `select * from "user"`;

        try {
            const {rows} = await pool.query(sql);

            return rows
        }catch (err) {
            console.error("||Error->> |func:(selectUserAll) errMessage:||",err);
            throw err
        }
    }

    /**
     * 根据用户的手机号获取用户的信息
     * @param phone
     * @returns {Promise<void>}
     */
    static async selectUserByPhone(phone){
        assert(phone, 400, "phone need!");

        const sql = `select * from "user" where phone = '${phone}'`;

        try {
            const {rows} = await pool.query(sql);

            return rows[0]
        }catch (err) {
            console.error("||Error->> |func:(selectUserByPhone) errMessage:||",err);
            throw err
        }

    }


}
module.exports = UserService;