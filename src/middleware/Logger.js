const fs = require('fs');
const path = require('path');

class Logger {

    //由外部传入的路径配置决定日志文件的位置
    static getLogger(baseConfig){

        var accessLogFile = path.join(baseConfig.log.logDir , baseConfig.log.accessLogFile);

        //返回中间件处理函数
        return async function log(ctx, next) {
            const start = Date.now();
            const requestTime = new Date();

            return next().then(()=>{
                const ms = Date.now() - start;
                const clientIp = ctx.request.ip.match(/([0-9]{1,3}\.){3}[0-9]{1,3}/g)[0];

                let logout = `reqIp:${clientIp}-- status:${ctx.status} -- reqTime:${requestTime} -- reqMethod:${ctx.method} -- reqUrl:${ctx.url} -- resTime:${ms}ms`;

                // console.log(logout)
                //输入日志文件
                fs.appendFileSync(accessLogFile,logout + '\n\t');
            })
        }
    }
}

module.exports = Logger;