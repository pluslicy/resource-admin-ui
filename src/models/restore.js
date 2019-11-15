import { fetchCheck,batchPass,findByCondidtions,findAllReply,findReplyById} from '@/services/restore';

const Restore = {
  namespace: 'restore',
  state: {
    restores:[],
    replay:[{}],
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
    *findReplyById(_, { call, put }) {
      const response = yield call(findReplyById, _.payload);
      yield put({
        type: 'reloadReplyById',
        payload: response.data.data.replay_list,

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
    reloadReplyById(state, action) {
      console.log(action.payload,"www11")
      return {
        ...state,
        replay: action.payload,
        loading: false,
      };
    },
  },
};

export default Restore;
