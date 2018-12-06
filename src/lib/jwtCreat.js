

/*
jwt 有三部分
1.header,用于描述jwt本身
{
"alg": "HS265", 用的何种加密方式
"typ": "jwt"
}

header 要用base64编码

2.paylbody,  存储内容
{
 "sub" : "123456" , 表示subject
 "name" : "xiaohao", 表示用户名
 "admin" : "true"    表示管理员
 "iss" : isser       谁生成的jwt
 "exp" : expiration  表示过期时间
 "jti" : JWT         表示jwtId
}

paylbody 也要用base64编码

3.verify signatuer

HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret
)
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');

// /*
// 创建和签发jwt
//  */
//
// //jwt的内容体: 可自定义响应字段
// const payload = {
//     name : 'xiaohao',
//     admin : true
//
// };
//
// //JWT 秘钥
// const secret = "I_LOVE_XINGXING";
//
// //签发jwtToke
// const token = jwt.sign(payload,secret);
// console.log(token);
//
//
//
// /*
// 验证与解码jwt
//  */
// jwt.verify(token,secret,(error,decoded) =>{
//     if ((error)) {
//         console.log(error.message);
//         return
//     }
//     console.log(decoded)
// });
//






/*
默认jwt用的算法是HS256，签发和验证用的是同一个秘钥，对称算法

还可用RS256  签发时用私钥（Private Key），验证时用公钥(Public Key)，非对称算法
生成私钥:ssh-keygen -t rsa -b 2048 -f private.key
根据私钥生成公钥：openssl rsa -in private.key -pubout -outform PEM -out public.key

 */

/*
使用RS256算法来签发和验证jwt
 */

const payload2 = {
    name : 'xingxing',
    say : "xingxing love haohao"
};


//签发
const privateKey = fs.readFileSync('../secret/private.key');
const token2 = jwt.sign(payload2,privateKey,{algorithm : 'RS256'}) //指定RS256算法
console.log(token2);

//验证
const publicKey = fs.readFileSync('../secret/public.key');
jwt.verify(token2,publicKey,(error,decoded)=>{
    if (error) {
        console.log(error);
        return
    }
    console.log(decoded)
});
