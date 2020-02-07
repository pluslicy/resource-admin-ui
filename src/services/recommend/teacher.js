import request from '@/utils/request';
/**
 * @Description: 模块管理>资源榜单>教师推荐页面
 * @PageAuthor: rendc
 * @Date: 2019-11-22 10:27:45
 */

var baseURL = 'http://139.224.221.31:11000';


// 获取一级编目列表
export async function getLevelonecata() {
  return request(baseURL + '/mp_man_module/get_levelonecata/');
}

// 获取自定义教师榜单列表
export async function getCustomTeacherrank(catalogue) {
  return request(baseURL + '/mp_man_module/get_custom_teacherrank/?catalogue=' + catalogue);
}

// 教师推荐 - 教师列表
export async function getTeacherrankList(catalogue) {
  return request(baseURL + '/mp_man_module/get_teacherrank_list/?catalogue=' + catalogue);
}

// 改变自定义教师榜单顺序
export async function changeOrderTeacherrank(value) {
  return request.post(baseURL + '/mp_man_module/change_order_teacherrank/ ', {
    method: 'post',
    data: {
      ...value,
    },
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}

// 添加自定义教师榜单
export async function addCustomTeacherrank(value) {
  return request.post(baseURL + '/mp_man_module/add_custom_teacherrank/', {
    method: 'post',
    data: {
      ...value,
    },
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}
// 删除自定义教师榜单
export async function delrank(value) {
  return request.post(baseURL + '/mp_man_module/del_custom_teacherrank/' + value + '/');
}

