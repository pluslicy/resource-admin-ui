import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */

// 查询所有权限
export async function queryPrivilege() {
  return request('/api/mp_man_permissions/permislist/');
}

