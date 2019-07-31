import React from 'react';
import { connect } from 'dva';
import { Menu,message, Icon,DatePicker,Input,Progress,Table,Select,Dropdown,Checkbox,Modal,Button,Cascader, Upload} from 'antd';
import styles from './db.less';

import DbForm from './DbForm';
import Video from './video';
import Text from './text';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom'
const { SubMenu } = Menu;
const {confirm} =Modal

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
    this.state.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //this.props.dispatch(saveOrUpdateCourse(values));
      }
    });
    this.setState({
      visible:false,
      visible1:false
    })
  };
  handleClick2=(e)=>{
    console.log(e.key)
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
  componentWillMount() {
    // this.props.dispatch({
    //   type:"Db/fetchCata"
    // })
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

  
  render() {
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange2,
    
    };
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
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
   
    const {results} =this.props.Db.catalist;
    return (
      <div className={styles.content}>
          <div className="left-div" style={{borderRight:"1px solid #e8e8e8"}}>
      <img style={{position:"absolute",marginLeft:"-1.8em",marginTop:"1em"}} src={require('./u578.png')} alt=""/>
      <div onMouseOver={this.handleMouse} style={{position:"absolute",width:"89px",height:"24px",backgroundColor:"rgba(15, 105, 255, 1)",marginTop:"1em",marginLeft:"-1em",fontSize:"12px",color:"#ffffff",textAlign:"center",paddingTop:"2px"}}>
          {this.props.Db.catalist.results[0].catalogue_name}
      </div>
      <Menu
       
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              style={{minHeight:"500px",marginTop:"2em",border:"none"}}
            >
            
              <SubMenu
                            
                            key="sub1"
                            title={
                              <span>
                                <span style={{fontWeight:"700",fontSize:"12px",marginLeft:"-1em"}}   onClick={this.handleClick}>JavaEE企业级开发</span>
                              </span>
                            }
                          >
                            
                          </SubMenu>
                          <SubMenu
                            key="sub2"
                            title={
                              <span>
                                
                                <span  style={{fontWeight:"400",fontSize:"12px"}}>Spring boot</span>
                              </span>
                            }
                          >
                            <SubMenu key="sub3" 
                            title={
                              <span>
                                
                                <span style={{fontWeight:"400",fontSize:"12px"}}>视频库</span>
                              </span>
                            }>
                            
                                <SubMenu key="sub5" title={
                              <span>
                                
                                <span style={{fontWeight:"400",fontSize:"12px"}}>视频</span>
                              </span>
                            }>  
                                  
                                </SubMenu>
                                <SubMenu key="sub6" title={
                              <span>
                                
                                <span style={{fontWeight:"400",fontSize:"12px"}}>专辑</span>
                              </span>
                            }>
                                  
                                </SubMenu>
                            </SubMenu>
                            <SubMenu key="sub4" 
                              title={
                              <span>
                                
                                <span style={{fontWeight:"400",fontSize:"12px"}}>文档库</span>
                              </span>
                            }>
                        
                            </SubMenu>
                          </SubMenu>
                          <SubMenu
                            key="sub7"
                            title={
                              <span>
                                
                                <span style={{fontWeight:"400",fontSize:"12px"}}>Mybatis</span>
                              </span>
                            }
                          >
                          </SubMenu>
                          <SubMenu
                            key="sub8"
                            title={
                              <span>
                      
                                <span style={{fontWeight:"400",fontSize:"12px"}}>SpringMVC</span>
                              </span>
                            }
                          >
                          </SubMenu>
             </Menu>
      


          </div>
          <BrowserRouter>
          <div  className="right-div" style={{flex:"6",overflow:"hidden"}}>
    
          <Menu style={{marginLeft:"1em"}} onClick={this.handleClick2} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="视频" style={{fontSize:"16px",fontWeight:"400"}}>
              <Link to="/video">视频</Link>
            </Menu.Item>
          
          
            <Menu.Item key="文档" style={{fontSize:"16px",fontWeight:"400"}}>
               <Link to="/text">文档</Link>
            </Menu.Item>
            
          </Menu>
          <div className="table">
          <Upload  {...props} showUploadList={false} multiple={true}>
            <Button style={{width:"90px",top:"9em",height:"28px",fontSize:"12px",backgroundColor:"rgba(51, 153, 255, 1)",color:"#FFFFFF",borderRadius:"5px",position:"absolute",marginLeft:"58.5%",marginTop:"0em"}} onClick={this.showModal}>
              <Icon type="upload" />上传
            </Button>
          </Upload>
            
       
          </div>
          <Switch>
                <Route path={"/resource/db"} component={Video} exact></Route>
                <Route path={"/video"} component={Video} exact></Route>
                <Route path={"/text"} component={Text} ></Route>
            </Switch>
        
          </div>
          </BrowserRouter>
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
           <span style={{fontWeight:700}}>您上传的视频:
            <br/>
            <ol>
              <li style={{marginLeft:"-3em",marginTop:".5em"}}>
                1.视频一
                <span>修改</span> <span>+文档</span>
              </li>
              <li></li>
              <li></li>
            </ol>
           </span> <br/><br/>

            <p style={{color:'red'}}>
              当上传视频为一个时：<br/>
              用户可以选择单视频或专辑<br/>
              当上传视频为多个时：<br/>
              默认为专辑，不可切换
            </p>

          </div>
          <DbForm ref={this.saveorForm}/>
        </Modal>
        
      </div>
    );
  }
}

export default connect(state=>state)(Db);
