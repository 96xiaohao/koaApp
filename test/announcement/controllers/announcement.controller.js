/**
 * @description Banner controller
 */

'use strict';
const wormhole = require('wormhole');
const compareVersions = require('compare-versions');
const moment = require("moment");

//controller作为services的上游
const axios = require('axios');
const {
    ObjectId
} = require('mongoose').Types;
const AnnouncementService = require('../services/announcement.service');
const config = require('../config/config');
const commonLib = require('../../../commonLib/commonLib');
const serviceLib = require('../../../commonLib/serviceLib');
const filterLib = require('../../../commonLib/filterLib');
const constants = config.constants;
const redis = require('../config/redis');
const {versionFilter} = filterLib;
const assert = require("http-assert");
const _ = require('lodash');

const {request} = require('../../../commonLib/requester');



exports.addAnnouncement = async (ctx, next) => {
    const {name} = ctx.request.body
    const {content} = ctx.request.body
    const {beginTime} = ctx.request.body
    const {endTime} = ctx.request.body
    const {navigateType} = ctx.request.body
    const {navigateTarget} = ctx.request.body
    let {studyInfo} = ctx.request.body
    const {editor} = ctx.request.body

    assert(name, 400, "addAnnouncement params name is required");
    assert(content, 400, "addAnnouncement params content is required");
    assert(beginTime, 400, "addAnnouncement params beginTime is required");
    assert(endTime, 400, "addAnnouncement params endTime is required");
    // assert(navigateType, 400, "addAnnouncement params navigateType is required");
    // assert(navigateTarget, 400, "addAnnouncement params navigateTarget is required");
    // assert(studyInfo, 400, "addAnnouncement params studyInfo is required");
    assert(editor, 400, "addAnnouncement params editor is required");


    studyInfo = studyInfo ? studyInfo : {}

    let repetitionData = []


    if (!_.isEmpty(studyInfo)){

        let datas = await AnnouncementService.getInfoByBtAndEt2(beginTime, endTime)
        if (!_.isEmpty(datas)) {
            _.forEach(datas, d => {
                let obj = {}
                obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                obj["name"] = d.name
                // if (d.studyInfo) {
                //     if (d.studyInfo.subjectStage) {
                //         obj["subjectStage"] = d.studyInfo.subjectStage
                //         if (d.studyInfo.publishers) {
                //             obj["publishers"] = d.studyInfo.publishers
                //             if (d.studyInfo.semesters) {
                //                 obj["semesters"] = d.studyInfo.semesters
                //             }
                //         }
                //     }
                // }
                repetitionData.push(obj)
            })
        }

        let datas2 = await AnnouncementService.getInfoByBtAndEt3(beginTime, endTime)
        if (!_.isEmpty(datas2)) {
            _.forEach(datas2, d => {
                let obj = {}
                obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                obj["name"] = d.name
                if (d.studyInfo) {
                    if (d.studyInfo.subjectStage) {
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        // if (d.studyInfo.publishers) {
                        //     obj["publishers"] = d.studyInfo.publishers
                        //     if (d.studyInfo.semesters) {
                        //         obj["semesters"] = d.studyInfo.semesters
                        //     }
                        // }
                    }
                }
                repetitionData.push(obj)
            })
        }


        if (studyInfo.subjectStage) {
            let datas = await AnnouncementService.getInfoByBtAndEtAndSs2(beginTime,endTime,studyInfo.subjectStage)
            if (!_.isEmpty(datas)) {
                _.forEach(datas, d => {
                    let obj = {}
                    obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                    obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                    obj["name"] = d.name
                    obj["subjectStage"] = d.studyInfo.subjectStage


                    repetitionData.push(obj)
                })

            }
        }

        if (studyInfo.subjectStage && !studyInfo.publishers) {
            let datas = await AnnouncementService.getInfoByBtAndEtAndSs3(beginTime,endTime,studyInfo.subjectStage)
            if (!_.isEmpty(datas)) {
                _.forEach(datas, d => {
                    let obj = {}
                    obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                    obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                    obj["name"] = d.name
                    obj["subjectStage"] = d.studyInfo.subjectStage


                    repetitionData.push(obj)
                })

            }
        }

        if (studyInfo.subjectStage && studyInfo.publishers && studyInfo.publishers.length!==0){
            let subjectStage = studyInfo.subjectStage
            let publishers = studyInfo.publishers
            let sspa = await makeupSubjectStageAndPublishArr(subjectStage,publishers)

            for(let j=0; j<sspa.length; j++){
                let datas = await AnnouncementService.getInfoByBtAndEtAndSsAndPs2(beginTime,endTime,sspa[j].subjectStage,sspa[j].publishId)
                if (!_.isEmpty(datas)){
                    _.forEach(datas,d=>{
                        let obj = {}
                        obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["name"] = d.name
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        obj["publishers"] = sspa[j].publishId
                        if (d.studyInfo.semesters){
                            obj["semesters"] = d.studyInfo.semesters
                        }
                        repetitionData.push(obj)
                    })
                }
            }
        }

        if (studyInfo.subjectStage && studyInfo.publishers && studyInfo.publishers.length!==0 && !studyInfo.semesters){
            let subjectStage = studyInfo.subjectStage
            let publishers = studyInfo.publishers
            let sspa = await makeupSubjectStageAndPublishArr(subjectStage,publishers)

            for(let j=0; j<sspa.length; j++){
                let datas = await AnnouncementService.getInfoByBtAndEtAndSsAndPs3(beginTime,endTime,sspa[j].subjectStage,sspa[j].publishId)
                if (!_.isEmpty(datas)){
                    _.forEach(datas,d=>{
                        let obj = {}
                        obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["name"] = d.name
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        obj["publishers"] = sspa[j].publishId
                        if (d.studyInfo.semesters){
                            obj["semesters"] = d.studyInfo.semesters
                        }
                        repetitionData.push(obj)
                    })
                }
            }
        }

        if (studyInfo.subjectStage && studyInfo.publishers && studyInfo.publishers.length!==0 && studyInfo.semesters && studyInfo.semesters.length!==0) {
            let subjectStage = studyInfo.subjectStage
            let publishers = studyInfo.publishers
            let semesters = studyInfo.semesters
            let sspasa = await makeupSubjectStageAndPublishArrAndSemesterArr(subjectStage, publishers, semesters)

            for (let f = 0; f < sspasa.length; f++) {
                let datas = await AnnouncementService.getInfoByBtAndEtAndSsAndPsAndS(beginTime, endTime, sspasa[f].subjectStage, sspasa[f].publishId, sspasa[f].semestersId)
                if (!_.isEmpty(datas)) {
                    _.forEach(datas, d => {
                        let obj = {}
                        obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["name"] = d.name
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        obj["publishers"] = sspasa[f].publishId
                        obj["semesters"] = sspasa[f].semestersId

                        repetitionData.push(obj)
                    })
                }

            }

        }

        /////////////////////////////////////////////////////////////
    }else {
        let datas = await AnnouncementService.getInfoByBtAndEt(beginTime, endTime)
        if (!_.isEmpty(datas)) {
            _.forEach(datas, d => {
                let obj = {}
                obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                obj["name"] = d.name
                if (d.studyInfo) {
                    if (d.studyInfo.subjectStage) {
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        if (d.studyInfo.publishers) {
                            obj["publishers"] = d.studyInfo.publishers
                            if (d.studyInfo.semesters) {
                                obj["semesters"] = d.studyInfo.semesters
                            }
                        }
                    }
                }
                repetitionData.push(obj)
            })
        }
    }


    if (!_.isEmpty(repetitionData)) {

        // return ctx.body = {"code":100001,"data":repetitionData}

        let beginTime = moment(repetitionData[0].beginTime).format('YYYY-MM-DD HH:mm:ss')
        let endTime = moment(repetitionData[0].endTime).format('YYYY-MM-DD HH:mm:ss')
        return ctx.body = {code:"100001",msg:beginTime+"-至-"+endTime+"--已配置公告--"+repetitionData[0].name + " 请检查学科学段教材版本年级是否有重复"}

    }

    let data = AnnouncementService.addOneAnnouncement(name,content,beginTime,endTime,navigateTarget,navigateType,studyInfo,editor)

    if(data){
        return ctx.body = {"code":0,"data":"ok"}
    }else{
        return ctx.body = {"code":0,"data":null}
    }

}

