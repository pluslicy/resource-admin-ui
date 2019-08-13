import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */

// 查询所有编目
export async function queryCatalog() {
  return request('/api/mp_man_catalog/catanestlist/');
}

//修改编目
export async function UpdateCatalog(param) {
  return request('/api/mp_man_catalog/mod_catalevel/', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}

// 添加编目
export async function AddCatalog(param) {
  return request('/api/mp_man_catalog/cre_cata/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 删除编目
export async function deleteCatalog(id) {
    return request('/api/mp_man_catalog/del_cata/', { params: id });
}

 

