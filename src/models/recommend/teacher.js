import { message } from 'antd';
import { getLevelonecata, getCustomTeacherrank, getTeacherrankList, changeOrderTeacherrank, delrank,addCustomTeacherrank} from '@/services/recommend/teacher';
/**
 * @Description: 教师模块页面
 * @PageAuthor: rendc
 * @Date: 2019-12-10 09:32:24
 */
const RecommendModel = {
    namespace: 'recommend',
    state: {
        roles: [],
        customTeacherrank: [],
        teacherrankList: []
    },
    effects: {
        // 获取一级编目信息
        *getLevelonecata(_, { call, put }) {
            const response = yield call(getLevelonecata);
            yield put({
                type: 'reloadCatalogs',
                payload: response
            });
        },
        *getCustomTeacherrank(_, { call, put }) {
            const response = yield call(getCustomTeacherrank, _.payload);
            yield put({
                type: 'reloadCustomTeacherrank',
                payload: response
            });
        },
        *getTeacherrankList(_, { call, put }) {
            const response = yield call(getTeacherrankList, _.payload);
            yield put({
                type: 'reloadTeacherrankList',
                payload: response
            });
        },
        *changeOrderTeacherrank(_, { call, put }) {
            const response = yield call(changeOrderTeacherrank, _.payload);
        },
        *delrank(_, { call, put }) {
            const response = yield call(delrank, _.payload);
            // yield put({
            //     type: 'getCustomTeacherrank',
            //     payload: response,
            // });
        },
        *addCustomTeacherrank(_, { call, put }) {
            const response = yield call(addCustomTeacherrank, _.payload);
            // yield put({
            //     type: 'getCustomTeacherrank',
            //     payload: response,
            // });
        },
    },

    reducers: {
        // 更新状态中的catalog
        reloadCatalogs(state, action) {
            return {
                ...state,
                roles: action.payload.data,
            };
        },
        reloadCustomTeacherrank(state, action) {
            return {
                ...state,
                customTeacherrank: action.payload,
            };
        },
        reloadTeacherrankList(state, action) {
            return {
                ...state,
                teacherrankList: action.payload.data,
            };
        },
    },
};
export default RecommendModel;
