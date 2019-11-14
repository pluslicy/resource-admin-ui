import { findAll, findCustomWordrank, findCustomWordlist } from '@/services/bangDan/word';
export default {
  namespace: 'wordbangdan',
  state: {
    loading: true,
    words: [],
    customWordrank: [],
    customWordlist: [],
  },
  effects: {
    *findAll(_, { call, put }) {
      const response = yield call(findAll, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response,
      });
    },
    *findCustomWordrank(_, { call, put }) {
      const response = yield call(findCustomWordrank, _.payload);
      yield put({
        type: 'reloadAllCustomWordrank',
        payload: response,
      });
    },
    *findCustomWordlist(_, { call, put }) {
      const response = yield call(findCustomWordlist, _.payload);
      yield put({
        type: 'reloadAllCustomWordlist',
        payload: response,
      });
    },
  },
  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        words: action.payload,
        loading: false,
      };
    },
    reloadAllCustomWordrank(state, action) {
      return {
        ...state,
        customWordrank: action.payload,
        loading: false,
      };
    },
    reloadAllCustomWordlist(state, action) {
      console.log(action.payload);
      return {
        ...state,
        customWordlist: action.payload,
        loading: false,
      };
    },
  },
};
