// a = {"period1" : "3","period2" : "1"};
//
// console.log(JSON.stringify(a))

const moment = require('moment');
const _ = require('lodash')

// console.log(moment(1545477300000).format());
console.log(moment("2019-01-01 00:00:00").valueOf());
console.log(moment("2019-01-01 00:30:00").valueOf());

console.log(moment("2019-01-01 00:30:00").valueOf() - moment("2019-01-01 00:00:00").valueOf());



//

// to_timestamp(${startTime/1000})



//查询出GoodsName,GoodsType,GoodsTitle数据和每一条合并
// 。var o1 = { a: 1 };
// var o2 = { b: 2 };
// var o3 = { c: 3 };
//
// var obj = Object.assign(o1, o2, o3);
// console.log(obj); // { a: 1, b: 2, c: 3 }
// console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变


// const a = { 'a': 0 };
// const b = {"b":9};
//
// // const c = _.assignIn(a, b);
// // console.log(c)
// // console.log(a);
//
// arr = [
//     { 'a': 0 }, {"b":9}
//
// ];
//
// const dd = {"g":99}
//
//  const c = arr.map(b =>{
//     return _.assignIn(b,dd)
// })
//
// console.log(arr)
// console.log(c)
//
//
