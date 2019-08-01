import { findAll, fetchCheck} from '@/services/video';

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
        payload: response.results
       });
    },
  },
  *fetchStatus(_, { call, put }) {
    const response = yield call(fetchCheck,{id: _.payload.id, status: _.payload.status});
    yield put({
      type: 'reloadStatus',
      payload: response.results
     });
  },

  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    },
    reloadStatus(state, action){
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    }
  },
};
