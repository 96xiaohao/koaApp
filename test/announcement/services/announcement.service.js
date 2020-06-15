/**
 * @description Notice services
 */

'use strict';
const Announcement = require('../models/announcement.model');
const Mongoose = require('mongoose');

const assert = require("http-assert");
const _ = require('lodash');


class AnnouncementService {
    static async addOneAnnouncement(name,content,beginTime,endTime,navigateTarget,navigateType,studyInfo,editor){
        assert(name, 400, "addOneAnnouncement  name is required");
        assert(content, 400, "addOneAnnouncement  content is required");
        assert(beginTime, 400, "addOneAnnouncement  beginTime is required");
        assert(endTime, 400, "addOneAnnouncement  endTime is required");
        // assert(navigateType, 400, "addOneAnnouncement  navigateType is required");
        // assert(navigateTarget, 400, "addOneAnnouncement  navigateTarget is required");
        assert(studyInfo, 400, "addOneAnnouncement  studyInfo is required");
        assert(editor, 400, "addOneAnnouncement  editor is required");

        if (!navigateTarget && !navigateType ){
            navigateTarget = ""
            navigateType = ""
        }

        if (!_.isEmpty(studyInfo) && studyInfo.subjectStage) {
            let subjectStageArr = studyInfo.subjectStage.split("-")
            studyInfo["subjectId"] = subjectStageArr[0];
            studyInfo["stageId"] = subjectStageArr[1]
        }

        try {
            const annoucement = await Announcement.create({
                name: name,
                content: content,
                beginTime:beginTime,
                endTime : endTime,
                linkType: navigateType,
                link: navigateTarget,
                creator: editor,
                operator: editor,
                studyInfo :studyInfo
            });

            return annoucement
        }catch (err) {
            console.log("||Error->> |Sfunc:(AnnouncementService) errMessage:||",err);
            throw err
        }

    }

    static async addOneAnnouncement2(name,content,beginTime,endTime,navigateTarget,navigateType,studyInfo,editor){
        assert(name, 400, "addOneAnnouncement  name is required");
        assert(content, 400, "addOneAnnouncement  content is required");
        assert(beginTime, 400, "addOneAnnouncement  beginTime is required");
        assert(endTime, 400, "addOneAnnouncement  endTime is required");
        // assert(navigateType, 400, "addOneAnnouncement  navigateType is required");
        // assert(navigateTarget, 400, "addOneAnnouncement  navigateTarget is required");
        assert(studyInfo, 400, "addOneAnnouncement  studyInfo is required");
        assert(editor, 400, "addOneAnnouncement  editor is required");

        if (!navigateTarget && !navigateType ){
            navigateTarget = ""
            navigateType = ""
        }



        try {
            let annoucement = ""
            if (!_.isEmpty(studyInfo) && studyInfo.subjectStage) {
                let subjectStageArr = studyInfo.subjectStage.split("-")
                studyInfo["subjectId"] = subjectStageArr[0];
                studyInfo["stageId"] = subjectStageArr[1]

                annoucement = await Announcement.create({
                    name: name,
                    content: content,
                    beginTime:beginTime,
                    endTime : endTime,
                    linkType: navigateType,
                    link: navigateTarget,
                    creator: editor,
                    operator: editor,
                    studyInfo :studyInfo
                });

            }else {
                annoucement = await Announcement.create({
                    name: name,
                    content: content,
                    beginTime:beginTime,
                    endTime : endTime,
                    linkType: navigateType,
                    link: navigateTarget,
                    creator: editor,
                    operator: editor,
                    studyInfo :{}
                });
            }


            return annoucement
        }catch (err) {
            console.log("||Error->> |Sfunc:(AnnouncementService) errMessage:||",err);
            throw err
        }

    }

