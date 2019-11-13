import { findAllComment, fetchCheck,batchPass,findByCondidtion,findByCondidtions,findAllReply} from '@/services/comment';

const Comment = {
  namespace: 'comment',
  state: {
    comments: [],
    restores:[],
    loading: true,
  },
  effects: {
    *findAllComment(_, { call, put }) {
      const response = yield call(findAllComment, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response.results,
      });
    },
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
        type: 'findAllComment',
      });
    },
    *batchPass(_, { call, put }) {
      const response = yield call(batchPass, _.payload);
      yield put({
        type: 'findAllComment',
      });
    },
    *findByCondidtion(_, { call, put }) {
      const response = yield call(findByCondidtion, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response.results,
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
    reloadAll(state, action) {
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    },
    reloadAllReply(state, action) {
      return {
        ...state,
        restores: action.payload,
        loading: false,
      };
    },
  },
};

export default Comment;
