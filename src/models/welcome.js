import { findAll, findMonth ,unauVideolist,unauDoclist,commentlist,} from '@/services/welcome';

export default {
    namespace: 'welcome',
    state: {
        loading: true,
        all: [],
        month: [],
        daishenhe:[],
    },
    effects: {
        *findAll(_, { call, put }) {
            const response = yield call(findAll, _.payload);
            yield put({
                type: 'reloadAll',
                payload: response,
            });
        },
        *findMonth(_, { call, put }) {
            const response = yield call(findMonth, _.payload);
            yield put({
                type: 'reloadMonth',
                payload: response,
            });
        },
        *unauVideolist(_, { call, put }) {
            const response = yield call(unauVideolist, _.payload);
            yield put({
                type: 'reloadDaiShenHe',
                payload: response,
            });
        },
        *unauDoclist(_, { call, put }) {
            const response = yield call(unauDoclist, _.payload);
            yield put({
                type: 'reloadDaiShenHe',
                payload: response,
            });
        },
        *commentlist(_, { call, put }) {
            const response = yield call(commentlist, _.payload);
            yield put({
                type: 'reloadDaiShenHe',
                payload: response,
            });
        },
    },
    reducers: {
        reloadAll(state, action) {
            return {
                ...state,
                all: action.payload,
                loading: false,
            };
        },
        reloadMonth(state, action) {
            return {
                ...state,
                month: action.payload,
                loading: false,
            };
        },
        reloadDaiShenHe(state, action) {
            return {
                ...state,
                daishenhe: action.payload,
                loading: false,
            };
        },
    },
};
