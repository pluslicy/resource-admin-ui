import React from 'react';
import { Button, Radio, Table, Input, Menu, Dropdown, Icon, Modal, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;
class Recommend extends React.Component {
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
				// dataIndex: 'grade',
			},
			{
				title: '作者',
				// dataIndex: 'coursename',
			},
			{
				title: '作品',
				// dataIndex: 'teacher',
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
				title: '朱莉',
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
				title: '作者',
				// dataIndex: 'coursename',
			},
			{
				title: '作品',
				// dataIndex: 'teacher',
			},
			{
				title: '赞',
				// dataIndex: 'survey',
			},
			{
				title: '收藏',
				// dataIndex: 'id',
			},
			{
				title: '评论',
				// dataIndex: 'id',
			},
			{
				title: '浏览',
				// dataIndex: 'id',
			},
		];

		return (
			<div style={{ padding: '1em', backgroundColor: '#ffffff', borderRadius: '5px' }}>
				<span>
					当前以
          <Input style={{ width: '2%' }} size="small" defaultValue="1" disabled />
					级编目作为推荐分类
        </span>
				&nbsp;
        <Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						设置
            <Icon type="down" />
					</a>
				</Dropdown>
				<br />
				<a>
					<span style={{ fontSize: '20px' }}>JavaEE企业级开发</span>
				</a>
				<a>
					<span style={{ fontSize: '20px', marginLeft: '1em' }}>人工智能Pytoon全栈</span>
				</a>
				<a>
					<span style={{ fontSize: '20px', marginLeft: '1em' }}>H5全栈开发</span>
				</a>
				<br />
				<hr />
				<Button onClick={this.showModal} style={{ marginBottom: '1em' }}>自定义推荐</Button>
				<Radio.Group
					style={{ marginBottom: '0.5em', marginLeft: '0.5em' }}
					onChange={this.onChange}
					value={this.state.value}
				>
					<Radio value={1}>按赞</Radio>
					<Radio value={2}>按评论</Radio>
					<Radio value={3}>按收藏</Radio>
					<Radio value={4}>按浏览</Radio>
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
							自定义推荐(6项)
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
							placeholder="请输入作者名称"
							onSearch={value => console.log(value)}
							style={{ width: 200 }}
						/>
						<br />
						<Radio style={{ marginTop: '1em', marginBottom: '1em' }}>按热度</Radio>
						<Table bordered rowKey="id" size="small" columns={columns2} />
					</div>
				</Modal>
			</div>
		);
	}
}

export default Recommend;
