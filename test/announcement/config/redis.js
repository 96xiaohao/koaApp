/**
 * @description 这里写描述
 */

'use strict';
const Redis = require('ioredis');
const config = require('./config').redis;

const MAX_ATTEMPT = 3;

let attempt = 0;

function retryStrategy (times) {
    attempt++;
    if (attempt > MAX_ATTEMPT) return null;
    return Math.max(times * 2, 2000);
}

const client = new Redis({
    port:config.port,
    host: config.host,
    password: config.password,
    db:config.db,
    keyPrefix:config.keyPrefix,
    retryStrategy,
    dropBufferSupport: true
});

client.on('connect', function () {
    // let multi = client.multi()
    // client.keys('*').then(function (keys) {
    //     _.forEach(keys, (key) => {
    //         if (key.startsWith('rank') || key.startsWith('billboard')) return
    //         multi.del(key)
    //     })
    //     multi.exec()
    //         .then(() => console.log('clear redis cache'))
    //         .catch(err => console.error(err))
    // })

    console.log('redis connect successfully')
});

client.on('err', function (err) {
    console.error(err)
});

module.exports = client;