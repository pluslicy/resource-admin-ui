import request from '@/utils/request';
/**
 * @Description: 模块管理>资源榜单>文档榜单
 * @ClassAuthor: rendc
 * @Date: 2019-11-08 16:27:59
 */

var baseURL = 'http://139.224.221.31:11000';

export async function findAll(value) {
  return request(baseURL + '/mp_man_module/get_default_docslist/?' + value);
}
// 查找自定义文档榜单(5项)
export async function findCustomWordrank() {
  return request(baseURL + '/mp_man_module/get_custom_docsrank/');
}
// 添加自定义文档榜单
export async function addCustomWordrank(value) {
  return request.post(baseURL + '/mp_man_module/add_custom_docsrank/', {
    method: 'post',
    data: {
      ...value,
    },
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}
// 删除自定义文档榜单
export async function delrank(value) {
  return request.post(baseURL + '/mp_man_module/del_custom_docsrank/' + value + '/');
}
// 改变自定义文档榜单顺序
export async function changeOrderWordrank(value) {
  return request.post(baseURL + '/mp_man_module/change_order_docsrank/', {
    method: 'post',
    data: {
      ...value,
    },
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}
// 自定义榜单
export async function findCustomWordlist(value) {
  return request(baseURL + '/mp_man_module/get_custom_docslist/?' + value);
}
// 自定义榜单搜索
export async function findByName(value) {
  return request(baseURL + '/mp_man_module/get_custom_docslist/?search=' + value);
}
