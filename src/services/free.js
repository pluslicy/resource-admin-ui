import request from '@/utils/request';
import qs from 'qs';

/* 封装所有的异步请求 */
var baseURL='http://139.224.221.31:11000'
// 查询所有免费视频
export async function queryFree() {
  return request(baseURL+'/mp_man_res/freevideolist/');
}
// 自定义列表
export async function queryList() {
  return request(baseURL+'/mp_man_module/free_resource_custom_view');
}
// 添加免费视频
export async function AddFree(param) {
  return request(baseURL + '/mp_man_module/free_resource_custom/', {
    method: 'post',
    // {[{"object_id": 1, "object_type":"video"}, {},{}]}
    data:param,
    headers: { 'Content-Type': 'application/json' },
  }
  );

}






