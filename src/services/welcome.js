import request from '@/utils/request';

/**
 * @Description: 首页数据请求
 * @PageAuthor: rendc
 * @Date: 2019-12-11 10:21:40
 */

var baseURL = 'http://139.224.221.31:11000';

export async function findAll() {
  return request(baseURL + '/mp_man_statistics/statistics_list/');
};

export async function findMonth(param) {
  return request(baseURL + '/mp_man_statistics/month_statistics_list/?year='+param[0]+'&month='+param[1]+'&days='+param[2]);
}

// 待审核视频
export async function unauVideolist() {
  return request(baseURL + '/mp_audit_res/unau_videolist/?vr_audit_status=0');
}
// 待审核文档
export async function unauDoclist() {
  return request(baseURL + '/mp_audit_res/unau_doclist/?dr_status=0');
}
// 待审核评论
export async function commentlist() {
  return request(baseURL + '/mp_audit_res/unaudit_comment_list/?page_size=99&comment_status=0');
}