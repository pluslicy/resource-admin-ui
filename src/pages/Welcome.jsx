import React from 'react';
import styles from './Welcome.less';
import { Table, Tabs, Button, DatePicker, Pagination, Divider } from 'antd';
import { connect } from 'dva';
import $ from 'jquery';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { whileStatement } from '@babel/types';
const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;
class index extends React.Component {
  state = {
    all: [],
    month: [],
    monthd: [],
    shangc: [],
    tongg: [],
    backgroundColor: '#3AA0FF',
    fontcolor: 'white',
    backgroundColor1: 'white',
    fontcolor1: 'black',
    display: true,
    option: [],
  };
  getListData() {
    // 条形统计图数据源
    var list = this.state.month;
    if (list.length > 0) {
      var monthd = [];
      var shangc = [];
      var tongg = [];
      list.forEach(item => {
        monthd.push(item.day);
        shangc.push(item.upload_works_num);
        tongg.push(item.audit_passed_works_num);
      });
      this.setState({
        monthd: monthd,
        shangc: shangc,
        tongg: tongg,
      });
    }
  }
  componentWillMount() {
    this.props.dispatch({ type: 'welcome/unauVideolist' });
    this.props.dispatch({ type: 'welcome/findAll' }).then(() => {
      this.setState({
        all: this.props.welcome.all.data,
      });
    });
    var day = new Date();
    var arr = [];
    arr.push(day.getFullYear()); // 获取当前年份
    arr.push(day.getMonth() + 1); // 获取当前月份+1(0-11,0代表1月)
    arr.push(new Date(arr[0], arr[1], 0).getDate()); // 获取当月天数
    this.props.dispatch({ type: 'welcome/findMonth', payload: arr }).then(() => {
      this.setState(
        {
          month: this.props.welcome.month.data.data,
        },
        () => {
          this.getListData();
          this.setOption('bar');
        },
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    // 该方法当props发生变化时执行，初始化render时不执行
    if (nextProps !== this.props) {
      let set = nextProps.welcome.daishenhe;
      if (nextProps !== null && set !== undefined) {
        this.props = nextProps;
        return;
      }
    }
  }

  onChange = (date, dateString) => {
    if (dateString) {
      var arr = dateString.split('-');
      var day = new Date(arr[0], arr[1], 0).getDate(); //最后一个参数为0,意为获取当月一共多少天
      arr.push(day);
      this.props.dispatch({ type: 'welcome/findMonth', payload: arr }).then(() => {
        this.setState(
          {
            month: this.props.welcome.month.data.data,
          },
          () => {
            this.getListData();
          },
        );
      });
    }
  };
  // 切换条形/折线统计图
  onChangeSpan(key) {
    var a = 'backgroundColor' + [key];
    var b = 'fontcolor' + [key];
    this.setState({
      display: !this.state.display,
      [a]: this.state[a] === 'white' ? '#3AA0FF' : 'white',
      [b]: this.state[b] === 'white' ? 'black' : 'white',
    });
  }
  setOption(type) {
    var color = ['#3AA0FF', '#4ECB73', '#675bba'];
    var option = {
      title: {
        text: '上传量与通过量统计',
      },
      color: color,
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['上传量', '通过量'],
      },
      xAxis: {
        data: this.state.monthd,
      },
      yAxis: {
        name: '人次',
      },
      series: [
        {
          type: type,
          smooth: false, //是否平滑曲线显示
          name: '上传量',
          data: this.state.shangc,
          emphasis: {
            label: {
              show: true,
            },
          },
        },
        {
          type: type,
          smooth: false, //是否平滑曲线显示
          name: '通过量',
          data: this.state.tongg,
          emphasis: {
            label: {
              show: true,
            },
          },
        },
      ],
    };
    this.setState({
      option: option,
    });
  }
  // 切换标签页回调函数
  callback(key) {
    if (key === '1') {
      this.props.dispatch({ type: 'welcome/unauVideolist' });
    } else if (key === '2') {
      this.props.dispatch({ type: 'welcome/unauDoclist' });
    } else if (key === '3') {
      this.props.dispatch({ type: 'welcome/commentlist' });
    }
  }
  render() {
    // 表格列的配置
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
        dataIndex: 'vr_user',
      },
      {
        title: '类目',
        dataIndex: 'vr_cata_two',
      },
      {
        title: '时间',
        dataIndex: 'vr_created_time',
      },
      {
        title: '查看',
        // dataIndex: 'id',
        render: record => {
          return (
            <span style={{ marginLeft: '0.5em' }}>
              <a onClick={() => (window.location.href = '#/./resource/check/video')}>
                <img src={require('../../images/index/u245.png')} />
              </a>
            </span>
          );
        },
      },
      {
        title: 'Action',
        width: 60,
        render: record => {
          return (
            <span>
              <a onClick={() => (window.location.href = '#/./resource/check/video')}>
                <img src={require('../../images/index/u240.png')} />
              </a>
              <Divider type="vertical" />
              <a onClick={() => (window.location.href = '#/./resource/check/video')}>
                <img src={require('../../images/index/u241.png')} />
              </a>
            </span>
          );
        },
      },
    ];
    const columns1 = [
      {
        title: '#',
        dataIndex: 'id',
        // fixed: 'left',
        // width: 50,
      },
      {
        title: '名称',
        dataIndex: 'dr_name',
      },
      {
        title: '作者',
        dataIndex: 'dr_user',
        // width: 100,
      },
      {
        title: '类目',
        dataIndex: 'dr_cata_two',
        // width: 100,
      },
      {
        title: '时间',
        dataIndex: 'dr_created_time',
        // width: 150,
      },
      {
        title: '查看',
        // dataIndex: 'id',
        // width: 50,
        render: record => {
          return (
            <span style={{ marginLeft: '0.5em' }}>
              <a onClick={() => (window.location.href = '#/./resource/check/video')}>
                <img src={require('../../images/index/u245.png')} />
              </a>
            </span>
          );
        },
      },
      {
        title: 'Action',
        // fixed: 'right',
        width: 60,
        render: record => {
          return (
            <span>
              <a onClick={() => (window.location.href = '#/./resource/check/video')}>
                <img src={require('../../images/index/u240.png')} />
              </a>
              <Divider type="vertical" />
              <a onClick={() => (window.location.href = '#/./resource/check/video')}>
                <img src={require('../../images/index/u241.png')} />
              </a>
            </span>
          );
        },
      },
    ];
    const columns2 = [
      {
        title: '#',
        dataIndex: 'id',
      },
      {
        title: '评论内容',
        dataIndex: 'comment_text',
      },
      {
        title: '评论人',
        dataIndex: 'user',
      },
      {
        title: '评论对象',
        dataIndex: 'object_info.name',
      },
      {
        title: '时间',
        dataIndex: 'comment_time',
        width: 147,
      },
      {
        title: '查看',
        render: record => {
          return (
            <span>
              <a onClick={() => (window.location.href = '#/./resource/comment/comment')}>
                <img src={require('../../images/index/u245.png')} />
              </a>
            </span>
          );
        },
      },
      {
        title: 'Action',
        align: 'center',
        width: 60,
        dataIndex: '',
        render: record => {
          return (
            <span>
              <a onClick={() => (window.location.href = '#/./resource/comment/comment')}>
                <img src={require('../../images/index/u240.png')} />
              </a>
              <Divider type="vertical" />
              <a onClick={() => (window.location.href = '#/./resource/comment/comment')}>
                <img src={require('../../images/index/u241.png')} />
              </a>
            </span>
          );
        },
      },
    ];
    var list = this.state.month;
    var color = ['#3AA0FF', '#4ECB73', '#675bba'];
    var option = {
      title: {
        text: '上传量与通过量统计',
      },
      color: color,
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['上传量', '通过量'],
      },
      xAxis: {
        data: this.state.monthd,
      },
      yAxis: {
        name: '人次',
      },
      series: [
        {
          type: 'bar',
          smooth: false, //是否平滑曲线显示
          name: '上传量',
          data: this.state.shangc,
          emphasis: {
            label: {
              show: true,
            },
          },
        },
        {
          type: 'bar',
          smooth: false, //是否平滑曲线显示
          name: '通过量',
          data: this.state.tongg,
          emphasis: {
            label: {
              show: true,
            },
          },
        },
      ],
    };
    var option1 = {
      title: {
        text: '上传量与通过量统计',
      },
      color: color,
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['上传量', '通过量'],
      },
      xAxis: {
        data: this.state.monthd,
      },
      yAxis: {
        name: '人次',
      },
      series: [
        {
          type: 'line',
          smooth: false, //是否平滑曲线显示
          name: '上传量',
          data: this.state.shangc,
          emphasis: {
            label: {
              show: true,
            },
          },
        },
        {
          type: 'line',
          smooth: false,
          name: '通过量',
          data: this.state.tongg,
          emphasis: {
            label: {
              show: true,
            },
          },
        },
      ],
    };
    return (
      <div>
        <div id={styles.user} className={styles.content}>
          <div className={styles.imgs}>
            <img src={require('../../images/index/u50.png')} />
          </div>
          <div className={styles.name}>
            <span>用户</span>
            <br />
            <span>{this.state.all.user_num}</span>
          </div>
        </div>
        <div id={styles.video} className={styles.content}>
          <div className={styles.imgs}>
            <img src={require('../../images/index/u54.png')} />
          </div>
          <div className={styles.name}>
            <span>视频</span>
            <br />
            <span>{this.state.all.video_num}</span>
          </div>
        </div>
        <div id={styles.text} className={styles.content}>
          <div className={styles.imgs}>
            <img src={require('../../images/index/u58.png')} />
          </div>
          <div className={styles.name}>
            <span>文档</span>
            <br />
            <span>{this.state.all.docs_num}</span>
          </div>
        </div>
        <div id={styles.school} className={styles.content}>
          <div className={styles.imgs}>
            <img src={require('../../images/index/u62.png')} />
          </div>
          <div className={styles.name}>
            <span>学校</span>
            <br />
            <span>{this.state.all.school_num}</span>
          </div>
        </div>
        <div className={styles.audit}>
          <div>
            <span className={styles.span1}>待审核</span>
            <div
              className={styles.link}
              onClick={() => (window.location.href = '#/./resource/check/video')}
            >
              <a>去审核>></a>
            </div>
            <br />
            <hr />
            <Tabs defaultActiveKey="1" onChange={key => this.callback(key)}>
              <TabPane tab="视频" key="1">
                <Table
                  bordered
                  rowKey="id"
                  size="small"
                  columns={columns}
                  dataSource={this.props.welcome.daishenhe.results}
                  pagination={{ pageSize: 5 }}
                  // scroll={{ x: 2000 }}
                />
              </TabPane>
              <TabPane tab="文档" key="2">
                <Table
                  bordered
                  rowKey="id"
                  size="small"
                  columns={columns1}
                  dataSource={this.props.welcome.daishenhe.results}
                  pagination={{ pageSize: 5 }}
                  // scroll={{ x: 2000 }}
                />
              </TabPane>
              <TabPane tab="评论" key="3">
                <Table
                  bordered
                  rowKey="id"
                  size="small"
                  columns={columns2}
                  dataSource={this.props.welcome.daishenhe.results}
                  pagination={{ pageSize: 5 }}
                  // scroll={{ x: 700 }}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className={styles.remind}>
          <span className={styles.span1}>提醒</span>
          <br />
          <span>【提问】朱莉 java-java环境搭建 回复</span>
          <br />
          <span>【练习】森迪 java-环境答辩练习 评分</span>
          <br />
        </div>
        <div className={styles.count}>
          <span className={styles.span1}>统计</span>
          <br />
          <div>
            <MonthPicker
              style={{ top: '2px' }}
              allowClear={false}
              defaultValue={moment(new Date(), 'YYYY/MM')}
              format={'YYYY-MM'}
              onChange={this.onChange}
              placeholder="Select month"
            />
            <div style={{ top: '2px', float: 'right', paddingRight: '2em' }}>
              {/* <span style={{ border: '0.5px solid #3AA0FF' }}>条形</span> */}
              <span
                onClick={() => {
                  this.setOption('bar');
                  this.onChangeSpan();
                  this.onChangeSpan(1);
                }}
                style={{
                  border: '0.5px solid #3AA0FF',
                  borderRightStyle: 'none',
                  backgroundColor: this.state.backgroundColor,
                  color: this.state.fontcolor,
                }}
              >
                &nbsp;条形&nbsp;
              </span>
              <span
                onClick={() => {
                  this.setOption('line');
                  this.onChangeSpan(1);
                  this.onChangeSpan();
                }}
                style={{
                  border: '0.5px solid #3AA0FF',
                  backgroundColor: this.state.backgroundColor1,
                  color: this.state.fontcolor1,
                }}
              >
                &nbsp;折线&nbsp;
              </span>
            </div>
          </div>
          <div>
            <ReactEcharts
              theme="light"
              style={{ display: !this.state.display ? 'block' : 'none' }}
              option={option1}
            />
            <ReactEcharts
              theme="light"
              style={{ display: this.state.display ? 'block' : 'none' }}
              option={option}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ welcome }) => ({ welcome }))(index);
