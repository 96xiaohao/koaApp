/**
 * app的启动文件
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Logger = require('koa-logger');
const Cors = require('kcors');
const onerror = require('koa-onerror')
const router = require('./routes/index');
// const router = require('koa-router')();
const config = require('./configs/appConfig');
const baseConfig = require('./configs/baseConfig');
const errorTrance = require('./middleware/errorTrace');
const myLogger = require('./middleware/Logger');

const app = new Koa();

//使用日志中间件，放在前面
app.use(myLogger.getLogger(baseConfig));
app.use(Cors());
app.use(Logger());
app.use(errorTrance());
app.use(bodyParser({
    onerror : (err, ctx) => {
        ctx.throw('body parse error',422)
    }
}));


app.use(router.routes());

app.listen(config.port,(err) =>{
    if (!err){
        console.log('app started on port：' + config.port);
    }else {
        console.log('服务器启动失败' + err)
    }
});

// module.exports = app;


