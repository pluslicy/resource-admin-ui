import { message } from 'antd';
import { query, saveOrUpdate } from '@/services/course';

const CourseModel = {
  namespace: 'course',
  state: {
    courses: [],
    visible: false,
  },
  effects: {
    // 获取所有课程信息
    *fetchCourses(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'reloadCourses',
        payload: response,
      });
    },
    *saveOrUpdateCourse(_, { call, put }) {
      const response = yield call(saveOrUpdate, _.payload);
      message.success(response.message);
      yield put({ type: 'changeVisible', payload: false });
      yield put({ type: 'fetchCourses' });
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
    // 更新状态中的courses
    reloadCourses(state, action) {
      return {
        ...state,
        courses: action.payload.data,
      };
    },
  },
};

export default CourseModel;
