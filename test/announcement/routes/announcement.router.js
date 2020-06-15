/**
 * @description Banner模块路由定义
 */

'use strict';

const KoaRouter = require('koa-router');
const router = new KoaRouter;
const Pagination = require('koa-pagination').middleware;

const announcementCtrl = require('../controllers/announcement.controller');
//创建章节列表页公告
router.post('/info', announcementCtrl.addAnnouncement);
//更新章节列表页公告
router.put('/info', announcementCtrl.editAnnouncementInfo);
//获取公告列表
router.post('/list',announcementCtrl.getAnnouncementList);
//删除公告
router.post('/delete',announcementCtrl.deleteAnnouncement,);
//获取筛选项
router.post('/filter',announcementCtrl.getFilters);
//获取公告列表
router.get('/detail/list',announcementCtrl.getAnnouncementDetailList);




module.exports = router;
