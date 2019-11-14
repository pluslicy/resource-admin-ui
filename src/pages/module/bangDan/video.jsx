import React from 'react';
import { Button, Radio, Table, Modal, Input, Select } from 'antd';
import { connect } from 'dva';
const { Search } = Input;
const { Option } = Select;
class bangDan extends React.Component {
  state = {
    value: 1,
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

  render() {
    const columns = [
      {
        title: '#',
        // dataIndex: 'grade',
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
        dataIndex: 'vr_comment',
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

    const columns1 = [
      {
        dataIndex: 'videorank_order',
      },
      {
        dataIndex: 'name',
      },
      {
        dataIndex: '↑ ↓',
      },
      {
        dataIndex: '×',
      },
    ];
    const columns2 = [
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
        title: '日期',
        dataIndex: 'vr_created_time',
      },
    ];

    return (
      <div style={{ padding: '1em', backgroundColor: '#ffffff', borderRadius: '5px' }}>
        <a>
          <span style={{ fontSize: '20px' }}>视频</span>
        </a>
        <br />
        <hr />
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
          okText="完成"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1000px"
          height="514px"
        >
          <div style={{ overflow: 'hidden' }}>
            <div style={{ float: 'left' }}>
              <div style={{ width: '100%', height: '100%' }}>
                自定义榜单(5项)
                <br />
                <Table
                  showHeader={false} //不显示表头
                  pagination={false} //不需要分页
                  bordered
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
                onSearch={value => console.log(value)}
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
                bordered
                rowKey="id"
                size="small"
                columns={columns2}
                dataSource={this.props.videobangdan.customVideolist.results}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(({ videobangdan }) => ({ videobangdan }))(bangDan);
