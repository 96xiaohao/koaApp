'use strict';
let _ = require('lodash');
let xlsxrd = require('node-xlsx');
let excelFilePath = '4.xlsx';
const fs = require("fs");
const request = require('request')


// 读取excel中所有工作表的数据
let list = xlsxrd.parse(excelFilePath);
// 获取excel中第一个工作表的数据
let data = list[0].data;
let result = [];
// 字段过滤
_.forEach(data.slice(1), (d) => {
    if (d[1] && d[2] && d[3] && d[4]&& d[5] && d[6]){
        result.push({ userId: d[1], phone: d[2], grade : d[3], province : d[4], city : d[5], area : d[6]});
    }
});

// console.log('原始格式数据:', JSON.stringify(list));
console.log('');
// console.log(`${list[0].name}:`, JSON.stringify(result));

// fs.writeFile("test.txt", JSON.stringify(result), error => {
//     if (error) return console.log("写入文件失败,原因是" + error.message);
//     console.log("写入成功");
// });

const dataBody  = {
    userData:result
};


(async () => {
    // const url = "https://api-wx.yangcong345.com/parents-support/channel/users";
    // const url = `http://127.0.0.1:3090/parents-support/handle/dwBug`;
    const url = `https://api-wx.yangcong345.com/parents-support/telesales/batch/usableUser`;
    // const url = `http://127.0.0.1:3090/parents-support/telesales/batch/usableUser`;

    // const url = `https://api-wx-test.yangcong345.com/parents-support/telesales/batch/usableUser`;

    await request({
        method: "post",
        url: url,
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: dataBody
    });

})();


