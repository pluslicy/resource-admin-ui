import { findAll, fetchCheck, findByCondidtion, passVideo } from '@/services/video';

export default {
  namespace: 'video',
  state: {
    loading: true,
    videos: [],
  },
  effects: {
    *findAll(_, { call, put }) {
      const response = yield call(findAll, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response,
      });
    },
    *fetchCheck(_, { call, put }) {
      const response = yield call(fetchCheck, _.payload);
      yield put({
        type: 'findAll',
      });
    },
    *findByCondidtion(_, { call, put }) {
      const response = yield call(findByCondidtion, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response,
      });
    },
    *passVideo(_, { call, put }) {
      const response = yield call(passVideo, _.payload);
      yield put({
        type: 'findAll',
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
  },
};
