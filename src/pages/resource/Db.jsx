import React from 'react';
import { connect } from 'dva';
import { Popover,Tooltip,Tree,Menu,message, Icon,DatePicker,Input,Progress,Table,Select,Dropdown,Checkbox,Modal,Button,Cascader, Upload,Radio} from 'antd';
import styles from './db.less';

import DbForm from './DbForm';
import moment from 'moment'
import $ from 'jquery'
import Test from './test'
const { TreeNode } = Tree;
const { SubMenu } = Menu;
const {confirm} =Modal
const { Search } = Input;
const {RangePicker} = DatePicker;
const { Option } = Select;



// 资源库
class Db extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      visible1:false,
      fileList: [],
      };
    }
    handleOk = e => {
      // 提交表单
      // e.preventDefault();
      // this.state.form.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values);
      //     //this.props.dispatch(saveOrUpdateCourse(values));
      //   }
      // });
      this.setState({
        visible1:false
      })
    };
  handleCancel1 = e => {
      console.log(e);
      this.setState({
        visible1: false,
        
      });
      };
  onChange2=(date, dateString)=>{
      console.log(date, dateString);
  }
  showModal1=()=>{
      this.setState({
        visible1: true,
      });
    }
  handleChange(value) {
      console.log(`selected ${value}`);
  }
  checkBoxChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
  handleMouse=(e)=>{
      console.log(e)
  }   
  saveorForm=(form)=>{
    this.setState({
      form
    })
  }
  //文件上传模态框
  showModal=()=>{    
    this.setState({
      visible: true,
    });
  }
 
  handleOk = e => {
    // 提交表单
    e.preventDefault();
    // this.state.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //     //this.props.dispatch(saveOrUpdateCourse(values));
    //   }
    // });
    this.setState({
      visible:false,
      visible1:false
    })
  };
  handleClick2=(e)=>{
    if(e.key==="视频"){
      $('.video_table').css({"display":"block"})
      $('.text_table').css({"display":"none"})
    }else{
      $('.video_table').css({"display":"none"})
      $('.text_table').css({"display":"block"})
    }
}
  
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  //选择时间的
  // onChange2=(date, dateString)=>{
  //   console.log(date, dateString);
  // }
  componentDidMount() {
    this.props.dispatch({
      type:"Db/fetchCata"
    })
    this.props.dispatch({
      type:"Db/fetchVideo"
    })
    this.props.dispatch({
      type:"Db/fetchText"
    })
  }
  //级联选择编目
  casonChange(value) {
    console.log(value);
  }
  casonChange1(value) {
    console.log(value);
  }
  //点击菜单
  handleClick = event => {
    
    console.log(event.target.innerText);
    event.persist();
    // let {target}=event;
    // this.props.history.push({ pathname: "/video",obj:{target}});
  }
  
  //文件上传
  handleChange2=(info)=>{
    console.log(info);
    if (info.file.status == 'uploading') {
      console.log(info.file, info.fileList);
    }
    // this.showModal();
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  update(record,value){
    console.log(record)
    console.log(`selected ${value}`);
  }
  renderTreeNodes = data =>
  data.map(item => {
    if (item.childs) {
      return (
        <TreeNode title={item.catalogue_name} key={item.id} dataRef={item}>
          {this.renderTreeNodes(item.childs)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });
  render() {
    

     // 状态的下拉菜单
     const menu1 = (
      <Menu>
        <Menu.Item style={{color:'red'}}>冻结</Menu.Item>
      </Menu>
    );

    const menu2 = (
      <Menu>
        <Menu.Item >vip</Menu.Item>
        <Menu.Item >free</Menu.Item>
        <Menu.Item >other</Menu.Item>
      </Menu>
    );
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
          <span style={{cursor:"pointer"}}>{text}</span>&nbsp;&nbsp;&nbsp;<span style={{color:"#FF0000",fontSize:"12px",fontWeight:"400"}} onClick={this.update.bind(this,record)}>修改</span>
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
            <div>
             {/*下拉菜单*/}
              <Dropdown overlay={menu2}>
                <a className="ant-dropdown-link" href="#">
                  {text} <Icon type="down" />
                </a>
              </Dropdown>
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
      },
      {
        title: '状态',
        // dataIndex:'vr_enable',
      //  1 可用 0 不可用
        // render: (text, record) => (
        //   <Select defaultValue={text} style={{ width: 50 }} >
        //       <Option value={0}>可用</Option>
        //       <Option value={1}>不可用</Option>
        //   </Select>
        // ),
        render: () => {
          return (
            <div>
             {/*下拉菜单*/}
              <Dropdown overlay={menu1}>
              <a className="ant-dropdown-link" href="#">
                启用中 <Icon type="down" />
              </a>
            </Dropdown>
            </div>
          );
        },


      },
    ];
    const columns2 = [
      {
        title: '名称',
        dataIndex: 'dr_name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '作者',
        dataIndex: 'dr_author',
      },
      {
        title: '方向',
        dataIndex:'dr_cata_two'
      },
      {
        title: '技术',
        dataIndex:'dr_cata_one'
      },
      {
        title: '类型',
        dataIndex:'dr_owner',
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
        dataIndex:'dr_permission',
        render: (text, record) => (
          <Select defaultValue={text} style={{ width: 50 }}>
              <Option value={0}>Vip</Option>
              <Option value={1}>Free</Option>
              <Option value={2}>Other</Option>
          </Select>
        ),
      },
      {
        title: '格式',
        dataIndex: 'dr_format',
      },
      {
        title: '日期',
        dataIndex: 'dr_created_time',
      },
      {
        title: '状态',
        dataIndex:'dr_enable',
       
        render: (text, record) => (
          <Select defaultValue={text} style={{ width: 50 }} >
              <Option value={0}>可用</Option>
              <Option value={1}>不可用</Option>
          </Select>
        ),
      },
    ];
    const dateFormat = 'YYYY-MM-DD';
    const rowSelection = {
      columnTitle:"#",
      fixed:"left",
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        
      },
    };

    //文件上传的地址与配置
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange2,
    
    };
    //权限和类型
    
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
   
    const {childs} =this.props.Db.catalist[0];
    return (
      <div className={styles.content}>
      <div className="left-div" style={{borderRight:"1px solid #e8e8e8",minWidth:"145px"}}>
      <img style={{position:"absolute",marginLeft:"-1.8em",marginTop:"1em"}} src={require('./u578.png')} alt=""/>
      <div onMouseOver={this.handleMouse} style={{position:"absolute",width:"89px",height:"24px",backgroundColor:"rgba(15, 105, 255, 1)",marginTop:"1em",marginLeft:"-1em",fontSize:"12px",color:"#ffffff",textAlign:"center",paddingTop:"2px"}}>
         {this.props.Db.catalist[0].catalogue_name}
      </div>
      <Menu

              id="menu"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              style={{minHeight:"500px",marginTop:"2em",border:"none"}}
            >
              <Tree>
                {this.renderTreeNodes(childs)}
              </Tree>
       </Menu>
      


          </div>
           
          <div  className="right-div" style={{flex:"6",overflow:"hidden"}}>
    
          <Menu  style={{marginLeft:"1em"}} onClick={this.handleClick2} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="视频" style={{fontSize:"16px",fontWeight:"400"}}>
             视频
            </Menu.Item>
          
          
            <Menu.Item key="文档" style={{fontSize:"16px",fontWeight:"400"}}>
               文档
            </Menu.Item>
            
          </Menu>
            <div className="table">
            <Upload  {...props} showUploadList={false} multiple={true} beforeUpload={(file,fileList)=>{this.showModal()}}>
              <Button style={{width:"90px",top:"9em",height:"28px",fontSize:"12px",backgroundColor:"rgba(51, 153, 255, 1)",color:"#FFFFFF",borderRadius:"5px",position:"absolute",marginLeft:"58.5%",marginTop:"0em"}} >
                <Icon type="upload" />上传
              </Button>
            </Upload>
              
        
            </div>
              <RangePicker  onChange={this.onChange2} style={{marginLeft:"1.58em",marginTop:"1em",width:"220px"}} defaultValue={[moment('2018/12/11', dateFormat), moment('2018/12/12', dateFormat)]}
          format={dateFormat} />
              <Search
              placeholder="请输入搜索内容"
              onSearch={value => console.log(value)}
              style={{ marginLeft:"2em",width: "222px",height:"30px"}}
            />
            <br/>
          <div className="select-div" style={{width:"60%",marginTop:"2em",display:"inline",overflow:"hidden"}}>
          <span style={{marginLeft:"2em",marginTop:"2em",fontWeight:"700",fontSize:"12px"}}>权限 </span>
          <Select size="small" defaultValue="lucy" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px"}} onChange={this.handleChange}>
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"700"}}>格式 </span>
          <Select size="small" defaultValue="lucy" style={{  width:"62px",height:"22px",marginLeft:"1em" ,fontSize:"12px"}} onChange={this.handleChange}>
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"700"}}>状态 </span>
          <Select size="small" defaultValue="lucy" style={{  width:62,height:22,marginLeft:"1em",fontSize:"12px" }} onChange={this.handleChange}>
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"bold"}}><Checkbox onChange={this.checkBoxChange} style={{fontSize:"12px"}}>按时间</Checkbox></span>
          <span style={{marginLeft:"1em",fontWeight:"bold"}}><Checkbox onChange={this.checkBoxChange} style={{fontSize:"12px"}}>按热度</Checkbox></span>
          </div>
         
          <Table 
          className="video_table"
          size="small" 
          style={{marginLeft:"2em",marginTop:"2em",}} 
          rowKey="id"
          pagination={{
            onChange: page => {
              console.log(page);
              let p = page - 1;
              console.log(p);
            },
            pageSize: 1,
            total:this.props.Db.videolist.count,
            size:'small',
            
            hideOnSinglePage: false,
            itemRender: (current, type, originalElement) => {
              if (type === 'prev') {
                return <Button size="small" style={{marginRight:"1em"}}>上一页shi</Button>;
              }
              if (type === 'next') {
                return <Button size="small" style={{marginLeft:"1em"}}>下一页</Button>;
              }
              return originalElement;
            },
          }}
          rowSelection={rowSelection} columns={columns} dataSource={this.props.Db.videolist.results} />
           <Table className="text_table"
          size="small" 
          style={{marginLeft:"2em",marginTop:"2em",display:"none"}} 
          rowKey="id"
          pagination={{
            onChange: page => {
              console.log(page);
              let p = page - 1;
              console.log(p);
            },
            pageSize: 1,
            total:this.props.Db.textlist.count,
            size:'small',
            
            hideOnSinglePage: false,
            itemRender: (current, type, originalElement) => {
              if (type === 'prev') {
                return <Button size="small" style={{marginRight:"1em"}}>上一页text</Button>;
              }
              if (type === 'next') {
                return <Button size="small" style={{marginLeft:"1em"}}>下一页</Button>;
              }
              return originalElement;
            },
          }}
          rowSelection={rowSelection} columns={columns2}  dataSource={this.props.Db.textlist.results} />
          <Button type="primary" style={{marginLeft:"2em",width:"35px",height:"21px",fontSize:"12px",padding:"0"}}>启用</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(255, 0, 0, 1)"}}>冻结</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(102, 102, 102, 1)"}}>删除</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(22, 142, 194, 1)"}} onClick={this.showModal1}>调整</Button>          
          <Modal
            onCancel={this.handleCancel1}
            title="请选择资源所在编目"
            visible={this.state.visible1}
            style={{display:"flex",justifyContent:"space-around"}}
            footer={[
                <Button onClick={this.handleOk} style={{marginRight:"40%"}}>确认</Button>
            ]}
            >
            <Cascader options={options} onChange={this.casonChange} placeholder="请选择" />
            <Cascader style={{marginLeft:"1em"}} onChange={this.casonChange1} placeholder="请选择" />
            </Modal>        
                            
          </div>
         
          <Modal
          style={{top:"20px"}}
          title={
            <div style={{width:"775px",height:"102px",backgroundColor:"#e8e8e8",borderRadius:"10px",marginLeft:"1em",boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.349019607843137)",textAlign:"center",position:"relative"}}>
           <span style={{fontWeight:"700",fontSize:"18px",position:"absolute",top:".5em",left:"252px"}}>您上传的视频：视频一、视频二....</span>
           <Icon type="close-circle" onClick={this.handleCancel} style={{position:"absolute",left:"749px",top:"14px"}}/>
            <Progress
                style={{width:"669px",height:"50px",marginTop:"2.5em"}}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={99.9}
              />
          <span style={{display:"block",position:"absolute",top:"4em",left:"2em",fontSize:"normal"}}>已上传：5/6</span>
        
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
              <li style={{marginLeft:"-10px",marginTop:".5em"}}>
                1.视频一 
                <span style={{fontSize:"12px",color:"#3585FE"}}> &nbsp;&nbsp;修改</span> <span style={{fontSize:"12px",color:"#3585FE"}}>&nbsp;&nbsp;+文档</span>
              </li>
              <li></li>
              <li></li>
            </ol>
           </span> <br/><br/>

            <p style={{marginLeft:"30px",color:'red'}}>
              当上传视频为一个时：<br/>
              用户可以选择单视频或专辑<br/>
              当上传视频为多个时：<br/>
              默认为专辑，不可切换
            </p>

          </div>
          <DbForm ref={this.saveorForm} flag={this.state.value}/>
          <Button onClick={this.handleOk} style={{left:"37.5%",top:"-25px",height:"34px",width:"157px",backgroundColor:"rgba(22, 155, 213, 1)",fontWeight:"700",fontSize:"14px",color:"#ffffff",borderRadius:"10px"}}>确认</Button>
        </Modal>
        
      </div>

    );
  }
}

export default connect(state=>state)(Db);
