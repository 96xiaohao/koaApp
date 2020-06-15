'use strict';
let _ = require('lodash');
let xlsxrd = require('node-xlsx');
let excelFilePath = '学校excel.xlsx';
const fs = require("fs");
const request = require('./request')
const key = "2f8b900b9d2342560df66288a141663d"

// 读取excel中所有工作表的数据
let list = xlsxrd.parse(excelFilePath);
// 获取excel中第一个工作表的数据
let data = list[0].data;
let result = [];
// 字段过滤
_.forEach(data.slice(1), (d) => {
    result.push({ name: d[1], regionCode: d[2]});
});

// console.log('原始格式数据:', JSON.stringify(list));
// console.log('');
// console.log(`${list[0].name}:`, JSON.stringify(result));

// fs.writeFile("test.txt", JSON.stringify(result), error => {
//     if (error) return console.log("写入文件失败,原因是" + error.message);
//     console.log("写入成功");
// });




(async ()=>{
    const right = []
    const fault = []
    for (let i=0; i<result.length; i++){
        let oneData  =  await getGeoInfoBySchoolName(key,result[i].name)

        console.log(oneData)
        if(oneData.status === '1' && oneData.info === 'ok' && oneData.infocode === '10000' && !_.isEmpty(oneData.geocodes) && result[i].regionCode === oneData.geocodes.adcode){
            right.push(result[i])
        }else {
            fault.push(right[i])
        }

    }
    console.log("总量",result.length)
    console.log("匹配成功",right.length)
    console.log("匹配失败",fault.length)
    console.log(Number(fault.length) / Number(result.length) )

})()




async function getGeoInfoBySchoolName(key,address) {
    // const url = `https://restapi.amap.com/v3/geocode/geo?key=${key}&address=天安门&city=北京&output=JSON`;
    const url = `https://restapi.amap.com/v3/geocode/geo?key=${key}&address=${address}&output=JSON`;

    const  {body} = await request({
        method: "get",
        url: encodeURI(url),
        // json: true,
        // headers: {
        //     "content-type": "application/json",
        // },
    });

    return body
}
