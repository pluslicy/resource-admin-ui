import { message } from 'antd';
import { findAllCata, findAllVideo, findAllText,DeleteAllText,EnableOrFreeze,EnableOrFreezeVideo,DeleteAllVideo,
PermissionText,PermissionVideo,findAllTextDalBum,findAllVideoDalBum,UpdateTextBian,UpdateVideoBian} from '@/services/Db';

const DbModel = {
  namespace: 'Db',
  state: {
    catalist: [{childs:[]}],
    videolist:{},
    textlist:{},
    textdalbum:[],
    videodalbum:[]
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
    //设置文本权限
    *fetchPermissionText(_, { call, put }) {
      const response = yield call(PermissionText,_.payload);
      yield put({
        type: 'fetchText'
      });
    },
    //设置视频权限
    *fetchPermissionVideo(_, { call, put }) {
      const response = yield call(PermissionVideo,_.payload);
      yield put({
        type: 'fetchVideo'
      });
    },
     //查询视频专辑
     *fetchVideoDalBum(_, { call, put }) {
      const response = yield call(findAllVideoDalBum);
      yield put({
        type: 'reloadVideoDalBum',payload:response.results
      });
    },
     //查询文档专辑
     *fetchTextDalBum(_, { call, put }) {
      const response = yield call(findAllTextDalBum);
      console.log(response.results)
      yield put({
        type: 'reloadTextDalBum',payload:response.results
      });
    },
     //修改文档编目
     *fetchUpdateText(_, { call, put }) {
      const response = yield call(UpdateTextBian,_.payload);
    
    },
    //修改视频编目
    *fetchUpdateVideo(_, { call, put }) {
      const response = yield call(UpdateVideoBian,_.payload);
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
    },
    reloadVideoDalBum(state, action) {
      return {
        ...state,
        videodalbum: action.payload,
      };
    },
    reloadTextDalBum(state, action) {
      return {
        ...state,
        textdalbum: action.payload,
      };
    }
  },
};

export default DbModel;
