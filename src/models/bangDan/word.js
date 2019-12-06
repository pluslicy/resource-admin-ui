import {
  findAll,
  findCustomWordrank,
  findCustomWordlist,
  findByName,
  delrank,
  addCustomWordrank,
  changeOrderWordrank,
} from '@/services/bangDan/word';
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
    *findByName(_, { call, put }) {
      const response = yield call(findByName, _.payload);
      yield put({
        type: 'reloadAllCustomWordlist',
        payload: response,
      });
    },
    *delrank(_, { call, put }) {
      const response = yield call(delrank, _.payload);
      yield put({
        type: 'findCustomWordrank',
        payload: response,
      });
    },
    *addCustomWordrank(_, { call, put }) {
      const response = yield call(addCustomWordrank, _.payload);
      yield put({
        type: 'findCustomWordrank',
        payload: response,
      });
    },
    *changeOrderWordrank(_, { call, put }) {
      const response = yield call(changeOrderWordrank, _.payload);
      yield put({
        type: 'findCustomWordrank',
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
