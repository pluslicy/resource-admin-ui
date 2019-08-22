import request from '@/utils/request';
import qs from 'qs';
/* 封装所有的异步请求 */
export async function findAllCata() {
  return request('/api/mp_man_catalog/catanestlist/');
}
export async function findAllVideoDalBum() {
  return request('/api/up_man_perres/up_valbum/');
}
export async function findAllTextDalBum() {
  return request('/api/up_man_perres/up_dalbum/');
}

export async function findAllVideo(param) {
  return request('/api/mp_man_res/videolist/', {
    method: 'get',
    params: param,
    getResponse: true,
  });
}
export async function findAllText(param) {
  return request('/api/mp_man_res/docslist/', {
    method: 'get',
    params: param,
    getResponse: true,
  })
}
export async function DeleteAllText(param) {

  return request('/api/mp_man_res/del_docs/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
export async function UpdateTextBian(param) {

  return request('/api/mp_man_res/set_docs_cata/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
export async function UpdateVideoBian(param) {

  return request('/api/mp_man_res/set_video_cata/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
export async function DeleteAllVideo(param) {

  return request('/api/mp_man_res/del_videos/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
//设置文档资源的状态
export async function EnableOrFreeze(param) {

  return request('/api/mp_man_res/set_docs_frozen/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
//设置视频资源的状态
export async function EnableOrFreezeVideo(param) {
  return request('/api/mp_man_res/set_video_frozen/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
//设置文档资源的权限
export async function PermissionText(param) {
  return request('/api/mp_man_res/set_docs_permis/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
//设置视频资源权限
export async function PermissionVideo(param) {
  return request('/api/mp_man_res/set_video_permis/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}