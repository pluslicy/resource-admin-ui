import { findAllComment, fetchCheck,batchPass,findByCondidtion,findReplyById} from '@/services/comment';

const Comment = {
  namespace: 'comment',
  state: {
    comments: [],
    discuss:{},
    // com:[],
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
    *findReplyById(_, { call, put }) {
      const response = yield call(findReplyById, _.payload);
      yield put({
        type: 'reloadReplyById',
        payload: response.data.data.comment,

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
    reloadReplyById(state, action) {
      return {
        ...state,
        discuss: action.payload,
        loading: false,
      };
    },
  },
};

export default Comment;
