import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */

// 查询所有用户
export async function queryUsers() {
  return request('/api/mp_man_users/userlist/');
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
export async function AddRole(param) {
  return request('/api/mp_man_users/cre_user/', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
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


 

