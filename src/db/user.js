'use strict';

const pool = require('./db');
const assert = require('http-assert');

class User{

    /**
     * 增加用户的方法
     * @param name
     * @param age
     * @returns {Promise<*>}
     */
    static async addUser(id,name,age){
        assert(id, 400, "need id~");
        assert(name, 400, "need name~");
        assert(age, 400, "need age~");

        let sql = `insert into public.user(id,username,user_age) values($1,$2,$3)`
        const {rowCount} = await pool.query(sql,[id,name,age]);

        return rowCount;
    }

    /**
     * 删除用户的方法
     * @param id
     * @returns {Promise<void>}
     */
    static async delUser(id){
        assert(id, 400, "id need~")

        let sql = `delete from public.user where id = $1`;
        const {rowCount} = await pool.query(sql,[id,]);

        return rowCount;

    }

    /**
     * 更新一个用户的方法
     * @param id
     * @param name
     * @param age
     * @returns {Promise<*>}
     */
    static async updateUser(id, name, age){
        assert(id, 400, "id need");
        assert(name, 400, "name need ");

        let sql = `update public.user set username = $1 where id = $2`;
        const{rowCount} = await pool.query(sql,[name,id]);

        return rowCount;
    }

    /**
     * 查找用户的方法
     * @param id
     * @returns {Promise<void>}
     */
    static async selectUser(id){
        assert(id ,400, "id need");

        let sql = `select * from public.user where id = $1`;
        const{rows} = pool.query(sql, [id,]);

        return rows;
    }
}





module.exports = User;

// {
//     "_types": {
//     "_types": {
//         "arrayParser": {}
//     },
//     "text": {},
//     "binary": {}
// },
//     "_arrayMode": false,
//     "command": "INSERT",
//     "rowCount": 1,
//     "fields": [],
//     "rows": []
// }