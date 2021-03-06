import React from 'react';
import { Button, Radio, Table, Input, Menu, Dropdown, Icon, Modal, Select, Tabs } from 'antd';
import { connect } from 'dva';
import { thisTypeAnnotation } from '@babel/types';
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

/**
 * 教师推荐主页面
 */

class recommend extends React.Component {
  state = {
    value: 1,
    activeKey: 0, // 编目id
    display: 'none',
  };

  componentWillMount() {
    this.props.dispatch({ type: 'recommend/getLevelonecata' }).then(() => {
      this.props.dispatch({
        type: 'recommend/getTeacherrankList',
        payload: this.props.recommend.roles[0].id,
      });
      this.setState({ activeKey: this.props.recommend.roles[0].id });
    });
  }

  onChange = e => {
    this.props.dispatch({
      type: 'recommend/getTeacherrankList',
      payload: this.props.recommend.roles[0].id + '&' + e.target.value,
    });
    this.setState({
      value: e.target.value,
      activeKey: this.props.recommend.roles[0].id,
    });
  };
  componentWillReceiveProps(nextProps) {
    // 该方法当props发生变化时执行，初始化render时不执行
    if (nextProps !== this.props) {
      let set = nextProps.recommend.customTeacherrank;
      if (nextProps !== null && set !== undefined) {
        this.props = nextProps;
        // 当自定义榜单数量大于 5 时进行提示
        if (this.props.recommend.customTeacherrank.length >= 5) {
          this.setState({
            display: 'inline',
          });
        } else {
          this.setState({
            display: 'none',
          });
        }
        return;
      }
    }
  }

