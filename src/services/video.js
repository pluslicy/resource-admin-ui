import request from '@/utils/request';

/*
 *@Description:
 *@ClassAuthor: rendc
 *@Date: 2019-8-08 16:28:57
 */

var baseURL = 'http://10.0.6.5:16012';

export async function findAll(param) {
  return request(baseURL + '/mp_audit_res/unau_videolist/',{
    method:'get',
    params:param
  });
}

export async function fetchCheck(param) {
  return request(baseURL + '/mp_audit_res/audit_video/', {
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
  // dateString = {[startDate,endDate],value}
  console.log('dateString:' + dateString);
  if (dateString[0] != undefined) {
    var dateString1 = dateString[0];
    startDate = dateString1[0];
    endDate = dateString1[1];
  }
  if (dateString[1] != undefined) {
    value = dateString[1];
  }
  console.log('startDate:' + startDate + 'endDate:' + endDate + 'value:' + value);
  console.log(
    baseURL +
      '/mp_audit_res/unau_videolist/?search=' +
      value +
      '&vr_created_time_start=' +
      startDate +
      '&vr_created_time_end=' +
      endDate,
  );
  return request(
    baseURL +
      '/mp_audit_res/unau_videolist/?search=' +
      value +
      '&vr_created_time_start=' +
      startDate +
      '&vr_created_time_end=' +
      endDate,
  );
}

export async function passVideo(ids) {
  var obj = {
    ids: ids,
  };
  return request(baseURL + '/mp_audit_res/audit_videos/', {
    method: 'post',
    data: obj,
    headers: { 'Content-Type': 'application/json' },
    getResponse: true,
  });
}
