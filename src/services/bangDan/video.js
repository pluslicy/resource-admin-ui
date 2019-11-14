import request from '@/utils/request';
/*
 *@Description: 模块管理>资源榜单>视频榜单
 *@ClassAuthor: rendc
 *@Date: 2019-11-08 16:27:59
 */

var baseURL = 'http://10.0.6.5:16012';

export async function findAll() {
  return request(baseURL + '/mp_man_module/get_default_videolist/');
}
// 自定义榜单(5项)
export async function findCustomVideorank() {
  return request(baseURL + '/mp_man_module/get_custom_videorank/');
}
// 自定义榜单
export async function findCustomVideolist() {
  return request(baseURL + '/mp_man_module/get_custom_videolist/');
}
