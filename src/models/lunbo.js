import {findAll} from '@/services/lunbo'

const Lunbo = {
    namespace:'lunbo',
    state:{
        lunbos:[],
        loading: true,
    },
    effects:{
        *findAll(_,{call,put}){
            const response = yield call(findAll,_.payload);
            yield put({
                type:'reloadAll',
                payload:response,
            });
        },

    },
    reducers:{
        reloadAll(state,action){
            return{
                ...state,
                lunbos:action.payload,
                loading:false,
            };
        },
        
    }
}

export default Lunbo;