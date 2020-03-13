import { message } from 'antd';
import {queryFree,AddFree,queryList} from '@/services/free';

const FreeModel = {
  namespace: 'free',
  state: {
    frees: [],
    visible: false,
    count:"",
    freeLists:[],
  },
  effects: {
    // 获取所有免费资源信息
    *fetchAllFree(_, { call, put }) {
      const response = yield call(queryFree);
      yield put({
        type: 'reloadFree',
        payload: response});
    },
    // 自定义免费列表
    *feachList(_, { call, put }) {
      const response = yield call(queryList);
      yield put({
        type: 'reloadList',
        payload: response
      });
    },
    //添加
    *addFreeVideo(_, { call, put }) {
      const response = yield call(AddFree, _.payload);
      yield put({
        type: 'feachList',
        
      });
    },
   
},
  reducers: {
    // 更改模态框的显示状态
    changeVisible(state, action) {
      return {
        ...state,
        visible: action.payload,
      };
    },
    // 更新状态中的权限
    reloadFree(state, action) {
      return {
        ...state,
        frees: action.payload.results,
      };
    },
    reloadList(state, action) {
      return {
        ...state,
        freeLists: action.payload.results,
      };
    },
  },
};
export default FreeModel;
