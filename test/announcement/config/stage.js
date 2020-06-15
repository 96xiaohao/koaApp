/**
 * @description 这里写描述
 */

'use strict';
module.exports = {
    db: {
        uri: 'mongodb://root:Yangcong345@bjposs01.mongodb.rds.aliyuncs.com:3717,bjposs02.mongodb.rds.aliyuncs.com:3717/poss?replicaSet=mgset-15538167&authSource=admin',
        option: {
            keepAlive: 3000,
            poolSize: 500,
        }
    },
    services: {
        Poss: {
            host: 'http://172.17.254.254'
        },
        User: {
            host: 'http://172.17.254.213'
        },
    },
    redis: {
        port: 6379,
        host: "yc-bjmain.redis.rds.aliyuncs.com",
        password: "Yangcong345",
        db: 0,
        keyPrefix: "poss"
    },
};