import React from 'react';
import { Button, Radio, Table, Modal, Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;
class bangDan extends React.Component {
	state = {
		value: 1,
	};

	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};

	// 开启模态框
	showModal = () => {
		this.setState({
			visible: true,
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

	render() {
		const columns = [
			{
				title: '#',
				// dataIndex: 'grade',
			},
			{
				title: '名称',
				// dataIndex: 'clazz',
			},
			{
				title: '作者',
				// dataIndex: 'coursename',
			},
			{
				title: '方向',
				// dataIndex: 'teacher',
			},
			{
				title: '技术',
				// dataIndex: 'survey',
			},
			{
				title: '赞',
				// dataIndex: 'date',
			},
			{
				title: '收藏',
				// dataIndex: 'status',
			},
			{
				title: '评论',
				// dataIndex: 'id',
			},
			{
				title: '浏览',
				// dataIndex: 'id',
			},
			{
				title: '日期',
				// dataIndex: 'id',
			},
			{
				title: 'Action',
				render: record => { },
			},
		];

		const columns1 = [
			{
				title: '1.',
				// dataIndex: 'grade',
			},
			{
				title: 'JavaEE教程',
				// dataIndex: 'clazz',
			},
			{
				title: '↑ ↓',
				// dataIndex: 'coursename',
			},
			{
				title: '×',
				// dataIndex: 'teacher',
			},
		];
		const columns2 = [
			{
				title: '#',
				// dataIndex: 'grade',
			},
			{
				title: '名称',
				// dataIndex: 'clazz',
			},
			{
				title: '作者',
				// dataIndex: 'coursename',
			},
			{
				title: '方向',
				// dataIndex: 'teacher',
			},
			{
				title: '技术',
				// dataIndex: 'survey',
			},
			{
				title: '日期',
				// dataIndex: 'id',
			},
		];

		return (
			<div style={{ padding: '1em', backgroundColor: '#ffffff', borderRadius: '5px' }}>
				<a><span style={{ fontSize: '20px'}}>文档</span></a>
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
						// dataSource={this.props.create.creates}
						scroll={{ x: 1300 }}
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
					<div style={{ display: 'inline-block' }}>
						<div style={{ width: '100%', height: '100%' }}>
							自定义榜单(5项)
              <br />
							<Table
								bordered
								rowKey="id"
								size="small"
								columns={columns1}
							// dataSource={this.props.create.creates}
							/>
							<span style={{ color: 'red' }}>不能选择更多了!!!</span>
						</div>
					</div>
					<div style={{ display: 'inline-block', marginLeft: '2em' }}>
						<Search
							placeholder="请输入搜索内容"
							onSearch={value => console.log(value)}
							style={{ width: 200 }}
						/>
						<br />
						<span>权限</span>
						<Select defaultValue="全部" style={{ width: 120 }} 
							style={{ marginTop:'1em',marginBottom: '1em', }}
							/>
						<span>格式</span>
						<Select defaultValue="专辑" style={{ width: 120 }} />
						<span>状态</span>
						<Select defaultValue="全部" style={{ width: 120 }} />
						<Radio>按时间</Radio>
						<Radio>按热度</Radio>
						<Table bordered rowKey="id" size="small" columns={columns2} />
					</div>
				</Modal>
			</div>
		);
	}
}

export default bangDan;
