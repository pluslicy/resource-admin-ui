import React from 'react';
import {Button,Table, Icon,Menu,Modal,Input,Dropdown,message,menu1,Checkbox, Transfer, Tree ,} from 'antd';
import styles from './role.less'
// import RoleForm from './RoleForm'
import {connect} from 'dva'


// 穿梭框
const { TreeNode } = Tree;

// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => {
  return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({ children, ...props }) => (
    <TreeNode {...props} disabled={checkedKeys.includes(props.key)}>
      {generateTree(children, checkedKeys)}
    </TreeNode>
  ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
  const transferDataSource = [];
  function flatten(list = []) {
    list.forEach(item => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={(
                _,
                {
                  node: {
                    props: { eventKey },
                  },
                },
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
              onSelect={(
                _,
                {
                  node: {
                    props: { eventKey },
                  },
                },
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
            >
              {generateTree(dataSource, targetKeys)}
            </Tree>
          );
        }
      }}
    </Transfer>
  );
};

    const treeData = [
      { key: '0-0', title: '0-0' },
      {
        key: '0-1',
        title: '0-1',
        children: [{ key: '0-1-0', title: '0-1-0' }, { key: '0-1-1', title: '0-1-1' }],
      },
      { key: '0-2', title: '0-3' },
    ];



class Role extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {},
      visible: false,
      // 穿梭框
      targetKeys: [],
    };
  }

  // 权限menu
  handleClick = e => {
    console.log('click ', e);
  };

 
  // 模态框
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
      visibles:false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      visibles:false,
    });
  };

  //menu 
  handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }
  // 穿梭框
  onChange1 = targetKeys => {
    console.log('Target Keys:', targetKeys);
    this.setState({ targetKeys });
  };

  // 权限多选框
  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
 
  //新加权限
  plusHandle = (record) =>{
    this.setState({
      visibles: true,
    });
  };

  //添加
  AddHandle = () =>{
    this.setState({
      visible: true,
    });
  };

  render(){ 
    const { targetKeys } = this.state;  
    // 新增
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
    const menu1 = (
      <Menu>
        <Menu.Item style={{color:'red'}}>冻结</Menu.Item>
      </Menu>
    );
    
 // 权限menu
    const { SubMenu } = Menu;
    const menu = (
      <Menu>
        <Menu.Item><Checkbox onChange={this.onChange}>浏览</Checkbox></Menu.Item>
        <Menu.Item><Checkbox onChange={this.onChange}>冻结</Checkbox></Menu.Item>
        <Menu.Item><Checkbox onChange={this.onChange}>显示</Checkbox></Menu.Item>
        <SubMenu title="资源审核">
          <Menu.Item><Checkbox onChange={this.onChange}>文档审核</Checkbox></Menu.Item>
          <Menu.Item><Checkbox onChange={this.onChange}>视频审核</Checkbox></Menu.Item>
        </SubMenu>
      </Menu>
    );
  
    return (
      <div className={styles.content}>
        <div className="btn1">
         <Button type="primary" onClick={this.AddHandle} size="small">添加</Button>
         <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
            <Input placeholder="输入角色名称"  style={{width:400}}/>
            <br></br>
            <br></br>
            基本权限
            <br></br>
            <br></br>

            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                 <Button size="small"> 资源库管理 <Icon type="down" /></Button>
                </a>
              </Dropdown>&nbsp;    
            <Button size="small" >评论</Button>&nbsp;
            <Button size="small">上传</Button>&nbsp;
            <Button size="small">权限</Button>
            <br></br>
            <br></br>
            <Button size="small">权限</Button>&nbsp;
            <br></br>
            <br></br>
             身份权限
            <br></br>
            <br></br>
            <Button >蓝v</Button>&nbsp;
            <Button>金v</Button>
            <br></br>
            <br></br>
             资源权限
            <br></br>
            <br></br>
            {/* 穿梭框 */}
            <div>
              <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange1} />
            </div>
        </Modal>
        </div>
       <br></br>
        <div>
           <Table
           
              rowKey="id"
              size="small"
              rowSelection={{rowSelection,columnTitle:"#"}} 
              columns={columns} 
              // dataSource={this.props.role.role}
              dataSource={data}
              />
        </div>
        {/* 权限新增模态框 */}
        <div>
        <Modal
            title={"为该角色配置权限"}
            visible={this.state.visibles}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
              <Button>浏览</Button>&nbsp;
              <Button type="primary">评论</Button>&nbsp;
              <Button>上传</Button>&nbsp;
              <Button type="primary">权限</Button>
              <br></br>
              <br></br>
              <Button type="primary">权限</Button>&nbsp;
              <Button type="primary">权限</Button>&nbsp;
            
        </Modal>
        </div>
        <div className="btn1">
            <Button type="primary" size="small">启用</Button>&nbsp;
            <Button type="danger" size="small">冻结</Button>&nbsp;
            <Button type="delete" size="small">删除</Button>
        </div>
       

      </div>
      
    );
    }
}

export default connect(({ Role }) => ({
  Role,
}))(Role);