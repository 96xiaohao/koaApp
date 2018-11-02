'use strict';

const config = require('../configs/dbConfig');
const pg = require('pg').native;
const pool = new pg.Pool(config.postgres);

pool.on('error',function (error,client) {
    console.error(error,client);
    console.info('Exit process');
    process.exit(1)

});

pool.on('connect',function () {
    console.log('db connected')
});

module.exports = pool;