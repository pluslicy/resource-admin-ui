import request from "@/utils/request"

var baseURL='http://10.0.6.5:16012'

//查询所有
export async function findAll(){
    return request(baseURL+"/mp_man_module/get_certification_list/");
}
//批量通过
export async function passAll(ids) {
    var obj = {
      ids: ids,
    };
    return request(baseURL + '/mp_man_module/audit_certification/', {
      method: 'post',
      data: obj,
      headers: { 'Content-Type': 'application/json' },
      getResponse: true,
    });
  }
  