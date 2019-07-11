import React from 'react';
import styles from './module.less'
import { Table,Menu, Dropdown, Icon, Modal,Button } from 'antd';

class News extends React.Component {
 
  constructor(props){
    super(props);
    this.state={
      visible: false
    }
  }

  // 更换模态框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render(){
     //下拉菜单
     const menu = (
      <Menu style={{width:200,height:300}}>
        
      </Menu>
    );
    // 表格
    const columns = [
      { title: '栏目', dataIndex: '' },
      { title: '作品', dataIndex: '' },
      { title: '预览图', dataIndex: '' },
      { title: '作者', dataIndex: '' },
      { title: '收藏', dataIndex: '' },
      { title: '评论',dataIndex: '',},
      { title: '浏览', dataIndex: '' },
      { 
        title: 'Action',
        fixed:'right',
        width:100,
        render: () => {
          return (
            <div>
               <a onClick={this.showModal}> 更换</a>
               <Modal
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="submit" type="primary" onClick={this.handleOk} style={{width:200,height:30}}>
                    完成
                  </Button>,
                ]}
              >
                
              </Modal>
            </div>
          );
        },
      },
    ];
    const data = [{}];
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
        <div className='btns'>
          {/* 下拉菜单 */}
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            设置栏目编目<Icon type="down" />
          </a>
        </Dropdown><br/>,
          {/* 表格 */}
          <Table 
          bordered
          size='small'
          scroll={{ x: 1000 }}
          rowSelection={{rowSelection,columnTitle:'#',fixed:'left'}} 
          columns={columns} 
          dataSource={data} />,
        </div>
        
      </div>
    )
  }
}

export default News;