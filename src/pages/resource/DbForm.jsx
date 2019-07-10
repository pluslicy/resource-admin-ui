import React from 'react'
import {
    Form,
    Input,
    Select,
    Upload,Button,Icon,Progress
  } from 'antd'
import {connect} from 'dva'

const Option = Select.Option;
class DbForm extends React.Component{

    componentWillMount(){
      
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
            <div className="courseForm">
            {/* {console.log(JSON.stringify(this.props))} */}
            <Form {...formItemLayout} className="login-form">
            <Progress
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={99.9}
              />
            <Form.Item label="Upload" extra="请选择文件">
                  {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>,
                  )}
                </Form.Item>
              <Form.Item  label="视频标题">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your realname!' }],
                })(
                  <Input placeholder="Name" />,
                )}
              </Form.Item>
              <Form.Item label="视频类型">
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
              <Form.Item label="技术标签" extra="请为你的视频填写技术标签，使用空格隔开，不超过10个.">
                {getFieldDecorator('credit', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                 
                  <Input placeholder="Credit"
                  />
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
)(connect(state=>state)(DbForm))