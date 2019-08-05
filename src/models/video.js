import { findAll, fetchCheck} from '@/services/video';

export default {
  namespace: 'video',
  state: {
    loading: true,
    videos: [],
    check:{
      // "id": id,
      // "vr_audit_status": "0",
      // "vr_audit_decs": "拒绝"
      id:'',
      vr_audit_status:'1',
      vr_audit_decs:'通过'
    },
  },
  effects: {
    *findAll(_, { call, put }) {
      const response = yield call(findAll, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response.results
       });
    },
    *fetchCheck(_, { call, put }) {
      const response = yield call(fetchCheck, _.payload);
      yield put({
        type: 'reloadAll',
        payload: response.results
       });
    },
  },

  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    },
    reloadStatus(state, action){
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    }
  },
};
