import { findAll, findMonth } from '@/services/welcome';

export default {
    namespace: 'welcome',
    state: {
        loading: true,
        all: [],
        month: [],
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
    },
};
