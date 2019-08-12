import React from 'react';
import {Button,Input,Table,Icon,Select,Checkbox ,Modal,Radio,Upload,message ,Avatar,Dropdown,Menu,Tooltip } from 'antd';
const {Search} = Input;
const {Option} = Select;

// 引入自定义组件
import style from './User.less'
import UserForm from './UserForm';
import AddForm from './AddForm';
import ModifyForm from './ModifyForm'
import {connect} from 'dva'

class User extends React.Component { 
  constructor (props){
    super(props);
    this.state =({
      query:{},
      visible:false,
      visibleImport:false,
      visiblePermise:false,
      visibleModify:false,
      // 添加单选按钮
      value:"",
    })
  }

  componentDidMount(){
    this.props.dispatch({
      type:'users/fetchUser'
    })
  }


  // 添加用户模态框
  showModal =()=>{
    this.setState({
      visible:true, 
    })
  }
  // 导入的单选按钮
  onChange = e => {
    console.log('radio checked', e.target.value);
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };  

  // 导入模态框
  showImport =()=>{
    this.setState({
      visibleImport:true, 
    })
  }
  // 导入模态框 ok
  handleOk = e => {
    console.log(e);
    this.setState({
      value:""
    })
    if(this.state.value===1){
      this.setState({
        visibleStudent:true
      })
    }else if(this.state.value===""){
        this.setState({
          visible:"false"
        })
    }else{
      this.setState({
        visibleTeacher:true,
      })
    }
    this.setState({
      visible: false,
    });
  };
  // 导入模态框关闭 
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visibleImport: false,
    });
  };
  // 学生用户ok
  handleOkStu = e => {
    console.log(e);
    this.setState({
      visibleStudent: false,
    });
  };
  // 学生用户关闭
  handleCancelStud = e => {
    console.log(e);
    this.setState({
      visibleStudent: false,
    });
  };

    // 教师用户ok
    handleOkTea = e => {
      console.log(e);
      this.setState({
        visibleTeacher: false,
      });
    };
    // 教师用户关闭
    handleCancelTea = e => {
      console.log(e);
      this.setState({
        visibleTeacher: false,
      });
    };


  // 添加权限模态框
  showPermise =()=>{
    this.setState({
      visiblePermise:true, 
    })
  }
  AddPermiseOk = e => {
    console.log(e);
    this.setState({
      visiblePermise: false,
    });
  };
  AddPermiseCancel = e => {
    console.log(e);
    this.setState({
      visiblePermise: false,
    });
  };  

  // 修改模态框
  showModify =()=>{
    this.setState({
      visibleModify:true, 
    })
  }
  ModifyOk = e => {
    console.log(e);
    this.setState({
      visibleModify: false,
    });
  };
  ModifyCancel = e => {
    console.log(e);
    this.setState({
      visibleModify: false,
    });
  };  
  //按时间查询
  checkTimeChange=(e)=> {
    this.setState({
      query:{...this.state.query,...{bytime:`${e.target.checked}`}}
    })
    this.props.dispatch({
      type:"users/fetchUser",payload:this.state.query
    })
  }
  // 按热度查询
  checkHotChange=(e)=>{
    this.setState({
      query:{...this.state.query,...{byhot:`${e.target.checked}`}}
    })
    this.props.dispatch({
      type:"users/fetchUser",payload:this.state.query
    })
  }
 
  render(){   
    // 导入悬浮按钮
    const text = <span>导入时需要按模板填写,点击<a>下载</a></span>; 
    // 表格第一列选框
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    // 状态栏
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="">
           冻结
          </a>
        </Menu.Item>
      </Menu>
    );

    // 表格第一行
    const columns = [
      {
        title: '用户名',
        dataIndex: 'last_name',
      },
      {
        title: '性别',
        dataIndex: 'user_gender',
        render:(text,record)=>{
          if(record.user_gender===1){
            return ("男")
          }else{
            return ("女")
          }
        }
      },
      {
        title: '作品',
        dataIndex: 'address',
      },
      {
        title: '角色',
        dataIndex: 'role',
        render:(text,record)=>{
          return(
            <div>
              {text}<Icon type="plus" onClick={this.showPermise.bind(this)}/>
            </div>
          )
        }
      },
      {
        title: '联系方式',
        dataIndex: 'user_phone',
      },
      {
        title: '头像',
        dataIndex: 'user_protrait',
      },
      {
        title: '简介',
        dataIndex: 'user_desc ',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render:(text,record)=>{
          return(
            <div>
               <Icon type="form" onClick={this.showModify.bind(this)}/>
            </div> 
          )
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        render:()=>{
          return(
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                启用中 <Icon type="down" />
              </a>
            </Dropdown>
          )
        }
      },
    
    ];

    return (
      <div className={style.Back}>
        <div className={style.btn}>
          <Button className={style.btn} style={{width:'80px'}} type='primary' onClick={this.showModal}>添加</Button>
          <Search
              placeholder="请输入用户名"
              onSearch={value => console.log(value)}
              style={{ marginLeft:"2em",width: "222px",height:"30px"}}
            />
            <br/>
          <Tooltip placement="bottom" title={text}>
            <Button style={{width:"80px",position:'absolute',right:'5%'}} onClick={this.showImport}><Icon type="upload" />导入</Button>
          </Tooltip>
        </div>
        <div>
          <span style={{marginLeft:"2em",marginTop:"2em",fontWeight:"700",fontSize:"14px"}}>角色 </span>
          <Select size="small" defaultValue="lucy" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px"}} onChange={this.handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
          </Select>
          <span style={{marginLeft:"2em",marginTop:"2em",fontWeight:"700",fontSize:"14px"}}>性别 </span>
          <Select size="small" defaultValue="all" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px"}} onChange={this.handleChange}>
            <Option value="jack">男</Option>
            <Option value="lucy">女</Option>
            <Option value="all">全部</Option>
          </Select>
          <span style={{marginLeft:"2em",marginTop:"2em",fontWeight:"700",fontSize:"14px"}}>状态 </span>
          <Select size="small" defaultValue="lucy" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px"}} onChange={this.handleChange}>
            <Option value="forzen">冻结</Option>
            <Option value="lucy">全部</Option>
            <Option value="noforzen">未冻结</Option>
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"bold"}}><Checkbox onChange={this.checkTimeChange} style={{fontSize:"12px"}} >按时间</Checkbox></span>
          <span style={{marginLeft:"1em",fontWeight:"bold"}}><Checkbox onChange={this.checkHotChange} style={{fontSize:"12px"}} >按热度</Checkbox></span>
        </div>
        {console.log(this.props.users.user)}
       
        <Table 
          className="video_table"
          size="small" 
          style={{marginTop:"2em",}} 
          rowKey="id"
          pagination={{
            onChange: page => {
              console.log(page);
              let p = page - 1;
              console.log(p);
            },
            pageSize: 10,
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
          rowSelection={rowSelection} columns={columns}  dataSource={this.props.users.user} />
          
            <Button type="primary" size="small">启用</Button>&nbsp;
            <Button type="danger" size="small">冻结</Button>&nbsp;
            <Button type="delete" size="small">删除</Button>

        {/* 添加用户模态框 */}
        <Modal
          title='添加角色'
          width='600px'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddForm />
        </Modal>

        {/* 导入按钮模态框 */}
         {/* 显示学生、教师模态框 */}
        <Modal
            title="导入用户"
            visible={this.state.visibleImport}
            onOk={this.handleOk}
            onCancel={this.handleCancel1}
            // onCancel={this.handleCancel1}
            footer={[
            // 定义右下角按钮的地方
            <Button key="ok" style={{marginRight:230}} onClick={this.handleOk}>ok</Button>,
          ]}>
              {/* 添加单选按钮 */}
            <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio style={{margin:50,marginLeft:110}} value={1}>学生用户</Radio>
                <Radio value={2}>教师用户</Radio>        
            </Radio.Group>      
           
        </Modal>
          {/* 学生用户模态框 */}
       <Modal 
            title="导入学生用户"
            visible={this.state.visibleStudent}
            onOk={this.handleOkStu}
            onCancel={this.handleCancelStud}
            width="600px"
            height="400px"
            >
          <UserForm />
        </Modal>

        {/* 教师用户模态框 */}
        <Modal
            title="导入教师用户"
            visible={this.state.visibleTeacher}
            onOk={this.handleOkTea}
            onCancel={this.handleCancelTea}
            width="600px"
            height="400px">
              <UserForm />
        </Modal>
       
        {/* 添加权限模态框 */}
        <Modal
          width='600px'
          title="为该用户选择角色"
          visible={this.state.visiblePermise}
          onOk={this.AddPermiseOk}
          onCancel={this.AddPermiseCancel}
        >
          <div style={{height:'100px'}}>
            <ul>
                <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'1em'}}>杰普教师</li>  
                <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'1em'}}>杰普学生</li>  
                <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'1em'}}>院校教师</li>  
                <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'2em'}}>角色</li>  
                <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'2em'}}>角色</li>  
                <li style={{float:'left',width:'80px',height:'30px',border:'1px solid #ccc',lineHeight:'30px',marginRight:'1em',paddingLeft:'2em'}}>角色</li>  
            </ul>  
          </div>
        </Modal>

        {/* 修改模态框 */}
        <Modal
          width='600px'
          title="修改"
          visible={this.state.visibleModify}
          onOk={this.ModifyOk}
          onCancel={this.ModifyCancel}
        >
          <ModifyForm />
        </Modal>

      </div>
    )
  }
}


export default connect(({ users }) => ({
  users,
}))(User);