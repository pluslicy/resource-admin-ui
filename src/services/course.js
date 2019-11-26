import request from '@/utils/request';
import qs from 'qs';
/* 封装所有的异步请求 */
var baseURL='http://10.0.6.5:16012'
export async function query() {
  return request(baseURL+'/manager/course/findAllCourse');
}

export async function saveOrUpdate(param) {
  return request(baseURL+'/manager/course/saveOrUpdate', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
