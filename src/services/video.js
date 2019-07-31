import request from '@/utils/request';
import { async } from 'q';

export async function findAll() {
  return request('http://10.0.6.5:16012/mp_man_res/videolist');
}
