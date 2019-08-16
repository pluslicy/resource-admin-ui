import { message } from 'antd';
import {queryUsers,queryRoles,DeleteAllUsers,AddUser,EnableOrFreeze } from '@/services/User/user';

const UserModel = {
  namespace: 'users',
  state: {
    user: [],
    visible: false,
    roles:[]
  },
  effects: {
    // 获取所有用户信息
   *fetchUser(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'reloadUsers',
        payload: response});
        },
    

    // 获取所有角色信息
   *fetchRole(_, { call, put }) {
        const response = yield call(queryRoles);
        yield put({
          type: 'reloadRoles',
          payload: response});
      },

   //批量设置用户状态
    *fetchEnableOrFreeze(_, { call, put }) {
      const response = yield call(EnableOrFreeze,_.payload);
      yield put({
        type: 'fetchUser'
      });
    },
   //批量删除用户
    *fetchDeleteUsers(_, { call, put }) {
      const response = yield call(DeleteAllUsers,{ids:_.payload});
      yield put({
        type: 'fetchUser'
      });
    },
    //添加用户
    *AddUsers(_, { call, put }) {
      const response = yield call(AddUser,_.payload);
      yield put({
        type: 'fetchUser'
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
    reloadUsers(state, action) {
      return {
        ...state,
        user: action.payload.results,
      };
    },
    reloadRoles(state, action) {
      return {
        ...state,
        roles: action.payload.results,
      };
    },
  },
};
export default UserModel;
