import request from '@/utils/request';

export async function findAll() {
  return request('http://10.0.6.5:16012/mp_audit_res/unau_doclist/');
}


export async function fetchCheck(check) {
  return request('http://10.0.6.5:16012/mp_audit_res/audit_doc', {
    method: 'post',
    params: check,
    getResponse: true,
  });
}
