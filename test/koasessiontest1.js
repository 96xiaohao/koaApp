const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');

app.keys = ['some secret hurr'];

// const store = {
//     get(key) {
//         const sessionDir = path.resolve(__dirname, './session');
//         const files = fs.readdirSync(sessionDir);
//
//         for (let i = 0; i < files.length; i++) {
//             if (files[i].startsWith(key)) {
//                 const filepath = path.resolve(sessionDir, files[i]);
//                 delete require.cache[require.resolve(filepath)];
//                 const result = require(filepath);
//                 return result;
//             }
//         }
//     },
//     set(key, session) {
//         const filePath = path.resolve(__dirname, './session', `${key}.js`);
//         const content = `module.exports = ${JSON.stringify(session)};`;
//
//         fs.writeFileSync(filePath, content);
//     },
//
//     destroy(key){
//         const filePath = path.resolve(__dirname, './session', `${key}.js`);
//         fs.unlinkSync(filePath);
//     }
// }

let store = {
    storage: {},

    get (key, maxAge) {
        return this.storage[key]
    },
    set (key, sess, maxAge) {
        this.storage[key] = sess
    },
    destroy (key) {
        delete this.storage[key]
    }
}



const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
    store
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

app.use(ctx => {
    // ignore favicon
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    if (n >=5 ) ctx.session = null;
    ctx.body = n + ' views';
});

app.listen(3000);
console.log('listening on port 3000');