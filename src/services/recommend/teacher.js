import request from '@/utils/request';
/**
 * @Description: 模块管理>资源榜单>教师推荐页面
 * @PageAuthor: rendc
 * @Date: 2019-11-22 10:27:45
 */

var baseURL = 'http://10.0.6.5:16012';

export async function findAll() {
  return request(baseURL + '/mp_man_module/get_default_docslist/');
}
// 自定义榜单(5项)
export async function findCustomWordrank() {
  return request(baseURL + '/mp_man_module/get_custom_docsrank/');
}
// 自定义榜单
export async function findCustomWordlist() {
  return request(baseURL + '/mp_man_module/get_custom_docslist/');
}
// 自定义榜单搜索
export async function findByName(value) {
  return request(baseURL + '/mp_man_module/get_custom_docslist/?search=' + value);
}
// 删除自定义文档榜单
export async function deldocsrank(value) {
  return request.post(baseURL + '/mp_man_module/del_custom_docsrank/' + value + '/');
}
