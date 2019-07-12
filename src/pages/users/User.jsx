import React from 'react';
import {Button,Input,Table,Icon,Select,Checkbox ,Modal,Radio,Upload,message ,Avatar,Dropdown,Menu } from 'antd';
const {Search} = Input;
const {Option} = Select;

// 引入自定义组件
import style from './User.less'
import UserForm from './UserForm';
import AddForm from './AddForm';
import ModifyForm from './ModifyForm'

class User extends React.Component { 
  constructor (props){
    super(props);
    this.state =({
      visible:false,
      visibleImport:false,
      visiblePermise:false,
      visibleModify:false
    })
  }

  // 添加用户模态框
  showModal =()=>{
    this.setState({
      visible:true, 
    })
  }
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
  ImportOk = e => {
    console.log(e);
    this.setState({
      visibleImport: false,
    });
  };
  ImportCancel = e => {
    console.log(e);
    this.setState({
      visibleImport: false,
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

  render(){    
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
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
           冻结
          </a>
        </Menu.Item>
      </Menu>
    );

    // 表格第一行
    const columns = [
      {
        title: '用户名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'age',
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
        dataIndex: 'phone',
      },
      {
        title: '头像',
        dataIndex: 'head',
        render:()=>{
          return(
            <Avatar icon="user" />
          )
        }
      },
      {
        title: '简介',
        dataIndex: 'introduction ',
        render:()=>{
          return(
            <div>这是一段描述...</div>
          )
        },
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

    // 表格数据
    const data = [
      {
        key: '1',
        name: '朱莉',
        age: '女',
        address: 15,
        role:'杰普认证教师、管理员',
        phone:'1909010191',
        
        introduction:'这是简介...',
        operation:'',
        status:'启用中'
      },
      {
        key: '2',
        name: '朱莉',
        age: '女',
        address: 15,
        role:'杰普认证教师、管理员',
        phone:'1909010191',
        head:'',
        introduction:'这是简介...',
        operation:'',
        status:'启用中'
      },
      {
        key: '3',
        name: '朱莉',
        age: '女',
        address: 15,
        role:'杰普认证教师、管理员',
        phone:'1909010191',
        head:'',
        introduction:'这是简介...',
        operation:'',
        status:'启用中'
      },
    
    ];
    
    return (
      <div className={style.Back}>
        <div className={style.btn}>
          <Button className={style.btn} type='primary' onClick={this.showModal}>添加</Button>
          <Search
            placeholder="请输入用户名"
            onSearch={value => console.log(value)}
            style={{ width: '20%' }}
          />
          <Button style={{position:'absolute',right:'5%'}} onClick={this.showImport}><Icon type="upload" />导入</Button>
        </div>
        <div>
          <ul style={{ display:'inline-block'}}>
            <li style={{ float:'left',marginRight:'2em'}}>
              <div style={{fontWeight:'bold'}}>角色</div>
            </li>
            <li style={{ float:'left',marginRight:'1em'}}>
              <Select defaultValue="全部" style={{width:'200'}}>
                <Option value="全部">全部</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </li>
            <li style={{ float:'left',marginRight:'2em'}}>
              <div style={{fontWeight:'bold'}}>性别</div>
            </li>
            <li style={{ float:'left',marginRight:'2em'}}>
              <Select defaultValue="专辑" style={{width:'200'}}>
                <Option value="专辑">专辑</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </li>
            <li style={{ float:'left',marginRight:'2em'}}>
              <div style={{fontWeight:'bold'}}>状态</div>
            </li>
            <li style={{ float:'left',marginRight:'2em'}}>
              <Select defaultValue="全部" style={{width:'200'}}>
                <Option value="全部">全部</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </li>
            <li style={{ float:'left',marginRight:'2em'}}>
              <Checkbox>按时间</Checkbox>
              <Checkbox>按热度</Checkbox>
            </li>
          </ul>
        </div>
        <Table 
          bordered
          size='small'
          rowSelection={rowSelection} 
          columns={columns} 
          dataSource={data} 
        />
        <Button className={style.btn} type='default'>启用</Button>
        <Button className={style.btn} type='primary'>冻结</Button>
        <Button type='danger'>删除</Button>

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
        <Modal
          width='600px'
          title="导入用户"
          visible={this.state.visibleImport}
          onOk={this.ImportOk}
          onCancel={this.ImportCancel}
        >
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


export default User;