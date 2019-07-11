import React from 'react';
import {Button,Input,Table,Icon,Select,Checkbox  } from 'antd';
const {Search} = Input;
const {Option} = Select;

import style from './User.less'

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
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
  },
  {
    title: '头像',
    dataIndex: 'head',
  },
  {
    title: '简介',
    dataIndex: 'introduction ',
  },
  {
    title: '操作',
    dataIndex: 'operation',
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
    role:'杰普认证教师、管理员+',
    phone:'1909010191',
    head:'',
    introduction:'这是简介...',
    operation:'',
    status:'启用中'
  },
  {
    key: '2',
    name: '朱莉',
    age: '女',
    address: 15,
    role:'杰普认证教师、管理员+',
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
    role:'杰普认证教师、管理员+',
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
  render(){
    return (
      <div className={style.Back}>
        <div className={style.btn}>
          <Button className={style.btn} type='primary'>添加</Button>
          <Search
            placeholder="请输入用户名"
            onSearch={value => console.log(value)}
            style={{ width: '20%' }}
          />
          <Button style={{position:'absolute',right:'5%'}}><Icon type="upload" />导入</Button>
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
      </div>
    )
  }
}


export default User;