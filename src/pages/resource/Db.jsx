import React from 'react';
import { connect } from 'dva';
import { Menu, Icon,DatePicker,Input,Table,Select,Dropdown,Checkbox,Modal,Button } from 'antd';
import styles from './db.less';
import DbForm from './DbForm';
import moment from 'moment'

const { SubMenu } = Menu;
const { Search } = Input;
const {RangePicker} = DatePicker;
const { Option } = Select;


// 资源库
class Db extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visible:false
    }
  }
  saveorForm=(form)=>{
    this.setState({
      form
    })
  }
  showModal=()=>{
    this.setState({
      visible: true,
    });
  }
  handleOk = e => {
    // 提交表单
    e.preventDefault();
    this.state.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //this.props.dispatch(saveOrUpdateCourse(values));
      }
    });
    this.setState({
      visible:false
    })
};

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  onChange=(date, dateString)=>{
    console.log(date, dateString);
  }
  componentWillMount() {
   
  }
  handleClick = e => {
    console.log('click ', e);
  };
  checkBoxChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '作者',
        dataIndex: 'age',
      },
      {
        title: '方向',
        dataIndex:'fangx',
        render: (text, record) => (
          <Dropdown overlay={menu}  trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                方向 <Icon type="down" />
              </a>
          </Dropdown>
        ),
      },
      {
        title: '技术',
        dataIndex:'jishu',
        render: (text, record) => (
          <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                技术 <Icon type="down" />
              </a>
          </Dropdown>
        ),
      },
      {
        title: '类型',
        dataIndex:'leix',
        render: (text, record) => (
          <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                类型 <Icon type="down" />
              </a>
          </Dropdown>
        ),
      },
      {
        title: '权限',
        dataIndex:'quanxian',
        render: (text, record) => (
          <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                权限<Icon type="down" />
              </a>
          </Dropdown>
        ),
      },
      {
        title: '格式',
        dataIndex: 'address',
      },
      {
        title: '日期',
        dataIndex: 'time',
      },
      {
        title: '状态',
        dataIndex:'status',
        fixed:"right",
        render: (text, record) => (
          <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                状态 <Icon type="down" />
              </a>
          </Dropdown>
        ),
      },
    ];
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        fangx:"jack",
        jishu:"jack",
        leix:"Yiminghe",
        quanxian:"lucy",
        address: '西湖区湖底公园1号',
        time:"2018-8-11",
        status:"jack"
      },
      {
        key: '2',
        name: '张郃',
        age: 12,
        fangx:"jack",
        jishu:"jack",
        leix:"Yiminghe",
        quanxian:"lucy",
        address: '西湖区湖底公园1号',
        time:"2018-8-11",
        status:"jack"
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
    
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div className={styles.content}>
          <div className="left-div" >
  
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        style={{minHeight:"500px",marginTop:"1em"}}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              
              <span>JavaEE企业级开发</span>
            </span>
          }
        >
         
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              
              <span>Spring boot</span>
            </span>
          }
        >
          <SubMenu key="sub3" title="视频库">
              <SubMenu key="sub5" title="视频">
               
              </SubMenu>
              <SubMenu key="sub6" title="专辑">
               
              </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title="文档库">
      
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub7"
          title={
            <span>
              
              <span>Mybatis</span>
            </span>
          }
        >
        </SubMenu>
        <SubMenu
          key="sub8"
          title={
            <span>
    
              <span>SpringMVC</span>
            </span>
          }
        >
        </SubMenu>
      </Menu>



          </div>
          <div  className="right-div" style={{flex:"6",overflow:"hidden"}}>
          <Button style={{marginRight:"1.5em",marginLeft:"88%",width:80}} onClick={this.showModal}>
            <Icon type="upload" />上传
          </Button>
          <br/>
          <RangePicker onChange={this.onChange} style={{marginLeft:"2em",marginTop:"1em"}} defaultValue={[moment('2018/12/11', dateFormat), moment('2018/12/12', dateFormat)]}
      format={dateFormat} />
          <Search
          placeholder="请输入搜索内容"
          onSearch={value => console.log(value)}
          style={{ marginLeft:"2em",width: 270 }}
        />
        <br/>
          <div className="select-div" style={{width:"60%",marginTop:"2em",display:"inline",overflow:"hidden"}}>
          <span style={{marginLeft:"2em",marginTop:"2em",fontWeight:"bold"}}>权限 </span>
          <Select defaultValue="lucy" style={{ width: 80,marginTop:"1em",marginLeft:"1em" }} onChange={this.handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"bold"}}>格式 </span>
          <Select defaultValue="lucy" style={{ width: 80,marginLeft:"1em" }} onChange={this.handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"bold"}}>状态 </span>
          <Select defaultValue="lucy" style={{ width: 80,marginLeft:"1em" }} onChange={this.handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"bold"}}><Checkbox onChange={this.checkBoxChange}>按时间</Checkbox></span>
          <span style={{marginLeft:"1em",fontWeight:"bold"}}><Checkbox onChange={this.checkBoxChange}>按热度</Checkbox></span>
          </div>
          <Table style={{marginLeft:"2em"}} scroll={{x:1000}} rowSelection={{rowSelection,columnTitle:"#",fixed:"left"}} columns={columns} dataSource={dataSource} />
          </div>
          <Modal
          title="上传视频"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <DbForm ref={this.saveorForm}/>
        </Modal>
      </div>
    );
  }
}

export default Db;
