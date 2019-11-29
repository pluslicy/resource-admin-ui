import { message } from 'antd';
import { findAllCata, findAllVideo, findAllText,DeleteAllText,EnableOrFreeze,EnableOrFreezeVideo,DeleteAllVideo,
PermissionText,PermissionVideo,findAllTextDalBum,findAllVideoDalBum,UpdateTextBian,UpdateVideoBian,UploadOneOrMore,
UploadVideoOneOrMore,CreateAlbum,CreateVideoAlbum,UploadAttach,DeleteAttach} from '@/services/Db';

const DbModel = {
  namespace: 'Db',
  state: {
    catalist: [{childs:[]}],
    videolist:{},
    textlist:{},
    textdalbum:[],
    videodalbum:[],
    flag:"",
    successFile:[],
    textLength:0,
    attachment:[]
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
    *fetchTextLength(_, { call, put }) {
      yield put({
        type: 'reloadTextLength',
        payload:_.payload
      });
    },
    *fetchCreateAlbum(_, { call, put }) {
      const response = yield call(CreateAlbum,_.payload);
      yield put({
        type: 'fetchTextDalBum'
      });
    },
    *fetchCreateVideoAlbum(_, { call, put }) {
      const response = yield call(CreateVideoAlbum,_.payload);
      yield put({
        type: 'fetchVideoDalBum'
      });
    },
    //访问后台接口，上传文档
    *fetchUploadOneOrMore(_, { call, put }) {
      yield call(UploadOneOrMore,_.payload);
    },
    //访问后台接口，上传视频
    *fetchUploadVideoOneOrMore(_, { call, put }) {
      yield call(UploadVideoOneOrMore,_.payload);
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
    *fetchUpdateFlag(_, { call, put }) {
      yield put({
        type: 'loadFlag',payload:_.payload
      });
    },
    *fetchUpdateAttach(_, { call, put }) {
    
      const response = yield call(UploadAttach,_.payload);
      // console.log(response,"返回的数据")
      yield put({
        type: 'reloadSuccessFile',payload:response.data
      });
    },
    *fetchDeleteAttach(_, { call, put }) {
      const response = yield call(DeleteAttach,_.payload.urls);
      yield put({
        type: 'deleteSuccessFile',payload:_.payload.successFile
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
    deleteSuccessFile(state,action){
      return {
        ...state,
        successFile: action.payload,
      };
    },
    reloadSuccessFile(state, action) {
      var attachment=state.attachment;
      var obj={attach_name:action.payload.resource_name,attach_size:action.payload.resource_size,attach_permission:1,attach_owner:24,
        attach_url:action.payload.resource_url};
      var arr=state.successFile;//获取当前上传附件的文档数组
      // arr.push(action.payload);
      arr.forEach((item,index)=>{
        if(item.textid==state.textid){
          item.attachment.push(obj)
        }
      })
      return {
        ...state,
        successFile: arr,
        attachment:attachment
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
    },
    loadFlag(state,action){
      return {
        ...state,
        flag: action.payload,
      };
    },
    reloadTextLength(state,action){
     
      
      var arr=state.successFile;
      
      if(action.payload==""){
          arr=[];
      }else{
        var obj={textid:action.payload,attachment:[]};
        arr.push(obj);
      }
      return {
        ...state,
        textid: action.payload,
        successFile:arr
      };
    }
  },
};

export default DbModel;
