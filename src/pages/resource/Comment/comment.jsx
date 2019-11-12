import React from 'react';
import styles from './comment.less';
import moment from 'moment';
import { connect } from 'dva';
import Restore from './Restore';

import {
  Button,
  Table,
  DatePicker,
  Input,
  Modal,
  Comment,
  Icon,
  Menu,
  Dropdown,
  Tooltip,
  Avatar,
  Divider,
  Select,
  Tabs
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ids:[],
      date: ['',''],
			name: []
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'comment/findAllComment' });
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  //评论通过审核
  pass = record => {
    var obj = {
      comment_status: '1', //通过
      id: record.id,
    };
    this.props.dispatch({ type: 'comment/fetchCheck', payload: obj });
  };
  //评论拒绝审核
  reject = record => {
    var obj = {
      comment_status: '2', //拒绝
      id: record.id,
    };
    this.props.dispatch({ type: 'comment/fetchCheck', payload: obj });
  };

  // 一键通过
  passAll = () => {
    // alert(this.state.selectedRowKeys);
    var data ={ 
      comment_status: 1, //通过
      ids:this.state.ids,
    }
		console.log(data)
    this.props.dispatch({ type: 'comment/batchPass', payload: data })
    
    setTimeout(() => {
      // console.log("1111")
      this.setState({
        ids:[]
      })
    }, 100);
  };
  
  //日期选择器
	onChange = (date, dateString) => {
		console.log(date, dateString);
		this.setState({
			date: dateString,
		});
		var values = [dateString, this.state.name];
		console.log(values)
		this.props.dispatch({ type: 'comment/findByCondidtion', payload: values });
  };

  // 名称搜索框
	onSearch = (value) => {
		this.setState({
			name: value,
		});
		var values = [this.state.date, value];
		this.props.dispatch({ type: 'comment/findByCondidtion', payload: values });
	}

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  showModal = record => {
    this.setState({
      visible: true,
      restore: record,
    });
  };
  // 改变多选框
  onSelectChange = (selectedRowKeys, e) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
    });
  };

  render() {
    const rowSelection = {
      selectedRowKeys:this.state.ids,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ids:selectedRowKeys
        })
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };
	
    const columns = [
      { title: '内容', align: 'center', dataIndex: 'comment_text' },
      { title: '来自', align: 'center', dataIndex: 'user' },
      {
        title: '被回复作品',
        align: 'center',
        dataIndex: 'object_infor.name',
        render: (text, record) => {
          return (
            <div>
              <span>{text}</span>
              <Icon
                style={{ marginLeft: '3px' }}
                type="eye"
                onClick={this.showModal.bind(this, record)}
              ></Icon>
            </div>
          );
        },
      },
      { title: '时间', align: 'center', dataIndex: 'comment_time' },
      {
        title: '状态',
        align: 'center',
        dataIndex: '',
        render: record => {
          if (record.comment_status === 1) {
            return (
              <div>
                <span>已通过</span>
              </div>
            );
          } else if (record.comment_status === 2) {
            return (
              <div style={{width:"75px",marginLeft:"20px",height:"20px",overflow:"hidden"}}>
                <Select defaultValue={"已拒绝"} style={{ width:"100px",marginLeft:"-12px",marginTop:"-5px",color:"red"}}>
                    <Option value={1} onClick={this.pass.bind(this, record)}>通过</Option>
                  </Select>
              </div>
            );
          } else {
            return (
              <span>
                <a onClick={this.pass.bind(this, record)}>通过</a>
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
        <Tabs defaultActiveKey="1" >
					<TabPane tab={'评论 (' + this.props.comment.comments.count + ')'} key='1'>
            <div className={styles.content_top}>
              <RangePicker onChange={this.onChange} style={{ width: 300 }} />
              <Search
                onSearch={value => this.onSearch(value)}
                style={{ width: 200 }}
                placeholder="请输入姓名"
              />
            </div>
            <div>
              <Table
                rowKey="id"
                size="small"
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.comment.comments}
              />
            </div>
            <div className={styles.content_bottom}>
              <Button size="small" type="primary" onClick={this.passAll.bind(this)}>
                一键通过
              </Button>
            </div>
            <Modal
              width={'900px'}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <video width="100%" height="70%" controls>
                <source src="D:/a.mp4" type="video/mp4" />
              </video>
              {/* <Comment

                author={<a>{this.state.restore.author}</a>}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt={this.state.restore.author}
                  />
                }
                content={
                  <p>
                    {this.state.restore.key}
                  </p>
                }
                datetime={
                  <Tooltip title={this.state.restore.jishu}>
                    <span>{this.state.restore.jishu}</span>
                  </Tooltip>
                }
              /> */}
            </Modal>
            </TabPane>
					{/* <TabPane tab={'回复 (' + this.props.word.words.count + ')'} key='2'> */}
					<TabPane tab={'回复 (' + 4 + ')'} key='2'>
						 <Restore  treekey={this.state.treekey}></Restore>
					</TabPane>
				</Tabs>,
      </div>
    );
  }
}

export default connect(({ comment }) => ({
  comment,
}))(Check);
