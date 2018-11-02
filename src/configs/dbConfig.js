'use strict'

const dbConfig = {
    postgres : {
        user : 'postgres',
        database : 'postgres',
        host : '127.0.0.1',
        post : 5432,
        max : 100,
        idleTimeoutMillis : 3000,
    },

}

module.exports = dbConfig;