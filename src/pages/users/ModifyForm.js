import React from 'react';
import { Form, Input,Button,Radio} from 'antd';



class ModifyForm extends React.Component {
  
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
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id');
    return (
      <div>
    <Form layout="vertical" {...formLayout}>
          <Form.Item label="用户名">
            {getFieldDecorator('last_name', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(<Input placeholder='输入用户名' />)}
            {/*  style={{marginBottom:'1em'}} */}
          </Form.Item>

          <Form.Item label="联系方式">
            {getFieldDecorator('user_phone', {
              rules: [{ required: true, message: '请输入联系方式!' }],
            })(<Input placeholder='输入联系方式' />)}
          </Form.Item>

          <Form.Item label="性别">
            {getFieldDecorator('user_gender',
               { rules: [{ required: true,message: '请选择性别!'}],})
               (
                <Radio.Group name="">
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
               </Radio.Group>
            )}
          </Form.Item>
        </Form>
      </div>
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
// AddUserForm
export default Form.create({
  mapPropsToFields,
})(ModifyForm);
