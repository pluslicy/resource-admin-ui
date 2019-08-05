import { findAll, fetchCheck} from '@/services/word';

export default {
  namespace: 'word',
  state: {
    loading: true,
    words: [],
    check:{
      id:'',
      dr_audit_status:'',
      dr_audit_decs:''
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
  },
  *fetchCheck(_, { call, put }) {
    const response = yield call(fetchCheck,{id: _.payload.id, status: _.payload.status});
    yield put({
      type: 'reloadStatus',
      payload: response.results
     });
  },

  reducers: {
    reloadAll(state, action) {
      return {
        ...state,
        words: action.payload,
        loading: false,
      };
    },
    reloadStatus(state, action){
      return {
        ...state,
        words: action.payload,
        loading: false,
      };
    }
  },
};
