/**
 * @description 这里写描述
 */

'use strict';
module.exports = {
    db: {
        uri: 'mongodb://root:Yangcong345@ycposs01.mongodb.rds.aliyuncs.com:3717,ycposs02.mongodb.rds.aliyuncs.com:3717/poss?replicaSet=mgset-13242159',
        option: {
            authSource: "admin",
            keepAlive: 3000,
            poolSize: 500,
        }
    },
    services: {
        Poss: {
            host: 'http://172.16.0.26'
        },
        User: {
            host: 'http://172.16.3.146'
        }
    },
    redis: {
        port: 6379,
        host: "r-bp111f0dc61df6f4.redis.rds.aliyuncs.com",
        password: "Yangcong345",
        db: 0,
        keyPrefix: "poss"
    },
};