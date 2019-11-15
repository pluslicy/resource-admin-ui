import { message } from 'antd';

const DbVideoAndTextModel = {
  namespace: 'vt',
  state: {
    vq:{
        vr_created_time_start:"",
        vr_created_time_end:"",
        bytime:false,
        byhot:false,
        search:"",
        vr_format:"",
        vr_permission:"",
        vr_enable:'',
        catalogue_path:"",
        catalogue:""
    },
    tq:{
        dr_created_time_start:"",
        dr_created_time_end:"",
        bytime:false,
        byhot:false,
        search:"",
        dr_permission:"",
        dr_format:"",
        dr_enable:"",
        catalogue_path:"",
        catalogue:""
    },
  },
  effects: {
    // 获取所有编目
  
    //设置视频权限
    *fetchVideoQuery(_, { call, put }) {
      yield put({
        type: 'reloadvideoQuery',payload:_.payload
      });
    },
    *fetchTextQuery(_, { call, put }) {
        yield put({
          type: 'reloadTextQuery',payload:_.payload
        });
      },
    
  },
  reducers: {
    // 更新状态中的catalist
    reloadvideoQuery(state, action) {
      return {
        ...state,
        vq: action.payload,
      };
    },
    reloadTextQuery(state, action) {
        return {
          ...state,
          tq: action.payload,
        };
    },
  },
};

export default DbVideoAndTextModel;
