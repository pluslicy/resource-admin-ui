import { message } from 'antd';
import { findAllCata } from '@/services/Db';

const DbModel = {
  namespace: 'Db',
  state: {
    catalist: {}
  },
  effects: {
    // 获取所有编目
    *fetchCata(_, { call, put }) {
      const response = yield call(findAllCata);
      yield put({
        type: 'reloadCatalist',
        payload: response,
      });
    }
  },
  reducers: {
    // 更新状态中的catalist
    reloadCatalist(state, action) {
      return {
        ...state,
        catalist: action.payload,
      };
    },
  },
};

export default DbModel;
