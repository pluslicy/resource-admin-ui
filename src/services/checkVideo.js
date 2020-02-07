import request from '@/utils/request';
import qs from 'qs';
/* 封装所有的异步请求 */
var baseURL='http://139.224.221.31:11000'
export async function query() {
  return request(baseURL+'/manager/course/findAllCourse');
}
