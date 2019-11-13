import { fetchCheck,batchPass,findByCondidtions,findAllReply} from '@/services/comment';

const Restore = {
  namespace: 'restore',
  state: {
    restores:[],
    loading: true,
  },
  effects: {
    *findAllReply(_, { call, put }) {
      const response = yield call(findAllReply, _.payload);
      yield put({
        type: 'reloadAllReply',
        payload: response.results,
      });
    },
    *fetchCheck(_, { call, put }) {
      const response = yield call(fetchCheck, _.payload);
      yield put({
        type: 'findAllReply',
      });
    },
    *batchPass(_, { call, put }) {
      const response = yield call(batchPass, _.payload);
      yield put({
        type: 'findAllReply',
      });
    },
    *findByCondidtions(_, { call, put }) {
      const response = yield call(findByCondidtions, _.payload);
      yield put({
        type: 'reloadAllReply',
        payload: response.results,
      });
    },
  },
  reducers: {
    reloadAllReply(state, action) {
      return {
        ...state,
        restores: action.payload,
        loading: false,
      };
    },
  },
};

export default Restore;
