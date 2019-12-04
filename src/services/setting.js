import request from '@/utils/request';

/**
 * @Description: 模块管理>系统设置页面
 * @PageAuthor: rendc
 * @Date: 2019-11-26 10:06:07
 */

var baseURL = 'http://10.0.6.5:16012';

// 获取系统设置
export async function getSysSetting() {
    return request(baseURL + '/mp_man_module/get_sys_setting/');
}
// 设置系统设置
export async function setSysSetting(param) {
    console.log(param)
    return request(baseURL + '/mp_man_module/set_sys_setting/', {
        method: 'post',
        data: {
            ...param,
        },
        headers: { 'Content-Type': 'application/json' },
        getResponse: true,
    });
}

// 获取编目级别列表
export async function getCatalevelList() {
    return request(baseURL + '/mp_man_module/get_catalevel_list/');
}
// 修改编目级别列表名称
export async function updateCatalevelname() {
    return request(baseURL + '/mp_man_module/update_catalevelname/');
}
// 获取编目级别检索设置
export async function getCatalevelSetting() {
    return request(baseURL + '/mp_man_module/get_catalevel_setting/');
}
// 设置搜索编目级别设置
export async function updateCatalevelSearch(param) {
    return request(baseURL + '/mp_man_module/update_catalevel_search/',{
        method: 'post',
        data: {
            ...param,
        },
        headers: { 'Content-Type': 'application/json' },
        getResponse: true,
    });
}
// 设置上传编目级别设置
export async function updateCatalevelUpload(param) {
    return request(baseURL + '/mp_man_module/update_catalevel_upload/',{
        method: 'post',
        data: {
            ...param,
        },
        headers: { 'Content-Type': 'application/json' },
        getResponse: true,
    });
}
