import React from 'react';
import styles from './video.less';
import VideoForm from './VideoForm';
import { connect } from 'dva';
import Word from './Word';

import { Button, Table, Tabs, Icon, DatePicker, Input, Modal, Form, Divider } from 'antd';

const { TabPane } = Tabs;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search, TextArea } = Input;

global.constants = {
  //初始化批量删除id数组|全局变量
  ids: [],
};

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      visible: false,
      visible2: false,
      form: {},
      selectedRowKeys: [],
      date: [],
      name: [],
      pathurl: '',
      page: 1,
    };
  }
  // 在渲染前调用
  componentWillMount() {
    this.props.dispatch({
      type: 'video/findAll',
      payload: {
        page: 1,
        pageSize: 10,
      },
    });
  }
  // 批量一键通过
  passAll = () => {
    var data = global.constants.ids;
    console.log(data);
    this.props.dispatch({
      type: 'video/passVideo',
      payload: {
        obj: data,
        page: this.state.page,
        pageSize: 10,
      },
    });
  };
  // 日期选择框
  onChange = (date, dateString) => {
    this.setState({
      date: dateString,
    });
    var values = [dateString, this.state.name];
    this.props.dispatch({ type: 'video/findByCondidtion', payload: values });
  };
  // 名称搜索框
  onSearch = value => {
    this.setState({
      name: value,
    });
    var values = [this.state.date, value];
    this.props.dispatch({ type: 'video/findByCondidtion', payload: values });
  };
  // 改变多选框
  onSelectChange = (selectedRowKeys, e) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
    });
  };
  // 弹出视频审核拒绝理由
  reject = record => {
    this.setState({
      visible: true,
      id: record.id,
    });
  };
  // 弹出详细视频
  showVideo = record => {
    this.setState({
      visible2: true,
      pathurl: record.vr_url,
    });
  };
  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  // 提交拒绝理由
  handleCreate = record => {
    this.setState({
      visible: false,
    });
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        console.log(this.state.id);
        var obj = {
          vr_audit_status: '2', //拒绝
          id: this.state.id,
          vr_audit_decs: values.test,
        };
        this.props.dispatch({
          type: 'video/fetchCheck',
          payload: {
            obj,
            page: this.state.page,
            pageSize: 10,
          },
        });
      }
    });
    form.resetFields();
  };
  // 视频通过审核
  passVideo = record => {
    var obj = {
      vr_audit_status: '1', //通过
      id: record.id,
      vr_audit_decs: '审核通过',
    };
    this.props.dispatch({
      type: 'video/fetchCheck',
      payload: {
        obj,
        page: this.state.page,
        pageSize: 10,
      },
    });
  };
  // 关闭拒绝理由弹框
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  // 关闭并提交视频
  handleOk2 = e => {
    this.setState({
      visible2: false,
    });
  };
  // 关闭视频模态框
  handleCancel2 = e => {
    this.setState({
      visible2: false,
    });
    // 停止视频播放
    var myVideo = document.getElementById('videoId');
    myVideo.currentTime = 0;
    myVideo.pause();
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows, record) => {
        //遍历selectedRows拿到id集合
        global.constants.ids = [];
        for (let i = 0; i < selectedRows.length; i++) {
          let { id } = selectedRows[i];
          global.constants.ids.push(id);
        }
      },
    };
    const columns = [
      { title: '名称', align: 'center', dataIndex: 'vr_name' },
      { title: '作者', align: 'center', dataIndex: 'vr_user' },
      { title: '方向', align: 'center', dataIndex: 'vr_cata_one' },
      { title: '技术', align: 'center', dataIndex: 'vr_cata_two' },
      // { title: '类型', align: 'center', dataIndex: 'vr_owner', },
      {
        title: '权限',
        align: 'center',
        dataIndex: '',
        render: record => {
          if (record.vr_permission === 0) {
            return (
              <div>
                <span>VIP</span>
              </div>
            );
          } else if (record.vr_permission === 1) {
            return (
              <div>
                <span>免费</span>
              </div>
            );
          } else {
            return (
              <div>
                <span>其他</span>
              </div>
            );
          }
        },
      },
      { title: '日期', align: 'center', dataIndex: 'vr_created_time' },
      { title: '描述', align: 'center', dataIndex: 'vr_audit_decs' },
      {
        title: '查看',
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <Icon type="eye" onClick={this.showVideo.bind(this, record)} />
            </div>
          );
        },
      },
      {
        title: '状态',
        align: 'center',
        dataIndex: '',
        render: record => {
          if (record.vr_audit_status === 1) {
            return (
              <div>
                <span>已通过</span>
              </div> //style={{ color: '#52a647' }}
            );
          } else if (record.vr_audit_status === 2) {
            return (
              <div>
                <span style={{ color: 'red' }}>已拒绝</span>
              </div>
            );
          } else {
            return (
              <span>
                <a onClick={this.passVideo.bind(this, record)}>通过</a>
                <Divider type="vertical" />
                <a style={{ color: 'red' }} onClick={this.reject.bind(this, record)}>
                  拒绝
                </a>
              </span>
            );
          }
        },
      },
    ];
    return (
      <div className={styles.content}>
        <Tabs defaultActiveKey="1">
          {/* <TabPane tab={'视频 (' + this.props.video.videos.count + ')'} key='1'> */}
          <TabPane tab="视频" key="1">
            <div className={styles.content_top}>
              <RangePicker onChange={this.onChange} style={{ width: 300 }} />
              <Search
                onSearch={value => this.onSearch(value)}
                style={{ width: 200 }}
                placeholder={'根据名称搜索'}
              />
            </div>
            <div>
              <Table
                rowKey="id"
                size="small"
                // bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.video.videos.results}
                pagination={{
                  onChange: page => {
                    console.log(page);
                    //   let p = page - 1;
                    //   console.log(p);
                    this.props.dispatch({
                      type: 'video/findAll',
                      payload: {
                        page: page,
                        pageSize: 10,
                      },
                    });
                    this.setState({
                      page: page,
                    });
                  },
                  total: this.props.video.videos.count,
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
            <div className={styles.content_bottom}>
              <Button size="small" type="primary" onClick={this.passAll.bind(this)}>
                一键通过
              </Button>
            </div>
            <VideoForm
              title="拒绝的理由"
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            >
              <Form onSubmit={this.handleOk}>
                <Form.Item>
                  <Input autosize={{ minRows: 6, maxRows: 10 }} placeholder="请输入拒绝理由..." />
                </Form.Item>
                <Form.Item>
                  <Button htmlType={'submit'}>提交</Button>
                </Form.Item>
              </Form>
            </VideoForm>
            <Modal
              width={900}
              visible={this.state.visible2}
              onOk={this.handleOk2}
              onCancel={this.handleCancel2}
            >
              <video id="videoId" width="850px" height="500px" controls>
                <source src={this.state.pathurl} />
              </video>
            </Modal>
          </TabPane>
          {/* <TabPane tab={'文档 (' + this.props.word.words.count + ')'} key='2'> */}
          <TabPane tab="文档" key="2">
            <Word treekey={this.state.treekey}></Word>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(({ video }) => ({
  video,
}))(Check);
