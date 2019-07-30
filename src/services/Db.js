import request from '@/utils/request';
import qs from 'qs';
/* 封装所有的异步请求 */
export async function findAllCata() {
  return request('/api/mp_man_catalog/catalist/');
}
