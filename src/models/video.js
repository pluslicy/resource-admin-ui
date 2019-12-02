import { findAll, fetchCheck, findByCondidtion, passVideo } from '@/services/video';

export default {
  namespace: 'video',
  state: {
    loading: true,
    videos: [],
    count:"",
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
      const response = yield call(fetchCheck, _.payload.obj);
      yield put ({
        type:'findAll',
        payload:{
          page:_.payload.page,
          pageSize:_.payload.pageSize,
        }
      })
    },
    *findByCondidtion(_, { call, put }) {
      const response = yield call(findByCondidtion, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response,
      });
    },
    *passVideo(_, { call, put }) {
      const response = yield call(passVideo, _.payload.obj);
      yield put ({
        type:'findAll',
        payload:{
          page:_.payload.page,
          pageSize:_.payload.pageSize,
        }
      })
    },
  },
  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        videos: action.payload,
        count:action.payload.count,
        loading: false,
      };
    },
  },
};
