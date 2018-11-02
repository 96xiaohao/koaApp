'use strict'

function errorTrace() {
    return async function(ctx,next){
        try{
            await next()
        }catch (err){

            ctx.body = {
                msg : ctx.body && ctx.body.msg || "",
                debug : err.message,
                type : '',
            };

            ctx.status = err.status || 500;

            if (ctx.status >= 500 || err.name === ValidationError){
                console.error('request url:',  ctx.url);
                console.error('request header:' , ctx.header);
                console.error('request body:', ctx.request.body);
            }

            ctx.app.emit('error', err,ctx);

        }

    }

}

module.exports = errorTrace;