import React from 'react';
import styles from './module.less';
import { connect } from 'dva';

import { Table, Button, Modal, Icon, Input, Form, Divider } from 'antd';

const { Search, TextArea } = Input;

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
		var obj = {
			"apply_status": "1",//通过
			"id": record.id,
		}
		// this.props.dispatch({ type: 'video/fetchCheck', payload: obj });
	};
  // 批量一键通过
	passAll = () => {
		var data = global.constants.ids
		console.log(data)
		this.props.dispatch({ type: 'authentication/pass', payload: data})
  }
  
  // 弹出拒绝理由
  reject = (record) => {
		this.setState({
			visible: true,
			id: record.id
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
  // 双向绑定form
  changeForm = e => {
    this.setState = {
      form: e.target.value,
    };
  };

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
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div className={styles.content}>
        <div className="btns">
          {/* 表格 */}
          <Table
								size="small"
								// bordered
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
        <Modal
          title="拒绝的理由"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item label="">
              <TextArea autosize={{ minRows: 6, maxRows: 10 }} onChange={this.changeForm} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(({ authentication }) => ({
	authentication,
}))(Authentication);