import { message } from 'antd';
import { queryRole,UpdateRole,DeleteAll,EnableOrFreeze} from '@/services/rolesServices/role';

const RoleModel = {
  namespace: 'role',
  state: {
    roles: [],
    visible: false,
    count:"",
  },
  effects: {
    // 获取所有角色信息
    *fetchRoles(_, { call, put }) {
      const response = yield call(queryRole);
      // console.log(JSON.stringify(response.data))
      // alert(JSON.stringify(response.data))
      yield put({
        type: 'reloadRoles',
        payload: response});
    },

    *updateRoles(_, { call, put }) {
      const response = yield call(UpdateRole, _.payload);
      message.success(response.message);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchRoles'});
     },


    //批量删除用户
    *fetchDelete(_, { call, put }) {
      const response = yield call(DeleteAll,{ids:_.payload});
      yield put({
        type: 'fetchRoles'
      });
    },
    //批量设置用户状态
    *fetchEnableOrFreeze(_, { call, put }) {
      const response = yield call(EnableOrFreeze,_.payload.status);
      yield put({
        type: 'fetchRoles',
        payload:{
          page:_.payload.page,
          pageSize:_.payload.pageSize
        }
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
    // 更新状态中的users
    reloadRoles(state, action) {
      return {
        ...state,
        roles: action.payload.results,
        count:action.payload.count,
      };
    },
  },
};
export default RoleModel;
