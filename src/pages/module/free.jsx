import React from 'react';
import {
  Button,
  Table,
  Modal,
  Radio,
  Menu,
  Form,
  Tabs,
  menu1,
  Dropdown,
  Icon,
  Input,
  Select,
  Tree,
} from 'antd';

const { Option } = Select;
const { TreeNode } = Tree;
const { TabPane } = Tabs;
const { confirm } = Modal;

import styles from './free.less';
import { connect } from 'dva';

class Free extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      value: '',
      page:1,
      type:"",
      id:""
    };
  }

  // 添加视频模态框
  showModal = () => {
    this.setState({
      groups:[],
      visible: true,
    });
  };
  
  handleOkModal  = e => {
    var arr = [];
    console.log("hhhh",this.state.groups);
    this.state.groups.forEach(item => {
      var obj = {};
      obj.object_id = item;
      obj.object_type = "video";
      arr.push(obj);
    });
    console.log(arr);
    this.props.dispatch({
      type: 'free/addFreeVideo',
      payload: arr
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      groups: [],
      visible: false,
    });
  };

  handleChange(value) {
    console.log(`selected ${value}`);
    console.log(this.state.groups)
    this.setState({
      groups: value,
    });
  }

  componentDidMount() {
    this.props.dispatch({
      type:'free/fetchAllFree',
    })
    this.props.dispatch({
      type:'free/feachList',
    })
  }


  render() {
    // 获取免费视频资源下拉框
    const children = [];
    for (let i = 0; i < this.props.free.frees.length; i++) {
      children.push(
        <Option value={this.props.free.frees[i].id} key={this.props.free.frees[i].id}>
          {this.props.free.frees[i].vr_name}
        </Option>,
      );
    }

   // table第一列选框
   const rowSelection = {
    selectedRowKeys:this.state.ids,
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        ids:selectedRowKeys
      })
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };
  // table第一行
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '作者',
      dataIndex: 'user',
    },
    {
        title: '方向',
        dataIndex: 'cata_catalogue',
    },
    {
        title: '技术',
        dataIndex: 'catalogue',
    },
    {
        title: '日期',
        dataIndex: 'create_time',
    },
   
  ];

    return (
      <div className={styles.content}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="免费资源推荐" key="1">
            {' '}
          </TabPane>
        </Tabs>
        <div className="btn1" style={{marginBottom:10}}>
          <Button type="primary" onClick={this.showModal} size="small">
            添加
          </Button>
          <Modal
            title="免费资源推荐"
            visible={this.state.visible}
            onOk={this.handleOkModal}
            onCancel={this.handleCancel}
          >
            <Select
              showArrow={true}
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择5个免费视频资源"
              value={this.state.groups}
              onChange={this.handleChange.bind(this)}
            >
              {children}
              
            </Select>
          </Modal>
        </div>
        <Table
              rowKey="id"
              size="small"
              width="400px"
              rowSelection={{rowSelection,columnTitle:"#"}} 
              columns={columns} 
              rowSelection={rowSelection} 
              dataSource={this.props.free.freeLists.slice(this.props.free.freeLists.length-5,this.props.free.freeLists.length)}
          />
      </div>
    );
  }
}

export default connect(({ free }) => ({
  free,
}))(Free);
