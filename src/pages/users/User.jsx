import React from 'react';
import {Button,Input,Table,Icon,Select,Checkbox ,Modal,Radio,Upload,message ,Avatar } from 'antd';
const {Search} = Input;
const {Option} = Select;

import style from './User.less'
import UserForm from './UserForm';
import AddForm from './AddForm';

const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
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
          {text}<Icon type="plus" />
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
        <Icon type="form"/>
      )
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
  },

];
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


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

class User extends React.Component { 
  constructor (props){
    super(props);
    this.state =({
      visible:false,
      visibleOne:false
    })
  }
  
  // 添加模态框
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
  showM =()=>{
    this.setState({
      visibleOne:true, 
    })
  }
  handleO = e => {
    console.log(e);
    this.setState({
      visibleOne: false,
    });
  };
  handleC = e => {
    console.log(e);
    this.setState({
      visibleOne: false,
    });
  };  
  render(){
    return (
      <div className={style.Back}>
        <div className={style.btn}>
          <Button className={style.btn} type='primary' onClick={this.showModal}>添加</Button>
          <Search
            placeholder="请输入用户名"
            onSearch={value => console.log(value)}
            style={{ width: '20%' }}
          />
          <Button style={{position:'absolute',right:'5%'}} onClick={this.showM}><Icon type="upload" />导入</Button>
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

        <Modal
          title='添加角色'
          width='600px'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddForm />
        </Modal>

        <Modal
          width='600px'
          title="导入用户"
          visible={this.state.visibleOne}
          onOk={this.handleO}
          onCancel={this.handleC}
        >
          <UserForm />
        </Modal>
      </div>
    )
  }
}


export default User;