import React from 'react';
import { Form, Modal, Input, Select } from 'antd';
import { connect } from 'dva';
const { Option } = Select;

// 视频拒绝通过表单
class VideoForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const formLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		// 父组件传递给子组件值
		const { visible, onCancel, onCreate, form, create } = this.props;
		const { getFieldDecorator } = form;
		// 将表单中没有出现的值做一个双向数据绑定
		getFieldDecorator('id');
		return (
			<Modal visible={visible} title="拒绝的理由" okText="拒绝" onCancel={onCancel} onOk={onCreate}>
				<Form layout="vertical" {...formLayout}>
					<Form.Item label="拒绝的理由">
						{getFieldDecorator('test', {
							rules: [{ required: true, message: '该项不能为空!' }],
						})(
						<Input></Input>
						)}
					</Form.Item>
					{getFieldDecorator('test')}
				</Form>
			</Modal>
		);
	}
}

export default connect(
	({ create }) => ({
		create,
	})
)(
	Form.create({
	})(VideoForm),
);
