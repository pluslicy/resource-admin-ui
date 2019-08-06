import { message } from 'antd';
import { findAllCata, findAllVideo, findAllText } from '@/services/Db';

const DbModel = {
  namespace: 'Db',
  state: {
    catalist: [{childs:[]}],
    videolist:{},
    textlist:{}
  },
  effects: {
    // 获取所有编目
    *fetchCata(_, { call, put }) {
      const response = yield call(findAllCata);
      yield put({
        type: 'reloadCatalist',
        payload: response.data,
      });
    },
    *fetchVideo(_, { call, put }) {
      const response = yield call(findAllVideo);
      yield put({
        type: 'reloadVideolist',
        payload: response,
      });
    },
    *fetchText(_, { call, put }) {
      const response = yield call(findAllText);
      yield put({
        type: 'reloadTextlist',
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
    reloadVideolist(state, action) {
      
      return {
        ...state,
       videolist:action.payload
      };
    },
    reloadTextlist(state, action) {
      return {
        ...state,
        textlist: action.payload,
      };
    },
  },
};

export default DbModel;
