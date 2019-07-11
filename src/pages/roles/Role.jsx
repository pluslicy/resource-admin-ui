import React from 'react';
import { Button,Table, Icon,Menu,Modal,Input,Dropdown  } from 'antd';
import styles from './role.less'
// import RoleForm from './RoleForm'
import {connect} from 'dva'

class Role extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }

  state = { visible: false };
  
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
  //新加权限
  plusHandle = (record) =>{
    this.setState({
      form: record,
    });
    this.props.dispatch({ type: 'role/changeVisible', payload: true});
  }

  //添加
  AddHandle = () =>{
    this.setState({
      visible: true,
    });
  };

  render(){
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '权限',
        dataIndex: 'privilege',
        render:(text,record)=>{
          return(
          <div>
            <Icon type="plus" onClick={this.plusHandle} style={{color:'blue' }} />
          </div>
          )}
      },
      {
        title: '标识',
        dataIndex: 'biaoshi',
        render:(text,record)=>{
          return(
            <div style={{color:'blue',fontFamily:'bold',fontSize:'20px'}}>
              v
            </div>
            )}
        },
        
      {
        title: '状态',
        render: () => {
          return (
            <div>
             {/*下拉菜单*/}
              <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                启用中 <Icon type="down" />
              </a>
            </Dropdown>
            </div>
          );
        },
      },
    ];
    
    const data = [
      {
        key: '1',
        name: '杰普认证教师',
      },
      {
        key: '2',
        name: '杰普学生',
      },
      {
        key: '3',
        name: '杰普教师',
      },
    ];

    // 表格
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Role', // Column configuration not to be checked
        name: record.name,
      }),
    };

    // 状态的下拉菜单
    const menu = (
      <Menu>
        <Menu.Item style={{color:'red'}}>冻结</Menu.Item>
      </Menu>
    );

  
    return (
      <div className={styles.content}>
        <div className="btn1">
         <Button type="primary" onClick={this.AddHandle}>添加</Button>
         <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
            <Input placeholder="输入角色名称" />
            <br></br>
            <Button>浏览</Button>&nbsp;
            <Button type="primary">评论</Button>&nbsp;
            <Button>上传</Button>&nbsp;
            <Button type="primary">权限</Button>
            <br></br>
            <Button type="primary">权限</Button>&nbsp;
            <Button type="primary">权限</Button>&nbsp;
            <Button>V</Button>&nbsp;
            <Button>V</Button>
        </Modal>
        </div>
       
        <div>
           <Table
              bordered
              rowKey="id"
              size="small"
              rowSelection={{rowSelection,columnTitle:"#"}} 
              columns={columns} 
              // dataSource={this.props.role.role}
              dataSource={data}
              />
        </div>
        <div className="btn1">
            <Button type="primary">启用</Button>&nbsp;
            <Button type="danger">冻结</Button>&nbsp;
            <Button type="delete">删除</Button>
        </div>
        
      </div>
    );
    }
}

export default connect(({ Role }) => ({
  Role,
}))(Role);