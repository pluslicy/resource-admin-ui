import React from 'react';
import { Form, Input, Radio, Select, Modal, Table, Icon, Button } from 'antd';
import style from './Privilege.less';
import { connect } from 'dva';
var arr = [];
var data = {};

class Privilege extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
  }

  addOption = () => {
      let obj = {
        label: '',
        name: '',
      };
      arr.push(obj);
      this.setState({
        options: arr,
      });
  };
  
  render() {
    // table第一列选框
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    // table第一行
    const columns = [
      {
        title: '权限名称',
        dataIndex: 'label',
        render: (text, record) => {
          return (
            <div>
              <Input value='添加权限名称' />
            </div>
          );
        },
      },
      {
        title: '描述',
        dataIndex: 'name',
        render: (text, record) => {
          return (
            <div>
              <Input value='这是一段描述' />
            </div>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'score',
        render: (text, record) => {
          return (
            <div>
              <Button type='primary'>确认</Button>
            </div>
          );
        },
      }
    ];
    const { getFieldDecorator } = this.props.form;
    //将id添加到双向数据绑定里，并不做其他的修饰
    getFieldDecorator('id');
    return (
      <div className={style.Back}>
        <Form onSubmit={this.handleSubmit}>
          <Button type="primary" onClick={this.addOption} className={style.btn}>
            添加
          </Button>
          <Form.Item>
            {getFieldDecorator('options', {
              rules: [{}],
            })(
              <Table
                size="small"
                pagination={false}
                rowKey="label"
                bordered
                columns={columns}
                rowSelection={rowSelection}
                dataSource={this.state.options}
              />,
            )}
          </Form.Item>
        </Form>
        <Button className={style.btn} type='default'>启用</Button>
        <Button className={style.btn} type='primary'>冻结</Button>
        <Button type='danger'>删除</Button>
      </div>
    );
  }
}
//设置表单数据的默认值
const mapPropsToFields = props => {
  let obj = {};
  data = props.initData;
  for (let key in props.initData) {
    let val = props.initData[key];
    obj[key] = Form.createFormField({ value: val });
  }
  return obj;
};
export default connect()(
  Form.create({
    mapPropsToFields,
  })(Privilege),
);
