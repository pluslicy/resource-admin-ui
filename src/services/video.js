import request from '@/utils/request';

export async function findAll() {
  return request('http://10.0.6.5:16012/mp_audit_res/unau_videolist');
}


export async function fetchCheck(param) {
  console.log(param)
  return request('http://10.0.6.5:16012/mp_audit_res/audit_video/', {
    method: 'post',
    data: qs.stringify(param),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    getResponse: true,
  });
}

