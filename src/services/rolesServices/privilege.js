import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */
var baseURL='http://139.224.221.31:11000'
// 查询所有权限
export async function queryPrivilege() {
  return request(baseURL+'/mp_man_permissions/permislist/');
}

// 设置用户启用/冻结
export async function EnableOrFreeze(param) {
  return request(baseURL+'/mp_man_permissions/frozen_permis/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}



