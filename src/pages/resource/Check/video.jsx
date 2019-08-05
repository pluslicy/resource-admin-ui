import React from 'react';
import styles from './video.less';
import { connect } from 'dva';

import VideoForm from './VideoForm'

import { Button, Table, Icon, DatePicker, Input, Modal, Form, Divider } from 'antd';
import { stringify } from 'qs';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search, TextArea } = Input;

class Check extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			visible2: false,
			form: {},
			selectedRowKeys: [],
			date: '',
		};
	}
	componentWillMount() {
		this.props.dispatch({ type: 'video/findAll' })
	}
	//日期选择器
	onChange = (date, dateString) => {
		console.log(date, dateString);
		this.props.dispatch({ type: 'video/findAll', payload: dateString });
		this.setState({
			date: dateString,
		});

	};
	// 一键通过
	passAll = () => {
		alert(this.state.selectedRowKeys);
	};
	// 改变多选框
	onSelectChange = (selectedRowKeys, e) => {
		this.setState({
			selectedRowKeys: selectedRowKeys,
		});
	};
	// 弹出拒绝理由
	reject = () => {
		this.setState({
			visible: true,
		});
	};
	// 弹出详细视频
	showVideo = () => {
		this.setState({
			visible2: true,
		});
	};
	// 将子组件的引用在父组件中进行保存，方便后期调用
	saveFormRef = formRef => {
		this.formRef = formRef;
	};
	// 提交拒绝理由
	handleCreate = e => {
		e.preventDefault();
		this.setState({
			visible: false,
		});
		const form = this.formRef.props.form;
		console.log('--------' + form.validateFields)
		form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				// this.props.dispatch({ type: 'video/fetchCheck', payload: values });
			}
		});
	};
	// 关闭拒绝理由弹框
	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	// 关闭并提交视频
	handleOk2 = e => {
		console.log(e);
		this.setState({
			visible2: false,
		});
	};
	// 关闭视频模态框
	handleCancel2 = e => {
		console.log(e);
		this.setState({
			visible2: false,
		});
	};

	render() {
		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
			hideDefaultSelections: true,
		};

		const columns = [
			{ title: '名称', align: 'center', dataIndex: 'vr_name' },
			{ title: '作者', align: 'center', dataIndex: 'va.user', },
			{ title: '方向', align: 'center', dataIndex: 'vr_cata_one', },
			{ title: '技术', align: 'center', dataIndex: 'vr_cata_two', },
			{ title: '类型', align: 'center', dataIndex: 'vr_owner', },
			{ title: '权限', align: 'center', dataIndex: 'vr_permission', },
			{ title: '日期', align: 'center', dataIndex: 'vr_created_time', },
			{ title: '描述', align: 'center', dataIndex: 'vr_audit_decs', },
			{
				title: '查看',
				align: 'center',
				render: (text, record) => {
					return (
						<div>
							<Icon type="eye" onClick={this.showVideo} />
						</div>
					);
				},
			},
			{
				title: '状态',
				align: 'center',
				dataIndex: '',
				render: (record) => {

					if (record.vr_audit_status === 3) {
						return (
							<div>
								<span>已通过</span>
							</div>
						);
					} else if (record.vr_audit_status === 1) {
						return (
							<div>
								<span>已拒绝</span>
							</div>
						);
					} else {
						return (
							<span>
								<a>通过</a>
								<Divider type="vertical" />
								<a style={{ color: 'red' }} onClick={this.reject}>拒绝</a>
							</span>
						)
					}
				},
			},
		];

		return (
			<div className={styles.content}>
				<div className={styles.content_top}>
					<RangePicker onChange={this.onChange} style={{ width: 300 }} />
					<Search onSearch={value => console.log(value)} style={{ width: 200 }} />
				</div>
				<div>
					<Table
						size="small"
						bordered
						rowSelection={{ rowSelection, columnTitle: '#' }}
						columns={columns}
						dataSource={this.props.video.videos}
					/>
				</div>
				<div className={styles.content_bottom}>
					<Button size="small" type="primary" onClick={this.passAll}>
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
						<Form.Item >
							<Button htmlType={'submit'}>提交</Button>
						</Form.Item>
					</Form>
				</VideoForm>

				<Modal
					width={'900px'}
					visible={this.state.visible2}
					onOk={this.handleOk2}
					onCancel={this.handleCancel2}
				>
					<video width="100%" height="100%" controls>
						<source src="D:/a.mp4" type="video/mp4" />
					</video>
				</Modal>
			</div>
		);
	}
}

export default connect(({ video }) => ({
	video,
}))(Check);
