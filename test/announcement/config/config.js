/**
 * @description 这里写描述
 */

'use strict';
let defaults = {
    constants: {
        BANNER_POSITION: [{
            name: '学生-初中发现页',
            value: 'studentDiscoveryJunior'
        }, {
            name: '学生-小学发现页',
            value: 'studentDiscoveryPrimary'
        }, {
            name: '学生-高中发现页',
            value: 'studentDiscoverySenior'
        }, {
            name: '初中-新发现页',
            value: 'studentDiscoveryJuniorNew',
        }, {
            name: '高中-新发现页',
            value: 'studentDiscoverySeniorNew',
        }, {
            name: '小学-新发现页',
            value: 'studentDiscoveryPrimaryNew',
        }, {
            name: '学生-原首页',
            value: 'studentHome'
        }, {
            name: '学生-学习首页',
            value: 'studentLearnHome'
        }, {
            name: '学生-新学习首页',
            value: 'studentLearnHomeNew'
        }, {
            name: '集成APP教师首页',
            value: 'teacherHome'
        }, {
            name: '学生真人秀页',
            value: 'studentShow'
        }, {
            name: '学生付费vip页',
            value: 'studentVip'
        }, {
            name: '集成APP教学交流H5页',
            value: 'teacherCommunication'
        }, {
            name: '特殊临时活动',
            value: 'temporary'
        }, {
            name: '教师APP首页',
            value: 'TeacherAppHome'
        }, {
            name: '教师APP交流H5页',
            value: 'teacherAppCommunication'
        }, {
            name: '小学首页',
            value: 'primarySchoolHome'
        }]
    }
};

if (process.env.NODE_ENV) {
    defaults = Object.assign({}, defaults, require('./' + process.env.NODE_ENV));
} else {
    defaults = Object.assign({}, defaults, require('./development'));
}
module.exports = defaults;