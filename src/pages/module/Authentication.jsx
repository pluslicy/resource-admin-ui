import React from 'react';
import styles from './module.less';
import AuthenticationForm from './AuthenticationForm'

import { connect } from 'dva';
import { Table, Button, Modal, Icon, Input, Form, Divider } from 'antd';

const { Search, TextArea } = Input;

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids:[],
      visible: false,
      form: {},
    };
  }

  // 在渲染前调用
	componentWillMount() {
		this.props.dispatch({type: 'authentication/findAll'})
  }
  
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  // 通过审核
	pass = (record) => {
		var data = {
			ids:[record.id]
    }
		console.log(data)
    
		this.props.dispatch({ type: 'authentication/passAll', payload: data });
  };
  
  // 批量一键通过
  passAll = () => {

    var data ={ 
      ids:this.state.ids,
    }
		console.log(data)
    this.props.dispatch({ type: 'authentication/passAll', payload: data})
    
    setTimeout(() => {
      this.setState({
        ids:[]
      })
    }, 100);
  };
  
  // 弹出拒绝理由
  reject = (record) => {
		this.setState({
      visible: true,
      ids:[record.id]
    });
	};
  // 关闭并提交拒绝理由
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  // 关闭拒绝理由
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  // 将子组件的引用在父组件中进行保存，方便后期调用
	saveFormRef = formRef => {
		this.formRef = formRef;
	};
	// 提交拒绝理由
	handleCreate = (record) => {
		this.setState({
			visible: false,
		});
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			if (!err) {
				console.log(this.state.id)
				var obj = {
					// "vr_audit_status": "2",//拒绝
					"ids": this.state.ids,
					"refuse_reason": values.test
				}
        this.props.dispatch({ type: 'authentication/reject', payload: obj})

			}
		});
	};
  // 双向绑定form
  // changeForm = e => {
  //   this.setState = {
  //     form: e.target.value,
  //   };
  // };

  render() {
    const columns = [
      { title: '作者', align: 'center', dataIndex: 'user' },
      { title: '作品', align: 'center', dataIndex: 'work_num' },
      { title: '赞', align: 'center', dataIndex: 'favor_num' },
      { title: '收藏', align: 'center', dataIndex: 'collect_num' },
      { title: '评论', align: 'center', dataIndex: 'comment_num' },
      { title: '浏览', align: 'center', dataIndex: 'times_num' },
      { title: '联系方式', align: 'center', dataIndex: 'user_phone' },
      { title: '申请角色', align: 'center', dataIndex: 'groupname' },
      { title: '申请理由', align: 'center', dataIndex: 'apply_reason' },
      {
				title: '状态',
				align: 'center',
				dataIndex: '',
				render: (record) => {
					if (record.apply_status === 1) {
						return (
							<div><span>已通过</span></div>
						);
					} else if (record.apply_status === 2) {
						return (
							<div><span>已拒绝</span></div>
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
				}
			}
		];
    const rowSelection = {
      selectedRowKeys:this.state.ids,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          ids:selectedRowKeys
        })
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    return (
      <div className={styles.content}>
        <div className="btns">
          {/* 表格 */}
          <Table
                size="small"
                rowKey="id"
								rowSelection={rowSelection}
								columns={columns}
								dataSource={this.props.authentication.authentications}
								pagination={{
									onChange: page => {
									  console.log(page);
									  let p = page - 1;
									  console.log(p);
									},
									total:this.props.authentication.authentications.count,
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
          <Button size="small" type="primary" onClick={this.passAll}>
            一键通过
          </Button>
        </div>
        {/* 表单 */}
        <AuthenticationForm
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
						</AuthenticationForm>
      </div>
    );
  }
}

export default connect(({ authentication }) => ({
	authentication,
}))(Authentication);