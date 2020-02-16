import request from '@/utils/request';

var baseURL='http://139.224.221.31:11000'

//查询所有
export async function findAllNews(){
    return request(baseURL+"/mp_man_module/get_latestresources_list/");
}

//查询视频
export async function findAllVideos(param){
    return request(baseURL+"/mp_man_res/videolist/",{
        method:'get',
        params:param,
        getResponse: true,
      });
}

//设置视频资源权限
export async function PermissionVideo(param) {
    return request(baseURL+'/mp_man_res/set_video_permis/', {
      method: 'post',
      data:param,
      headers:{"Content-Type":"application/json"},
      getResponse: true,
    })
  }