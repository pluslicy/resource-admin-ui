import React from 'react'
import {connect} from 'dva'
import { Form, Input, Icon, Button,Select,Upload,message} from 'antd';

const {Option} =Select
let id = 1;

class AddTextForm extends React.Component{
  constructor(props){
    super(props)
    this.state={
        arr:[],
        file:"",
        names:[],
    }
  }  
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
      handleChange2=(info)=>{
    
       
        this.setState({
          file:info.file
        })
        if (info.file.status == 'uploading') {
          
        }
        // this.showModal();
        if (info.file.status === 'done') {  
          var arr=this.state.arr;
          const {resource_id,resource_name,resource_url,resource_enable,resource_type,resource_size,created_time}=info.file.response;
          // upobj={resource_id:resource_id,resource_name:resource_name,resource_url:resource_url,resource_enable:resource_enable,resource_type:resource_type,resource_size:resource_size,created_time:created_time};
          var upobj={attach_name:resource_name,attach_size:resource_size,attach_permission:1,attach_owner:24,attach_url:resource_url}
          
          arr.push(upobj)
          this.setState({
            file:info.file,
            // arr:arr
          })
          console.log(arr,"aaaaa")
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          // var arr=this.state.names;
          // arr.forEach((item,index,arr)=>{
          //   if(item==info.file.name){
          //     arr.splice(index,index)
          //   }
          // })
          message.error(`${info.file.name} file upload failed.`);
          }
        }
      handleChange(value,event,a){
          console.log(value)
       
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
        var that=this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { keys, names,teams,uploads} = values;
            console.log('Received values of form: ', values);
            console.log('Merged values:', keys.map(key => names[key]));
            console.log('Merged values:', keys.map(key => teams[key]));
            console.log('Merged values:', keys.map(key => uploads[key]));
            var arr=[];
            values.uploads.map((item,index)=>{
              arr.push({resource_name:""})
            })
            console.log(arr,"ggg")
            if(values.names.length!=0){
              values.names.map((item,index)=>{
                if(item!=undefined){
                  arr[index].resource_name=teams[index]+item;
                }
              })
            }
           
            values.uploads.map((item,index)=>{
              arr[index].file=item[item.length-1].originFileObj;
              arr[index].token="dddd";
              if(arr[index].resource_name==""){
                arr[index].resource_name=item[item.length-1].originFileObj.name;
              }
            })
            arr.forEach((item)=>{
              that.props.dispatch({
                type:"Db/fetchUpdateAttach",payload:item
              })
            })
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
      normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
    uploadBefore(file,fileList){
      // (file,fileList)=>{
      //   console.log(file)
      // var b=[];
      // fileList.forEach((item)=>{
      //     b.push(item.name);
      // })
      // this.setState({
      // filelist:fileList,
      // file:file,
      // ok:0,
      // names:b,
      // });}
      return false;
    }
    render(){
        const props = {
            action: 'http://10.0.6.5:53001/FileStorageApp/create_resource/',
            // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange2,
            accept:".doc,.docx,.mp4",
            data:{
              file:this.state.file,
              token:"dddd",
              resource_name:this.state.names.map((item)=>{
                if(item===this.state.file.name) return item;
              })
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
          <div style={{height:"90px",overflow:"hidden"}}>
        <Form.Item
            label={'文档'+(index+2)+'标题:'}
            {...(formItemLayoutWithOutLabel)}
            required={false}
            style={{paddingLeft:"40px"}}
            // key={k}
        >
          
            {getFieldDecorator(`names[${k}]`, {
            rules: [
            ],
            })(

                
                <Select key={index} style={{width:"18%",top:"-42px"}} placeholder="类型" onChange={this.handleChange}>
                    <Option value="课件">课件</Option>
                    <Option value="笔记">笔记</Option>
                    <Option value="代码">代码</Option>
                </Select>
                
            
               
                )}
           
        </Form.Item>
        <Form.Item
            {...(formItemLayoutWithOutLabel)}
          
            required={false}
            // key={k}
        >
          {getFieldDecorator(`teams[${k}]`, {
              rules: [ ],
            })(<Input placeholder="passenger name" style={{top:"-106px",left:"113px",width: '38%'}} />)}
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                style={{position:"absolute",top:"-105px",left:"295px"}}
                onClick={() => this.remove(k)}
              />
            ) : null}
        </Form.Item>
        <Form.Item label="选择文件" style={{top:"-129px",display:"flex",paddingLeft:"49px"}} >
          {getFieldDecorator(`uploads[${k}]`, {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload  showUploadList={false} multiple={false} style={{marginLeft:"10px"}} {...props}
                 beforeUpload={this.uploadBefore.bind(this)}>
                
                    <Button>
                    <Icon type="upload" /> 选择文件
                    </Button>
            </Upload>
          )}
        </Form.Item>

        </div>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                <h2>{this.props.textname} -添加文档 </h2>
                <Icon onClick={this.closeAddText.bind(this)} type="close" style={{position:"absolute",left:"90%",top:"5px",fontSize:"25px"}} />
                <div style={{height:"90px",overflow:"hidden"}}>
                    <Form.Item
                        label={'文档'+1+'标题:'}
                        {...(formItemLayoutWithOutLabel)}
                        required={false}
                        style={{paddingLeft:"40px"}}
                        // key={k}
                    >
                      
                        {getFieldDecorator(`names[${0}]`, {
                        rules: [
                        ],
                        })(

                            
                            <Select style={{width:"18%",top:"-42px"}} placeholder="类型" onChange={this.handleChange}>
                                <Option value="课件">课件</Option>
                                <Option value="笔记">笔记</Option>
                                <Option value="代码">代码</Option>
                            </Select>
                            
                        
                          
                            )}
                      
                    </Form.Item>
                    <Form.Item
                        {...(formItemLayoutWithOutLabel)}
                      
                        required={false}
                        // key={k}
                    >
                      {getFieldDecorator(`teams[${0}]`, {
                          rules: [ ],
                        })(<Input placeholder="passenger name" style={{top:"-106px",left:"113px",width: '38%'}} />)}
                        {/* {keys.length > 1 ? (
                          <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            style={{position:"absolute",top:"-105px",left:"295px"}}
                            onClick={() => this.remove(k)}
                          />
                        ) : null} */}
                    </Form.Item>
                    <Form.Item label="选择文件" style={{top:"-129px",display:"flex",paddingLeft:"49px"}} >
                      {getFieldDecorator(`uploads[${0}]`, {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                      })(
                        <Upload  showUploadList={false} multiple={false} style={{marginLeft:"10px"}} {...props}
                            beforeUpload={this.uploadBefore.bind(this)}>
                            
                                <Button>
                                <Icon type="upload" /> 选择文件
                                </Button>
                        </Upload>
                      )}
                    </Form.Item>

                    </div>
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

{/* <Input style={{borderLeft:"none"}} placeholder="passenger name" style={{ width: '30%' }} />
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
                </Upload> */}