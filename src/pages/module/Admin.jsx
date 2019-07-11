import React from 'react';
import styles from './module.less'
import { Menu, Icon,Button,Table,Dropdown,Modal,Transfer, Tree,From,Checkbox,Input,Radio} from 'antd';

const { Search } = Input;

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
      visible3: false,
      visible4: false,
      targetKeys: [],
      value: 1,
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
    e.preventDefault();
    this.state.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //this.props.dispatch(saveOrUpdateCourse(values));
      }
    });
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
    alert(2)
  };
  // 添加账号模态框
  showModal2 = () => {
    this.setState({
      visible2: true,
      visible:false
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
  //性别单选按钮
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  // 用户授权模态框
  showModal3 = () => {
    this.setState({
      visible3: true,
      visible:false
    });
  };
  handleOk3= e => {
    console.log(e);
    this.setState({
      visible3: false,
    });
  };
  handleCancel3 = e => {
    console.log(e);
    this.setState({
      visible3: false,
    });
  };
 
  // 用户授权OK模态框
  showModal4 = () => {
    this.setState({
      visible4: true,
      visible3:false,
      visible2:false
    });
  };
  handleOk4= e => {
    console.log(e);
    this.setState({
      visible4: false,
    });
  };
  handleCancel4 = e => {
    console.log(e);
    this.setState({
      visible4: false,
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
    const columns1 = [
      { title: '作者', dataIndex: '' },
      { title: '性别', dataIndex: '' },
      { title: '联系方式', dataIndex: '' },
    ];
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
          <Button onClick={this.showModal3}>用户授权</Button>
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
          <Input placeholder="输入用户名" /><br/><br/>
          <Input placeholder="输入密码" /><br/><br/>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group><br/><br/>

          为该管理员配置权限<br/><br/>
          <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange} />
        </Modal>

        <Modal
            visible={this.state.visible3}
            onOk={this.handleOk3}
            onCancel={this.handleCancel3}
            width="900px"
            height="500px"
            footer={[
            <Button key="submit" type="primary" onClick={this.showModal4} style={{width:200,height:30}}>
              OK
            </Button>,]}
        >
          请选择一位用户<br /><br />
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          /><br /><br />
          <Table 
            bordered
            size='small'
            // scroll={{ x: 1000 }}
            rowSelection={{rowSelection,columnTitle:'#',fixed:'left'}} 
            columns={columns1} 
            dataSource={data} />,
        </Modal>  

        <Modal
              visible={this.state.visible4}
              onOk={this.handleOk4}
              onCancel={this.handleCancel4}
              width="600px"
              height="400px"
              footer={[
            <Button key="submit" type="primary" onClick={this.handleOk4} style={{width:200,height:30}}>
              OK
            </Button>,
          ]}
        >
          您选择的账号为:<br/><br/>
          姓名：<br/><br/>
          性别：<br/><br/>
          联系方式：<br/><br/><br/>
          为该管理员配置权限<br/><br/>
          <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={this.onChange} />
          </Modal> 

      </div>
    )
  }
}

export default Admin;