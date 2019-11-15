import request from '@/utils/request';

export async function findAllReply() {
	return request('/api/mp_man_comments/commentlist/?comment_type=2');
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

export async function batchPass(param) {
	return request('/api/mp_man_comments/auditscomment/', {
		method: 'post',
		data: param,
		headers: { 'Content-Type': 'application/json' },
		getResponse: true,
	});
}

export async function findByCondidtions(dateString) {
	var startDate = '';
	var endDate = '';
	var value = '';
	if (dateString[0] != undefined) {
		var dateString1 = dateString[0];
		startDate = dateString1[0];
		endDate = dateString1[1];
	}
	if (dateString[1] != undefined) {
		value = dateString[1];
	}
	return request('/api/mp_man_comments/commentlist/?comment_type=2'+'&search=' + value + '&time_start=' + startDate + '&time_end=' + endDate);
}

export async function findReplyById(param) {
	return request('/api/mp_man_comments/commentcontext/?id='+param, {
		method: 'get',
		getResponse: true,
	  });
}