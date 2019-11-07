import { findAllComment, fetchCheck } from '@/services/comment';

const Comment = {
  namespace: 'comment',
  state: {
    comments: [],
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
  },
  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    },
  },
};

export default Comment;
