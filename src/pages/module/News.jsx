import React from 'react';
import styles from './module.less'
import { Table,Menu, Dropdown, Icon, Modal,Button,Input,Radio,Select,Checkbox  } from 'antd';

const { Search } = Input;
const { Option } = Select;

//选择器
function handleChange(value) {
  console.log(`selected ${value}`);
}
//多选框
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

class News extends React.Component {
 
  constructor(props){
    super(props);
    this.state={
      visible: false,
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

  // 改变多选框
  onSelectChange = (selectedRowKeys, e) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
    });
  };

  render(){
     //下拉菜单
     const menu = (
      <Menu style={{width:200,height:300}}>
        <div style={{marginLeft:15}}>
        <span style={{fontSize:16}}>编目配置</span><br/><br/>
        <span >
          显示<Select defaultValue="1" onChange={handleChange}>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
          级目录</span>
          <Checkbox onChange={onChange}>JavaEE企业级开发</Checkbox><br/>
          <Checkbox onChange={onChange}>人工智能python全栈</Checkbox><br/>
          <Checkbox onChange={onChange}>H5全栈开发</Checkbox><br/><br/>
          <span style={{marginLeft:18,fontSize:12,color:'red'}}>请选择偶数个栏目</span>
          </div>
      </Menu>
    );
    // 表格
    const columns = [
      { title: '栏目', align: 'center', dataIndex: '' },
      { title: '作品',  align: 'center',dataIndex: '' },
      { title: '预览图', align: 'center', dataIndex: '' },
      { title: '作者', align: 'center', dataIndex: '' },
      { title: '收藏', align: 'center', dataIndex: '' },
      { title: '评论', align: 'center',dataIndex: '',},
      { title: '浏览', align: 'center', dataIndex: '' },
      { 
        title: 'Action',
        align: 'center',
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
                width="686px"
                height="514px"
                footer={[
                  <Button key="submit" type="primary" onClick={this.handleOk} style={{width:200,height:30}}>
                    完成
                  </Button>,
                ]}
              >
                 <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                /><br /><br />
                <span>权限</span>&nbsp;
                <Select defaultValue="全部"  />&nbsp;
                <span>格式</span>&nbsp;
                <Select defaultValue="专辑"/>&nbsp;
                <span>状态</span>&nbsp;
                <Select defaultValue="全部"/>&nbsp;&nbsp;
                <Checkbox onChange={onChange}>按时间</Checkbox>
                <Checkbox onChange={onChange}>按热度</Checkbox><br/><br/>

                <Table 
                  bordered
                  size='small'
                  // scroll={{ x: 1000 }}
                  rowSelection={{rowSelection,columnTitle:'#',fixed:'left'}} 
                  columns={columns1} 
                  dataSource={data} />
                您选择的是：&nbsp;
                <a>添加缩略图</a><br/>
                <br/>预览：   
              </Modal>
            </div>
          );
        },
      },
    ];
    
    const columns1 = [
      { title: '名称', align: 'center', dataIndex: '' },
      { title: '作者', align: 'center',dataIndex: '' },
      { title: '方向', align: 'center',dataIndex: '' },
      { title: '技术', align: 'center', dataIndex: '' },
      { title: '日期', align: 'center', dataIndex: '' },
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
          dataSource={data} />
        </div>
        
      </div>
    )
  }
}

export default News;