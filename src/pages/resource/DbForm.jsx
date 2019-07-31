import React from 'react'
import {
    Form,
    Input,
    Select,
    Upload,Button,Icon,Checkbox,Radio
  } from 'antd'
import {connect} from 'dva'
import styles from './db.less';


const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class DbForm extends React.Component{

    componentWillMount(){
      
    }
    handleChange(value) {
      console.log(`selected ${value}`);
    }
    normFile = e => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        };

        getFieldDecorator('id')
        return (
          
            // <div className="DbForm" style={{width:"800px",height:"550px",}}>
            <div className={styles.DbForm}>
            {/* <div></div> */}
    
            <Form {...formItemLayout} className="login-form">
            
                
                <Form.Item  label="">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Radio.Group
                  style={{ marginBottom: '0.5em', marginLeft: '0.5em' }}
                >
                  <Radio value={1}>视频</Radio>
                  <Radio value={2}>专辑</Radio>
                  <span style={{marginLeft:"10em",color:"blue"}}>+为视频添加文档</span>
                </Radio.Group>
                )}
              </Form.Item>
              <Form.Item  label="视频标题">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="Name" />,
                )}
              </Form.Item>
              <Form.Item label="方向">
                    {
                        getFieldDecorator('teacherId',{})
                        (
                            <Select  placeholder="请选择教师" name='teacherId'  >
                            {/* {
                                this.props.teacherState.teachers.map((item)=>{
                                    return <Option key={item.id} value={item.id}>{item.realname}</Option>
                                })
                            } */}
                            </Select>
                        )
                    }
              </Form.Item>
              <Form.Item label="技术" extra="请为你的视频填写技术标签，使用空格隔开，不超过10个.">
                    {
                        getFieldDecorator('teacherId',{})
                        (
                            <Select  placeholder="请选择教师" name='teacherId'  >
                            {/* {
                                this.props.teacherState.teachers.map((item)=>{
                                    return <Option key={item.id} value={item.id}>{item.realname}</Option>
                                })
                            } */}
                            </Select>
                        )
                    }
              </Form.Item>  
              <Form.Item label="标签" extra="您可以选择：html JS jQuery react VUE">
                {getFieldDecorator('credit', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                 
                  <Select mode="tags" style={{ width: '100%' }} onChange={this.handleChange} tokenSeparators={[',']}>
                    {children}
                  </Select>
                  
                )}
              </Form.Item>
              <Form.Item  label="视频描述">
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input placeholder="Description" />,
                )}
              </Form.Item>
            </Form>
            </div>
        );
    }
}
const mapPropsToFields = (props) =>{

    let obj = {};
    for(let key in props.course){
      obj[key] = Form.createFormField({
        value: props.course[key]
      })
    }
    return obj;
  }
export default Form.create({
    mapPropsToFields}
)(DbForm)