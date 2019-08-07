import request from '@/utils/request';

export async function findAll() {
  return request('http://10.0.6.5:16012/mp_audit_res/unau_doclist/',{}); 
}


export async function fetchCheck(param) {
  return request('http://10.0.6.5:16012/mp_audit_res/audit_doc/', {
    method: 'post',
    data: {
			...param,
    },
	headers: { 'Content-Type': 'application/json' },    
    getResponse: true,
  });
}

export async function findByCondidtion(dateString) {
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
	return request('http://10.0.6.5:16012/mp_audit_res/unau_doclist/?search=' + value + '&dr_created_time_start=' + startDate + '&dr_created_time_end=' + endDate);
}

export async function passWord(ids) {
	var obj = {
		"ids": ids
	}
	console.log(obj)
	return request('http://10.0.6.5:16012/mp_audit_res/audit_docs/', {
		method: 'post',
		data: obj,
		headers: { 'Content-Type': 'application/json' },
		getResponse: true,
	});
}
