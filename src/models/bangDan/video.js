import {
  findAll,
  findCustomVideorank,
  findCustomVideolist,
  findByName,
  delrank,
} from '@/services/bangDan/video';
export default {
  namespace: 'videobangdan',
  state: {
    loading: true,
    videos: [],
    customVideorank: [],
    customVideolist: [],
  },
  effects: {
    *findAll(_, { call, put }) {
      const response = yield call(findAll, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response,
      });
    },
    *findCustomVideorank(_, { call, put }) {
      const response = yield call(findCustomVideorank, _.payload);
      yield put({
        type: 'reloadAllCustomVideorank',
        payload: response,
      });
    },
    *findCustomVideolist(_, { call, put }) {
      const response = yield call(findCustomVideolist, _.payload);
      yield put({
        type: 'reloadAllCustomVideolist',
        payload: response,
      });
    },
    *findByName(_, { call, put }) {
      const response = yield call(findByName, _.payload);
      yield put({
        type: 'reloadAllCustomVideolist',
        payload: response,
      });
    },
    *delrank(_, { call, put }) {
      const response = yield call(delrank, _.payload);
      yield put({
        type: 'findCustomVideorank',
        payload: response,
      });
    },
  },
  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    },
    reloadAllCustomVideorank(state, action) {
      return {
        ...state,
        customVideorank: action.payload,
        loading: false,
      };
    },
    reloadAllCustomVideolist(state, action) {
      return {
        ...state,
        customVideolist: action.payload,
        loading: false,
      };
    },
  },
};