  // 开启模态框
  showModal = () => {
    this.props.dispatch({ type: 'recommend/getCustomTeacherrank', payload: this.state.activeKey });
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  tabsChanges(activeKey) {
    // 切换面板的回调
    this.props.dispatch({ type: 'recommend/getTeacherrankList', payload: activeKey });
    this.setState({
      activeKey: activeKey,
    });
  }

  // 根据名称搜索
  findByName(value) {
    var id = this.state.activeKey;
    var values = id + '&search=' + value;
    this.props.dispatch({ type: 'recommend/getTeacherrankList', payload: values });
  }
  // 删除自定义榜单
  delrank(id) {
    this.props.dispatch({ type: 'recommend/delrank', payload: id }).then(() => {
      this.props.dispatch({
        type: 'recommend/getCustomTeacherrank',
        payload: this.state.activeKey,
      });
    });
  }

  render() {
    // 下拉菜单
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Radio href="http://www.alipay.com/">JavaEE企业级开发</Radio>
        </Menu.Item>
        <Menu.Item key="1">
          <Radio href="http://www.taobao.com/">人工智能pytoon全栈</Radio>
        </Menu.Item>
        <Menu.Item key="3">
          <Radio href="http://www.taobao.com/">H5全栈开发</Radio>
        </Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: '#',
        dataIndex: 'id',
      },
      {
        title: '作者',
        dataIndex: 'user',
      },
      {
        title: '作品',
        dataIndex: 'work_num',
      },
      {
        title: '赞',
        dataIndex: 'favor_num',
      },
      {
        title: '收藏',
        dataIndex: 'collect_num',
      },
      {
        title: '评论',
        dataIndex: 'comment_num',
      },
      {
        title: '浏览',
        dataIndex: 'times_num',
      },
      // {
      //   title: 'Action',
      //   render: record => { },
      // },
    ];
    const columns1 = [
      {
        dataIndex: 'id',
      },
      {
        dataIndex: 'user',
      },
      {
        dataIndex: 'name',
        width: '100px',
      },
      {
        render: (text, record, index) => (
          <a
            onClick={() => {
              if (index === 0) {
                alert('已经是第一位了哦!');
              } else {
                // 上一行数据的id
                var pre_id = this.props.recommend.customTeacherrank[(index -= 1)].id;
                var values = {
                  down_id: pre_id, // 下调对象的id
                  up_id: record.id, // 上调对象的id
                };
                this.props
                  .dispatch({ type: 'recommend/changeOrderTeacherrank', payload: values })
                  .then(() => {
                    // 此处为假数据
                    // this.state.activeKey
                    this.props.dispatch({
                      type: 'recommend/getCustomTeacherrank',
                      payload: this.state.activeKey,
                    });
                  });
              }
            }}
          >
            ↑
          </a>
        ),
      },
      {
        render: (text, record, index) => (
          <a
            onClick={() => {
              if (index + 1 === this.props.recommend.customTeacherrank.length) {
                alert('已经是最后一位了哦!');
              } else {
                // 下一行数据的id
                var next_id = this.props.recommend.customTeacherrank[(index += 1)].id;
                var values = {
                  down_id: record.id, // 下调对象的id
                  up_id: next_id, // 上调对象的id
                };
                this.props
                  .dispatch({ type: 'recommend/changeOrderTeacherrank', payload: values })
                  .then(() => {
                    // 此处为假数据
                    // this.state.activeKey
                    this.props.dispatch({
                      type: 'recommend/getCustomTeacherrank',
                      payload: this.state.activeKey,
                    });
                  });
              }
            }}
          >
            ↓
          </a>
        ),
      },
      {
        render: record => <a onClick={() => this.delrank(record.id)}>×</a>,
      },
    ];
    const columns2 = [
      // {
      //   title: '#',
      //   dataIndex: 'id',
      // },
      {
        title: '作者',
        dataIndex: 'user',
      },
      {
        title: '作品',
        dataIndex: 'work_num',
      },
      {
        title: '赞',
        dataIndex: 'favor_num',
      },
      {
        title: '收藏',
        dataIndex: 'collect_num',
      },
      {
        title: '评论',
        dataIndex: 'comment_num',
      },
      {
        title: '浏览',
        dataIndex: 'times_num',
      },
    ];
    // 自定义榜单的选择框
    const rowSelection = {
      columnTitle: '#',
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys', selectedRowKeys);
        // 每选择一次就提交一次请求
        if (selectedRowKeys.length !== 0) {
          var value = {
            user: selectedRowKeys[0],
            catalogue: this.state.activeKey,
          };
          this.props
            .dispatch({ type: 'recommend/addCustomTeacherrank', payload: value })
            .then(() => {
              this.props.dispatch({
                type: 'recommend/getCustomTeacherrank',
                payload: this.state.activeKey,
              });
            });
          // 请求完成后置空selectedRowKeys
          selectedRowKeys.length = 0;
        }
        this.setState({
          selectedRowKeys: selectedRowKeys,
        });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };
    // 定义一个数组，将数据存入数组
    const elements = [];
    var list = this.props.recommend.roles;
    list.forEach(item => {
      elements.push(
        <TabPane tab={item.catalogue_name} key={item.id} style={{ marginBottom: '0.5em' }}>
          {/* <span>
            当前以
              <Input style={{ width: '3%' }} size="small" defaultValue="1" disabled />
            级编目作为推荐分类
            </span>
          &nbsp;
            <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              设置<Icon type="down" />
            </a>
          </Dropdown> 
          <br />
          */}
          <Button onClick={this.showModal} style={{ marginBottom: '1em' }}>
            自定义推荐
          </Button>
          <Radio.Group
            style={{ marginBottom: '0.5em', marginLeft: '0.5em' }}
            onChange={this.onChange}
            value={this.state.value}
          >
            <Radio value={'byfavor=true'}>按赞</Radio>
            <Radio value={'bycomment=true'}>按评论</Radio>
            <Radio value={'bycollection=true'}>按收藏</Radio>
            <Radio value={'byview=true'}>按浏览</Radio>
          </Radio.Group>
          <span style={{ fontSize: '12px', marginLeft: '1em', color: 'red' }}>
            仅作品数多于5部并且杰普认证的作者才有可能被推荐
          </span>
          {/* 表格内容 */}
          <div>
            <Table
              bordered
              rowKey="id"
              size="small"
              columns={columns}
              dataSource={this.props.recommend.teacherrankList}
            />
          </div>
          <Modal
            visible={this.state.visible}
            okText="完成"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width="1000px"
            height="514px"
            maskStyle={{ backgroundColor: 'rgba(0,0,0,.05)' }} // 调高遮罩层透明度
          >
            <div style={{ overflow: 'hidden' }}>
              <div style={{ float: 'left' }}>
                <div style={{ width: '100%', height: '100%' }}>
                  自定义推荐(6项)
                  <br />
                  <Table
                    showHeader={false} //不显示表头
                    pagination={false} //不需要分页
                    bordered={false}
                    rowKey="id"
                    size="small"
                    columns={columns1}
                    dataSource={this.props.recommend.customTeacherrank}
                  />
                  <span style={{ color: 'red', display: this.state.display }}>
                    不能选择更多了!!!
                  </span>
                </div>
              </div>
              <div style={{ float: 'right' }}>
                <Search
                  placeholder="请输入作者名称"
                  onSearch={value => this.findByName(value)}
                  style={{ width: 200 }}
                />
                <br />
                <br />
                {/* <Radio style={{ marginTop: '1em', marginBottom: '1em' }}>按热度</Radio> */}
                <Table
                  rowSelection={rowSelection}
                  bordered
                  rowKey="id"
                  size="small"
                  columns={columns2}
                  dataSource={this.props.recommend.teacherrankList}
                />
              </div>
            </div>
          </Modal>
        </TabPane>,
      );
    });
    return (
      <div style={{ padding: '1em', backgroundColor: '#ffffff', borderRadius: '5px' }}>
        <Tabs onChange={activeKey => this.tabsChanges(activeKey)}>{elements}</Tabs>
      </div>
    );
  }
}

export default connect(({ recommend }) => ({ recommend }))(recommend);
