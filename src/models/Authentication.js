import {findAll,passAndPassAll,reject} from "@/services/authentication" 

const Authentication = {
    namespace:"authentication",
    state:{
        authentications:[],
        loading: true,
    },
    effects:{
        *findAll(_, { call, put }) {
            const response = yield call(findAll, _.payload);
            yield put({
              type: 'reloadAll',
              payload: response.data, 
            });
        },
        *passAll(_, { call, put }) {
            const response = yield call(passAndPassAll, _.payload);
            yield put({
              type: 'findAll',
            });
          },
        *reject(_, { call, put }) {
            const response = yield call(reject, _.payload);
            yield put({
              type: 'findAll',
            });
          },
    },
    reducers:{
        reloadAll(state, action) {
            return {
              ...state,
              authentications: action.payload,
              loading: false,
            };
          },
    }
}

export default Authentication;