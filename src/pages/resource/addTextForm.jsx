import React from 'react'
import {connect} from 'dva'
import { Form, Input, Icon, Button,Select,Upload} from 'antd';

const {Option} =Select
let id = 0;

class AddTextForm extends React.Component{
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
    
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
      };
      handleChange(){
          
      }
      add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
      };
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { keys, names } = values;
            console.log('Received values of form: ', values);
            console.log('Merged values:', keys.map(key => names[key]));
          }
        });
      };
      closeAddText(e){
        var add_text=document.getElementById("add_text")
        console.log(add_text.style)
        add_text.style.display="none"
        var btn=document.getElementById("submit_btn")
        btn.style.opacity="1";
        btn.style.pointerEvents="auto"
        btn.style.background="rgba(22, 155, 213, 1)"
      }
      
    render(){
        const props = {
            // action: 'http://10.0.6.5:53001/FileStorageApp/create_resource/',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange2,
            accept:".doc,.docx,.mp4",
            data:{
            //   file:this.state.file,
              token:"dddd",
            //   resource_name:this.state.names.map((item)=>{
            //     if(item===this.state.file.name) return item;
            //   })
            }
        };
        const { getFieldDecorator, getFieldValue } = this.props.form;
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
        const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
        <Form.Item
            {...(formItemLayoutWithOutLabel)}
          
            required={false}
            key={k}
        >
            {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
                {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field.",
                },
            ],
            })(<div style={{marginLeft:"-40px"}}>

            {'文档'+(index+1)+'标题:'}&nbsp;&nbsp;
                <Select placeholder="类型" style={{ width:"15%" }} onChange={this.handleChange}>
                    <Option value="课件">课件</Option>
                    <Option value="笔记">笔记</Option>
                    <Option value="代码">代码</Option>
                </Select>
                <Input style={{borderLeft:"none"}} placeholder="passenger name" style={{ width: '30%' }} />
                {keys.length > 1 ? (
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.remove(k)}
                />
                ) : null}
                <br/>
            &nbsp;{"选择文件:"}
                <Upload showUploadList={false} multiple={false} style={{marginLeft:"10px"}} {...props}
                 beforeUpload={(file,fileList)=>{
                    console.log(file)
                  var b=[];
                  fileList.forEach((item)=>{
                      b.push(item.name);
                  })
                  this.setState({
                  filelist:fileList,
                  file:file,
                  ok:0,
                  names:b,
                  });}}>
                
                    <Button>
                    <Icon type="upload" /> 选择文件
                    </Button>
                </Upload>
                </div>
               
                )}
           
        </Form.Item>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                <h2>视频一 -添加文档 </h2>
                <Icon onClick={this.closeAddText.bind(this)} type="close" style={{position:"absolute",left:"90%",top:"5px",fontSize:"25px"}} />
                {formItems}

                <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> Add field
                </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">
                   确认
                </Button>
                </Form.Item>
            </Form>
        )
    }
}
const mapPropsToFields = (props) =>{

    let obj = {};
    for(let key in props.vtest){
      obj[key] = Form.createFormField({
        value: props.vtest[key]
      })
    }
    return obj;
  }
export default  connect((state)=>state)(Form.create({
    mapPropsToFields}
)(AddTextForm))