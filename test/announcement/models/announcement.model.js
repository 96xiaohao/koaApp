'use strict';

const mongoose = require('mongoose');
const db = require('../connectionStorage').db;
const Schema = mongoose.Schema;
const paginate = require('mongoose-paginate');
const ObjectId = Schema.Types.ObjectId;

const AnnouncementSchema = new Schema({
    // subjectStage:{
    //     type: String,
    //     default:'',
    //     required: true,
    //     comment:"洋葱公告出现的学科学段"
    // },
    // stageId: {
    //     type: Number,
    //     default: 0,
    //     required: true,
    //     comment:"洋葱公告出现的学段"
    // },
    // subjectId: {
    //     type: Number,
    //     default: 0,
    //     required: true,
    //     comment:"洋葱公告出现的学科"
    //
    // },
    // publisherId: {
    //     type: Number,
    //     default: 0,
    //     required: true,
    //     comment:"洋葱公告出现的教材版"
    //
    // },
    // semesterId: {
    //     type: Number,
    //     default: 0,
    //     required: true,
    //     comment:"洋葱公告出现的学期"
    //
    // },
    name:{
        type:String,
        default: '',
        required: true,
        comment:"公告名称"
    },
    content: {
        type: String,
        default: '',
        required: true,
        comment:"洋葱公告的内容"

    },
    beginTime: {
        type: Date ,
        comment: '公告生效时间'
    },
    endTime:{
        type: Date ,
        comment: '公告失效时间'
    },
    linkType: {
        type: String,
        default: '',
        // required: true,
        comment:"洋葱公告的链接类型"

    },
    link: {
        type: String,
        default: '',
        // required: true,
        comment:"洋葱公告的链接"

    },
    color: {
        type: String,
        default: '',
        // required: true,
        comment:"洋葱公告的颜色"

    },
    creator:{
        type: String,
        comment: '公告创建人',
        required: true,
        default: ''
    },
    operator :{
        type:String,
        comment: '公告最后编辑人',
        required:true,
        default: ''
    },
    studyInfo:{
        type: Schema.Types.Mixed,
        comment: "课程条件配置"
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }

});
// AnnouncementSchema.index({tid: 1}, {background: 1, unique: 1});

// AnnouncementSchema.index({openid: 1, msgId: 1}, {background: true})
// AnnouncementSchema.index({expiresIn: 1},{background: true, expireAfterSeconds: 0});

AnnouncementSchema.plugin(paginate);

module.exports = db.model('Announcement', AnnouncementSchema);

