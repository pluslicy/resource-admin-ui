import React from 'react'
import {connect} from 'dva'
import { Form, Input, Icon, Button,Select,Upload,message,Modal} from 'antd';

const {Option} =Select;
const { Dragger } = Upload;
let id = 1;

class AddTextForm2 extends React.Component{
    constructor(props){
        super(props)
        this.state={
            arr:[],
            file:"",
            names:[],
            suffix:"类型",
            textName:"",
            fileList:[],
            visible:false,
            UpList:[],
            visible4:true,
            flag1:false
        }
    }
    componentDidMount(){
        // console.log("ggg")
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
        // console.log("aaa")
        // console.log(this.props.flag1)
        if(this.props.flag1==true){
            this.setState({fileList:[]});
        }
    }
    handleChange2=(info)=>{
        this.setState({
          file:info.file,
          fileList:info.fileList,
        })
        // console.log(this.props.Db.successFile)
        console.log(info.fileList,"文件列表")
        console.log(info.file.status,"文件状态")
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
            suffix:"类型",
            textName:"",
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
          else if (info.file.status === 'removed'){
              console.log("移除文件")
          }
        }
        uploadBefore(file,fileList){
            var brr=this.state.UpList;
            var crr=brr.concat(fileList)
            this.setState({
                fileList,
                file,
                visible:true,
                textName:file.name.split(".")[0],
                suffix:"类型",
                UpList:crr
            })
            var fileList=this.state.fileList;
            return false;
          }
        handleChange=(e)=>{
            console.log(e.target.value)
            this.setState({
                textName:e.target.value
            })
           
        }
        removeHandle=(info)=>{
            console.log(info)
        }
        handleChange3=(value)=>{
            console.log(value)
            this.setState({
                suffix:value
            })
        }
        onReady=(file,fileList)=>{
            console.log("gg")
        }
        handleOK=()=>{
            console.log(this.state.fileList)
            console.log(this.state.file)
            var arr=this.state.fileList
            arr.forEach((item)=>{
                if(item.uid==this.state.file.uid){
                    if(this.state.textName!=""&&this.state.suffix!="类型"){
                        item.name=this.state.textName+this.state.suffix
                    }
                }
            })
            console.log(arr)
            this.setState({
                fileList:arr
            })
            this.props.dispatch({
                type:"Db/fetchNewAttach",payload:{arr,up:this.state.UpList}
            });
            this.setState({visible:false})
             
        }
        handleUpAttach=()=>{
            this.setState({visible4:false,flag1:false});
            console.log(this.props.Db.newAttach,"上传的对象")
            console.log(this.props.Db.upList,"上传的文件对象")
            var up=this.props.Db.upList;
            
            var that=this;
            this.props.Db.newAttach.forEach((item,index)=>{
             if(up[index].uid==item.uid){
              that.props.dispatch({
                type:"Db/fetchUpdateAttach",payload:{file:up[index],token:"dddd",resource_name:item.name}
              })
             }
            })
            that.props.dispatch({
              type:"Db/fetchNewAttach",payload:{arr:[],up:[]}
            })
            that.props.dispatch({
                type:"Db/fetchVisible",payload:false
              })
            this.setState({
                fileList:[],
                UpList:[]
            })
          }
        render(){
            const props = {
                action: 'http://139.224.221.31:16012/FileStorageApp/create_resource/',
                // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                onChange: this.handleChange2,
                onRemove:this.removeHandle,
                accept:".doc,.docx",
                data:{
                    file:this.state.file,
                    token:"dddd",
                    resource_name:this.state.textName!=""?this.state.textName+this.state.suffix:this.state.file
                }
            };
            const selectBefore=(
            <Select style={{width:"80px"}} placeholder="类型" value={this.state.suffix} onChange={this.handleChange3}>
                <Option value="课件">课件</Option>
                <Option value="笔记">笔记</Option>
                <Option value="代码">代码</Option>
            </Select>)
            return (
            
                <Modal
                mask={false}
                width={600}
                title={"上传附件"}
                visible={this.props.Db.visible}
                onOk={this.handleUpAttach}
                onCancel={()=>{ this.setState({fileList:[]});this.props.dispatch({
                    type:"Db/fetchVisible",payload:false
                  })}}
              >
                    <div >

                            <Dragger fileList={this.state.fileList}  style={{height:"200px"}} {...props} beforeUpload={this.uploadBefore.bind(this)}>

                                <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">点击选择文件上传</p>
                                <p className="ant-upload-hint">
                               由杰普公司提供的上传实现
                                </p>
                            </Dragger>
                        
                        <Modal
                          title="设置附件名称"
                          mask={false}
                          visible={this.state.visible}
                          onOk={this.handleOK}
                          onCancel={()=>{this.setState({visible:false})}}
                        >
                            <div style={{display:"flex"}}>
                                <span style={{width:"100px",marginTop:"0.5em"}}>文档标题:</span><Input value={this.state.textName} style={{width:"300px"}} onChange={this.handleChange} addonBefore={selectBefore} placeholder="请描述该文档"  />
                            </div>
                        </Modal>
            
            

                        </div>
                 </Modal>

                
                
            )
        }
}

export default  connect(state=>state)(AddTextForm2)