exports.editAnnouncementInfo = async(ctx,next)=>{
    const {name} = ctx.request.body
    const {content} = ctx.request.body
    const {beginTime} = ctx.request.body
    const {endTime} = ctx.request.body
    const {navigateType} = ctx.request.body
    const {navigateTarget} = ctx.request.body
    let {studyInfo} = ctx.request.body
    const {editor} = ctx.request.body
    const {id} = ctx.request.body

    assert(name, 400, "editAnnouncementInfo params name is required");
    assert(content, 400, "editAnnouncementInfo params content is required");
    assert(beginTime, 400, "editAnnouncementInfo params beginTime is required");
    assert(endTime, 400, "editAnnouncementInfo params endTime is required");
    // assert(navigateType, 400, "editAnnouncementInfo params navigateType is required");
    // assert(navigateTarget, 400, "editAnnouncementInfo params navigateTarget is required");
    // assert(studyInfo, 400, "editAnnouncementInfo params studyInfo is required");
    assert(editor, 400, "editAnnouncementInfo params editor is required");
    assert(id, 400, "editAnnouncementInfo params id is required");

    let announcement = await AnnouncementService.getOneInfoById(id)

    if(_.isEmpty(announcement)){
        return ctx.body = {code:"100001",msg:"此条公告配置不存在！"}
    }

    studyInfo = studyInfo ? studyInfo : {}


    let repetitionData = []


    if (!_.isEmpty(studyInfo)){

        let datas = await AnnouncementService.getInfoByBtAndEt2(beginTime, endTime,id)
        if (!_.isEmpty(datas)) {
            _.forEach(datas, d => {
                let obj = {}
                obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                obj["name"] = d.name
                // if (d.studyInfo) {
                //     if (d.studyInfo.subjectStage) {
                //         obj["subjectStage"] = d.studyInfo.subjectStage
                //         if (d.studyInfo.publishers) {
                //             obj["publishers"] = d.studyInfo.publishers
                //             if (d.studyInfo.semesters) {
                //                 obj["semesters"] = d.studyInfo.semesters
                //             }
                //         }
                //     }
                // }
                repetitionData.push(obj)
            })
        }

        let datas2 = await AnnouncementService.getInfoByBtAndEt3(beginTime, endTime,id)
        if (!_.isEmpty(datas2)) {
            _.forEach(datas2, d => {
                let obj = {}
                obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                obj["name"] = d.name
                if (d.studyInfo) {
                    if (d.studyInfo.subjectStage) {
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        // if (d.studyInfo.publishers) {
                        //     obj["publishers"] = d.studyInfo.publishers
                        //     if (d.studyInfo.semesters) {
                        //         obj["semesters"] = d.studyInfo.semesters
                        //     }
                        // }
                    }
                }
                repetitionData.push(obj)
            })
        }


        if (studyInfo.subjectStage) {
            let datas = await AnnouncementService.getInfoByBtAndEtAndSs2(beginTime,endTime,studyInfo.subjectStage,id)
            if (!_.isEmpty(datas)) {
                _.forEach(datas, d => {
                    let obj = {}
                    obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                    obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                    obj["name"] = d.name
                    obj["subjectStage"] = d.studyInfo.subjectStage


                    repetitionData.push(obj)
                })

            }
        }

        if (studyInfo.subjectStage && !studyInfo.publishers) {
            let datas = await AnnouncementService.getInfoByBtAndEtAndSs3(beginTime,endTime,studyInfo.subjectStage,id)
            if (!_.isEmpty(datas)) {
                _.forEach(datas, d => {
                    let obj = {}
                    obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                    obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                    obj["name"] = d.name
                    obj["subjectStage"] = d.studyInfo.subjectStage


                    repetitionData.push(obj)
                })

            }
        }

        if (studyInfo.subjectStage && studyInfo.publishers && studyInfo.publishers.length!==0){
            let subjectStage = studyInfo.subjectStage
            let publishers = studyInfo.publishers
            let sspa = await makeupSubjectStageAndPublishArr(subjectStage,publishers)

            for(let j=0; j<sspa.length; j++){
                let datas = await AnnouncementService.getInfoByBtAndEtAndSsAndPs2(beginTime,endTime,sspa[j].subjectStage,sspa[j].publishId,id)
                if (!_.isEmpty(datas)){
                    _.forEach(datas,d=>{
                        let obj = {}
                        obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["name"] = d.name
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        obj["publishers"] = sspa[j].publishId
                        if (d.studyInfo.semesters){
                            obj["semesters"] = d.studyInfo.semesters
                        }
                        repetitionData.push(obj)
                    })
                }
            }
        }

        if (studyInfo.subjectStage && studyInfo.publishers && studyInfo.publishers.length!==0 && !studyInfo.semesters){
            let subjectStage = studyInfo.subjectStage
            let publishers = studyInfo.publishers
            let sspa = await makeupSubjectStageAndPublishArr(subjectStage,publishers)

            for(let j=0; j<sspa.length; j++){
                let datas = await AnnouncementService.getInfoByBtAndEtAndSsAndPs3(beginTime,endTime,sspa[j].subjectStage,sspa[j].publishId,id)
                if (!_.isEmpty(datas)){
                    _.forEach(datas,d=>{
                        let obj = {}
                        obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["name"] = d.name
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        obj["publishers"] = sspa[j].publishId
                        if (d.studyInfo.semesters){
                            obj["semesters"] = d.studyInfo.semesters
                        }
                        repetitionData.push(obj)
                    })
                }
            }
        }

        if (studyInfo.subjectStage && studyInfo.publishers && studyInfo.publishers.length!==0 && studyInfo.semesters && studyInfo.semesters.length!==0) {
            let subjectStage = studyInfo.subjectStage
            let publishers = studyInfo.publishers
            let semesters = studyInfo.semesters
            let sspasa = await makeupSubjectStageAndPublishArrAndSemesterArr(subjectStage, publishers, semesters)

            for (let f = 0; f < sspasa.length; f++) {
                let datas = await AnnouncementService.getInfoByBtAndEtAndSsAndPsAndS(beginTime, endTime, sspasa[f].subjectStage, sspasa[f].publishId, sspasa[f].semestersId,id)
                if (!_.isEmpty(datas)) {
                    _.forEach(datas, d => {
                        let obj = {}
                        obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                        obj["name"] = d.name
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        obj["publishers"] = sspasa[f].publishId
                        obj["semesters"] = sspasa[f].semestersId

                        repetitionData.push(obj)
                    })
                }

            }

        }

        /////////////////////////////////////////////////////////////
    }else {
        let datas = await AnnouncementService.getInfoByBtAndEt(beginTime, endTime,id)
        if (!_.isEmpty(datas)) {
            _.forEach(datas, d => {
                let obj = {}
                obj["beginTime"] = moment(d.beginTime).format('YYYY-MM-DD HH:mm:ss')
                obj["endTime"] = moment(d.endTime).format('YYYY-MM-DD HH:mm:ss')
                obj["name"] = d.name
                if (d.studyInfo) {
                    if (d.studyInfo.subjectStage) {
                        obj["subjectStage"] = d.studyInfo.subjectStage
                        if (d.studyInfo.publishers) {
                            obj["publishers"] = d.studyInfo.publishers
                            if (d.studyInfo.semesters) {
                                obj["semesters"] = d.studyInfo.semesters
                            }
                        }
                    }
                }
                repetitionData.push(obj)
            })
        }
    }


    if (!_.isEmpty(repetitionData)){
        // return ctx.body = {"code":100001,"data":repetitionData}

        let beginTime = moment(repetitionData[0].beginTime).format('YYYY-MM-DD HH:mm:ss')
        let endTime = moment(repetitionData[0].endTime).format('YYYY-MM-DD HH:mm:ss')
        return ctx.body = {code:"100001",msg:beginTime+"-至-"+endTime+"--已配置公告--"+repetitionData[0].name + "请检查学科学段教材版本年级是否有重复"}

    }

    let data = await AnnouncementService.updateOneAnnouncement(name,content,beginTime,endTime,navigateTarget,navigateType,studyInfo,editor,id)

    if(data){
        return ctx.body = {"code":0,"data":"ok"}
    }else{
        return ctx.body = {"code":0,"data":null}
    }


}



