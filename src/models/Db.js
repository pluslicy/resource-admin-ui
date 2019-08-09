import { message } from 'antd';
import { findAllCata, findAllVideo, findAllText,DeleteAllText,EnableOrFreeze,EnableOrFreezeVideo,DeleteAllVideo,
PermissionText} from '@/services/Db';

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
    //获取所有视频列表
    *fetchVideo(_, { call, put }) {
      const response = yield call(findAllVideo,_.payload);
      yield put({
        type: 'reloadVideolist',
        payload: response.data,
      });
    },
    //获取所有文档列表
    *fetchText(_, { call, put }) {
      const response = yield call(findAllText,_.payload);
      yield put({
        type: 'reloadTextlist',
        payload: response.data,
      });
    },
    //批量删除文档资源
    *fetchDeleteText(_, { call, put }) {
      const response = yield call(DeleteAllText,{ids:_.payload});
      yield put({
        type: 'fetchText'
      });
    },
    //批量删除视频资源
    *fetchDeleteVideo(_, { call, put }) {
      const response = yield call(DeleteAllVideo,{ids:_.payload});
      yield put({
        type: 'fetchVideo'
      });
    },
    //批量设置文本资源状态
    *fetchEnableOrFreeze(_, { call, put }) {
      const response = yield call(EnableOrFreeze,_.payload);
      yield put({
        type: 'fetchText'
      });
    },
    //批量设置视频资源状态
    *fetchEnableOrFreezeVideo(_, { call, put }) {
      const response = yield call(EnableOrFreezeVideo,_.payload);
      yield put({
        type: 'fetchVideo'
      });
    },
    *fetchPermissionText(_, { call, put }) {
      const response = yield call(PermissionText,_.payload);
      yield put({
        type: 'fetchText'
      });
    },
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
    }
  },
};

export default DbModel;
