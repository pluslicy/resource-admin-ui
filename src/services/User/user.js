import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */

// 查询所有用户
export async function queryUsers(param) {
  return request('/api/mp_man_users/userlist/',{
    method:'get',
    params:param
  });
}

// 查询所有角色
export async function queryRoles() {
    return request('/api/mp_man_users/rolelist/');
  }
// 删除用户
export async function DeleteAllUsers(param) {
  return request('/api/mp_man_users/del_user/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
// 添加用户
export async function AddUser(param) {
  return request('/api/mp_man_users/cre_user/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 设置用户启用/冻结
export async function EnableOrFreeze(param) {
  return request('/api/mp_man_users/set_frozen/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}


 

