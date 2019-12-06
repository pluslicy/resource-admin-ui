import React from 'react'
import {connect} from 'dva'
import moment from 'moment'
import {message,Upload,Button,Icon,Table,Popover,Input,DatePicker,Select,Checkbox,Modal,Cascader,Progress} from 'antd'
const { Search } = Input;
const {RangePicker} = DatePicker;
const { Option } = Select;
import VideoForm from './VideoForm'
import styles from './db.less'
import AddTextForm from './addTextForm2';
var treeKey="";
class VideoModel extends React.Component{
    constructor(props){
        super(props);
       
        this.state={
            names:[],
            add:false,
            arr:[],
            childs:[],
            fileList: [],
            filelist:[],
            file:{},
            ids:[],
            catalogue:"",
            value:"请选择方向",
            flag:"",
            visible1:false,
            visible2:false,
            visible:false,
            vtext:{},
            percent:0,
            ok:0,
            textname:"",
            textid:"",
            tname:{},
            ataArr:[],
            length:0,
            visible4:false,
            flag1:false
        }
    }
    componentDidMount(){
      // alert(JSON.stringify(this.state.query))
        this.props.dispatch({
            type:"Db/fetchVideo",payload:{page:this.props.vt.vq.page,page_size:5}
         })
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
      this.setState({query:{...this.state.query,...{catalogue_path:nextProps.treekey}}});
    }
    //根据日期查询(完成)
    onChange2=(date, dateString)=>{
         var par={
           vr_created_time_start:dateString[0],
           vr_created_time_end:dateString[1]
         }
       var vq={...this.props.vt.vq,...{vr_created_time_start:par.vr_created_time_start,vr_created_time_end:par.vr_created_time_end,page:1}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
       this.props.dispatch({
         type:"Db/fetchVideo",payload:vq
        })
    }
    //根据视频名字查询(完成)
    searchName=(value)=>{
      console.log(this.props.vt.vq)
      var vq={...this.props.vt.vq,...{search:value,page:1}};
      this.props.dispatch({
        type:"vt/fetchVideoQuery",payload:vq
      })
      console.log(vq)
      this.props.dispatch({
        type:"Db/fetchVideo",payload:{...this.props.vt.vq,...{search:value,page:1}}
      })
    }
    setSearch(e){
    //  console.log(e.target.value)
     var vq={...this.props.vt.vq,...{search:e.target.value}};
     this.props.dispatch({
      type:"vt/fetchVideoQuery",payload:vq
    })
    }
    //批量删除视频完成
    batchDelete=()=>{
      this.props.dispatch({
            type:"Db/fetchDeleteVideo",
            payload:{ids:this.state.ids,vq:this.props.vt.vq}
        })
      setTimeout(()=>{
        this.setState({ids:[]})
      },200)
    }
    // 批量启用和冻结视频完成
    batchEnableOrFreeze=(e)=>{
      
        if(e.target.textContent=="冻 结"){
        this.props.dispatch({
            type:"Db/fetchEnableOrFreezeVideo",
            payload:{
              vq:this.props.vt.vq,
              params: {vr_enable:0,
              ids:this.state.ids}
            }
        })
        }else{
        this.props.dispatch({
            type:"Db/fetchEnableOrFreezeVideo",
            payload:{
              vq:this.props.vt.vq,
              params: {vr_enable:1,
              ids:this.state.ids}
            }
        })
        
        }
       
        setTimeout(()=>{
          this.setState({ids:[]})
        },200)
        
    }
    //根据权限查询（完成）
    handleChange3=(value)=>{
        // console.log(value)
        var vq={...this.props.vt.vq,...{vr_permission:value,page:1}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
            type:"Db/fetchVideo",payload:vq
        });
    }
    //根据格式查询(完成)
    handleChange4=(value)=>{
        var vq={...this.props.vt.vq,...{vr_format:value,page:1}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
            type:"Db/fetchVideo",payload:vq
        });
    }
    //根据状态查询(完成)
    handleChange5=(value)=>{
        var vq={...this.props.vt.vq,...{vr_enable:value}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
          type:"Db/fetchVideo",payload:vq
        })
    }
    //修改权限和状态(完成)
    handleChange=(record,e)=>{
          if(e._owner.key=="vr_permission"){
            
                this.props.dispatch({
                type:"Db/fetchPermissionVideo",payload:{
                    params:{vr_permission: record,
                      id: e._owner.pendingProps.record.id},
                    vq:this.props.vt.vq
                  }
                })
            }else{
            this.props.dispatch({
                type:"Db/fetchEnableOrFreezeVideo",
                payload:{
                  params:{ vr_enable:record,
                    ids:[e._owner.pendingProps.record.id]},
                  vq:this.props.vt.vq
                }
            })
          }
          setTimeout(()=>{
            this.setState({ids:[]})
          },200)
    }
    //根据时间排序(完毕)
    checkTimeChange=(e)=> {  
        console.log(e.target.checked)
        var vq={...this.props.vt.vq,...{bytime:e.target.checked}};
        console.log(vq)
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
        type:"Db/fetchVideo",payload:vq
        })

    }
    //根据热度排序(完毕)
    checkHotChange=(e)=>{
       
        var vq={...this.props.vt.vq,...{byhot:e.target.checked}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
          type:"Db/fetchVideo",payload:vq
        })
        
    }
    //展示调整编目
    showModal1=()=>{
      this.setState({
      childs:"",
      visible1: true,
      value:"请选择方向"
      });
    }
    //修改文档名字
    editFileName=(e)=>{
      console.log(this.state.arr)
        var arr=this.state.arr;
        arr.forEach((item)=>{
            if(item.resource_id===this.state.tname.resource_id){
              item.resource_name=e.target.value;
            }
        })
        console.log(arr)
        this.setState({
          arr
        })
    }
    //调整资源编目
    closeTiaoZheng=()=>{
      this.props.dispatch({
        type:"Db/fetchUpdateVideo",payload:{params:{ids:this.state.ids,catalogue:this.state.catalogue},vq:this.props.vt.vq}
      })
      this.setState({
        visible1:false
      })
      setTimeout(()=>{
        this.setState({ids:[]})
      },200)
    }
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
    handleCancel1 = e => {
        this.setState({
          visible1: false,
          add:false
        });
    };
   
   
   
    showModal=(file,fileList)=>{
      if(add_text!=null){
        var add_text=document.getElementById("add_text")
        console.log(add_text.style)
        add_text.style.display="none"
        var btn=document.getElementById("submit_btn")
        btn.style.opacity="1";
        btn.style.pointerEvents="auto"
        btn.style.background="rgba(22, 155, 213, 1)"
      }
       
        this.setState({
            visible: true,
        });
        
    }
    handleOk = e => {
      e.preventDefault();
      console.log(this.props.Db.successFile)
      console.log(this.state.arr);
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
          if (err) {
          return;
          }
  
          console.log('Received values of form: ', values);
          console.log('up values',this.state.arr)
         
          var saveArr=[];
          if(values.da!=undefined){
            this.state.arr.forEach((item,index)=>{
              console.log(item.id)
              var b={
                va:null,
                catalogue:"",
                user: 24,
                vr_name:"",
                vr_url:"",
                vr_desc:"",
                vr_permission: 1,
                vr_owner: 1,
                vr_format:"",
                vr_size:"",
                vr_time:0,
                vr_suffix:'mp4',
                attachment:[]
              }
              b.va=values.da;b.vr_name=item.resource_name;b.vr_url=item.resource_url;
              b.vr_desc=values.zj_description;b.vr_format=item.resource_type;b.vr_size=item.resource_size;
              for(let i=0;i<this.props.Db.successFile.length;i++){
                if(this.props.Db.successFile[i].textid===item.resource_id){
                  b.attachment=this.props.Db.successFile[i].attachment;
                  delete this.props.Db.successFile[i].textid;
                }
              }
              if(values.zj_vip==true){
                b.vr_permission=0;
              }
              saveArr.push(b)
            })
           
          }
          else{
            this.state.arr.forEach((item,index)=>{
              console.log(item.resource_id)
              
              var b={
                va:null,
                catalogue:"",
                user: 24,
                vr_name:"",
                vr_url:"",
                vr_desc:"",
                vr_permission: 1,
                vr_owner: 1,
                vr_format:"",
                vr_size:"",
                vr_time:0,
                vr_suffix:'mp4',
                attachment:[]
              }
              
              for(let i=0;i<this.props.Db.successFile.length;i++){
                if(this.props.Db.successFile[i].textid===item.resource_id){
                  b.attachment=this.props.Db.successFile[i].attachment;
                  delete this.props.Db.successFile[i].textid;
                }
              }
              b.catalogue=parseInt(values.video_js[values.video_js.length-1]);b.vr_name=item.resource_name;b.vr_url=item.resource_url;
              b.vr_desc=values.description;b.vr_format=item.resource_type;b.vr_size=item.resource_size;

              if(values.name==true){
                b.vr_permission=0;
              }
              saveArr.push(b)
            })
            
          }
          console.log(saveArr,"aaa")
          this.props.dispatch({
            type:"Db/fetchUploadVideoOneOrMore",payload:saveArr
          })
          form.resetFields();
      });
    
      // this.props.dispatch({
      //   type:"Db/fetchTextLength",payload:""
      // })
      
      // this.props.dispatch({
      //   type:"Db/fetchUpdateAttach",payload:[]
      // })
      this.setState({
        visible:false,
        visible1:false
      })
      
    };
    handleChange2=(info)=>{
    
      var upobj={
        resource_id:"",
        resource_name:"",
        resource_url:"",
        resource_enable:"",
        resource_type:"",
        resource_size:"",
        created_time:""
      }
      this.setState({
        file:info.file
      })
      this.setState({
        percent:Math.round(info.file.percent)
      })
      if (info.file.status == 'uploading') {
        
      }
      // this.showModal();
      if (info.file.status === 'done') {
        var arr=this.state.arr;
        const {resource_id,resource_name,resource_url,resource_enable,resource_type,resource_size,created_time}=info.file.response;
        upobj={resource_id:resource_id,resource_name:resource_name,resource_url:resource_url,resource_enable:resource_enable,resource_type:resource_type,resource_size:resource_size,created_time:created_time};
        let a=this.state.ok+1;
        arr.unshift(upobj)
        this.setState({
          ok:a,
          file:info.file,
          arr:arr
        })
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        var arr=this.state.names;
        arr.forEach((item,index,arr)=>{
          if(item==info.file.name){
            arr.splice(index,index)
          }
        })
        message.error(`${info.file.name} file upload failed.`);
        }
      }
    handleCancel = e => {
        this.setState({
          visible1: false,
          visible:false,
          filelist:[],
          percent:0,
          file:{},ok:0,length:0
        });
        this.props.dispatch({
          type:"Db/fetchUpdateFlag",payload:""
        })
    };
    
    updateFileName(record,e){
      var arr=this.state.arr;
      arr.forEach((item)=>{
        if(record.resource_id==item.resource_id){
         
          item.tname=false;
        }
      })
      this.setState({
        visible2:true,
        tname:record,
        arr
      })
    }
    selectFang(value){
      var a=this.props.Db.catalist[0].childs.filter((item,index)=>{
        if(item.id==value) return item;
      })
      this.setState({
        childs:a[0].childs,
        value
      })
    }
    setBianMu=(value, selectedOptions)=>{
      this.setState({
        catalogue:value[value.length-1]
      })
    }
    uptext(record,e){
      // if(e.target.__reactInternalInstance$q2jug5y2evp)
      if(record.resource_id){
        this.setState({
          visible4:true
        })
        this.props.dispatch({
          type:"Db/fetchTextLength",payload:record.resource_id
        })
        this.props.dispatch({
          type:"Db/fetchVisible",payload:true
        })
        this.setState({
          textname:record.resource_name,
          textid:record.resource_id,
          visible4:true
        })
        if(e.target!=undefined){
          this.setState({
            textname:record.resource_name,
          })
        }
       
      }
      else{
        message.info("请等待上传成功");
      }
      
      // this.setState({
      //   vtext:e.target.__reactInternalInstance$htlud7b3i2u
      // })
    }
    showEditFileName(record,e){
      var arr=this.state.arr;
      arr.forEach((item)=>{
        if(record.resource_id==item.resource_id){
          item.tname=true;
        }
      })
      this.setState({
        arr
      })
    }
    closeEditFileName(record,e){
      var arr=this.state.arr;
      arr.forEach((item)=>{
        if(record.resource_id==item.resource_id){
          item.tname=false;
        }
      })
      this.setState({
        arr
      })
    }
    findAttach(record,e){
        console.log(record,"fgg",this.props.Db.successFile)
        var arr=this.props.Db.successFile;
        console.log(arr)
        var indexs=[];
        if(this.props.Db.successFile.length==0){
          message.info("请等待附件上传成功后操作");
        }else{
          var brr=arr.map((item,index)=>{
            if(item.textid==record.resource_id) {
              indexs.push(index)
              return item;
            }
          })
          indexs.forEach((item)=>{
            arr.splice(item,1);
          })
          console.log("删除后的附件还有",arr)
          console.log("删除的附件",brr)
          var urls=[];
          brr.forEach((item)=>{
            if(item.attachment.length!=0){
              item.attachment.forEach((item,index)=>{
                urls.push(item.attach_url);
              })
            } 
          })
          console.log(urls,arr,"参数准备")
          this.props.dispatch({
            type:"Db/fetchDeleteAttach",payload:{
              urls,successFile:arr
            }
          })
        }
        
    }
    VideoEWAddChange=(info)=>{
      var upobj={
        resource_id:"",
        resource_name:"",
        resource_url:"",
        resource_enable:"",
        resource_type:"",
        resource_size:"",
        created_time:""
      }
      this.setState({
        file:info.file
      })
      this.setState({
        percent:Math.round(info.file.percent)
      })
      if (info.file.status == 'uploading') {
          console.log(info.file)
      }
      // this.showModal();
      if (info.file.status === 'done') {
        var arr=this.state.arr;
        var length=this.state.length+1;
        const {resource_id,resource_name,resource_url,resource_enable,resource_type,resource_size,created_time}=info.file.response;
        upobj={resource_id:resource_id,resource_name:resource_name,resource_url:resource_url,resource_enable:resource_enable,resource_type:resource_type,resource_size:resource_size,created_time:created_time};
        let a=this.state.ok+1;
        arr.unshift(upobj)
        if(length>1){
          this.props.dispatch({
            type:'vt/fetchUpdateFlag',payload:"专辑"
          })
        }
        this.setState({
          ok:a,
          file:info.file,
          arr:arr,
          length
        })
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        var arr=this.state.names;
        arr.forEach((item,index,arr)=>{
          if(item==info.file.name){
            arr.splice(index,index)
          }
        })
        message.error(`${info.file.name} file upload failed.`);
      }
      
    }
    deleteVideoFile(record){
    
      var newArr=this.state.arr;
      var length=this.state.length;
      var ok=this.state.ok;
      newArr.forEach((item,index,arr)=>{
        if(item.resource_id==record.resource_id){
          this.props.dispatch({
            type:"Db/fetchDeleteVideo",payload:{
              urls:[item.resource_url]
            }
          })
          arr.splice(index,1)
          length--;
          ok--
        }
      })
    
      console.log(newArr)
      this.setState({
        arr:newArr,
        length,ok
      })
      if(length==1){
        this.props.dispatch({
          type:'vt/fetchUpdateFlag',payload:"视频"
        })
      }else if(length==0){
        this.handleCancel();
      }
    }
    showDeleteAttach(record,e){
      console.log(record)
     var deleteAttach=document.getElementById(record.resource_id);
     deleteAttach.style.display="inline-block";
    }
    closeDeleteAttach(record,e){
      console.log(record)
      var deleteAttach=document.getElementById(record.resource_id);
       deleteAttach.style.display="none";
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
    }
    render(){
        const columns = [
            {
              title: '名称',
              dataIndex: 'vr_name',
              render: (text,record) => 
              <Popover overlayStyle={{maxHeight:"10px"}} placement="bottomLeft" trigger="hover" content={[
                <div style={{maxHeight:"10px",marginTop:"-13px"}} key="id" >
                    <img  src={require('./u483.png')} alt=""/>&nbsp;<span style={{fontSize:"10px"}}>{record.vr_play_times}</span>
                    <img style={{marginLeft:"5px"}} src={require('./u486.png')} alt=""/>&nbsp;<span style={{fontSize:"10px"}}>{record.vr_favor_num}</span>
                    <img style={{marginLeft:"5px"}} src={require('./u489.png')} alt=""/>&nbsp;<span style={{fontSize:"10px"}}>{record.vr_collection_num}</span>
                    <img style={{marginLeft:"5px"}} src={require('./u492.png')} alt=""/>&nbsp;<span style={{fontSize:"10px"}}>{record.vr_comment_num}</span>
                </div>
              ]} >
                <span style={{cursor:"pointer"}}>{text}</span>
              </Popover>
            },
            {
              title: '作者',
              dataIndex: 'vr_author',
            },
            {
              title: '方向',
              dataIndex:'vr_cata_two'
            },
            {
              title: '技术',
              dataIndex:'vr_cata_one'
            },
            {
              title: '类型',
              dataIndex:'vr_owner',
              // 0 杰普资源 1 网络资源
              render: (text, record) => {
                if(text==0){
                  return "杰普资源";
                }else{
                  return "网络资源";
                }
              } 
            },
            {
              title: '权限',
              dataIndex:'vr_permission',
              // 0 vip 1 Free 2 other
              render: (text,record) => {
                return (
                  <div style={{width:"75px",height:"20px",overflow:"hidden"}}>
                      <Select defaultValue={text} style={{ width:"80px",marginLeft:"-2px",marginTop:"-5px"}} onChange={this.handleChange}>
                        <Option  value={0}>vip</Option>
                        <Option value={1}>free</Option>
                        <Option value={2}>other</Option>
                      </Select>
                   </div>
                );
              },
            },
            {
              title: '格式',
              dataIndex: 'vr_format',
            },
            {
              title: '日期',
              dataIndex: 'vr_created_time',
              render: (text,record) => {
                var dateee = new Date(text).toJSON();
                var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
                return (date)
              }
            },
            {
              title: '状态',
              dataIndex:'vr_enable',
              render: (text,record) => {
                if(text==1){
                  return (
                    <div style={{width:"75px",height:"20px",overflow:"hidden"}}>
                        <Select defaultValue={text} style={{ width:"100px",marginLeft:"-12px",marginTop:"-5px"}} onChange={this.handleChange.bind(record)}>
                          <Option value={1} >启用中</Option>
                          <Option value={0} style={{color:"red"}}>冻结</Option>
                        </Select>
                    </div>
                  )
                }else{
                 return (
                        <span style={{color:"red"}}>冻结</span>
                )
                }
      
              },
      
            },
          ];
        const dateFormat = 'YYYY-MM-DD';
        const rowSelection = {
        selectedRowKeys: this.state.ids,
        columnTitle:"#",
        onChange: (selectedRowKeys, selectedRows) => {
              
                this.setState({
                  ids:selectedRowKeys
                })
            },
        };
        const props = {
              action: 'http://10.0.6.5:53001/FileStorageApp/create_resource/',
              // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
              onChange: this.handleChange2,
              accept:".mp4",
              data:{
                file:this.state.file,
                token:"dddd",
                resource_name:this.state.file.name
              }
        };
        const props2 = {
          action: 'http://10.0.6.5:53001/FileStorageApp/create_resource/',
          // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          onChange: this.VideoEWAddChange,
          accept:".mp4",
          data:{
            file:this.state.file,
            token:"dddd",
            resource_name:this.state.file.name
          }
        };
        return (
            <div className="table">
                    {/* 文件上传组件 */}
                   
                    <Upload  multiple={true} {...props} showUploadList={false}  beforeUpload={(file,fileList)=>{
                              this.setState({
                                length:fileList.length
                              })
                              if(fileList.length==1){
                                this.props.dispatch({
                                  type:'vt/fetchUpdateFlag',payload:"视频"
                                })
                              }else{

                                this.props.dispatch({
                                  type:'vt/fetchUpdateFlag',payload:"专辑"
                                })
                            }
                      var b=[];
                      fileList.forEach((item)=>{
                          b.push(item.name);
                      })
                      this.setState({
                      filelist:fileList,
                      file:file,
                      ok:0,
                      names:b,
                      arr:[]
                      });this.showModal(file,fileList)}}>
                    <Button style={{width:"90px",top:"1em",height:"28px",fontSize:"12px",backgroundColor:"rgba(51, 153, 255, 1)",color:"#FFFFFF",borderRadius:"5px",position:"absolute",marginLeft:"89.5%",marginTop:"0em"}} >
                        <Icon type="upload" />上传
                    </Button>
                    </Upload>
                    <RangePicker  onChange={this.onChange2} style={{width:"220px"}} defaultValue={[moment('2018/12/11', dateFormat), moment('2018/12/12', dateFormat)]}
                    format={dateFormat} />
                    <Search
                    placeholder="请输入搜索内容"
                    onChange={this.setSearch.bind(this)}
                    value={this.props.vt.vq.search}
                    onSearch={this.searchName}
                    style={{ marginLeft:"2em",width: "222px",height:"30px"}}
                    />
                    <br/>
                    <div className="select-div" style={{width:"60%",marginTop:"2em",display:"inline",overflow:"hidden"}}>
                        <span style={{marginTop:"2em",fontWeight:"700",fontSize:"12px"}}>权限 </span>
                        <Select value={this.props.vt.vq.vr_permission} size="small" placeholder="权限" defaultValue="" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px",width:60}} onChange={this.handleChange3}>
                            <Option style={{fontSize:"12px"}} value="">权限</Option>
                            <Option style={{fontSize:"12px"}} value={0}>Vip</Option>
                            <Option style={{fontSize:"12px"}} value={1}>Free</Option>
                            <Option style={{fontSize:"12px"}} value={2}>Other</Option>
                        </Select>
                        <span style={{marginLeft:"2em",fontWeight:"700",fontSize:"12px"}}>格式 </span>
                        <Select value={this.props.vt.vq.vr_format} className="video_select" size="small" defaultValue="" style={{  width:"62px",height:"22px",marginLeft:"1em" ,fontSize:"12px"}} onChange={this.handleChange4}>
                            <Option style={{fontSize:"12px"}} value="">格式</Option>
                            <Option style={{fontSize:"12px"}} value="视频">视频</Option>
                            <Option style={{fontSize:"12px"}} value="专辑">专辑</Option>
                    
                        </Select>
                       
                        <span style={{marginLeft:"2em",fontWeight:"700",fontSize:"12px"}}>状态 </span>
                        <Select size="small" value={this.props.vt.vq.vr_enable} placeholder="状态" defaultValue="" style={{  width:62,height:22,marginLeft:"1em",fontSize:"12px" }} onChange={this.handleChange5}>
                            <Option style={{fontSize:"12px"}} value="">状态</Option>
                            <Option style={{fontSize:"12px"}} value={1}>启用中</Option>
                            <Option style={{fontSize:"12px"}} value={0}>冻结</Option>
                        </Select>
                        <span style={{marginLeft:"2em",fontWeight:"bold"}}><Checkbox checked={this.props.vt.vq.bytime} onChange={this.checkTimeChange} style={{fontSize:"12px"}} >按时间</Checkbox></span>
                        <span style={{marginLeft:"1em",fontWeight:"bold"}}><Checkbox checked={this.props.vt.vq.byhot} onChange={this.checkHotChange} style={{fontSize:"12px"}} >按热度</Checkbox></span>
                    </div>
                    <Table 
                        className="video_table"
                        size="middle" 
                        style={{marginTop:"1em"}}
                        rowKey="id"
                        pagination={{
                        onChange: page => {
                            // console.log(page);
                            var query={...this.props.vt.vq,...{page}}
                            // console.log(query)
                            this.props.dispatch({
                              type:"vt/fetchVideoQuery",payload:query
                            })
                            this.props.dispatch({
                              type:"Db/fetchVideo",payload:query
                            })
                        },
                        pageSize: 5,
                        total:this.props.Db.vcount,
                        size:'small',
                        current:this.props.vt.vq.page,
                        hideOnSinglePage: false,
                        itemRender: (current, type, originalElement) => {
                            if (type === 'prev') {
                            return <Button size="small" style={{marginRight:"1em"}}>上一页</Button>;
                            }
                            if (type === 'next') {
                            return <Button size="small" style={{marginLeft:"1em"}}>下一页</Button>;
                            }
                            return originalElement;
                        },
                        }}
                        rowSelection={rowSelection} columns={columns} dataSource={this.props.Db.videolist.results} />
                    <Button type="primary" style={{top:"0em",width:"35px",height:"21px",fontSize:"12px",padding:"0"}} onClick={this.batchEnableOrFreeze}>启用</Button>
                    <Button  style={{top:"0em",color:"white",marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(255, 0, 0, 1)"}} onClick={this.batchEnableOrFreeze}>冻结</Button>
                    <Button  style={{top:"0em",color:"white",marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(102, 102, 102, 1)"}} onClick={this.batchDelete}>删除</Button>
                    <Button  style={{top:"0em",color:"white",marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(22, 142, 194, 1)"}} onClick={this.showModal1}>调整</Button>
                    <Modal
                        onCancel={this.handleCancel1}
                        title="请选择资源所在编目"
                        visible={this.state.visible1}
                        style={{display:"flex",justifyContent:"space-around"}}
                        footer={[
                            <Button onClick={this.closeTiaoZheng} style={{marginRight:"40%"}}>确认</Button>
                        ]}
                        >
                        <Select onChange={this.selectFang.bind(this)} style={{width:"180px",height:"40px"}} value={this.state.value}  placeholder="请选择方向">
                                        {
                                            this.props.Db.catalist[0].childs.map((item)=>{
                                                return <Option key={item.id} value={item.id}>{item.catalogue_name}</Option>
                                            })
                                        }
                        </Select>
                        <Cascader onChange={this.setBianMu} style={{marginLeft:"1em"}} options={this.state.childs} fieldNames={{ label: 'catalogue_name', value: 'id', children: 'childs' }}   changeOnSelect placeholder="请选择技术"/>
                    </Modal>
                    <Modal
                        style={{top:"20px"}}
                        title={
                            <div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"775px",height:"102px",backgroundColor:"#e8e8e8",borderRadius:"10px",marginLeft:"1em",boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.349019607843137)",textAlign:"center",position:"relative"}}>
                        <div style={{width:"400px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:"700",fontSize:"18px",position:"absolute",top:".5em",left:"252px",display:"flex"}}>您上传的视频：
                        {
                            this.state.filelist.map((item,index)=>{
                            return <div style={{width:"80px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                            })
                        }
                        </div>
                        <Icon type="close-circle" onClick={this.handleCancel} style={{position:"absolute",left:"749px",top:"14px"}}/>
                            <Progress
                                style={{width:"669px",height:"50px",marginTop:"2.5em"}}
                                strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                                }}
                                percent={this.state.percent}
                            />
                            
                        <span style={{display:"block",position:"absolute",top:"4em",left:"2em",fontSize:"normal"}}>已上传：{this.state.ok}/{this.state.length}</span>
                        
                        </div>
                        }
                        closable={false}
                        visible={this.state.visible}
                        footer={null}
                        width={850}
                        >
                        <div className={styles.left}>
                        <span style={{fontWeight:700,marginLeft:"30px"}}>您上传的视频:
                        <Upload  {...props2} showUploadList={false} multiple={true} beforeUpload={(file,fileList)=>{
                               if(this.state.length==0){
                                this.props.dispatch({
                                  type:'vt/fetchUpdateFlag',payload:"视频"
                                })
                              }else{
                                this.props.dispatch({
                                  type:'vt/fetchUpdateFlag',payload:"专辑"
                                })
                              }
                              var b=[];
                              fileList.forEach((item)=>{
                                  b.push(item.name);
                              })
                              var a=this.state.names;
                              var length=this.state.length+fileList.length+1;
                              var newArr = a.concat(b);
                              this.setState({
                                  names:newArr,
                                  file:file,
                                  filelist:fileList
                              })}}>
                          <Button size="small" style={{marginLeft:"1.3em"}} >
                            添加
                          </Button>
                          </Upload>
                            <br/>
                            <div style={{border:"1px dashed black",width:"156px",height:"170px",marginLeft:"2em",marginTop:"1em",position:"relative"}}>
                            <ol>
                            {/* <li  style={{marginLeft:"-10px",marginTop:".5em",display:"flex"}}>
                                <span  onMouseOut={this.closeEditFileName.bind(this,"ds")} onMouseOver={this.showEditFileName.bind(this,"ss")} style={{cursor:"pointer",fontSize:"12px",width:"150px",display:"flex"}}  >
                                   <span style={{width:"80px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",display:"inline-block",marginLeft:"-2em"}}>{"sdas"}</span>
                                 <span style={{marginLeft:"-2.5em",display:"inline-block"}}><Icon type="edit" onClick={this.updateFileName.bind(this,"aa")}/><Icon onClick={this.deleteVideoFile.bind(this,"aa")} style={{marginLeft:"0.3em"}} type="delete" /></span>
                                  <span  id={"sad"} style={{fontSize:"12px",marginLeft:"2em"}} >
                                  {
                                    <div style={{color:"#3585FE",fontSize:"12px"}} onClick={this.uptext.bind(this,"aa")}>+附件</div>
                                  }
                                  </span>
                                </span>
                                </li> */}
                            {
                              
                               
                              this.state.arr.length!=this.state.length?this.state.filelist.map((item,index)=>{
                                   
                                return (<li  style={{marginLeft:"-10px",marginTop:".5em",display:"flex"}}>
                                <span  onMouseOut={this.closeEditFileName.bind(this,item)} onMouseOver={this.showEditFileName.bind(this,item)} style={{cursor:"pointer",fontSize:"12px",width:"150px",display:"flex"}}  >
                                   <span style={{width:"80px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",display:"inline-block",marginLeft:"-2em"}}>{item.name}</span>
                                  {item.tname!=true?<span></span>:<span style={{marginLeft:"-2.5em",display:"inline-block"}}><Icon type="edit" onClick={this.updateFileName.bind(this,item)}/><Icon onClick={this.deleteVideoFile.bind(this,item)} style={{marginLeft:"0.3em"}} type="delete" /></span>}
                                  <span  id={item.uid} style={{fontSize:"12px",marginLeft:"2em"}} >
                                  {
                                    <div style={{color:"#3585FE",fontSize:"12px",position:"absolute",right:"0",height:"20px"}} onClick={this.uptext.bind(this,item)}>+附件</div>
                                  }
                                  </span>
                                </span>
                                </li>)
                              }):this.state.arr.map((item,index)=>{
                                   
                                    return (<li  style={{marginLeft:"-10px",marginTop:".5em",display:"flex"}}>
                                    <span  onMouseOut={this.closeEditFileName.bind(this,item)} onMouseOver={this.showEditFileName.bind(this,item)} style={{cursor:"pointer",fontSize:"12px",width:"150px",display:"flex"}}  >
                                       <span style={{width:"60px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",display:"inline-block",marginLeft:"-2em"}}>{item.resource_name}</span>
                                      {item.tname!=true?<span></span>:<span style={{display:"inline-block"}}><Icon type="edit" onClick={this.updateFileName.bind(this,item)}/><Icon onClick={this.deleteVideoFile.bind(this,item)} style={{marginLeft:"0.3em"}} type="delete" /></span>}
                                      <span  key={item.resource_id} style={{fontSize:"12px",marginLeft:"2em"}} >
                                      {
                                        this.props.Db.successFile.some((hello)=>{
                                          return hello.textid==item.resource_id&&hello.attachment.length!=0;
                                        })?
                                        <span  style={{borderRadius:"50px",border:"1px solid #efefef",boxShadow:"0px 0px 1px rgba(0,0,0,0.349)",position:"absolute",right:"0",height:"20px"}} onMouseOut={this.closeDeleteAttach.bind(this,item)} onMouseOver={this.showDeleteAttach.bind(this,item)}><Icon style={{width:"19px",height:"19px"}} type="cloud-upload" onClick={this.uptext.bind(this,"hello")}/> <Icon style={{width:"19px"}} onClick={this.findAttach.bind(this,item)} style={{display:"none"}} id={item.resource_id} type="close" /></span>
                                        :<div style={{color:"#3585FE",fontSize:"12px",position:"absolute",right:"0"}} onClick={this.uptext.bind(this,item)}>+附件</div>
                                      }
                                      </span>
                                    </span>
                                    </li>)
                                  })
                              }
                             
                            
                            </ol>
                            </div>
                        </span> <br/><br/>

                            

                        </div>
                        
                        <VideoForm id="v_form" wrappedComponentRef={this.saveFormRef} vtest={{flag:this.state.flag,name:this.state.vtext.key}} add={this.state.add} />
                        {/* <div id="add_text" style={{display:"none",width:"570px",height:"405px",left:"260px",top:"150px",position:"absolute",background:"#fff",overflowY:"auto"}}>
                          <AddTextForm textname={this.state.textname} textid={this.state.textid}></AddTextForm>
                        </div> */}
                       
                         {this.props.Db.visible==true?<AddTextForm  textname={this.state.textname}   textid={this.state.textid}></AddTextForm>:<AddTextForm style={{display:"none"}} textname={this.state.textname} textid={this.state.textid}></AddTextForm>
                          }
                       
                        <Button id="submit_btn" onClick={this.handleOk} style={{left:"37.5%",top:"-25px",height:"34px",width:"157px",backgroundColor:"rgba(22, 155, 213, 1)",fontWeight:"700",fontSize:"14px",color:"#ffffff",borderRadius:"10px"}}>确认</Button>
                        <Modal
                            title="修改视频文件名"
                            visible={this.state.visible2}
                            onOk={()=>{this.setState({tname:{},visible2:false})}}
                            onCancel={()=>{this.setState({tname:{},visible2:false})}}
                          >
                            <div style={{display:'flex',justifyContent:"space-around"}}>
                            <span style={{width:"100px"}}>视频名称：</span><Input size={'small'} onChange={this.editFileName.bind(this)} value={this.state.tname.resource_name!=undefined?this.state.tname.resource_name.split(".")[0]:""} />

                            </div>
                        </Modal>
                        </Modal>
                           
                        
            </div>
        );
    }
}
export default connect(state=>state)(VideoModel);