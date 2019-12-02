import { message } from 'antd';
import {
  queryRole,
  UpdateRole,
  DeleteAll,
  EnableOrFreeze,
  queryOnlyRole,
  queryCatalog,
  queryPermission,
  AddRole,
} from '@/services/rolesServices/role';

const RoleModel = {
  namespace: 'role',
  state: {
    roles: [],
    visible: false,
    count: '',
    roleCata: [{ childs: [] }],
    webBackRole: [{ childs: [] }],
  },
  effects: {
    // 获取所有角色信息
    *fetchRoles(_, { call, put }) {
      const response = yield call(queryRole);
      // console.log(JSON.stringify(response.data))
      // alert(JSON.stringify(response.data))
      yield put({
        type: 'reloadRoles',
        payload: response,
      });
    },
    // 获取所有编目信息
    *fetchCatalog(_, { call, put }) {
      const response = yield call(queryCatalog);
      //console.log(JSON.stringify(response.results))
      yield put({
        type: 'reloadCatalogs',
        payload: response,
      });
    },

    // 获取用户权限
    *feachPermission(_, { call, put }) {
      const response = yield call(queryPermission, _.payload);
      // console.log("111111111111",JSON.stringify(sresponse.results))
      yield put({
        type: 'reloadPermission',
        payload: response,
      });
    },

    // 获取单个角色信息
    *fetchOnlyRole(_, { call, put }) {
      const response = yield call(queryOnlyRole);
      // console.log(JSON.stringify(response.data))
      // alert(JSON.stringify(response.data))
      yield put({
        type: 'reloadRoles',
        payload: response,
      });
    },
    // 添加角色
    *fetchAddRole(_, { call, put }) {
      // console.log(_.payload)
      yield call(AddRole, _.payload);
      // yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchRoles' });
    },

    //修改角色
    *updateRoles(_, { call, put }) {
      const response = yield call(UpdateRole, _.payload);
      message.success(response.message);
      yield put({ type: 'fetchRoles' });
    },

    //批量删除用户
    *fetchDelete(_, { call, put }) {
      const response = yield call(DeleteAll, { ids: _.payload });
      yield put({
        type: 'fetchRoles',
      });
    },

    //批量设置用户状态
    *fetchEnableOrFreeze(_, { call, put }) {
      const response = yield call(EnableOrFreeze, _.payload.status);
      yield put({
        type: 'fetchRoles',
        payload: {
          page: _.payload.page,
          pageSize: _.payload.pageSize,
        },
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
    // 更新状态中的catalog
    reloadCatalogs(state, action) {
      return {
        ...state,
        roleCata: action.payload.data,
      };
    },
    // 更新状态中的前台permission
    reloadPermission(state, action) {
      return {
        ...state,
        webBackRole: action.payload.data,
      };
    },
    // 更新状态中的users
    reloadRoles(state, action) {
      return {
        ...state,
        roles: action.payload.results,
        count: action.payload.count,
      };
    },
  },
};
export default RoleModel;
