import React from 'react';
import { Form, Input,Select,Button,Upload,Icon,message} from 'antd';
class UserForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      file:"",fileList:""
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(this.props.flag,"ggg",nextProps.flag)
    this.setState({
      flag:nextProps.flag
    })
  }
  
  render() {
  
   
    // 上传
    const props = {
      name: 'file',
      action: this.state.flag!=false?'http://10.0.6.5:16012/mp_man_users/import_studentuser/':"http://10.0.6.5:16012/mp_man_users/import_teacheruser/",
      headers: {
        authorization: 'authorization-text',
      },
      data:{
          xlsx_file:this.state.file
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      },
    };


    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('id');
    return (
      <div>
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '' }],
            })(<Button type='primary'style={{marginLeft:'32em'}}>下载模板</Button>)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('description')(
              <Upload {...props} style={{marginLeft:'14em'}}  beforeUpload={(file,fileList)=>{this.setState({file,fileList})}}>
                <Button>
                  <Icon type="upload" />请选择你的文件
                </Button>
                <div style={{marginLeft:'3em',marginTop:'1em',color:'red'}}>导入文件时，请严格按照模板格式编辑，请勿随意改变模板格式造成导入失败</div>
              </Upload>
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
})(UserForm);
