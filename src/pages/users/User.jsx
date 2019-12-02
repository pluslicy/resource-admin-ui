import React from 'react';
import {
  Button,
  Input,
  Table,
  Icon,
  Select,
  Checkbox,
  Modal,
  Radio,
  Upload,
  message,
  Avatar,
  Dropdown,
  Menu,
  Tooltip,
  Tabs,
} from 'antd';
import _ from 'lodash';
const { Search } = Input;
const { Option } = Select;
// tabs用户
const { TabPane } = Tabs;
const { confirm } = Modal;

// 引入自定义组件
import style from './User.less';
import UserForm from './UserForm';
import AddForm from './AddForm';
import ModifyForm from './ModifyForm';
import { connect } from 'dva';
import index from '../Welcome';
import { tsUndefinedKeyword } from '@babel/types';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      query: {},
      groups: [],
      form: {},
      // visible:false,
      // visibleImport:false,
      // visiblePermise:false,
      // visibleModify:false,
      // 添加单选按钮
      value: '',
      page: 1,
      flag: false,
      juese: undefined,
      id: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'users/fetchUser',
      payload: {
        page: 1,
        pageSize: 10,
      },
    });
    this.props.dispatch({
      type: 'users/fetchRole',
    });
  }

  //根据用户名查询
  searchName = value => {
    // console.log(value)
    var vq = { ...this.props.users.userSearch, ...{ search: value } };
    console.log(vq);
    this.props.dispatch({
      type: 'users/fetchUser',
      payload: vq,
    });
    console.log(this.props.users.userSearch);
    this.props.dispatch({
      type: 'users/fetchUsersQuery',
      payload: { ...vq, ...{ search: value } },
    });
  };
  //根据角色查询
  handleChange3 = value => {
    // console.log(value)
    var vq = { ...this.props.users.userSearch, ...{ groups: value } };
    // console.log(value)

    this.props.dispatch({
      type: 'users/fetchUser',
      payload: vq,
    });

    this.props.dispatch({
      type: 'users/fetchUsersQuery',
      payload: { ...vq, ...{ groups: value } },
    });
  };
  //根据性别查询
  handleChange4 = value => {
    // console.log(value)
    var vq = { ...this.props.users.userSearch, ...{ user_gender: value } };
    console.log(vq);
    this.props.dispatch({
      type: 'users/fetchUser',
      payload: vq,
    });
    console.log(this.props.users.userSearch);
    this.props.dispatch({
      type: 'users/fetchUsersQuery',
      payload: { ...vq, ...{ user_gender: value } },
    });
  };
  //根据状态查询
  handleChange5 = value => {
    // console.log(value)
    var vq = { ...this.props.users.userSearch, ...{ is_active: value } };
    // console.log(value)
    console.log(vq);

    this.props.dispatch({
      type: 'users/fetchUser',
      payload: vq,
    });
    console.log(this.props.users.userSearch);
    this.props.dispatch({
      type: 'users/fetchUsersQuery',
      payload: { ...vq, ...{ is_active: value } },
    });
  };
  // 按时间查询
  checkTimeChange = e => {
    var vq = { ...this.props.users.userSearch, ...{ bytime: `${e.target.checked}` } };
    this.props.dispatch({
      type: 'users/fetchUser',
      payload: vq,
    });
    console.log(vq);

    this.props.dispatch({
      type: 'users/fetchUsersQuery',
      payload: { ...vq, ...{ bytime: `${e.target.checked}` } },
    });
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
          type: 'users/fetchDeleteUsers',
          payload: {
            values: this.state.ids,
            page: this.state.page,
            pageSize: 10,
          },
        });
      },
    });
  };
  // 批量启用和冻结
  batchEnableOrFreeze = e => {
    // console.log(this.props.dispatch)
    if (e.target.textContent == '冻 结') {
      this.props.dispatch({
        type: 'users/fetchEnableOrFreeze',
        payload: {
          status: {
            is_active: false,
            ids: this.state.ids,
          },
          page: this.state.page,
          pageSize: 10,
        },
      });
    } else {
      this.props.dispatch({
        type: 'users/fetchEnableOrFreeze',
        payload: {
          status: {
            is_active: true,
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
  // 冻结状态改变
  handleChange = (record, e) => {
    if (e._owner) {
      // console.log("---------------",this.props.dispatch)
      this.props.dispatch({
        type: 'users/fetchEnableOrFreeze',
        payload: {
          status: {
            is_active: false,
            ids: [e._owner.pendingProps.record.id],
          },
          page: this.state.page,
          pageSize: 10,
        },
      });
    }
  };

  // 添加用户模态框
  showModal = () => {
    // console.log(this.state.flag)
    // console.log(this.state.form)
    if (this.state.flag) {
      this.state.form.resetFields();
    }
    this.setState({
      visible: true,
    });
  };
  saveFormRef = formRef => {
    // console.log(formRef,'----')
    this.formRef = formRef;
  };
  handleOkModal = e => {
    // 提交表单
    e.preventDefault();
    const { form } = this.formRef.props;

    form.validateFields(
      ['username', 'password', 'user_phone', 'user_gender', 'groups'],
      (err, values) => {
        if (err) {
          console.log(err);
          this.setState({
            visible: true,
            flag: true,
            form: form,
          });

          return;
        }
        this.setState({
          visible: false,
        });
        // console.log('添加时:', values);
        this.props.dispatch({
          type: 'users/AddUsers',
          payload: {
            values: values,
            page: this.state.page,
            pageSize: 10,
          },
        });
        form.resetFields();
      },
    );
  };
  handleCancelModal = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
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
  showImport = () => {
    this.setState({
      visibleImport: true,
    });
  };
  // 导入模态框 ok
  handleOk = e => {
    console.log(e);
    this.setState({
      value: '',
    });
    if (this.state.value === 1) {
      this.setState({
        visibleStudent: true,
      });
    } else if (this.state.value === '') {
      this.setState({
        visible: 'false',
      });
    } else {
      this.setState({
        visibleTeacher: true,
      });
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

  // 添加角色模态框
  showPermise = record => {
    console.log(record);
    var arr = record.groups.map(item => {
      return item.id;
    });
    console.log(arr);
    this.setState({
      visiblePermise: true,
      groups: arr,
      id: record.id,
    });
  };
  // 添加角色ok
  AddPermiseOk = e => {
    var obj = {
      groups: this.state.groups,
      id: this.state.id,
    };
    console.log(obj);
    this.props.dispatch({
      type: 'users/editUsersRole',
      payload: {
        obj,
        page: this.state.page,
        pageSize: 10,
      },
    });
    this.setState({
      visiblePermise: false,
    });
  };
  // 添加角色取消
  AddPermiseCancel = e => {
    console.log(e);
    this.setState({
      groups: [],
      visiblePermise: false,
    });
  };

  // 修改模态框
  showModify = record => {
    console.log(record.id);
    this.setState({
      form: record,
      visibleModify: true,
    });
  };
  ModifyOk = e => {
    // 提交表单
    e.preventDefault();
    const { form } = this.formRef.props;
    form.validateFields(['id', 'last_name', 'user_gender', 'user_phone'], (err, values) => {
      //  console.log('11111111',values)
      if (err) {
        console.log(err);
        this.setState({
          visibleModify: true,
        });
        return;
      }
      this.setState({
        visibleModify: false,
      });
      //  console.log('修改时:', values);
      this.props.dispatch({
        type: 'users/editUsers',
        payload: {
          va: values,
          page: this.state.page,
          pageSize: 10,
        },
      });
      form.resetFields();
    });
  };
  ModifyCancel = e => {
    console.log(e);
    this.setState({
      visibleModify: false,
    });
  };
  //修改角色的onChange
  handleChangeRole(value) {
    console.log(`selected ${value}`);
    console.log(value);
    console.log('--', this.state.groups);
    // var arr=[];
    // arr.push(value)
    // // _.pull(arr,parseInt(value));
    this.setState({
      groups: value,
    });
  }

  render() {
    // 添加角色的下拉
    const children = [];
    for (let i = 0; i < this.props.users.roles.length; i++) {
      children.push(
        <Option value={this.props.users.roles[i].id} key={this.props.users.roles[i].id}>
          {this.props.users.roles[i].name}
        </Option>,
      );
    }

    // 导入悬浮按钮
    const text = (
      <span>
        导入时需要按模板填写,点击<a>下载</a>
      </span>
    );
    // 表格第一列选框
    const rowSelection = {
      selectedRowKeys: this.state.ids,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ids: selectedRowKeys,
        });
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    // 表格第一行
    const columns = [
      {
        title: '用户名',
        dataIndex: 'last_name',
      },
      {
        title: '性别',
        dataIndex: 'user_gender',
        render: (text, record) => {
          if (record.user_gender === 1) {
            return '男';
          } else {
            return '女';
          }
        },
      },
      {
        title: '作品',
        dataIndex: 'content_num',
      },
      {
        title: '角色',
        dataIndex: 'groups',
        render: (text, record) => {
          // console.log(record)
          var str = ' ';
          record.groups.forEach(item => {
            str = str + item.name + ',';
          });

          str = str.slice(0, str.length - 1);
          console.log('str', str);
          return (
            <div>
              <Input style={{ width: '100px' }} size="small" disabled={true} value={str} />

              <Icon
                type="plus"
                style={{ color: 'skyblue', marginLeft: '5px' }}
                onClick={this.showPermise.bind(this, record)}
              />
            </div>
          );
        },
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
        dataIndex: 'state',
        render: (text, record) => {
          return (
            <div>
              <Icon type="form" onClick={this.showModify.bind(this, record)} />
            </div>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'is_active',
        render: (text, record) => {
          if (text == true) {
            return (
              <div style={{ width: '75px', height: '20px', overflow: 'hidden' }}>
                <Select
                  defaultValue={text}
                  style={{ width: '100px', marginLeft: '-12px', marginTop: '-5px' }}
                  onChange={this.handleChange.bind(record)}
                >
                  <Option value={true}>启用中</Option>
                  <Option value={false} style={{ color: 'red' }}>
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

    return (
      <div className={style.Back}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="用户" key="1">
            {' '}
          </TabPane>
        </Tabs>
        <div className={style.btn}>
          <Button
            className={style.btn}
            style={{ width: '80px' }}
            type="primary"
            onClick={this.showModal}
          >
            添加
          </Button>
          <Search
            placeholder="请输入用户名"
            onSearch={this.searchName}
            style={{ marginLeft: '2em', width: '222px', height: '30px' }}
          />
          <Tooltip placement="bottom" title={text}>
            <Button
              style={{ width: '80px', position: 'absolute', right: '5%' }}
              onClick={this.showImport}
            >
              <Icon type="upload" />
              导入
            </Button>
          </Tooltip>
        </div>
        <div
          className="select-div"
          style={{ width: '60%', marginTop: '2em', display: 'inline', overflow: 'hidden' }}
        >
          <span style={{ marginTop: '2em', fontWeight: '700', fontSize: '12px' }}>角色 </span>
          <Select
            size="small"
            placeholder="全部"
            defaultValue={this.state.gg}
            style={{ marginTop: '2em', marginLeft: '1em', fontSize: '12px', width: 80 }}
            onChange={this.handleChange3}
          >
            <Option style={{ fontSize: '12px' }} value={this.state.juese}>
              全部
            </Option>
            {this.props.users.roles.map(item => {
              return (
                <Option key={item.id} style={{ fontSize: '12px' }} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <span style={{ marginLeft: '2em', fontWeight: '700', fontSize: '12px' }}>性别 </span>
          <Select
            className="video_select"
            size="small"
            defaultValue=""
            style={{ width: '62px', height: '22px', marginLeft: '1em', fontSize: '12px' }}
            onChange={this.handleChange4}
          >
            <Option style={{ fontSize: '12px' }} value="">
              全部
            </Option>
            <Option style={{ fontSize: '12px' }} value={1}>
              男
            </Option>
            <Option style={{ fontSize: '12px' }} value={2}>
              女
            </Option>
          </Select>

          <span style={{ marginLeft: '2em', fontWeight: '700', fontSize: '12px' }}>状态 </span>
          <Select
            size="small"
            placeholder="状态"
            defaultValue=""
            style={{ width: 62, height: 22, marginLeft: '1em', fontSize: '12px' }}
            onChange={this.handleChange5}
          >
            <Option style={{ fontSize: '12px' }} value="">
              全部
            </Option>
            <Option style={{ fontSize: '12px' }} value={true}>
              启用中
            </Option>
            <Option style={{ fontSize: '12px' }} value={false}>
              冻结
            </Option>
          </Select>
          <span style={{ marginLeft: '2em', fontWeight: 'bold' }}>
            <Checkbox onChange={this.checkTimeChange} style={{ fontSize: '12px' }}>
              按时间
            </Checkbox>
          </span>
        </div>
        {/* {console.log(this.props.users.user)} */}
        <Table
          className="video_table"
          size="small"
          style={{ marginTop: '2em' }}
          rowKey="id"
          pagination={{
            onChange: page => {
              console.log(page);
              // let p = page - 1;
              // console.log(p);
              this.props.dispatch({
                type: 'users/fetchUser',
                payload: {
                  page: page,
                  pageSize: 10,
                },
              });
              this.setState({
                page: page,
              });
            },
            total: this.props.users.count,
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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.users.user}
        />
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
        {/* 添加用户模态框 */}
        <Modal
          title="添加用户"
          width="600px"
          visible={this.state.visible}
          onOk={this.handleOkModal}
          onCancel={this.handleCancelModal}
        >
          <AddForm wrappedComponentRef={this.saveFormRef} />
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
            <Button key="ok" style={{ marginRight: 230 }} onClick={this.handleOk}>
              ok
            </Button>,
          ]}
        >
          {/* 添加单选按钮 */}
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio style={{ margin: 50, marginLeft: 110 }} value={1}>
              学生用户
            </Radio>
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
          height="400px"
        >
          <UserForm />
        </Modal>
        {/* 添加角色模态框 */}
        <Modal
          width="600px"
          height="800px"
          title="为该用户选择角色"
          visible={this.state.visiblePermise}
          onOk={this.AddPermiseOk}
          onCancel={this.AddPermiseCancel}
        >
          {console.log('添加的角色有', this.state.groups)}
          <Select
            showArrow={true}
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="请为用户选择角色！"
            value={this.state.groups}
            onChange={this.handleChangeRole.bind(this)}
          >
            {children}
          </Select>
        </Modal>
        {/* 修改模态框 */}
        <Modal
          width="600px"
          title="修改"
          visible={this.state.visibleModify}
          onOk={this.ModifyOk}
          onCancel={this.ModifyCancel}
        >
          <ModifyForm initData={this.state.form} wrappedComponentRef={this.saveFormRef} />
        </Modal>
      </div>
    );
  }
}

export default connect(({ users }) => ({
  users,
}))(User);
