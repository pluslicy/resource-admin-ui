import request from '@/utils/request';

export async function findAll() {
	return request('http://10.0.6.5:16012/mp_audit_res/unau_videolist');
}

export async function fetchCheck(param) {
	return request('http://10.0.6.5:16012/mp_audit_res/audit_video/', {
		method: 'post',
		// 方法一
		// body:JSON.stringify(param),
		// 方法二
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
	return request('http://10.0.6.5:16012/mp_audit_res/unau_videolist/?search=' + value + '&vr_created_time_start=' + startDate + '&vr_created_time_end=' + endDate);
}

export async function passVideo(ids) {
	var obj = {
		"ids": ids
	}
	return request('http://10.0.6.5:16012/mp_audit_res/audit_videos/', {
		method: 'post',
		data: obj,
		headers: { 'Content-Type': 'application/json' },
		getResponse: true,
	});
}