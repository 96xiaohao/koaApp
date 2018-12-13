// a = {"period1" : "3","period2" : "1"};
//
// console.log(JSON.stringify(a))

const moment = require('moment');

// console.log(moment(1545477300000).format());
console.log(moment("2019-01-01 00:00:00").valueOf());
console.log(moment("2019-01-01 24:00:00").valueOf());


// to_timestamp(${startTime/1000})