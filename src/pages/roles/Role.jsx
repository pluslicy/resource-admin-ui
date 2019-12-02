import React from 'react';
import {
  Button,
  Table,
  Modal,
  Radio,
  Menu,
  Form,
  Tabs,
  menu1,
  Dropdown,
  Icon,
  Input,
  Select,
  Tree,
} from 'antd';

const { Option } = Select;
const { TreeNode } = Tree;
const { TabPane } = Tabs;
const { confirm } = Modal;
import styles from './role.less';
// import RoleForm from './RoleForm'
import { connect } from 'dva';

class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // form: {},
      // visible: false,
      // visibleWeb:true,

      // 添加单选按钮
      value: '',
      ids: [],
      page: 1,
      // 添加
      array: [],
      id: '',
      flag:0,
      form:{},
      // name:"",
      // catalogues:[],
      // permissions:[],
      data: {
        name: '',
        role_profile: {
          rp_type: 0,
          catalogues: [],
        },
        permissions: [],
      },
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'role/fetchRoles',
      payload: {
        page: 1,
        pageSize: 10,
      },
    }),
      this.props.dispatch({
        type: 'role/fetchCatalog',
      });
    this.props.dispatch({
      type: 'role/feachPermission',
    });
  }
  // 网站用户的input框
  inputOnchange = e => {
    // console.log(e.target.value)
    var obj = this.state.data;
    obj.name = e.target.value;
    this.setState({
      data: obj,
    });
  };
  // 后台用户的input框
  inputOnchangeBack = e => {
    // console.log(e.target.value)
    var obj = this.state.data;
    obj.name = e.target.value;
    this.setState({
      data: obj,
    });
  };

  // 冻结状态改变
  handleChange = (record, e) => {
    if (e._owner) {
      // console.log("---------------",this.props.dispatch)
      this.props.dispatch({
        type: 'role/fetchEnableOrFreeze',
        payload: {
          status: {
            rp_enable: 0,
            ids: [e._owner.pendingProps.record.id],
          },
          page: this.state.page,
          pageSize: 10,
        },
      });
    }
  };
  // 批量启用和冻结
  batchEnableOrFreeze = e => {
    // console.log(this.props.dispatch)
    if (e.target.textContent == '冻 结') {
      this.props.dispatch({
        type: 'role/fetchEnableOrFreeze',
        payload: {
          status: {
            rp_enable: 0,
            ids: this.state.ids,
          },
          page: this.state.page,
          pageSize: 10,
        },
      });
    } else {
      this.props.dispatch({
        type: 'role/fetchEnableOrFreeze',
        payload: {
          status: {
            rp_enable: 1,
            ids: this.state.ids,
          },
          page: this.state.page,
          pageSize: 10,
        },
      });
    }
    setTimeout(() => {
      // console.log("1111")
      this.setState({
        ids: [],
      });
    }, 100);
  };

  //批量删除用户
  batchDelete = () => {
    confirm({
      title: '确认删除数据吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.props.dispatch({
          type: 'role/fetchDelete',
          payload: this.state.ids,
        });
      },
    });
  };

  // 添加展示模态框
  showModal = () => {
    this.setState({
      visible: true,
      value: '',
      data: {
        name: '',
        role_profile: {
          rp_type: 0,
          catalogues: [],
        },
        permissions: [],
      },
    });
  };
 

  // 添加模态框 ok
  handleOk = e => {
    if (this.state.value === 0) {
      var obj = this.state.data;
      obj.role_profile.rp_type = this.state.value;
      this.setState({
        visibleWeb: true,
        data: obj,
        array: [],
      });
      this.props.dispatch({
        type: 'role/feachPermission',
        payload: {
          type: this.state.value,
        },
      });
    } else if (this.state.value === 1) {
      var obj = this.state.data;
      obj.role_profile.rp_type = this.state.value;
      this.setState({
        data: obj,
        visibleBack: true,
        array: [],
      });
      this.props.dispatch({
        type: 'role/feachPermission',
        payload: {
          type: this.state.value,
        },
      });
    } else {
      this.setState({
        visible: 'false',
      });
    }
    this.setState({
      visible: false,
    });
  };
  // 添加模态框关闭
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  // 网络用户ok
  handleOkWeb = e => {
    // console.log(this.state.data)
    // console.log(this.props.dispatch)
    this.props.dispatch({
      type: 'role/fetchAddRole',
      payload: this.state.data,
    });
    this.setState({
      visibleWeb: false,
    });
  };
  // 网络用户关闭
  handleCancelWeb = e => {
    // console.log(e);
    this.setState({
      visibleWeb: false,
    });
  };

  // 后台用户ok
  handleOkBack = e => {
    console.log(this.state.data);
    console.log(this.props.dispatch);
    this.props.dispatch({
      type: 'role/fetchAddRole',
      payload: this.state.data,
    });
    this.setState({
      visibleBack: false,
    });
  };
  // 后台用户关闭
  handleCancelBack = e => {
    console.log(e);
    this.setState({
      visibleBack: false,
    });
  };

  //配置模态框
  configHandle(record){
   
    this.setState({
      data:record
    })
    if(record.role_profile.rp_type==1){
      this.props.dispatch({
        type: 'role/feachPermission',
        payload: {
          type: 1,
        },
      });
      this.setState({
        flag:0
      })
    }else{
      this.props.dispatch({
        type: 'role/feachPermission',
        payload: {
          type: 0,
        },
      });
      this.setState({
        flag:1
      })
    }
    this.setState({
      visibleConfig: true,
    });
  };
  // 配置ok
  handleOkConfig = e => {
    var obj = this.state.data;
    delete obj.role_profile.rp_type;
    delete obj.role_profile.rp_identify;
    // alert(JSON.stringify(obj))
    this.props.dispatch({
      type: 'role/updateRoles',
      payload: obj,
    });
    
    console.log(this.state.data)
    this.setState({
      visibleConfig: false,
    });
  };
  // 配置关闭
  handleCancelConfig = e => {
    // console.log(e);
    this.setState({
      visibleConfig: false,
    });
  };

  // 添加单选按钮
  onChange = e => {
    // console.log('radio checked', e.target.value);
    console.log(e.target.value);
    // console.log(e.target.value.type)
    this.setState({
      value: e.target.value,
    });
  };

  // onSelect = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info);
  // };

  onCheck = (checkedKeys, info) => {
    // console.log('onCheck', checkedKeys, info);
    var arr = [];
    checkedKeys.forEach(item => {
      arr.push(parseInt(item));
    });
    var obj = this.state.data;
    obj.permissions = arr;
    this.setState({
      data: obj,
    });
  };
  onCheckCatalogues = (checkedKeys, info) => {
    // console.log('onCheck', checkedKeys, info);
    var arr = [];
    checkedKeys.forEach(item => {
      arr.push(parseInt(item));
    });
    var obj = this.state.data;
    obj.role_profile.catalogues = arr;
    this.setState({
      data: obj,
    });
  };
  // 遍历网站用户树
  renderTreeNodes = data =>
    data.map(item => {
      if (item.childs) {
        // console.log("aaa")
        return (
          <TreeNode title={item.catalogue_name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.childs)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  // 遍历网站用户权限树
  renderPerTreeNodes = data =>
    data.map(item => {
      if (item.childs) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderPerTreeNodes(item.childs)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  onExpand = expandedKeys => {
    console.log(expandedKeys);
    this.setState({
      array: expandedKeys,
    });
  };

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.ids,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ids: selectedRowKeys,
        });
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    // 新增
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '权限',
        dataIndex: 'permissions_name',
        render: (text, record) => {
          return (
            <div>
              <a onClick={this.configHandle.bind(this,record)}>配置</a>
            </div>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'role_profile.rp_enable',
        render: (text, record) => {
          // console.log(typeof text)
          if (text == 1) {
            return (
              <div style={{ width: '75px', height: '20px', overflow: 'hidden' }}>
                <Select
                  defaultValue={text}
                  style={{ width: '100px', marginLeft: '-12px', marginTop: '-5px' }}
                  onChange={this.handleChange.bind(record)}
                >
                  <Option value={1}>启用中</Option>
                  <Option value={0} style={{ color: 'red' }}>
                    冻结
                  </Option>
                </Select>
              </div>
            );
          } else {
            return <span style={{ color: 'red' }}>冻结</span>;
          }
        },
      },
    ];

    // getFieldDecorator('id');
    // const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.content}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="角色" key="1">
            {' '}
          </TabPane>
        </Tabs>
        <div className="btn1">
          <Button type="primary" onClick={this.showModal} size="small">
            添加
          </Button>
        </div>
        {/* 添加模态框 */}
        <div>
          <Modal
            title="请选择角色类型"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            // onCancel={this.handleCancel}
            footer={[
              // 定义右下角按钮的地方
              <Button key="ok" style={{ marginRight: 230 }} onClick={this.handleOk}>
                ok
              </Button>,
            ]}
          >
            {/* 添加单选按钮 */}
            <Radio.Group onChange={this.onChange} value={this.state.value}>
              <Radio style={{ margin: 50, marginLeft: 110 }} value={0}>
                网站用户
              </Radio>
              <Radio value={1}>后台管理</Radio>
            </Radio.Group>
          </Modal>
        </div>

        {/* 网站用户模态框 */}
        <Modal
          title="添加网站用户角色"
          visible={this.state.visibleWeb}
          onOk={this.handleOkWeb}
          onCancel={this.handleCancelWeb}
          width="600px"
          height="400px"
        >
          <Input
            placeholder="输入角色名称"
            style={{ width: 500, marginLeft: '1em' }}
            value={this.state.data.name}
            onChange={this.inputOnchange}
          />
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1em' }}>
            <div
              style={{
                border: '1px solid #e8e8e8',
                width: '248px',
                height: '352px',
                overflow: 'auto',
              }}
            >
              操作权限
              {/* {console.log(this.props.role.webBackRole)}  checkedKeys={[]} */}
              <Tree
                checkable
                onCheck={this.onCheck}
                defaultExpandedKeys={[]}
                checkedKeys={this.state.data.permissions}
                onExpand={this.onExpand}
                expandedKeys={this.state.array}
              >
                {this.renderPerTreeNodes(this.props.role.webBackRole[0].childs)}
              </Tree>
            </div>
            <div
              style={{
                border: '1px solid #e8e8e8',
                width: '248px',
                height: '352px',
                overflow: 'auto',
              }}
            >
              资源权限
              {/* {console.log(this.props.role.roleCata)} */}
              <Tree
                onCheck={this.onCheckCatalogues}
                checkable
                defaultExpandedKeys={[]}
                checkedKeys={this.state.data.role_profile.catalogues}
              >
                {this.renderTreeNodes(this.props.role.roleCata[0].childs)}
              </Tree>
            </div>
          </div>
        </Modal>

        {/* 后台用户模态框 */}
        <Modal
          title="添加后台管理角色"
          visible={this.state.visibleBack}
          onOk={this.handleOkBack}
          onCancel={this.handleCancelBack}
          width="600px"
          height="400px"
        >
          <Input
            placeholder="输入角色名称"
            style={{ width: 500, marginLeft: '1em' }}
            value={this.state.data.name}
            onChange={this.inputOnchangeBack}
          />
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1em' }}>
            <div
              style={{
                border: '1px solid #e8e8e8',
                width: '248px',
                height: '352px',
                overflow: 'auto',
              }}
            >
              操作权限
              <Tree
                checkable
                onCheck={this.onCheck}
                defaultExpandedKeys={[]}
                checkedKeys={this.state.data.permissions}
                onExpand={this.onExpand}
                expandedKeys={this.state.array}
              >
                {this.renderPerTreeNodes(this.props.role.webBackRole[0].childs)}
              </Tree>
            </div>
            <div style={{ border: '1px solid #e8e8e8', width: '248px', height: '352px',overflow:'auto' }}>
              资源权限
              {/* {console.log(this.props.role.roleCata)} */}
              <Tree
                onSelect={this.onSelect}
                onCheck={this.onCheckCatalogues}
                checkable
                defaultExpandedKeys={[]}
                checkedKeys={this.state.data.role_profile.catalogues}
              >
                {this.renderTreeNodes(this.props.role.roleCata[0].childs)}
              </Tree>
            </div>
          </div>
        </Modal>

        {/* 配置模态框 */}
        <Modal
          visible={this.state.visibleConfig}
          onOk={this.handleOkConfig}
          onCancel={this.handleCancelConfig}
          width="600px"
          height="400px"
        >
          <Input placeholder="输入角色名称" onChange={this.inputOnchange} value={this.state.data.name} style={{ width: 500, marginLeft: '1em' }} />

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1em' }}>
            <div style={{ border: '1px solid #e8e8e8', width: '248px', height: '352px' ,overflow:'auto'}}>
              <span>操作权限</span>
              {/* {console.log(this.props.role.webBackRole)}  checkedKeys={[]} */}
              {this.state.flag==0?<Tree
                checkable
                onCheck={this.onCheck}
                defaultExpandedKeys={[]}
                checkedKeys={this.state.data.permissions}
                onExpand={this.onExpand}
                expandedKeys={this.state.array}
              >
                {this.renderPerTreeNodes(this.props.role.webBackRole[0].childs)}
              </Tree>:<Tree
                checkable
                onCheck={this.onCheck}
                defaultExpandedKeys={[]}
                checkedKeys={this.state.data.permissions}
                onExpand={this.onExpand}
                expandedKeys={this.state.array}
              >
                {this.renderPerTreeNodes(this.props.role.webBackRole[0].childs)}
              </Tree>
              }
            </div>
            <div style={{ border: '1px solid #e8e8e8', width: '248px', height: '352px',overflow:'auto' }}>
            资源权限
              {/* {console.log(this.props.role.roleCata)} */}
              <Tree
                onSelect={this.onSelect}
                onCheck={this.onCheckCatalogues}
                checkable
                defaultExpandedKeys={[]}
                checkedKeys={this.state.data.role_profile.catalogues}
              >
                {this.renderTreeNodes(this.props.role.roleCata[0].childs)}
              </Tree>
            </div>
          </div>
        </Modal>

        {/* 数据表格 */}
        <div>
          <br></br>
          <Table
            rowKey="id"
            size="small"
            // rowSelection={{rowSelection,columnTitle:"#"}}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.role.roles}
            pagination={{
              onChange: page => {
                console.log(page);
                // let p = page - 1;
                // console.log(p);
                this.props.dispatch({
                  type: 'role/fetchRoles',
                  payload: {
                    page: page,
                    pageSize: 10,
                  },
                });
                this.setState({
                  page: page,
                });
              },
              total: this.props.role.count,
              pageSize: 10,
              size: 'small',

              hideOnSinglePage: false,
              itemRender: (current, type, originalElement) => {
                if (type === 'prev') {
                  return (
                    <Button size="small" style={{ marginRight: '1em' }}>
                      上一页
                    </Button>
                  );
                }
                if (type === 'next') {
                  return (
                    <Button size="small" style={{ marginLeft: '1em' }}>
                      下一页
                    </Button>
                  );
                }
                return originalElement;
              },
            }}
          />
        </div>

        {/* 底部按钮 */}
        <div>
          <Button type="primary" size="small" onClick={this.batchEnableOrFreeze}>
            启用
          </Button>
          &nbsp;
          <Button type="danger" size="small" onClick={this.batchEnableOrFreeze}>
            冻结
          </Button>
          &nbsp;
          <Button type="delete" size="small" onClick={this.batchDelete}>
            删除
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(({ role }) => ({
  role,
}))(Role);
