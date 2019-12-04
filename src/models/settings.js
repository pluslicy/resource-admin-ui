import {
    getSysSetting,
    setSysSetting,
    getCatalevelList,
    updateCatalevelname,
    getCatalevelSetting,
    updateCatalevelSearch,
    updateCatalevelUpload,
} from '@/services/setting';
import { stat } from 'fs';

/**
 * @Description: 模块管理>系统设置页面
 * @PageAuthor: rendc
 * @Date: 2019-11-26 10:22:48
 */

export default {
    namespace: 'setting',
    state: {
        loading: true,
        SysSettingDatas: [],
        CatalevelListDatas: [],
        CatalevelSettingDatas: [],
    },
    effects: {
        *getSysSetting(_, { call, put }) {
            const response = yield call(getSysSetting, _.payload);
            yield put({
                type: 'reloadAllSysSetting',
                payload: response,
            });
        },
        *setSysSetting(_, { call, put }) {
            const response = yield call(setSysSetting, _.payload);
            yield put({
                type: 'getSysSetting',
                payload: response,
            });
        },
        *getCatalevelList(_, { call, put }) {
            const response = yield call(getCatalevelList, _.payload);
            yield put({
                type: 'reloadAllCatalevelList',
                payload: response,
            });
        },
        *updateCatalevelname(_, { call, put }) {
            const response = yield call(updateCatalevelname, _.payload);
            yield put({
                type: 'getCatalevelList',
            });
        },
        *getCatalevelSetting(_, { call, put }) {
            const response = yield call(getCatalevelSetting, _.payload);
            yield put({
                type: 'reloadAllCatalevelSetting',
                payload: response,
            });
        },
        *updateCatalevelSearch(_, { call, put }) {
            const response = yield call(updateCatalevelSearch, _.payload);
            yield put({
                type: 'getCatalevelSetting',
                payload: response,
            });
        },
        *updateCatalevelUpload(_, { call, put }) {
            const response = yield call(updateCatalevelUpload, _.payload);
            yield put({
                type: 'getCatalevelSetting',
                payload: response,
            });
        },
    },
    reducers: {
        reloadAllSysSetting(state, action) {
            return {
                ...state,
                SysSettingDatas: action.payload,
                loading: false,
            };
        },
        reloadAllCatalevelList(state, action) {
            return {
                ...state,
                CatalevelListDatas: action.payload,
                loading: false,
            };
        },
        reloadAllCatalevelSetting(state, action) {
            return {
                ...state,
                CatalevelSettingDatas: action.payload,
                loading: false,
            };
        },
    },
};
