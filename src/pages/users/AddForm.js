import React from 'react';
import { Form, Input,Button,Radio,Select} from 'antd';
import {connect}  from 'dva'
import $ from 'jquery'



class AddForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      arr:[]
    }
  }
  componentDidMount(){
    this.props.dispatch({
      type:'users/fetchRole',
     
    })
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
    const { Option } = Select;

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    
    
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id');
    return (
      <div>
         <Form layout="vertical" {...formLayout}>
          <Form.Item label="用户名">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="联系方式">
            {getFieldDecorator('user_phone', {
              rules: [{ required: true, message: '请输入联系方式!' }],
            })(<Input />)}
          </Form.Item>
          
          <Form.Item label="性别">
            {getFieldDecorator('user_gender',
               { rules: [{ required: true,message: '请选择性别!'}],})
               (
                <Radio.Group name="user_gender">
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
               </Radio.Group>
            )}
          </Form.Item>

          <Form.Item label="角色">
           {getFieldDecorator('groups',
            { rules: [{ required: true,message: '请选择角色!'}],})
              (
              
              <Select
                showArrow={true}
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择角色"
                name="groups"
              >
                {
                   this.props.users.roles.map((item,index,arr)=>{
                    return ( <Option value={item.id}   key={item.id}>{item.name}</Option>  )
                })
                }
              </Select>
              
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

export default connect(({users})=>({users}))(Form.create({
  mapPropsToFields,
})(AddForm));
