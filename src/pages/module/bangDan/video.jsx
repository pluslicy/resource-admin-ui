import React from 'react';
import { Button, Radio, Table, Modal, Input, Select, Tabs } from 'antd';
import { connect } from 'dva';
import Word from './Word';
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
class bangDan extends React.Component {
  state = {
    value: 1,
    selectedRowKeys: [],
  };
  componentWillMount() {
    this.props.dispatch({ type: 'videobangdan/findAll' });
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  // 开启模态框
  showModal = () => {
    this.props.dispatch({ type: 'videobangdan/findCustomVideorank' });
    this.props.dispatch({ type: 'videobangdan/findCustomVideolist' });
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

  // 根据名称搜索
  findByName(value) {
    this.props.dispatch({ type: 'videobangdan/findByName', payload: value });
  }
  // 删除自定义榜单
  delrank(id) {
    this.props.dispatch({ type: 'videobangdan/delrank', payload: id });
  }

  render() {
    // 视频列表表格列的配置描述
    const columns = [
      {
        title: '#',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex: 'vr_name',
      },
      {
        title: '作者',
        dataIndex: 'user',
      },
      {
        title: '方向',
        dataIndex: 'vr_cata_one',
      },
      {
        title: '技术',
        dataIndex: 'vr_cata_two',
      },
      {
        title: '赞',
        dataIndex: 'vr_favor',
      },
      {
        title: '收藏',
        dataIndex: 'vr_collection',
      },
      {
        title: '评论',
        dataIndex: 'vr_comment',
      },
      {
        title: '浏览',
        dataIndex: 'vr_play_times',
      },
      {
        title: '日期',
        dataIndex: 'vr_created_time',
      },
    ];
    // 自定义榜单(5项)表格列的配置描述
    const columns1 = [
      {
        dataIndex: 'id',
      },
      {
        dataIndex: 'videorank_order',
      },
      {
        dataIndex: 'name',
        width: '100px',
      },
      {
        render: (text,record, index) =>
          <a
            onClick={
              () => {
                if (index === 0) {
                  alert('已经是第一位了哦!')
                } else {
                  // 上一行数据的id
                  var pre_id = this.props.videobangdan.customVideorank[index -= 1].id;
                  var values = {
                    "down_id": pre_id, // 下调对象的id
                    "up_id": record.id // 上调对象的id
                  }
                  this.props.dispatch({ type: 'videobangdan/changeOrderVideorank', payload: values })
                }
              }
            }>↑</a>,
      },
      {
        render: (text,record, index) =>
          <a
            onClick={
              () => {
                if (index+1 === this.props.videobangdan.customVideorank.length) {
                  alert('已经是最后一位了哦!')
                } else {
                  // 下一行数据的id
                  var next_id = this.props.videobangdan.customVideorank[index += 1].id;
                  var values = {
                    "down_id": record.id, // 下调对象的id
                    "up_id": next_id // 上调对象的id
                  }
                  this.props.dispatch({ type: 'videobangdan/changeOrderVideorank', payload: values })
                }
              }
            }>↓</a>,
      },
      {
        render: (record) => <a onClick={() => this.delrank(record.id)}>×</a>,
      },
    ];
    // 自定义榜单中视频列表表格列的配置描述
    const columns2 = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex: 'vr_name',
        width: '100px',
      },
      {
        title: '作者',
        dataIndex: 'user',
      },
      {
        title: '方向',
        dataIndex: 'vr_cata_one',
      },
      {
        title: '技术',
        dataIndex: 'vr_cata_two',
      },
      {
        title: '日期',
        dataIndex: 'vr_created_time',
      },
    ];
    // 自定义榜单的选择框
    const rowSelection = {
      columnTitle: '#',
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // console.log('selectedRowKeys', selectedRowKeys);
        // 每选择一次就提交一次请求
        if (selectedRowKeys.length !== 0) {
          var value = {
            object_type: 'video', // 默认为视频类型,未考虑专辑有bug
            object_id: selectedRowKeys[0]
          }
          this.props.dispatch({ type: 'videobangdan/addCustomVideorank', payload: value })
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

    return (
      <div style={{ padding: '1em', backgroundColor: '#ffffff', borderRadius: '5px' }}>
        <Tabs>
          <TabPane tab="视频" key="1">
            <Button onClick={this.showModal}>自定义榜单</Button>
            <Radio.Group
              style={{ marginBottom: '1em', marginLeft: '0.5em' }}
              onChange={this.onChange}
              value={this.state.value}
            >
              <Radio value={1}>按赞</Radio>
              <Radio value={2}>按评论</Radio>
              <Radio value={3}>按收藏</Radio>
              <Radio value={4}>按浏览</Radio>
            </Radio.Group>
            {/* 表格内容 */}
            <div>
              <Table
                bordered
                rowKey="id"
                size="small"
                columns={columns}
                dataSource={this.props.videobangdan.videos.results}
              // scroll={{ x: 1300 }}
              />
            </div>
            <Modal
              visible={this.state.visible}
              // okText="完成"
              onCancel={this.handleCancel}
              width="1000px"
              height="514px"
              footer={
                <Button type="primary" onClick={this.handleOk}>
                  完成
                </Button>
              }
            >
              <div style={{ overflow: 'hidden' }}>
                <div style={{ float: 'left' }}>
                  <div style={{ width: '100%', height: '100%' }}>
                    自定义榜单(5项)
                    <br />
                    <Table
                      showHeader={false} //不显示表头
                      pagination={false} //不需要分页
                      bordered={false}
                      rowKey="id"
                      size="small"
                      columns={columns1}
                      dataSource={this.props.videobangdan.customVideorank}
                    />
                    <span style={{ color: 'red' }}>不能选择更多了!!!</span>
                  </div>
                </div>
                <div style={{ float: 'right' }}>
                  <Search
                    placeholder="请输入搜索内容"
                    onSearch={value => this.findByName(value)}
                    style={{ width: 200 }}
                  />
                  <br />
                  <span>权限</span>
                  <Select
                    defaultValue="全部"
                    style={{ width: 120 }}
                    style={{ marginTop: '1em', marginBottom: '1em' }}
                  />
                  <span>格式</span>
                  <Select defaultValue="专辑" style={{ width: 120 }} />
                  <span>状态</span>
                  <Select defaultValue="全部" style={{ width: 120 }} />
                  <Radio>按时间</Radio>
                  <Radio>按热度</Radio>
                  <Table
                    rowSelection={rowSelection}
                    bordered
                    rowKey="id"
                    size="small"
                    columns={columns2}
                    dataSource={this.props.videobangdan.customVideolist.results}
                  />
                </div>
              </div>
            </Modal>
          </TabPane>
          <TabPane tab="文档" key="2">
            <Word treekey={this.state.treekey}></Word>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ videobangdan }) => ({ videobangdan }))(bangDan);
