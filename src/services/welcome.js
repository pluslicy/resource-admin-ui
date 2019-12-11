import request from '@/utils/request';

/**
 * @Description: 首页数据请求
 * @PageAuthor: rendc
 * @Date: 2019-12-11 10:21:40
 */

var baseURL = 'http://10.0.6.5:16012';

export async function findAll() {
  return request(baseURL + '/mp_man_statistics/statistics_list/');
};

export async function findMonth(param) {
  return request(baseURL + '/mp_man_statistics/month_statistics_list/?year='+param[0]+'&month='+param[1]+'&days='+param[2]);
}