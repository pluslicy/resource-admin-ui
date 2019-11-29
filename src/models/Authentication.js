import {findAll,passAll} from "@/services/authentication" 

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
            const response = yield call(passAll, _.payload);
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