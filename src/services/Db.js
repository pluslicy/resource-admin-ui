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
//上传文档资源
export async function UploadOneOrMore(param) {
  return request('/api/up_man_perres/up_docsupload/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
export async function UploadVideoOneOrMore(param) {
  return request('/api/up_man_perres/up_videoupload/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
// 创建文档专辑
export async function CreateAlbum(param) {
  return request('/api/up_man_perres/up_cre_dalbum/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}
// 创建视频专辑
export async function CreateVideoAlbum(param) {
  return request('/api/up_man_perres/up_cre_valbum/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"application/json"},
    getResponse: true,
  })
}

export async function UploadAttach(param) {
  return request('http://10.0.6.5:53001/FileStorageApp/create_resource/', {
    method: 'post',
    data:param,
    headers:{"Content-Type":"multipart/form-data"},
    getResponse: true,
    responseType:'application/json',
  })
}