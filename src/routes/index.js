const router = require('koa-router')();
const UserController = require('../controllers/UserController');

router.get('/a',(ctx,next) =>{
    console.log("hello");
});

router.get('/', function (ctx, next) {
    ctx.body="Hello Koa";
});

router.post('/addUser',UserController.addUser);
router.delete('/delUser',UserController.delUser);
router.put('/updateUser',UserController.updateUser);
router.get('/selectUser',UserController.selectUser);




module.exports = router;