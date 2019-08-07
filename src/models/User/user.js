import { message } from 'antd';
import {queryUsers,queryRoles,AddRole,forzenUsers } from '@/services/User/user';

const UserModel = {
  namespace: 'users',
  state: {
    user: [],
    visible: false,
  },
  effects: {
    // 获取所有用户信息
    *fetchUser(_, { call, put }) {
      const response = yield call(queryUsers);
      // console.log(JSON.stringify(response.data))
      // alert(JSON.stringify(response.data))
      yield put({
        type: 'reloadUsers',
        payload: response});
        },
    },

     // 获取所有角色信息
     *fetchRole(_, { call, put }) {
        const response = yield call(queryRoles);
        yield put({
          type: 'reloadUsers',
          payload: response});
      },

    *UserForzen(_, { call, put }) {
      const response = yield call(forzenUsers, _.payload);
      message.success(response.message);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchUser'});
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
    reloadUsers(state, action) {
        
      return {
        ...state,
        user: action.payload.results,
      };
    },
  },
};
export default UserModel;
