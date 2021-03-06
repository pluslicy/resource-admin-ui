import request from '@/utils/request';
var baseURL = 'http://139.224.221.31:11000';

export async function findAll() {
  return request(baseURL + '/mp_man_module/get_carouselrank_list/');
}

export async function updateLunbo(param) {
  return request(baseURL + '/mp_man_module/update_carouselrank/', {
    method: 'post',
    data: param,
  });
}
