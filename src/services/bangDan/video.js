import request from '@/utils/request';
/** 
 * @Description: 模块管理>资源榜单>视频榜单页面
 * @ClassAuthor: rendc
 * @Date: 2019-11-08 16:27:59
 */

var baseURL = 'http://10.0.6.5:16012';

export async function findAll() {
  return request(baseURL + '/mp_man_module/get_default_videolist/');
}
// 查找自定义视频榜单(5项)
export async function findCustomVideorank() {
  return request(baseURL + '/mp_man_module/get_custom_videorank/');
}
// 添加自定义视频榜单
export async function addCustomVideorank(value) {
  return request.post(baseURL + '/mp_man_module/add_custom_videorank/', {
    method: 'post',
    data: {
      ...value,
    },
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}
// 删除自定义视频榜单
export async function delrank(value) {
  return request.post(baseURL + '/mp_man_module/del_custom_videorank/' + value + '/');
}
// 改变自定义视频榜单顺序
export async function changeOrderVideorank(value) {
  return request.post(baseURL + '/mp_man_module/change_order_videorank/', {
    method: 'post',
    data: {
      ...value,
    },
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}
// 自定义榜单
export async function findCustomVideolist() {
  return request(baseURL + '/mp_man_module/get_custom_videolist/');
}
// 自定义榜单搜索
export async function findByName(value) {
  return request(baseURL + '/mp_man_module/get_custom_videolist/?search=' + value);
}