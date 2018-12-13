'use strict';
const router = require('koa-router')();


const UserController = require('../controllers/user/UserController');

router.post('/add',UserController.addUser);        //添加新用户
router.delete('/delUser',UserController.delUser);
router.post('/edit',UserController.updateUser);    //更新用户数据
router.get('/one',UserController.getUser);         //获取一个用户的数据
router.get('/all',UserController.getUserList);     //获取所有用户列表
router.post('/login',UserController.userLogin);    //用户登录
router.post('/loginout',UserController.userLoginOut);    //用户登录



module.exports = router;