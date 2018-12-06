// /*
// 'use strict'
//
// const request = require('../../lib/request');
// const config = require('../../config');
// const assert = require('http-assert')
//
// class ClassSupervision  {
// 	static *getDayPlanData (dayPlanId, planId, number) {
//
// 		let url = `${config.course.host}/class-supervision/preview/dayPlan/data?1=1`;
//
// 		if (dayPlanId) {
// 			url += `&dayPlanId=${dayPlanId}`;
// 		}
//
// 		if (planId) {
// 			url += `&planId=${planId}`;
// 		}
//
// 		if (number) {
// 			url += `&number=${number}`;
// 		}
//
// 		const {body: dayPlanData} = yield request({
// 			method: 'get',
// 			url
// 		});
//
// 		return dayPlanData
// 	}
//
// 	static *getPlacementExamProblems (chapterId) {
// 		const {body: problems} = yield request({
// 			method: 'get',
// 			url: `${config.course.host}/class-supervision/review/placement/exam/problems?chapterId=${chapterId}`
// 		});
//
// 		return problems;
// 	}
//
// 	static *getDayPlansData (planId) {
// 		const {body: dayPlansData} = yield request({
// 			method: 'get',
// 			url: `${config.course.host}/class-supervision/preview/dayPlans/data?planId=${planId}`
// 		});
//
// 		return dayPlansData;
// 	}
//
// 	static *getPlanData (planId) {
// 		const {body: planData} = yield request({
// 			method: 'get',
// 			url: `${config.course.host}/class-supervision/plan/data?planId=${planId}`
// 		});
//
// 		return planData;
// 	}
//
// 	static *getPlanList (planIds, level) {
//
// 		const {body: planList} = yield request({
// 			method: 'post',
// 			url: `${config.course.host}/class-supervision/plan/list`,
// 			body: {planIds, level}
// 		});
//
// 		return planList;
// 	}
//
// 	static *getDayPlanInfo (dayPlanId, planId, number) {
//
// 		let url = `${config.course.host}/class-supervision/preview/dayPlan/info?1=1`;
//
// 		if (dayPlanId) {
// 			url += `&dayPlanId=${dayPlanId}`;
// 		}
//
// 		if (planId) {
// 			url += `&planId=${planId}`;
// 		}
//
// 		if (number) {
// 			url += `&number=${number}`;
// 		}
//
// 		const {body: dayPlanInfo} = yield request({
// 			method: 'get',
// 			url
// 		});
//
// 		return dayPlanInfo;
// 	}
//
// 	static *getHelpVideo (dayPlanId) {
// 		const {body: video} = yield request({
// 			method: 'get',
// 			url: `${config.course.host}/class-supervision/preview/dayPlan/helpVideo?dayPlanId=${dayPlanId}`
// 		});
// 		return video;
// 	}
//
// 	static *getPreviewAfterExamProblem (dayPlanId) {
// 		const {body: problems} = yield request({
// 			method: 'get',
// 			url:  `${config.course.host}/class-supervision/preview/after/exam/problem?dayPlanId=${dayPlanId}`
// 		});
// 		return problems;
// 	}
//
// 	static *getPreviewAfterExamProblemCount (dayPlanId) {
// 		const {body: afterExamProblemCount} = yield request({
// 			method: 'get',
// 			url: `${config.course.host}/class-supervision/preview/after/exam/problem/count?dayPlanId=${dayPlanId}`
// 		});
//
// 		return afterExamProblemCount;
// 	}
//
// 	static *getReviewAfterExamProblemCount (topicIds) {
// 		const {body: afterExamProblemCount} = yield request({
// 			method: 'post',
// 			url: `${config.course.host}/class-supervision/review/after/exam/problem/count`,
// 			body: {topicIds}
// 		});
//
// 		return afterExamProblemCount;
// 	}
//
// 	static *getReviewAfterExamProblems (topicIds) {
// 		const {body: afterExamProblem} = yield request({
// 			method: 'post',
// 			url: `${config.course.host}/class-supervision/review/after/exam/problem`,
// 			body: {topicIds}
// 		});
//
// 		return afterExamProblem;
// 	}
//
// 	static *getWrongProblemDetail (problemIds) {
// 		const {body: problems} = yield request({
// 			"method": "POST",
// 			"url": `${config.course.host}/class-supervision/wrongProblem/detail`,
// 			"body": {problemIds}
// 		});
//
// 		return problems;
// 	}
//
// 	static *getStudyContent (sectionIds, level) {
//
// 		const {body: content} = yield request({
// 			"method": "post",
// 			"url": `${config.course.host}/class-supervision/review/study/content`,
// 			"body": {sectionIds, level}
// 		});
//
// 		return content;
// 	}
//
// 	static *getReviewBeforeExamProblem (sectionIds, level) {
// 		let {body: problems} = yield request({
// 			method: 'POST',
// 			url: `${config.course.host}/class-supervision/review/before/exam/problems`,
// 			body: {sectionIds, level}
// 		});
//
// 		return problems;
// 	}
//
// 	static *getSectionList (planId) {
// 		let {body: sections} = yield request({
// 			method: 'GET',
// 			url: `${config.course.host}/class-supervision/review/section/list?planId=${planId}`
// 		});
//
// 		return sections;
// 	}
//
// 	static *getReviewCourseSummary (sectionIds, level) {
//
// 		const {body: courseSummary} = yield request({
// 			"method": "post",
// 			"url": `${config.course.host}/class-supervision/review/study/course/summary`,
// 			"body": {sectionIds, level}
// 		});
//
// 		return courseSummary;
// 	}
//
// 	static *getTopicCountBySectionIds (sectionIds, level) {
// 		const {body: topicCount} = yield request({
// 			"method": "post",
// 			"url": `${config.course.host}/class-supervision/review/topic/count`,
// 			"body": {sectionIds, level}
// 		});
//
// 		return topicCount;
// 	}
//
// 	static *getReviewExamProblems (sectionIds, level) {
// 		const {body: problems} = yield request({
// 			"method": "post",
// 			"url": `${config.course.host}/class-supervision/review/exam/problems`,
// 			"body": {sectionIds, level}
// 		});
//
// 		return problems;
// 	}
//
// 	static *getClassChapters (chapterIds) {
// 		const {body: classChapters} = yield request({
// 			"method": "post",
// 			"url": `${config.course.host}/class-supervision/review/class/chapters`,
// 			"body": {chapterIds}
// 		});
//
// 		return classChapters;
// 	}
// }
//
// class Problem {
// 	static *getDetails (problemIds) {
// 		assert(Array.isArray(problemIds), 400, 'problemsId need array');
//
// 		if (!problemIds.length) return [];
//
// 		const {body: problemDetails} = yield request({
// 			method: 'post',
// 			url: `${config.course.host}/problem/details`,
// 			body: {problemIds}
// 		});
//
// 		return problemDetails;
// 	}
//
// 	static *getProblemsWithChapter (problemIds) {
// 		assert(Array.isArray(problemIds), 400, 'problemsId need array');
//
// 		if (!problemIds.length) return [];
//
// 		const {body: problemsWithChapter} = yield request({
// 			method: 'post',
// 			url: `${config.course.host}/problem/with/chapter`,
// 			body: {problemIds}
// 		});
//
// 		return problemsWithChapter;
// 	}
// }
//
// class Topic {
// 	static *getTopicsTree (topicId) {
// 		const {body: topicsTree} = yield request({
// 			method: 'POST',
// 			url: `${config.course.host}/course/topic/tree`,
// 			body: {topicsId: [topicId]}
// 		});
//
// 		return topicsTree;
// 	}
//
// 	static *getTopicTree (topicId) {
// 		const {body: topicTree} = yield request({
// 			method: 'get',
// 			url: `${config.course.host}/course/topic/tree?topicId=${topicId}`
// 		});
//
// 		return topicTree;
// 	}
//
// 	static *getTopics (topicIds) {
// 		const {body: topics} = yield request({
// 			method: 'post',
// 			url: `${config.course.host}/course/topic/data`,
// 			body: {topicIds}
// 		});
//
// 		return topics;
// 	}
// }
//
// class Chapter {
// 	static *getChapterData (chapterId) {
// 		const {body: chapter} = yield request({
// 			"method": "GET",
// 			"url": `${config.course.host}/chapter/data?chapterId=${chapterId}`
// 		});
//
// 		return chapter;
// 	}
//
// 	static *getChaptersData (chapterIds) {
// 		const {body: chapters} = yield request({
// 			"method": "POST",
// 			"url": `${config.course.host}/chapter/data`,
// 			"body": {chapterIds}
// 		});
//
// 		return chapters;
// 	}
//
// 	static *getChapterList () {
// 		const {body: chapters} = yield request({
// 			"method": "GET",
// 			"url": `${config.course.host}/chapter/list`
// 		});
//
// 		return chapters;
// 	}
// }
//
// class Section {
// 	static *getSectionsData (sectionIds) {
//
// 		const {body: sections} = yield request({
// 			method: 'POST',
// 			url: `${config.course.host}/course/section/info`,
// 			body: {sectionIds}
// 		});
//
// 		return sections;
// 	}
//
// 	static *getSectionsWithChapter (sectionIds) {
//
// 		const {body: sectionsWithChapter} = yield request({
// 			method: 'POST',
// 			url: `${config.course.host}/course/section/with/chapter/info`,
// 			body: {sectionIds}
// 		});
//
// 		return sectionsWithChapter;
// 	}
// }
//
// class Video {
// 	static *getVideo (videoId) {
// 		const {body: video} = yield request({
// 			"method": "GET",
// 			"url": `${config.course.host}/course/video/${videoId}/data`
// 		});
//
// 		return video;
// 	}
//
// 	static *getVideos (videoIds) {
// 		const {body: videos} = yield request({
// 			"method": "POST",
// 			"url": `${config.course.host}/course/video/list`,
// 			"body": {videoIds}
// 		});
//
// 		return videos;
// 	}
//
// 	static *getClassSupervisionHelpVideo () {
// 		const {body: videos} = yield request({
// 			"method": "GET",
// 			"url": `${config.course.host}/course/video/help/classSupervision`
// 		});
//
// 		return videos;
// 	}
// }
//
//
// module.exports = {
// 	ClassSupervision,
// 	Problem,
// 	Topic,
// 	Chapter,
// 	Section,
// 	Video
// }*/
