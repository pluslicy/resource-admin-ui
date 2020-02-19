import {findAllNews,findAllVideos,PermissionVideo,updateNews} from '@/services/news';

const News = {
    namespace:"news",
    state:{
        new:[],
        arr:[],
        videos:[],
        text:[],
        count:"",
        video:{
          bytime:false,
          byhot:false,
          search:"",
          vr_format:"",
          vr_permission:"",
          vr_enable:'',
          catalogue_path:"",
          catalogue:"",
          page:1,
          page_size:5
        },
        loading: true,
    },
    effects:{
      // 查询所有状态
      *findAll(_, { call, put }) {
        const response = yield call(findAllNews, _.payload);
        yield put({
          type: 'reloadAll',
          payload: response.data, 
        });
      },
      //查询视频
      *findAllVideos(_,{call,put}){
        const response =yield call (findAllVideos,_.payload);
        yield put({
          type:'reloadVideos',
          payload:response.data,
        })
      },
      
      //搜索
      *fetchVideoQuery(_, { call, put }) {
        yield put({
          type: 'reloadvideoQuery',payload:_.payload
        });
      },
      //设置视频权限
      *fetchPermissionVideo(_, { call, put }) {
        const response = yield call(PermissionVideo,_.payload.params);
        yield put({
          type: 'fetchVideo',payload:_.payload.video
        });
      },
      // 更新资源
      *updateNews(_, { call, put }) {
        const response = yield call(updateNews, _.payload);
        yield put({
          type: 'findAll',
        });
      },
    },
    reducers:{
      reloadvideoQuery(state, action) {

        return {
          ...state,
          video: action.payload,
        };
      },
      reloadAll(state, action) {
        return {
          ...state,
          new: action.payload,
          loading: false,
        };
      },
      reloadVideos(state, action) {
        // var arr = [];
        // action.payload.results.forEach((item,index)=>{
        //   var obj = item;
        //   obj.filename=item.vr_name;
        //   delete obj.vr_name;
        //   arr.push(obj)
        // })
        return {
          ...state,
          // arr,
          videos: action.payload,
          count: action.payload.count,
          loading: false,
        };
      },
      
    }
}

export default News;
