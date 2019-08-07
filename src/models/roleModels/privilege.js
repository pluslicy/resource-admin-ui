import { message } from 'antd';
import {queryPrivilege} from '@/services/rolesServices/privilege';

const PrivilegeModel = {
  namespace: 'privilege',
  state: {
    privileges: [],
    visible: false,
  },
  effects: {
    // 获取所有权限信息
    *fetchPrivi(_, { call, put }) {
      const response = yield call(queryPrivilege);
      yield put({
        type: 'reloadPrivilege',
        payload: response});
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
    // 更新状态中的权限
    reloadPrivilege(state, action) {
      return {
        ...state,
        privileges: action.payload.results,
      };
    },
  },
};
export default PrivilegeModel;
