'use strict';
let _ = require('lodash');
let xlsxrd = require('node-xlsx');
let excelFilePath = '4.xlsx';
const fs = require("fs");
const request = require('request')
const moment = require("moment")


// // 读取excel中所有工作表的数据
// let list = xlsxrd.parse(excelFilePath);
// // 获取excel中第一个工作表的数据
// let data = list[0].data;
// let result = [];
// // 字段过滤
// _.forEach(data.slice(1), (d) => {
//     if (d[1] && d[2] && d[3] && d[4]&& d[5] && d[6]){
//         result.push({ userId: d[1], phone: d[2], grade : d[3], province : d[4], city : d[5], area : d[6]});
//     }
// });

// console.log('原始格式数据:', JSON.stringify(list));
console.log('');
// console.log(`${list[0].name}:`, JSON.stringify(result));

// fs.writeFile("test.txt", JSON.stringify(result), error => {
//     if (error) return console.log("写入文件失败,原因是" + error.message);
//     console.log("写入成功");
// });


async function getData(){
    // const aliAskConfig = fs.readFileSync("/etc/onions/access.json", 'utf8')

    let xlsxTag = xlsxrd.parse("0407psbb.xlsx");
    // 获取excel中第一个工作表的数据
    let data = xlsxTag[0].data;
    let res=[]
    _.forEach(data.slice(1), (d) => {
        res.push(d[0])
    });

    let  fileTag =await fs.readFileSync("./log-c-0407.txt","utf8")
    fileTag = JSON.parse(fileTag)


    console.log("ps: ",res.length)
    console.log("wechat: ",fileTag.length)



    let aSet = new Set(res)
    let bSet = new Set(fileTag)
    let minus = res.filter(x => !bSet.has(x));
    console.log("ps中还未打上c端标签的",minus.length)
    console.log(minus)
    return minus
}

// const dataBody  = {
//     userData:result
// };


// (async () => {
//     // const url = "https://api-wx.yangcong345.com/parents-support/channel/users";
//     // const url = `http://127.0.0.1:3090/parents-support/handle/dwBug`;
//     // const url = `https://api-wx.yangcong345.com/parents-support/telesales/batch/usableUser`;
//     // const url = `http://127.0.0.1:3090/parents-support/telesales/batch/usableUser`;
//     //
//     // const url = `https://api-wx-test.yangcong345.com/parents-support/telesales/batch/usableUser`;
//     const url = `https://api-wx.yangcong345.com/wechat-parents/tag/update/tags`;
//
//     const openIds = await getData()
//
//     // const openIds = ['oEO9X1S92X6reNFsrN81B0QQt50c']
//
//     for (let i = 0; i < Math.ceil(Number(openIds.length) / 50); i++) {
//         let begin = i * 50;
//         let end = (i + 1) * 50;
//         let openIdReady = openIds.slice(begin, end);
//
//         let dataBody = {
//             openIds: openIdReady,
//             tag: 'c',
//             type: "update"};
//
//         console.log("第"+i)
//         await request({
//             method: "post",
//             url: url,
//             json: true,
//             headers: {
//                 "content-type": "application/json",
//             },
//             body: dataBody
//         });
//     }
//
// })();

(async ()=>{
    console.log(moment('2020-04-30 23:59:59.000+08:00').diff() < 0)
})()
