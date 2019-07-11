import React from 'react';
import styles from './module.less'
import { Menu, Icon,Button,Table,Dropdown,Modal,Transfer, Tree,From,Checkbox } from 'antd';

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
  { key: '0-0',
    title: '0-0',
    children: [{ key: '0-1-0', title: '0-1-0' }, { key: '0-1-1', title: '0-1-1' }],
  },
  {
    key: '0-1',
    title: '0-1',
    children: [{ key: '0-1-0', title: '0-1-0' }, { key: '0-1-1', title: '0-1-1' }],
  },
];

class Admin extends React.Component {
  constructor(props){
    super(props);
    this.state={
      current: 'mail',
      visible: false,
      visible1: false,
      visible2: false,
      targetKeys: [],
      form:{},
    }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  // 添加按钮模态框
  showModal = () => {
    this.setState({
      visible: true,
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

   // +模态框
   showModal1 = () => {
    this.setState({
      visible1: true,
    });
  };
  handleOk1 = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };
  // 添加账号模态框
  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };
  handleOk2= e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };
  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  //穿梭框
  onChange = targetKeys => {
    console.log('Target Keys:', targetKeys);
    this.setState({ targetKeys });
  };
  
  
  render(){ 
    //添加账号信息
    // const { getFieldDecorator } = this.props.form;
    //穿梭框
    const { targetKeys } = this.state;  
    // 表格
    const columns = [
      { title: '用户名', dataIndex: '' },
      { title: '姓名', dataIndex: '' },
      { title: '权限',
       dataIndex: '',
       render:()=>{
         return(
           <div>
             <Icon type='plus' style={{color:"skyblue"}} onClick={this.showModal1}></Icon>
             <Modal
                visible={this.state.visible1}
                onOk={this.handleOk1}
                onCancel={this.handleCancel1}
                footer={[
                  // 定义右下角按钮的地方
                  <Button key="submit" type="primary" onClick={this.handleOk1} style={{width:200,height:30}}>
                    OK
                  </Button>,
                ]}
              >
                为该管理员配置权限<br/><br/>
                <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange} />
              </Modal>
           </div>
         )
       }
      },
      { title: '联系方式', dataIndex: '' },
      { 
        title: '状态',
        fixed:'right',
        width:100,
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
    const data = [{}];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    //下拉菜单
    const menu = (
      <Menu>
        <Menu.Item style={{color:'red'}}>冻结</Menu.Item>
      </Menu>
    );
  
    

    return (
      <div className={styles.content}>
        <div className='btns'>
          {/* 顶部导航 */}
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="user">
              <Icon type="user" />
              管理员
            </Menu.Item>
          </Menu><br/>

          {/* 添加按钮 */}
          <Button type="primary" icon="plus" onClick={this.showModal}>添加</Button><br/><br/>
          <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            // 定义右下角按钮的地方
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
          ]}
        >
          <Button style={{margin:50,marginLeft:110}} onClick={this.showModal2}>添加账号</Button>
          <Modal
            visible={this.state.visible2}
            onOk={this.handleOk2}
            onCancel={this.handleCancel2}
            footer={[
            <Button key="submit" type="primary" onClick={this.handleOk2} style={{width:200,height:30}}>
              OK
            </Button>,
          ]}
        >
          {/* <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form> */}
          为该管理员配置权限<br/><br/>
          <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange} />
        </Modal>
          <Button>用户授权</Button>
        </Modal>

          {/* 表格 */}
          <Table 
          bordered
          size='small'
          scroll={{ x: 1000 }}
          rowSelection={{rowSelection,columnTitle:'#',fixed:'left'}} 
          columns={columns} 
          dataSource={data} />,
          
          {/* 启用,冻结,删除按钮 */}
          <Button >启用</Button>&nbsp;&nbsp;
          <Button type="danger">冻结</Button>&nbsp;&nbsp;
          <Button type="dashed" style={{backgroundColor:'gray'}}>删除</Button>&nbsp;&nbsp;

        </div>        
      </div>
    )
  }
}

export default Admin;