/**
 * @description Banner模块连接数据库，初始化路由入口文件
 */

'use strict';
/**
 * mongoose模块注入
 * @type {*|Mongoose}
 */
const mongoose = require('mongoose');
const config = require('./config/config');

/**
 * Banner 构造器
 * @returns {Promise<*|KoaRouter>}
 */
module.exports = async () => {
    /**
     * 获取公共存贮空间
     */
    const connectionStorage = require('./connectionStorage');
    /**
     * 创建数据库连接实例
     */
    connectionStorage.db = await mongoose
        .createConnection(config.db.uri,config.db.option);
    /**
     * 挂载路由并返回
     */
    return require('./routes/announcement.router');
};
