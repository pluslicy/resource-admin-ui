import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */
var baseURL='http://10.0.6.5:16012'
// 查询所有编目
export async function queryCatalog() {
  return request(baseURL+'/mp_man_catalog/catanestlist/');
}

//修改编目
export async function UpdateCatalog(param) {
  return request(baseURL+'/mp_man_catalog/mod_cataname/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
  });
}
// 修改编目层级
export async function UpdataCatalogCen(param) {
  return request(baseURL+'/mp_man_catalog/mod_catapath/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 添加编目
export async function AddCatalog(param) {
  return request(baseURL+'/mp_man_catalog/cre_cata/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
  });
}

// 删除编目
export async function deleteCatalog(id) {
    return request(baseURL+'/mp_man_catalog/del_cata/',{ method: 'post',
        data: id,
        headers: { 'Content-Type': 'application/json' },
        getResponse:true
      })
}

 

