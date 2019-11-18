import React from 'react'
import {connect} from 'dva'
import moment from 'moment'
import {message,Upload,Button,Icon,Table,Popover,Input,DatePicker,Select,Checkbox,Modal,Cascader,Progress} from 'antd'
const { Search } = Input;
const {RangePicker} = DatePicker;
const { Option } = Select;
import VideoForm from './VideoForm'
import styles from './db.less'
import AddTextForm from './addTextForm';
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
            visible:false,
            vtext:{},
            percent:0,
            ok:0,
            textname:""
        }
    }
    componentDidMount(){
        this.props.dispatch({
            type:"Db/fetchVideo",payload:this.state.query
         })
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
    //根据日期查询
    onChange2=(date, dateString)=>{
         var par={
           vr_created_time_start:dateString[0],
           vr_created_time_end:dateString[1]
         }
       var vq={...this.props.vt.vq,...{vr_created_time_start:par.vr_created_time_start,vr_created_time_end:par.vr_created_time_end}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
       this.props.dispatch({
         type:"Db/fetchVideo",payload:{...this.props.vt.vq,...{vr_created_time_start:par.vr_created_time_start,vr_created_time_end:par.vr_created_time_end}}
        })
    }
    //根据名字查询
    searchName=(value)=>{
      console.log(this.props.vt.vq)
      var vq={...this.props.vt.vq,...{search:value}};
      this.props.dispatch({
        type:"vt/fetchVideoQuery",payload:vq
      })
      this.props.dispatch({
        type:"Db/fetchVideo",payload:{...this.props.vt.vq,...{search:value}}
      })
    }
    //批量删除 视频和文档完成
    batchDelete=()=>{
      this.props.dispatch({
            type:"Db/fetchDeleteVideo",
            payload:this.state.ids
        })
    }
  // 批量启用和冻结 视频和文档完成
    batchEnableOrFreeze=(e)=>{
  
        if(e.target.textContent=="冻 结"){
        this.props.dispatch({
            type:"Db/fetchEnableOrFreezeVideo",
            payload:{
            vr_enable:0,
            ids:this.state.ids
            }
        })
        }else{
        this.props.dispatch({
            type:"Db/fetchEnableOrFreezeVideo",
            payload:{
            vr_enable:1,
            ids:this.state.ids
            }
        })
        }
    }
  //根据权限查询（完成）
    handleChange3=(value)=>{
        // console.log(value)
        var vq={...this.props.vt.vq,...{vr_permission:value}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
            type:"Db/fetchVideo",payload:vq
        });
    }
    //根据格式查询(完成)
    handleChange4=(value)=>{
        var vq={...this.props.vt.vq,...{vr_format:value}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
            type:"Db/fetchVideo",payload:{...this.props.vt.vq,...{vr_format:value}}
        });
    }
    //根据状态查询(完成)
    handleChange5=(value)=>{
        var vq={...this.props.vt.vq,...{vr_enable:value}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
        type:"Db/fetchVideo",payload:{...this.props.vt.vq,...{vr_enable:value}}
        })
    }
    //修改权限和状态
    handleChange=(record,e)=>{
          if(e._owner.key=="vr_permission"){
                this.props.dispatch({
                type:"Db/fetchPermissionVideo",payload:{
                vr_permission: record,
                id: e._owner.pendingProps.record.id
                }
                })
            }else{
            this.props.dispatch({
                type:"Db/fetchEnableOrFreezeVideo",
                payload:{
                vr_enable:record,
                ids:[e._owner.pendingProps.record.id]
                }
            })
          }
    }
    //根据时间排序(完毕)
    checkTimeChange=(e)=> {  
      
        var vq={...this.props.vt.vq,...{bytime:`${e.target.checked}`}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
        type:"Db/fetchVideo",payload:{...this.props.vt.vq,...{bytime:`${e.target.checked}`}}
        })

    }
    //根据热度排序(完毕)
    checkHotChange=(e)=>{
       
        var vq={...this.props.vt.vq,...{byhot:`${e.target.checked}`}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
          type:"Db/fetchVideo",payload:{...this.props.vt.vq,...{byhot:`${e.target.checked}`}}
        })
        
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
      this.setState({query:{...this.state.query,...{catalogue_path:nextProps.treekey}}});
    }
   
     //展示调整编目
    showModal1=()=>{
        this.setState({
        childs:"",
        visible1: true,
        value:"请选择方向"
        });
    }
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
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
          if (err) {
          return;
          }
  
          console.log('Received values of form: ', values);
          console.log('up values',this.state.arr)
         
          var saveArr=[];
          if(values.flag=="专辑"){
            
            this.state.arr.forEach((item,index)=>{
              var b={
                va:"",
                catalogue:"",
                user: 24,
                vr_name:"",
                vr_url:"",
                vr_desc:"",
                vr_permission: 1,
                vr_owner: 1,
                vr_format:"",
                vr_size:"",
                vr_time:''
              }
              b.va=values.da;b.catalogue=parseInt(values.zj_ad[values.zj_ad.length-1]);b.vr_name=item.resource_name;b.vr_url=item.resource_url;
              b.vr_desc=values.zj_description;b.vr_format=item.resource_type;b.vr_size=item.resource_size;b.vr_time=item.created_time;
              if(values.zj_vip==true){
                b.vr_permission=0;
              }
              saveArr.push(b)
            })
           
          }
          else{
            this.state.arr.forEach((item,index)=>{
              var b={
                va:"",
                catalogue:"",
                user: 24,
                vr_name:"",
                vr_url:"",
                vr_desc:"",
                vr_permission: 1,
                vr_owner: 1,
                vr_format:"",
                vr_size:"",
                vr_time:''
              }
              b.va=values.da;b.catalogue=parseInt(values.video_js[values.video_js.length-1]);b.vr_name=item.resource_name;b.vr_url=item.resource_url;
              b.vr_desc=values.description;b.vr_format=item.resource_type;b.vr_size=item.resource_size;b.vr_time=item.created_time
              if(values.name==true){
                b.vr_permission=0;
              }
              saveArr.push(b)
            })
            
          }
          this.props.dispatch({
            type:"Db/fetchUploadVideoOneOrMore",payload:saveArr
          })
          form.resetFields();
      });
      
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
        arr.push(upobj)
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
          file:{}
        });
        this.props.dispatch({
          type:"Db/fetchUpdateFlag",payload:""
        })
        var add_text=document.getElementById("add_text")
        console.log(add_text.style)
        add_text.style.display="none"
        var btn=document.getElementById("submit_btn")
        btn.style.opacity="1";
        btn.style.pointerEvents="auto"
        btn.style.background="rgba(22, 155, 213, 1)"
    };
     //修改文档名字
    editFileName=(aa,e)=>{
      var arr=[];
      var brr=this.state.names;
      this.state.filelist.forEach((item)=>{
        arr.push(item.uid)
      })
      arr.forEach((item,index)=>{
          if(item===aa.uid){
               brr[index]=e.target.value;
          }
      })

      this.setState({
        names:brr
      })
      
    }
    closeTiaoZheng=()=>{
      this.props.dispatch({
        type:"Db/fetchUpdateVideo",payload:{ids:this.state.ids,catalogue:this.state.catalogue}
      })
      this.props.dispatch({
        type:"Db/fetchVideo",payload:this.state.query
      })
      this.setState({
        visible1:false
      })
    }
    updateFileName(e){
      console.log(this.state.names)
      console.log(this.state.arr)

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
    uptext(e){
      // if(e.target.__reactInternalInstance$q2jug5y2evp)
      console.log(e.target.previousElementSibling.previousElementSibling.innerText);
      var add_text=document.getElementById("add_text")
      
      add_text.style.display="block"
      add_text.style.zIndex="1";
      var btn=document.getElementById("submit_btn")
      btn.style.opacity="0.5";
      btn.style.pointerEvents="none"
      btn.style.background="grey"
      this.setState({
        textname:e.target.previousElementSibling.previousElementSibling.innerText
      })
      // if(e.target!=undefined){
      //   this.setState({
      //     textname:e.target.previousElementSibling.previousElemntSibling.innerText
      //   })
      // }
     
      // this.setState({
      //   vtext:e.target.__reactInternalInstance$htlud7b3i2u
      // })
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
        columnTitle:"#",
        fixed:"left",
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
              accept:".doc,.docx,.mp4",
              data:{
                file:this.state.file,
                token:"dddd",
                resource_name:this.state.names.map((item)=>{
                  if(item===this.state.file.name) return item;
                })
              }
        };
       
        return (
            <div className="table">
                    {/* 文件上传组件 */}
                   
                    <Upload  {...props} showUploadList={false} multiple={true} beforeUpload={(file,fileList)=>{
                        console.log(file)
                        if(fileList.length==1){
                         
                          this.props.dispatch({
                            type:"vt/fetchUpdateFlag",payload:"视频"
                          })
                        }else{
          
                          this.props.dispatch({
                            type:"vt/fetchUpdateFlag",payload:"专辑"
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
                    {JSON.stringify(this.props.treeKey)}
                    <Search
                    placeholder="请输入搜索内容"
                    onSearch={this.searchName}
                    style={{ marginLeft:"2em",width: "222px",height:"30px"}}
                    />
                    <br/>
                    <div className="select-div" style={{width:"60%",marginTop:"2em",display:"inline",overflow:"hidden"}}>
                        <span style={{marginTop:"2em",fontWeight:"700",fontSize:"12px"}}>权限 </span>
                        <Select  size="small" placeholder="权限" defaultValue="" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px",width:60}} onChange={this.handleChange3}>
                            <Option style={{fontSize:"12px"}} value="">权限</Option>
                            <Option style={{fontSize:"12px"}} value={0}>Vip</Option>
                            <Option style={{fontSize:"12px"}} value={1}>Free</Option>
                            <Option style={{fontSize:"12px"}} value={2}>Other</Option>
                        </Select>
                        <span style={{marginLeft:"2em",fontWeight:"700",fontSize:"12px"}}>格式 </span>
                        <Select className="video_select" size="small" defaultValue="" style={{  width:"62px",height:"22px",marginLeft:"1em" ,fontSize:"12px"}} onChange={this.handleChange4}>
                            <Option style={{fontSize:"12px"}} value="">格式</Option>
                            <Option style={{fontSize:"12px"}} value="视频">视频</Option>
                            <Option style={{fontSize:"12px"}} value="专辑">专辑</Option>
                    
                        </Select>
                       
                        <span style={{marginLeft:"2em",fontWeight:"700",fontSize:"12px"}}>状态 </span>
                        <Select size="small" placeholder="状态" defaultValue="" style={{  width:62,height:22,marginLeft:"1em",fontSize:"12px" }} onChange={this.handleChange5}>
                            <Option style={{fontSize:"12px"}} value="">状态</Option>
                            <Option style={{fontSize:"12px"}} value={1}>启用中</Option>
                            <Option style={{fontSize:"12px"}} value={0}>冻结</Option>
                        </Select>
                        <span style={{marginLeft:"2em",fontWeight:"bold"}}><Checkbox onChange={this.checkTimeChange} style={{fontSize:"12px"}} >按时间</Checkbox></span>
                        <span style={{marginLeft:"1em",fontWeight:"bold"}}><Checkbox onChange={this.checkHotChange} style={{fontSize:"12px"}} >按热度</Checkbox></span>
                    </div>
                    <Table 
                        className="video_table"
                        size="small" 
                        style={{marginTop:"1em"}}
                        rowKey="id"
                        pagination={{
                        onChange: page => {
                            console.log(page);
                            let p = page - 1;
                            console.log(p);
                        },
                        pageSize: 2,
                        total:this.props.Db.videolist.count,
                        size:'small',
                        
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
                    <Button  style={{top:"0em",marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(255, 0, 0, 1)"}} onClick={this.batchEnableOrFreeze}>冻结</Button>
                    <Button  style={{top:"0em",marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(102, 102, 102, 1)"}} onClick={this.batchDelete}>删除</Button>
                    <Button  style={{top:"0em",marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(22, 142, 194, 1)"}} onClick={this.showModal1}>调整</Button>
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
                            
                        <span style={{display:"block",position:"absolute",top:"4em",left:"2em",fontSize:"normal"}}>已上传：{this.state.ok}/{this.state.filelist.length}</span>
                        
                        </div>
                        }
                        closable={false}
                        visible={this.state.visible}
                        footer={null}
                        width={850}
                        >
                        <div className={styles.left}>
                        <span style={{fontWeight:700,marginLeft:"30px"}}>您上传的视频:
                            <br/>
                            <ol>
                            {
                                this.state.filelist.map((item,index)=>{
                                return (<li style={{marginLeft:"-10px",marginTop:".5em",display:"flex"}}>
                                <div  style={{width:"80px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.name}</div>
                                <span style={{fontSize:"12px",color:"#3585FE"}}> &nbsp;&nbsp;修改</span> <span onClick={this.uptext.bind(this)} style={{fontSize:"12px",color:"#3585FE",cursor:"pointer"}} key={item.name}>&nbsp;&nbsp;+文档</span>
                                </li>)
                                })
                            }
                            
                            </ol>
                        </span> <br/><br/>

                            <p style={{marginLeft:"30px",color:'red'}}>
                            当上传视频为一个时：<br/>
                            用户可以选择单视频或专辑<br/>
                            当上传视频为多个时：<br/>
                            默认为专辑，不可切换
                            </p>

                        </div>
                        
                        <VideoForm id="v_form" wrappedComponentRef={this.saveFormRef} vtest={{flag:this.state.flag,name:this.state.vtext.key}} add={this.state.add} />
                        <div id="add_text" style={{display:"none",width:"570px",height:"405px",left:"260px",top:"150px",position:"absolute",background:"#fff",overflowY:"auto"}}>
                          <AddTextForm textname={this.state.textname}></AddTextForm>
                        </div>
                        <Button id="submit_btn" onClick={this.handleOk} style={{left:"37.5%",top:"-25px",height:"34px",width:"157px",backgroundColor:"rgba(22, 155, 213, 1)",fontWeight:"700",fontSize:"14px",color:"#ffffff",borderRadius:"10px"}}>确认</Button>
                        </Modal>   
                        
            </div>
        );
    }
}
export default connect(state=>state)(VideoModel);