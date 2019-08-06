import { message } from 'antd';
import { queryCatalog,UpdateCatalog,AddCatalog,deleteCatalog} from '@/services/CatalogServices/catalog';

const CatalogModel = {
  namespace: 'catalog',
  state: {
    roles: [{childs:[]}],
    visible: false,
  },
  effects: {
    // 获取所有编目信息
    *fetchCatalog(_, { call, put }) {
      const response = yield call(queryCatalog);
    //   console.log(JSON.stringify(response.results))
      yield put({
        type: 'reloadCatalogs',
        payload: response});
    },

    // 修改编目
    *updateRoles(_, { call, put }) {
      const response = yield call(UpdateCatalog, _.payload);
      message.success(response.message);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'reloadCatalogs'});
  },

    //删除编目   
    *fetchDeleteRoles(_, { call, put }) {
        yield call(deleteCatalog, {id: _.payload});
        yield put({ type: 'reloadCatalogs' });
    },
    },

    // 添加编目
    *fetchAddCatalog(_, { call, put }) {
      const response = yield call(AddCatalog, _.payload);
      message.success(response.message);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'reloadCatalogs'});
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
        roles: action.payload.data,
      };
    },
  },
};
export default CatalogModel;
