import request from '@/utils/request';
import qs from 'qs';
import Paragraph from 'antd/lib/typography/Paragraph';

/* 封装所有的异步请求 */
var baseURL = 'http://10.0.6.5:16012';
// 查询所有角色
export async function queryRole() {
  return request(baseURL + '/mp_man_roles/rolelist/');
}
// 查询所有编目
export async function queryCatalog() {
  return request(baseURL + '/mp_man_catalog/catanestlist/');
}
// 查询前台权限
export async function queryPermission(param) {
  return request(baseURL + '/mp_man_permissions/permissiontree/', { params: param });
}

//修改角色
export async function UpdateRole(param) {
  return request(baseURL + '/mp_man_roles/mod_role/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 添加角色
export async function AddRole(param) {
  return request(baseURL + '/mp_man_roles/cre_role/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 设置用户启用/冻结
export async function EnableOrFreeze(param) {
  return request(baseURL + '/mp_man_roles/set_frozen/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}

// 设置角色权限
export async function rolePerms(param) {
  return request(baseURL + '/mp_man_roles/set_perms/', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 删除用户
export async function DeleteAll(param) {
  return request(baseURL + '/mp_man_roles/del_role/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}