    //根据生效时间和失效时间获取表中的公告
    static async getInfoByBtAndEt(beginTime,endTime,id){
        try {
            // let announcement = await Announcement.find({"$or":[{beginTime: {$gte: beginTime}},{beginTime: {$lte: endTime}}]}.lean())

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'_id':{$ne:id}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }else {
                announcement = await Announcement.find()
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }



            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEt) errMessage:||",err);
            throw err
        }

    }

    //根据生效时间和失效时间获取表中的公告
    static async getInfoByBtAndEt2(beginTime,endTime,id){
        try {
            // let announcement = await Announcement.find({"$or":[{beginTime: {$gte: beginTime}},{beginTime: {$lte: endTime}}]}.lean())

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'_id':{$ne:id},'studyInfo':{$eq:{}}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
                    // .or([{'studyInfo':{$eq:{}}},{'studyInfo.subjectStage':{$eq:''}}])
            }else {
                announcement = await Announcement.find({'studyInfo':{$eq:{}} })
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])

            }

            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEt) errMessage:||",err);
            throw err
        }

    }

    static async getInfoByBtAndEt3(beginTime,endTime,id){
        try {

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'_id':{$ne:id},'studyInfo':{$ne:{}},'studyInfo.subjectStage':""})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }else {
                announcement = await Announcement.find({'studyInfo':{$ne:{}},'studyInfo.subjectStage':""})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])

            }

            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEt) errMessage:||",err);
            throw err
        }

    }

    //根据生效时间和失效时间，和学科学段获取表中的公告

    static async getInfoByBtAndEtAndSs(beginTime,endTime,subjectStage,id){
        try {
            // let announcement = await Announcement.find({"$or":[{beginTime: {$gte: beginTime}},{beginTime: {$lte: endTime}}],'studyInfo.subjectStage':subjectStage}.lean())

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'_id':{$ne:id}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }else {
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }


            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEtAndSs) errMessage:||",err);
            throw err
        }
    }

    static async getInfoByBtAndEtAndSs2(beginTime,endTime,subjectStage,id){
        try {
            // let announcement = await Announcement.find({"$or":[{beginTime: {$gte: beginTime}},{beginTime: {$lte: endTime}}],'studyInfo.subjectStage':subjectStage}.lean())

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'_id':{$ne:id},'studyInfo.publishers' :{$exists: false},'studyInfo.semesters':{$exists:false}}) //todo []
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }else {
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers' :{$exists: false},'studyInfo.semesters':{$exists: false}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }


            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEtAndSs) errMessage:||",err);
            throw err
        }
    }

    static async getInfoByBtAndEtAndSs3(beginTime,endTime,subjectStage,id){
        try {
            // let announcement = await Announcement.find({"$or":[{beginTime: {$gte: beginTime}},{beginTime: {$lte: endTime}}],'studyInfo.subjectStage':subjectStage}.lean())

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'_id':{$ne:id}}) //todo []
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }else {
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }


            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEtAndSs) errMessage:||",err);
            throw err
        }
    }

    //根据生效时间和失效时间，和学科学段，和版本获取表中的公告

    static async getInfoByBtAndEtAndSsAndPs(beginTime,endTime,subjectStage,publishId,id){
        try {
            // let announcement = await Announcement.find({"$or":[{beginTime: {$gte: beginTime}},{beginTime: {$lte: endTime}}],'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId}.lean())

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId,'_id':{$ne:id}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])

            }else {
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])

            }

            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEtAndSsAndPs) errMessage:||",err);
            throw err
        }
    }

    static async getInfoByBtAndEtAndSsAndPs2(beginTime,endTime,subjectStage,publishId,id){
        try {
            // let announcement = await Announcement.find({"$or":[{beginTime: {$gte: beginTime}},{beginTime: {$lte: endTime}}],'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId}.lean())

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId,'_id':{$ne:id},'studyInfo.semesters':{$exists: false}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])

            }else {
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId,'studyInfo.semesters':{$exists: false}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])

            }

            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEtAndSsAndPs) errMessage:||",err);
            throw err
        }
    }

    static async getInfoByBtAndEtAndSsAndPs3(beginTime,endTime,subjectStage,publishId,id){
        try {
            // let announcement = await Announcement.find({"$or":[{beginTime: {$gte: beginTime}},{beginTime: {$lte: endTime}}],'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId}.lean())

            let announcement = ""
            if (id){
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId,'_id':{$ne:id}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])

            }else {
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])

            }

            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEtAndSsAndPs) errMessage:||",err);
            throw err
        }
    }


    //根据生效时间和失效时间，和学科学段，和版本，和年级，获取表中的公告

    static async getInfoByBtAndEtAndSsAndPsAndS(beginTime,endTime,subjectStage,publishId,semestersId,id){
        try {
            let announcement = ""

            if (id){
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId,'studyInfo.semesters':semestersId,'_id':{$ne:id}})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }else {
                announcement = await Announcement.find({'studyInfo.subjectStage':subjectStage,'studyInfo.publishers':publishId,'studyInfo.semesters':semestersId})
                    .or([
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$lte: endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$gte: endTime}}]},
                        {$and: [{beginTime: {$gte: beginTime}},{endTime: {$gte: endTime}},{beginTime:{$lte:endTime}}]},
                        {$and: [{beginTime: {$lte: beginTime}},{endTime: {$lte: endTime}},{endTime:{$gte:beginTime}}]}
                    ])
            }


            return announcement
        }catch (err) {
            console.log("||Error->> |Sfunc:(getInfoByBtAndEtAndSsAndPsAndS) errMessage:||",err);
            throw err
        }
    }

    //更新一个公告
    static async updateOneAnnouncement(name,content,beginTime,endTime,navigateTarget,navigateType,studyInfo,editor,id){

        assert(name, 400, "updateOneAnnouncement  name is required");
        assert(content, 400, "updateOneAnnouncement  content is required");
        assert(beginTime, 400, "updateOneAnnouncement  beginTime is required");
        assert(endTime, 400, "updateOneAnnouncement  endTime is required");
        // assert(navigateType, 400, "updateOneAnnouncement  navigateType is required");
        // assert(navigateTarget, 400, "updateOneAnnouncement  navigateTarget is required");
        assert(studyInfo, 400, "updateOneAnnouncement  studyInfo is required");
        assert(editor, 400, "updateOneAnnouncement  editor is required");
        assert(id, 400, "updateOneAnnouncement  id is required");

        if (!navigateTarget && !navigateType ){
            navigateTarget = ""
            navigateType = ""
        }

        if (!_.isEmpty(studyInfo) && studyInfo.subjectStage) {
            let subjectStageArr = studyInfo.subjectStage.split("-")
            studyInfo["subjectId"] = subjectStageArr[0];
            studyInfo["stageId"] = subjectStageArr[1]
        }

        try {

                let annoucement = await Announcement.updateOne({_id:id},{
                    name: name,
                    content: content,
                    beginTime:beginTime,
                    endTime : endTime,
                    linkType: navigateType,
                    link: navigateTarget,
                    // creator: editor,
                    operator: editor,
                    studyInfo :studyInfo,
                    updatedAt : new Date()
                });

            return annoucement
        }catch (err) {
            console.log("||Error->> |Sfunc:(updateOneAnnouncement) errMessage:||",err);
            throw err
        }

    }

    static async updateOneAnnouncement2(name,content,beginTime,endTime,navigateTarget,navigateType,studyInfo,editor,id){

        assert(name, 400, "updateOneAnnouncement  name is required");
        assert(content, 400, "updateOneAnnouncement  content is required");
        assert(beginTime, 400, "updateOneAnnouncement  beginTime is required");
        assert(endTime, 400, "updateOneAnnouncement  endTime is required");
        // assert(navigateType, 400, "updateOneAnnouncement  navigateType is required");
        // assert(navigateTarget, 400, "updateOneAnnouncement  navigateTarget is required");
        assert(studyInfo, 400, "updateOneAnnouncement  studyInfo is required");
        assert(editor, 400, "updateOneAnnouncement  editor is required");
        assert(id, 400, "updateOneAnnouncement  id is required");

        if (!navigateTarget && !navigateType ){
            navigateTarget = ""
            navigateType = ""
        }

        if (!_.isEmpty(studyInfo) && studyInfo.subjectStage) {
            let subjectStageArr = studyInfo.subjectStage.split("-")
            studyInfo["subjectId"] = subjectStageArr[0];
            studyInfo["stageId"] = subjectStageArr[1]
        }

        try {
            let annoucement = ""

            if (!_.isEmpty(studyInfo) && studyInfo.subjectStage) {
                let subjectStageArr = studyInfo.subjectStage.split("-")
                studyInfo["subjectId"] = subjectStageArr[0];
                studyInfo["stageId"] = subjectStageArr[1]

                annoucement = await Announcement.updateOne({_id:id},{
                    name: name,
                    content: content,
                    beginTime:beginTime,
                    endTime : endTime,
                    linkType: navigateType,
                    link: navigateTarget,
                    // creator: editor,
                    operator: editor,
                    studyInfo :studyInfo,
                    updatedAt : new Date()
                });

            }else {
                annoucement = await Announcement.updateOne({_id:id},{
                    name: name,
                    content: content,
                    beginTime:beginTime,
                    endTime : endTime,
                    linkType: navigateType,
                    link: navigateTarget,
                    // creator: editor,
                    operator: editor,
                    studyInfo :{},
                    updatedAt : new Date()
                });
            }

            return annoucement
        }catch (err) {
            console.log("||Error->> |Sfunc:(updateOneAnnouncement) errMessage:||",err);
            throw err
        }

    }

    static async getOneInfoById(id) {
        assert(id, 400, "getOneInfoById  id is required");

        try {
            let annoucement = await Announcement.findOne({_id: id})

            return annoucement
        } catch (err) {
            console.log("||Error->> |Sfunc:(getOneInfoById) errMessage:||", err);
            throw err
        }
    }

    static async getList(search,beginTime,endTime,filter,sort,offset,limit){

        const findObj = {}
        const sortObj = {}

        let a =true
        if (search){

            try{
                Mongoose.Types.ObjectId(search)
            }
            catch (e) {
                a = false
            }
            if (a===true){
                // findObj['$or'] = [{name:search},{_id:search}]
                findObj["_id"] = search

            }else {
                findObj["name"] = {'$regex' : search}

            }
        }



        if (beginTime && endTime){

            findObj["beginTime"] = {'$gte': beginTime,'$lte': endTime}
            // findObj["endTime"] = {'$lte': endTime}
        }

        if (!_.isEmpty(filter) && filter.creator && filter.creator.length!==0){
                findObj["creator"] = {'$in':filter.creator}

        }

        if (!_.isEmpty(filter) && filter.editor && filter.editor.length !==0){
                findObj["operator"] = {'$in':filter.editor}
        }

        if (!_.isEmpty(sort) && sort.effectiveTime){
            if (sort.effectiveTime === "ascending"){
                sortObj["beginTime"] = 1
            }else{
                sortObj["beginTime"] = -1
            }
        }
        if (!_.isEmpty(sort) && sort.invalidTime){
            if (sort.invalidTime === "ascending"){
                sortObj["endTime"] = 1
            }else{
                sortObj["endTime"] = -1
            }
        }

        console.log(findObj,222222222)
        console.log(sortObj,4444444444)

        if (_.isEmpty(sortObj)){
            sortObj["createdAt"] = -1
        }

        try {
            let dataList = await Announcement.find(findObj).sort(sortObj)

            return dataList
        } catch (err) {
            console.log("||Error->> |Sfunc:(getList) errMessage:||", err);
            throw err
        }

    }

    static async deleteAnnouncement(id){
        assert(id, 400, "getOneInfoById  id is required");
        try {

            let resp = await Announcement.deleteOne({_id: id})

            if(resp.n ===1 && resp.ok ===1 && resp.deletedCount ===1 ){
                return  true
            }

        } catch (err) {
            console.log("||Error->> |Sfunc:(deleteAnnouncement) errMessage:||", err);
            throw err
        }
    }

    /*
    获取筛选项
     */
    static async getColumn(column){
        assert(column, 400, "getColumn  column is required");

        let resp = ""
        try {
            if (column === "creator"){
                resp = await Announcement.find().distinct('creator')  //todo 尽量字段相同

            }else if (column === "editor"){

                resp = await Announcement.find().distinct('operator')

            }

            return  resp

        }catch (err) {
            console.log("||Error->> |Sfunc:(getColumn) errMessage:||", err);
            throw err
        }

    }

    static async getAnnouncementDetailByTime(nowTime){
        assert(nowTime, 400, "getColumn  nowTime is required");

        try{
            let dataList = await Announcement.find({beginTime:{$lte:nowTime},endTime:{$gte:nowTime}})
            return dataList
        }catch (err) {
            console.log("||Error->> |Sfunc:(getAnnouncementDetailByTime) errMessage:||", err);
            throw err
        }

    }

}






module.exports = AnnouncementService;
