import React from 'react';
import { connect } from 'dva';
import { Button, Table, Icon } from 'antd';
import styles from './db.less';
import DbForm from './DbForm';

// 资源库
class Db extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }
  componentWillMount() {
    this.props.dispatch({ type: 'course/fetchCourses' });
  }
  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.props.dispatch({ type: 'course/changeVisible', payload: false });
  };

  // 确认按钮的事件处理函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({ type: 'course/saveOrUpdateCourse', payload: values });
    });
  };

  // 添加
  toAdd = () => {
    this.props.dispatch({ type: 'course/changeVisible', payload: true });
    this.setState({ form: {} });
  };
  // 修改
  toEdit = record => {
    this.setState({
      form: record,
    });
    this.props.dispatch({ type: 'course/changeVisible', payload: true });
  };

  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '课程名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <Icon type="edit" onClick={this.toEdit.bind(this, record)} />
            </div>
          );
        },
      },
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
        {/* 按钮 */}
        <div className="btns">
          <Button type="primary" onClick={this.toAdd}>
            添加
          </Button>
        </div>
        {/* 表格内容 */}
        <div>
          <Table
            bordered
            rowKey="id"
            size="small"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.course.courses}
          />
        </div>
        {/* 模态框 */}
        <DbForm
          initData={this.state.form}
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.course.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default connect(({ course }) => ({
  course,
}))(Db);
