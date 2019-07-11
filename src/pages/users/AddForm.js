import React from 'react';
import { Form, Input,Button,Radio} from 'antd';
class AddForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id');
    return (
      <div>
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入班级名称!' }],
            })(<Input style={{marginBottom:'1em'}} placeholder='输入用户名' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入班级名称!' }],
            })(<Input style={{marginBottom:'1em'}} placeholder='输入密码' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入班级名称!' }],
            })(<Input style={{marginBottom:'1em'}} placeholder='输入联系方式' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('description')(
              <div>
                性别：
                <Radio>男</Radio>
                <Radio>女</Radio>
              </div> 
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('description')(
              <div style={{height:'100px'}}>
                添加角色
                <ul>
                    <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'1em'}}>杰普教师</li>  
                    <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'1em'}}>杰普学生</li>  
                    <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'1em'}}>院校教师</li>  
                    <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'2em'}}>角色</li>  
                    <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'2em'}}>角色</li>  
                    <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'2em'}}>角色</li>  
                </ul>  
              </div>
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

export default Form.create({
  mapPropsToFields,
})(AddForm);
