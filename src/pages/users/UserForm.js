import React from 'react';
import { Form, Input,Select,Button,Upload,Icon} from 'antd';
class UserForm extends React.Component {
  render() {
  
   
    // 上传
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
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
              <Upload {...props} style={{marginLeft:'14em'}}>
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
