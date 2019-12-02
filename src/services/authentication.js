import request from "@/utils/request"

var baseURL='http://10.0.6.5:16012'

//查询所有
export async function findAll(){
    return request(baseURL+"/mp_man_module/get_certification_list/");
}
//批量通过
export async function passAndPassAll(param) {
    return request(baseURL + '/mp_man_module/audit_certification/', {
      method: 'post',
      data:param,
      headers: { 'Content-Type': 'application/json' },
      getResponse: true,
    });
  }

//拒绝审核
export async function reject(param) {
  // var obj = {
  //   ids: ids,
  // };
  return request(baseURL + '/mp_man_module/unaudit_certification/', {
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}