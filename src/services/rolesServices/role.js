import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */

// 查询所有角色
export async function queryRole() {
  return request('/api/mp_man_roles/rolelist/');
}

// 查询所有权限
export async function queryPer() {
  return request('api/mp_man_roles/permlist/');
}

//修改角色
export async function UpdateRole(param) {
  return request('/api/mp_man_roles/mod_role/', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 添加角色
export async function AddRole(param) {
  return request('/api/mp_man_roles/cre_role/', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 设置角色启用/冻结
export async function forzenRole(param) {
  return request('/api/mp_man_roles/set_frozen/', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 设置角色权限
export async function rolePerms(param) {
  return request('/api/mp_man_roles/set_perms/', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
  // 删除角色
  export async function deleteRole(id) {
    return request('/api/mp_man_roles/del_role', { params: id });
  }

 
