import { findAll, fetchCheck,findByCondidtion,passWord} from '@/services/word';

export default {
  namespace: 'word',
  state: {
    loading: true,
    words: [],
  },
  effects: {
    *findAll(_, { call, put }) {
      const response = yield call(findAll, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response.results
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
      payload: response.results
    });
  },
  *passWord(_, { call, put }) {
    const response = yield call(passWord, _.payload);
    yield put({
      type: 'findAll',
    });
  },
},

  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        words: action.payload,
        loading: false,
      };
    },
   
  },
};