/**
 * 获取章节公告页列表
 * @param subjectStage
 * @param publishArr
 * @returns {Promise<[]>}
 */
exports.getAnnouncementList = async(ctx,next)=>{
    const {search} = ctx.request.body
    const {beginTime} = ctx.request.body
    const {endTime} = ctx.request.body
    const {filter} = ctx.request.body
    const {sort} = ctx.request.body
    const {offset} = ctx.request.body
    const {limit} = ctx.request.body


    let announcements = await AnnouncementService.getList(search,beginTime,endTime,filter,sort,offset,limit)

    console.log(announcements)
    let dataContent=[]
    _.forEach(announcements,a=>{
        let obj = {}
        obj["id"] = a._id
        obj["name"] = a.name
        obj["content"] = a.content
        obj["effectiveTime"] = a.beginTime
        obj["invalidTime"] = a.endTime
        obj["createTime"] = a.createdAt
        obj["updateTime"] = a.updatedAt
        obj["creator"] = a.creator
        obj["editor"] = a.operator
        obj["navigateType"] = a.linkType
        obj["navigateTarget"] = a.link
        obj["studyInfo"] = a.studyInfo

        if (new Date(a.endTime).getTime() < new Date().getTime()){
            obj["status"] = "abandon"
        }else if (new Date().getTime() < new Date(a.beginTime).getTime()){
            obj["status"] = "ready"
        }else {
            obj["status"] = "active"

        }
        dataContent.push(obj)
    })

    let announcementList = dataContent

    if(!_.isEmpty(filter) && filter.status && filter.status.length !==0){
        announcementList = _.filter(announcementList,a=> filter.status.includes(a.status))
    }

    let count = announcementList.length

    return ctx.body = {"code":0,
        data:{
        count:count,
         list:announcementList
        }
    }

}


