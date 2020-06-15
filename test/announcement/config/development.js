/**
 * @description 这里写描述
 */

'use strict';
module.exports = {
    db: {
        uri: 'mongodb://10.8.8.124/onions4',
        option: {}
    },
    services: {
        Poss: {
            host: 'http://backstage-test.yc345.tv:3018'
        },
        User: {
            host: 'http://10.8.8.207:10020'
        },
    },
    redis: {
        port: 6379,
        host: "redis-test.yc345.tv",
        password: "Yangcong345",
        db: 0,
        keyPrefix: "poss"
    },
};