import React from 'react';
import styles from './video.less';
import { connect } from 'dva';


import { Button, Table, Icon, DatePicker,Input,Divider,Modal   } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;

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
componentWillMount(){
	this.props.dispatch({ type: 'word/findAll' })
}


onChange=(date, dateString)=> {
  	console.log(date, dateString);
}
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
// 弹出详细文档
showVideo = () => {
    this.setState({
      visible2: true,
    });
  };
// 一件通过
passAll=()=>{
	alert(this.state.selectedRowKeys)
}

//通过
pass(check) {
    this.setState({
      visible: false,
    });
    check.vr_audit_status = '0';
    let s = { id: check.id, vr_audit_status: 0 };
    this.props.dispatch({ type: 'word/fetchCheck', payload: s });
  }
  // 关闭拒绝理由
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
		console.log('Received values of form: ', values);
		this.props.dispatch({ type: 'word/fetchCheck', payload: values });		
      }
    });
  };
  // 双向绑定form
  changeForm = e => {
    this.setState = {
      form: e.target.value,
    };

  };

render(){
	const { selectedRowKeys } = this.state;
	const rowSelection = {
	selectedRowKeys,
	onChange: this.onSelectChange,
	hideDefaultSelections: true,
	};
	const columns = [
		{ title: '名称', align: 'center', dataIndex: 'dr_name' },
		{ title: '作者', align: 'center', dataIndex: 'da.user', },
		{ title: '方向', align: 'center', dataIndex: 'dr_cata_one', },
		{ title: '技术', align: 'center', dataIndex: 'dr_cata_two', },
		{ title: '类型', align: 'center', dataIndex: 'dr_owner', },
		{ title: '权限', align: 'center', dataIndex: 'dr_permission', },
		{ title: '日期', align: 'center', dataIndex: 'dr_created_time', },
		{ title: '描述', align: 'center', dataIndex: 'dr_audit_decs', },
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
					<span style={{ color: 'red' }}>已拒绝</span>
				</div>
				);
			} else {
				return (
				<span>
					<a onClick={this.pass.bind(this, check)}>通过</a>
					<Divider type="vertical" />
					<a style={{ color: 'red' }} onClick={this.reject}>拒绝</a>
				</span>
				)
			}
			},
		},
		];

	let { check } = this.props.word;

	return (
		<div className={styles.content}>
		<div className={styles.content_top}>
		<RangePicker onChange={this.onChange} style={{ width: 300}} />
		<Search
			onSearch={value => console.log(value)}
			style={{ width: 200 }}
		/>

	</div>
	<div>
	<Table
		size="small"
		bordered
		rowSelection={{ rowSelection, columnTitle: '#' }}
		columns={columns}
		dataSource={this.props.word.words}
		/>
	</div>
	<div className={styles.content_bottom}>
		<Button size="small" type="primary" onClick={this.passAll}>一键通过</Button>
	</div>
	<Modal
		  width={900}
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
        >
		   <iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' 
		//    width='100%' height='100%' frameborder='1'>
			style={{width:'100%',height:'100%'}} frameborder='1'>
		   </iframe>
	</Modal>
	<Modal
          title="拒绝的理由"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          {/* <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <TextArea autosize={{ minRows: 6, maxRows: 10 }} onChange={this.changeForm} />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                Log in111
          </Button>
            </Form.Item>
          </Form> */}
        </Modal>
	</div>
    )
  }
}

export default connect(({ word }) => ({
	word,
  }))(Check);