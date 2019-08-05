import { message } from 'antd';
import { queryRole,UpdateRole,deleteRole} from '@/services/rolesServices/role';

const RoleModel = {
  namespace: 'role',
  state: {
    roles: [],
    visible: false,
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


    *fetchDeleteRoles(_, { call, put }) {
        yield call(deleteRole, {id: _.payload});
        yield put({ type: 'fetchRoles' });
    },
    },

    *RoleForzen(_, { call, put }) {
      const response = yield call(forzenRolecd, _.payload);
      message.success(response.message);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchRoles'});
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
      };
    },
  },
};
export default RoleModel;
