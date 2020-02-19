import request from '@/utils/request';

var baseURL='http://139.224.221.31:11000'

//查询文档
export async function findAllDocs(param){
    return request(baseURL+"/mp_man_res/docslist/",{
        method:'get',
        params:param,
        getResponse: true,
      });
}

//设置文档资源权限
export async function PermissionDocs(param) {
    return request(baseURL+'/mp_man_res/set_docs_permis/', {
      method: 'post',
      data:param,
      headers:{"Content-Type":"application/json"},
      getResponse: true,
    })
}
// 更新资源
export async function updateNews(param) {
  return request(baseURL + '/mp_man_module/update_latestresources/', {
    method: 'post',
    data: param,
  });
}
