import React from 'react';
import { Form, Input,Button,Radio} from 'antd';
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
  xiugai=(event)=>{
    this.state.arr.remove(event.target.value)
    this.props.form.setFieldsValue({des:this.state.arr})
    $("."+event.target.value).css({background:"none"})
  }
  addRole=(event)=>{
    // this.props.form.validateFields((err, values) => {
    //   if (err) {
    //   return;
    //   }

    //   console.log('Received values of form: ', values);
    // })
    // this.setState({
    //   arr:this.state.arr.push(event.target.value)
    // })
    this.state.arr.push(event.target.value)
    this.props.form.setFieldsValue({groups:this.state.arr})
    $("."+event.target.value).css({background:"green"})
    //console.log(this.state.arr)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id');
    return (
      <div>
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(<Input style={{marginBottom:'1em'}} placeholder='输入用户名' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(<Input style={{marginBottom:'1em'}} placeholder='输入密码' />)}
          </Form.Item>
          
          <Form.Item>
            {getFieldDecorator('user_phone', {
              rules: [{ required: true, message: '请输入联系方式!' }],
            })(<Input style={{marginBottom:'1em'}} placeholder='输入联系方式' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('user_gender')(
              <div>
                性别：
                <Radio.Group >
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
        
               </Radio.Group>
              </div> 
            )}
          </Form.Item>
          <Form.Item>
          {getFieldDecorator('groups')(
              <div style={{height:'100px'}}>
                添加角色
                <ul>
                 
                   {
                      this.props.users.roles.map((item,index,arr)=>{
               
                          return ( <li onDoubleClick={this.xiugai} className={item.id} value={item.id} onClick={this.addRole.bind(item)} style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'1em'}} key={item.id}>{item.name}</li>  )
                      })
                   }
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

export default connect(({users})=>({users}))(Form.create({
  mapPropsToFields,
})(AddForm));
