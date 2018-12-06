const router = require('koa-router')();


const UserController = require('../controllers/user/UserController');

router.post('/addUser',UserController.addUser);
router.delete('/delUser',UserController.delUser);
router.put('/updateUser',UserController.updateUser);
router.get('/selectUser',UserController.selectUser);
