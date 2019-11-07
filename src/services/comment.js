import request from '@/utils/request';

export async function findAllComment() {
  return request('/api/mp_man_comments/commentlist/');
}

export async function fetchCheck(param) {
  return request('/api/mp_man_comments/auditcomment/', {
    method: 'post',
    data: {
      ...param,
    },
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}