/**
 * 删除公告根据公告ID
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
exports.deleteAnnouncement = async(ctx,next)=>{
    const {id} = ctx.request.body
    assert(id, 400, "deleteAnnouncement params id is required");

    let announcement = await AnnouncementService.getOneInfoById(id)

    if(_.isEmpty(announcement)){
        return ctx.body = {code:"100002",msg:"此条公告配置不存在！"}
    } //todo doucment拆表利用索引

    let flag = await AnnouncementService.deleteAnnouncement(id)

    if(!flag) return ctx.body = {"code" : "100003", "msg" : "根据id删除一个公告失败"}

    return ctx.body = {
        "code" : 0,
        "data" : "ok"
    }
}


exports.getFilters = async (ctx,next)=>{
    const {column} = ctx.request.body

    assert(column, 400, "getFilters params column is required");

    let data = await AnnouncementService.getColumn(column)

    return ctx.body = {code:0,data:data}

}

exports.getAnnouncementDetailList = async (ctx,next)=>{

    let nowTime = new Date().getTime()
    let announcementList = await AnnouncementService.getAnnouncementDetailByTime(nowTime)

    if(_.isEmpty(announcementList)) return ctx.body = {code:0,data:[]}


    let arrayData = []
    _.forEach(announcementList,a=>{
        if (!_.isEmpty(a.studyInfo) && a.studyInfo.subjectStage){
            if (a.studyInfo.publishers && a.studyInfo.publishers.length !== 0){
                if (a.studyInfo.semesters && a.studyInfo.semesters.length !==0){
                    _.forEach(a.studyInfo.publishers,b=>{
                        _.forEach(a.studyInfo.semesters,bb=>{
                            let obj={}
                            obj["stageId"] = a.studyInfo.stageId
                            obj["subjectId"] = a.studyInfo.subjectId
                            obj["publisherId"] = b
                            obj["semesterId"] = bb
                            obj["copy"] = a.content
                            obj["color"] = a.color
                            obj["link"] = a.link
                            obj["beginTime"] = a.beginTime
                            obj["endTime"] = a.endTime
                            obj["createTime"] = a.createdAt
                            obj["updateTime"] = a.updatedAt

                            arrayData.push(obj)
                        })
                    })
                }else {
                    _.forEach(a.studyInfo.publishers,c=>{
                        let obj={}
                        obj["stageId"] = a.studyInfo.stageId
                        obj["subjectId"] = a.studyInfo.subjectId
                        obj["publisherId"] = c
                        obj["semesterId"] = ""
                        obj["copy"] = a.content
                        obj["color"] = a.color
                        obj["link"] = a.link
                        obj["beginTime"] = a.beginTime
                        obj["endTime"] = a.endTime
                        obj["createTime"] = a.createdAt
                        obj["updateTime"] = a.updatedAt

                        arrayData.push(obj)
                    })

                }
            }else {
                let obj={}
                obj["stageId"] = a.studyInfo.stageId
                obj["subjectId"] = a.studyInfo.subjectId
                obj["publisherId"] = ""
                obj["semesterId"] = ""
                obj["copy"] = a.content
                obj["color"] = a.color
                obj["link"] = a.link
                obj["beginTime"] = a.beginTime
                obj["endTime"] = a.endTime
                obj["createTime"] = a.createdAt
                obj["updateTime"] = a.updatedAt

                arrayData.push(obj)
            }

        }else {
            let obj={}
            obj["stageId"] = ""
            obj["subjectId"] = ""
            obj["publisherId"] = ""
            obj["semesterId"] = ""
            obj["copy"] = a.content
            obj["color"] = a.color
            obj["link"] = a.link
            obj["beginTime"] = a.beginTime
            obj["endTime"] = a.endTime
            obj["createTime"] = a.createdAt
            obj["updateTime"] = a.updatedAt

            arrayData.push(obj)
        }

    })
    return ctx.body = {code:0,data:arrayData}

}





async function makeupSubjectStageAndPublishArr(subjectStage,publishArr) {
    let data = []
    _.forEach(publishArr,p=>{
        let obj = {}
        obj["subjectStage"] = subjectStage;
        obj["publishId"] = p;
        data.push(obj)
    })

    return data
}

async function makeupSubjectStageAndPublishArrAndSemesterArr(subjectStage,publishArr,semestersArr) {
    let data = []

    _.forEach(publishArr,p=>{
        _.forEach(semestersArr,s=>{
            let obj = {}
            obj["subjectStage"] = subjectStage;
            obj["publishId"] = p;
            obj["semestersId"] = s;
            data.push(obj)
        })
    })
    return data
}

// _.forEach(studyInfo,s=>{
//     //学科学段为空,则版本和年级也必为空
//     if (!s.subjectStage){
//
//     }else{
//         //如果学科学段不为空，版本为空，则年级必为空
//         if (s.publishers.length===0){
//
//             //学科学段不为空，版本为不为空，则年级为空或者不空
//         }else {
//             //学科学段不为空，版本不为空，年级为空
//             if (s.semesters.length===0){
//
//                 //学科学段不为空，版本不为空，年级不空
//             }else {
//
//             }
//         }
//     }
// })


// for (let i=0; i<studyInfo.length; i++){
//     let subjectStage = ""
//     let publishers = []
//     let semesters = []
//     //学科学段为空,则版本和年级也必为空
//     if (!studyInfo[i].subjectStage){
//         let datas = await AnnouncementService.getInfoByBtAndEt(beginTime,endTime)
//         if (!_.isEmpty(datas)){
//             throw new Error(beginTime+"-至-"+endTime+"-已配置公告--"+name);
//         }
//     }else{
//         //如果学科学段不为空，版本为空，则年级必为空
//         if (studyInfo[i].publishers.length===0){
//             subjectStage = studyInfo[i].subjectStage
//             let datas = await AnnouncementService.getInfoByBtAndEtAndSs(beginTime,endTime,subjectStage)
//
//             if (!_.isEmpty(datas)){
//                 throw new Error(beginTime+"-至-"+endTime+"-已配置公告--"+name);
//             }
//             //学科学段不为空，版本为不为空，则年级为空或者不空
//         }else {
//             //学科学段不为空，版本不为空，年级为空
//             if (studyInfo[i].semesters.length===0){
//                 subjectStage = studyInfo[i].subjectStage
//                 publishers = studyInfo[i].publishers
//                 let sspa = await makeupSubjectStageAndPublishArr(subjectStage,publishers)
//
//                 for(let j=0; j<sspa.length; j++){
//                     let datas = await AnnouncementService.getInfoByBtAndEtAndSsAndPs(beginTime,endTime,sspa[j].subjectStage,sspa[j].publishId,id)
//                     if (!_.isEmpty(datas)){
//                         throw new Error(beginTime+"-至-"+endTime+"-已配置公告--"+name);
//                     }
//                 }
//
//                 //学科学段不为空，版本不为空，年级不空
//             }else {
//                 subjectStage = studyInfo[i].subjectStage
//                 publishers = studyInfo[i].publishers
//                 semesters = studyInfo[i].semesters
//                 let sspasa = await makeupSubjectStageAndPublishArrAndSemesterArr(subjectStage,publishers,semesters)
//
//                 for(let f=0; f<sspasa.length; f++){
//                     let datas = await AnnouncementService.getInfoByBtAndEtAndSsAndPsAndS(beginTime,endTime,sspasa[f].subjectStage,sspasa[f].publishId,sspasa[f].semestersId,id)
//                     console.log(datas)
//                     if (!_.isEmpty(datas)){
//                         // return ctx.body = "保存失败"
//                         throw new Error(beginTime+"-至-"+endTime+"-已配置公告--"+name);
//
//                     }
//                 }
//
//             }
//         }
//     }
// }

