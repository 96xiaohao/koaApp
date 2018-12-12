/*
加密方法类
 */

const crypto = require('crypto');

class Crypto {
    static getSha1(str){
        const sha1 = crypto.createHash("sha1"); //定义加密方式
        sha1.update(str);
        const res = sha1.digest("yangcong");   //秘钥加密
        return res
    }

}

module.exports = Crypto;