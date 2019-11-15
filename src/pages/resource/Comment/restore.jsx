import React from 'react';
import styles from './restore.less';
import moment from 'moment';
import { connect } from 'dva';
import { Button, Table, DatePicker, Input, Modal, Comment, Icon, Tooltip, Avatar, Divider, Select } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;
const tsIcon = require('../video.png');

class Check extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			ids: [],
			page: 1,
			date: ['', ''],
			name: [],
			pathurl:"",
		}
	}

	componentWillMount() {
		this.props.dispatch({
			type: 'restore/findAllReply',
			payload: {
				page: 1,
				pageSize: 10,
			}
		});
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
		this.props.dispatch({ type: 'restore/fetchCheck', payload: obj });
	};
	//评论拒绝审核
	reject = record => {
		var obj = {
			comment_status: '2', //拒绝
			id: record.id,
		};
		this.props.dispatch({ type: 'restore/fetchCheck', payload: obj });
	};

	// 一键通过
	passAll = () => {
		var data = {
			comment_status: 1, //通过
			ids: this.state.ids,
		}
		console.log(data)
		this.props.dispatch({
			type: 'restore/batchPass',
			payload: data,
		})

		setTimeout(() => {
			this.setState({
				ids: []
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
		this.props.dispatch({ type: 'restore/findByCondidtions', payload: values });
	};

	// 名称搜索框
	onSearch = (value) => {
		this.setState({
			name: value,
		});
		var values = [this.state.date, value];
		this.props.dispatch({ type: 'restore/findByCondidtions', payload: values });
	}

	handleCancel = e => {
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
			pathurl:record.object_infor.path,
		});
		this.props.dispatch({ type: 'restore/findReplyById', payload: record.id });
	};
	// 改变多选框
	onSelectChange = (selectedRowKeys, e) => {
		this.setState({
			selectedRowKeys: selectedRowKeys,
		});
	};

	render() {
		// const { likes, dislikes, action,selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys: this.state.ids,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					ids: selectedRowKeys
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
							<div>
								<span style={{color:"red"}}>已拒绝</span>
							</div>
							// <div>
							// 	<Select defaultValue={"已拒绝"} style={{ border: "none", color: "red" }}>
							// 		<Option value={1} onClick={this.pass.bind(this, record)}>通过</Option>
							// 	</Select>
							// </div>
						);
					} else {
						return (
							<span>
								<a onClick={this.pass.bind(this, record)}>通过</a>
								<Divider type="vertical" />
								<a style={{ color: 'red' }} onClick={this.reject.bind(this, record)}>
									拒绝</a>
							</span>
						);
					}
				},
			},
		];

		return (
			<div className={styles.content}>
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
						// bordered
						rowSelection={rowSelection}
						columns={columns}
						dataSource={this.props.restore.restores}
						pagination={{
							onChange: page => {
								this.props.dispatch({
									type: "restore/findAllReply",
									payload: {
										page: page,
										pageSize: 10,
									}
								})
								this.setState({
									page: page
								})
							},
							total: this.props.restore.restores.count,
							pageSize: 10,
							size: 'small',

							hideOnSinglePage: false,
							itemRender: (current, type, originalElement) => {
								if (type === 'prev') {
									return <Button size="small" style={{ marginRight: "1em" }}>上一页</Button>;
								}
								if (type === 'next') {
									return <Button size="small" style={{ marginLeft: "1em" }}>下一页</Button>;
								}
								return originalElement;
							},
						}}
					/>
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
						<source src={this.state.pathurl} />
					</video>

					{this.props.restore.replay.map((item)=>{
						if(item!=undefined){
							return <Comment
							author={<a>{item.username!=undefined?item.username:""}</a>}
							avatar={
								<Avatar
									src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
									alt={item.username!=undefined?item.username:""}
								/>
							}
							content={
								<p>
									{item.comment_text!=undefined?item.comment_text:""}
								</p>
							}
							datetime={
								<Tooltip title={item.comment_time!=undefined?item.comment_time:""}>
								<span>{item.comment_time!=undefined?item.comment_time:""}</span>
								</Tooltip>
							}
						/>
						}
					})}
					
				</Modal>
			</div>
		)
	}
}

export default connect(({ restore }) => ({
	restore,
}))(Check);