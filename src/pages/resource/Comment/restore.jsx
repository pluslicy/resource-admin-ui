import React from 'react';
import styles from './comment.less';
import moment from 'moment';
import { Button, Table, DatePicker,Input,Modal,Comment, Icon, Tooltip, Avatar} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;
const tsIcon = require('../video.png');
class Check extends React.Component {
	constructor(props){
		super(props);
		this.state={
			visible:false,
			restore:{},
			likes: 0,
			dislikes: 0,
			action: null,
			selectedRowKeys:[]
		}
	}
	// 改变多选框
	onSelectChange = (selectedRowKeys, e) => {
	    this.setState({
	      selectedRowKeys: selectedRowKeys,
	    });
	  };
	like = () => {
		this.setState({
		  likes: 1,
		  dislikes: 0,
		  action: 'liked',
		});
	  };
	
	  dislike = () => {
		this.setState({
		  likes: 0,
		  dislikes: 1,
		  action: 'disliked',
		});
	  };
	  // 一件通过
	passAll=()=>{
		alert(this.state.selectedRowKeys)
	}
	onChange=(date, dateString)=> {
	console.log(date, dateString);
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
  showModal = (record) => {
    this.setState({
	  visible: true,
	  restore:record
	});
	
  };
  render(){

	const { likes, dislikes, action,selectedRowKeys } = this.state;
	// const { likes, dislikes, action } = this.state;

    const actions = [
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
	
    ];


  	const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
    };
  	
  	const columns = [
		  {
		    title: '内容',
		    dataIndex: 'key',
		    align: 'center',
		   
		  },
		  {
		    title: '来自',
		    align: 'center',
		    dataIndex: 'author',
		  },
		  {
		    title: '被回复作品',
		    align: 'center',
			dataIndex: 'address',
			render:(text,record)=>{
				return (
					<div>
					<span>{text}</span>
					<Icon style={{marginLeft:"3px"}} type="eye" onClick={this.showModal.bind(this,record)}></Icon></div>
				)
			}
		  },
		   {
		    title: '时间',
		    align: 'center',
			dataIndex: 'jishu',
			
		  },
		  {
		    title: '状态',
		    align: 'center',
		    dataIndex: '',
		    render: (text, record) => {
	        	return (
	            <div>
	              <Icon className={styles.iconPass} title="通过" type="check-circle" />
	              <Icon className={styles.iconStop} title="拒绝" type="stop" />
	            </div>
	          );
	        },
		  },
		];
		const data = [
		  {
		  	id:1,
		    key: '这是评论的内容',
		    author:'John Brown',
		    address: 'PHP手册',
		    jishu:'2019-01-02',
		  },
		  {
		  	id:2,
		    key: '这是评论的内容',
		    author:'John Brown',
		    address: 'PHP手册',
		    jishu:'2019-01-02',
		  },
		  {
		  	id:3,
		    key: '这是评论的内容',
		    author:'John Brown',
		    address: 'PHP手册',
		    jishu:'2019-01-02',
		  },
		  {
		  	id:4,
		    key: '这是评论的内容',
		    author:'John Brown',
		    address: 'java手册',
		    jishu:'2019-01-02',
		  },
		  
		];

    return (
      <div className={styles.content}>
		<div className={styles.content_top}>
        <RangePicker onChange={this.onChange} style={{ width: 300}} />
        <Search
	      onSearch={value => console.log(value)}
		  style={{ width: 200 }}
		  placeholder="请输入搜索内容"
	    />

		</div>
		<div>
			<Table rowKey="id"  size="small" bordered rowSelection={rowSelection} columns={columns} dataSource={data} />
		</div>
		<div className={styles.content_bottom}>
			<Button size="small" type="primary" onClick={this.passAll}>一键通过</Button>
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
		<Comment
				
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
			/>
        </Modal>
      </div>
    )
  }
}

export default Check;