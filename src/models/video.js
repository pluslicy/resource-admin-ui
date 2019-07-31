import { findAll } from '@/services/video';

export default {
  namespace: 'video',
  state: {
    loading: true,
    videos: [],
  },
  effects: {
    *fetchAll(_, { call, put }) {
      const response = yield call(findAll, _.payload);
      yield put({ type: 'reloadAll', payload: response.data });
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
