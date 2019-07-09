import React from 'react';
import { Form, Modal, Input } from 'antd';
import { connect } from 'dva';

// 课程表单
class CourseForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    // 父组件传递给子组件值
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    // 将表单中没有出现的值做一个双向数据绑定
    getFieldDecorator('id');
    return (
      <Modal
        visible={visible}
        title="添加课程信息"
        okText="提交"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical" {...formLayout}>
          <Form.Item label="课程名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入课程名称!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="课程周期">
            {getFieldDecorator('period', {
              rules: [{ required: true, message: '请输入课程周期！' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="课程简介">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入课程简介!' }],
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = props => {
  let obj = {};
  for (let key in props.initData) {
    let val = props.initData[key];
    obj[key] = Form.createFormField({ value: val });
  }
  return obj;
};

export default connect()(
  Form.create({
    mapPropsToFields,
  })(CourseForm),
);
