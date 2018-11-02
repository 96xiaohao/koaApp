const path = require('path');


const baseConfig = {

    //基本配置路径
    base : {
        //项目工作目录的绝对路径
        workDir : path.join(__dirname,'../../'),
        //源码目录的绝对路径
        srcDir : path.join(__dirname,'.//'),
    },

    log : {
        //日志文件夹绝对路径
        logDir : path.join(__dirname,'../../logs'),
        //日志文件夹的相对路径
        accessLogFile : 'access.log'
    }
};

module.exports = baseConfig;