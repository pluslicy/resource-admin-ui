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

  componentWillMount(){
    this.props.dispatch({type:"privilege/fetchPrivi"})
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
        dataIndex: 'codename',
      },
      {
        title: '描述',
        dataIndex: 'name',
      },
      {
        title: '状态',
        dataIndex: 'state',
      }
    ];
 
    return (
      <div className={style.Back}>
         <Table
              rowKey="id"
              size="small"
              rowSelection={{rowSelection,columnTitle:"#"}} 
              columns={columns} 
              dataSource={this.props.privilege.privileges}
              />
      </div>
    );
  }
}
// //设置表单数据的默认值
// const mapPropsToFields = props => {
//   let obj = {};
//   data = props.initData;
//   for (let key in props.initData) {
//     let val = props.initData[key];
//     obj[key] = Form.createFormField({ value: val });
//   }
//   return obj;
// };
export default connect(({ privilege }) => ({
  privilege,
}))(Privilege);


