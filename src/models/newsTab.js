import {findAllDocs,PermissionDocs,updateNews} from '@/services/newsTab';

const News = {
    namespace:"newsTab",
    state:{
        docslist:[],
        count:"",
        docs:{
          bytime:false,
          byhot:false,
          search:"",
          dr_format:"",
          dr_permission:"",
          dr_enable:'',
          catalogue_path:"",
          catalogue:"",
          page:1,
          page_size:5
        },
        loading: true,
    },
    effects:{
      //查询文档
      *findAll(_,{call,put}){
          alert(1)
        const response =yield call (findAllDocs,_.payload);
        console.log(response,"abcd")
        yield put({
          type:'reloadDocslist',
          payload:response.data,
        })
        console.log(payload,"abc")
      },
      
      //搜索
      *fetchDocsQuery(_, { call, put }) {
        yield put({
          type: 'reloadQuery',payload:_.payload
        });
      },
      //设置文档权限
      *fetchPermission(_, { call, put }) {
        const response = yield call(PermissionDocs,_.payload.params);
        yield put({
          type: 'fetchDocs',payload:_.payload.docs
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
      reloadQuery(state, action) {
        return {
          ...state,
          docs: action.payload,
        };
      },
      reloadDocslist(state, action) {
        return {
          ...state,
          docslist: action.payload,
          count: action.payload.count,
          loading: false,
        };
      },
      
    }
}

export default News;
