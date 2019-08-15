import { message } from 'antd';
import { queryCatalog,UpdateCatalog,AddCatalog,deleteCatalog,UpdataCatalogCen} from '@/services/CatalogServices/catalog';

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

    *fetchCatalogs(_, { call, put }) {
    //   console.log(JSON.stringify(response.results))
      yield put({
        type: 'reloadCata',
        payload: _.payload});
    },
    // 修改编目名称
      *UpdateCatalogs(_, { call, put }) {
        yield call(UpdateCatalog,_.payload);
        yield put({ type: 'changeVisible', payload: false });
        yield put({ type: 'fetchCatalog'});
    },

    //删除编目   
    *fetchDeleteRoles(_, { call, put }) {
        yield call(deleteCatalog, {id: _.payload});
        yield put({ type: 'fetchCatalog' });
    },
    // 新增编目
    *fetchAddCatalog(_, { call, put }) {
      // console.log(_.payload)
      yield call(AddCatalog, _.payload);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchCatalog'});
  },
    // 修改编目层级
    *fetchEditCatalogCen(_, { call, put }) {
      // console.log(_.payload)
      yield call(UpdataCatalogCen, _.payload);
      // yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchCatalog'});
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
        roles: action.payload.data,
      };
    },
    reloadCata(state, action) {
      return {
        ...state,
        roles: action.payload,
      };
    },
  },
};
export default CatalogModel;
