import React from 'react';
import styles from './comment.less';
import moment from 'moment';
import { connect } from 'dva';

import { Button, Table, DatePicker, Input, Modal, Comment, Icon, Tooltip, Avatar, Divider } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;

class Check extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			selectedRowKeys: [],
		}
	}

	componentWillMount() {
		this.props.dispatch({ type: 'comment/findAllComment' })
	}

	onChange = (date, dateString) => {
		console.log(date, dateString);
	}
	// 一键通过
	passAll = () => {
		alert(this.state.selectedRowKeys)
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
			restore: record
		});

	};
	// 改变多选框
	onSelectChange = (selectedRowKeys, e) => {
		this.setState({
			selectedRowKeys: selectedRowKeys,
		});
	};
	render() {
		const {selectedRowKeys } = this.state;
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows, record) => {
				//遍历selectedRows拿到id集合
				global.constants.ids = [];
				for (let i = 0; i < selectedRows.length; i++) {
					let { id } = selectedRows[i];
					global.constants.ids.push(id);
				}
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
							<Icon style={{ marginLeft: "3px" }} type="eye" onClick={this.showModal.bind(this, record)}></Icon></div>
					)
				}
			},
			{ title: '时间', align: 'center', dataIndex: 'comment_time' },
			{
				title: '状态',
				align: 'center',
				dataIndex: 'comment_status',
				render: (text, record) => {
					return (
						<span>
							<a>通过</a>
							{/* <a onClick={this.pass.bind(this, record)}>通过</a> */}
							<Divider type="vertical" />
							<a style={{ color: 'red' }}>拒绝</a>
						</span>
					);
				},
			},
		];
		console.log(this.props.comment)

		return (
			<div className={styles.content}>
				<div className={styles.content_top}>
					<RangePicker onChange={this.onChange} style={{ width: 300 }} />
					<Search
						onSearch={value => console.log(value)}
						style={{ width: 200 }}
						placeholder="请输入搜索内容"
					/>
				</div>
				<div>

					<Table
						// rowKey="id" 
						size="small"
						bordered
						rowSelection={rowSelection}
						columns={columns}
						dataSource={this.props.comment.comments}
					/>
				</div>
				<div className={styles.content_bottom}>
					<Button size="small" type="primary" onClick={this.passAll.bind(this)}>一键通过</Button>
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
			</div>
		)
	}
}

export default connect(({ comment }) => ({
	comment,
}))(Check);