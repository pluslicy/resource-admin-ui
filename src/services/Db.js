import request from '@/utils/request';
import qs from 'qs';
/* 封装所有的异步请求 */
export async function findAllCata() {
  return request('/api/mp_man_catalog/catanestlist/');
}

export async function findAllVideo(param) {
 
  return request('/api/mp_man_res/videolist/', {
    method: 'get',
    params: param,
    getResponse: true,
  });
}
export async function findAllText(param) {
  return request('/api/mp_man_res/docslist/', {
    method: 'get',
    params: param,
    getResponse: true,
  })
}