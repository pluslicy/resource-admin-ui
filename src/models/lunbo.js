import { findAll, updateLunbo } from '@/services/lunbo';

const Lunbo = {
  namespace: 'lunbo',
  state: {
    lunbos: [],
    loading: true,
  },
  effects: {
    *findAll(_, { call, put }) {
      const response = yield call(findAll, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response,
      });
    },
    *updateLunbo(_, { call, put }) {
      const response = yield call(updateLunbo, _.payload);
      yield put({
        type: 'findAll',
      });
    },
  },
  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        lunbos: action.payload,
        loading: false,
      };
    },
  },
};

export default Lunbo;
