import React from 'react';
import styles from './video.less';
import WordForm from './WordForm'
import { connect } from 'dva';

import { Button, Table, Icon,Tabs, DatePicker, Input, Divider, Modal, Form } from 'antd';

const { TabPane } = Tabs;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;

global.constants = {
	//初始化批量删除id数组|全局变量
	ids: []
}

class Check extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			visible: false,
			visible2: false,
			form: {},
			selectedRowKeys: [],
			date: ['',''],
			name: [],
			pdfContent:'',
		};
	}
	componentWillMount() {
		this.props.dispatch({ 
			type: 'word/findAll',
			payload:{
				page:1,
				pageSize:10,
			}
		 })
	}
	//日期选择器
	onChange = (date, dateString) => {
		console.log(date, dateString);
		this.setState({
			date: dateString,
		});
		var values = [dateString, this.state.name];
		console.log(values)
		this.props.dispatch({ type: 'word/findByCondidtion', payload: values });
	};
	// 名称搜索框
	onSearch = (value) => {
		this.setState({
			name: value,
		});
		var values = [this.state.date, value];
		this.props.dispatch({ type: 'word/findByCondidtion', payload: values });
	}
	// 改变多选框
	onSelectChange = (selectedRowKeys, e) => {
		this.setState({
			selectedRowKeys: selectedRowKeys,
		});
	};

	// 弹出详细文档
	showWord = (record) => {
		this.setState({
			visible2: true,
			pdfContent:record.dr_url
		});
	};
	// 关闭并提交文档
	handleOk2 = e => {
		console.log(e);
		this.setState({
			visible2: false,
		});
	};
	// 关闭文档模态框
	handleCancel2 = e => {
		console.log(e);
		this.setState({
			visible2: false,
		});
	};
	// 一键通过
	passAll = () => {
		var data = global.constants.ids
		console.log(data)
		this.props.dispatch({ 
			type: 'word/passWord',
			payload: data,
			page:this.state.page,
            pageSize:10,
		})
	}

	// 文档通过审核
	pass = (record) => {
		var obj = {
			"dr_status": "1",//通过
			"id": record.id,
			"dr_audit_desc": "1"
		}
		this.props.dispatch({ type: 'word/fetchCheck', payload: obj });
	};

	// 弹出拒绝理由
	reject = (record) => {
		this.setState({
			visible: true,
			id: record.id
		});
	};
	// 将子组件的引用在父组件中进行保存，方便后期调用
	saveFormRef = formRef => {
		this.formRef = formRef;
	};
	// 提交拒绝理由
	handleCreate = () => {
		this.setState({
			visible: false,
		});
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				var obj = {
					"dr_status": "2",//拒绝
					"id": this.state.id,
					"dr_audit_desc": values.test
				}
			}
			this.props.dispatch({ type: 'word/fetchCheck', payload: obj });
		});
		form.resetFields();
	};
	// 关闭拒绝理由
	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
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
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			}
		};
		const columns = [
			{ title: '名称', align: 'center', dataIndex: 'dr_name' },
			{ title: '作者', align: 'center', dataIndex: 'da.user', },
			{ title: '方向', align: 'center', dataIndex: 'dr_cata_one', },
			{ title: '技术', align: 'center', dataIndex: 'dr_cata_two', },
			{ title: '类型', align: 'center', dataIndex: 'dr_owner', },
			{ title: '权限', align: 'center', dataIndex: 'dr_permission', },
			{ title: '日期', align: 'center', dataIndex: 'dr_created_time', },
			{ title: '描述', align: 'center', dataIndex: 'dr_audit_desc', },
			{
				title: '查看',
				align: 'center',
				render: (text, record) => {
					return (
						<div>
							<Icon type="eye" onClick={this.showWord.bind(this, record)} />
						</div>
					);
				},
			},
			{
				title: '状态',
				align: 'center',
				dataIndex: '',
				render: (record) => {

					if (record.dr_status === 1) {
						return (
							<div>
								<span>已通过</span>
							</div>
						);
					} else if (record.dr_status === 2) {
						return (
							<div>
								<span style={{ color: 'red' }}>已拒绝</span>
							</div>
						);
					} else {
						return (
							<span>
								<a onClick={this.pass.bind(this, record)}>通过</a>
								<Divider type="vertical" />
								<a style={{ color: 'red' }} onClick={this.reject.bind(this, record)}>拒绝</a>
							</span>
						)
					}
				},
			},
		];

		return (
			<div className={styles.content_word}>
				<div className={styles.content_top}>
					<RangePicker onChange={this.onChange} style={{ width: 300 }} />
					<Search
						onSearch={value => this.onSearch(value)}
						style={{ width: 200 }}
						placeholder={'根据名称搜索'} />
				</div>
				<div>
					<Table
						rowKey="id"
						size="small"
						// bordered
						rowSelection={rowSelection}
						columns={columns}
						dataSource={this.props.word.words}
						pagination={{
							onChange: page => {
							  console.log(page);
							  // let p = page - 1;
							  // console.log(p);
							  this.props.dispatch({
								type:"word/findAll",
								payload:{
								  page:page,
								  pageSize:10,
								}
							  })
							  this.setState({
								page:page
							  })
							},
							total:this.props.word.words.count,
							pageSize: 10,
							size:'small',
							
							hideOnSinglePage: false,
							itemRender: (current, type, originalElement) => {
							  if (type === 'prev') {
								return <Button size="small" style={{marginRight:"1em"}}>上一页</Button>;
							  }
							  if (type === 'next') {
								return <Button size="small" style={{marginLeft:"1em"}}>下一页</Button>;
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
				<WordForm
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
				</WordForm>
				<Modal
					width={900}
					visible={this.state.visible2}
					onOk={this.handleOk2}
					onCancel={this.handleCancel2}
				>
					<iframe src={this.state.pdfContent}
						style={{ width: '100%', height: '600px', }} frameborder='1'>
					</iframe>
				</Modal>
			</div>
		)
	}
}

export default connect(({ word }) => ({
	word,
}))(Check);