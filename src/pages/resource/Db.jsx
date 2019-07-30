import React from 'react';
import { connect } from 'dva';
import { Menu,message, Icon,DatePicker,Input,Progress,Table,Select,Dropdown,Checkbox,Modal,Button,Cascader, Upload} from 'antd';
import styles from './db.less';

import DbForm from './DbForm';
import moment from 'moment'

const { SubMenu } = Menu;
const { Search } = Input;
const {RangePicker} = DatePicker;
const { Option } = Select;
const {confirm} =Modal

// 资源库
class Db extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visible:true,
      visible1:false,
      fileList: [],
      };
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
  showModal1=()=>{
    this.setState({
      visible1: true,
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
handleOk = e => {
  // 提交表单
 
  this.setState({
    visible1:false
  })
};
handleCancel1 = e => {
  console.log(e);
  this.setState({
    visible1: false,
  });
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
  componentDidMount() {
    // this.props.dispatch({
    //   type:"Db/fetchCata"
    // })
  }
  casonChange(value) {
    console.log(value);
  }
  casonChange1(value) {
    console.log(value);
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
  handleChange2=(info)=>{
    console.log(info);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    // this.showModal();
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  render() {
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleChange2,
    
    };
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
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
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
        dataIndex:'fangx'
      },
      {
        title: '技术',
        dataIndex:'jishu'
      },
      {
        title: '类型',
        dataIndex:'leix'
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
        alert(1)
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    
    const dateFormat = 'YYYY-MM-DD';
    // const {results}=this.props.Db.catalist;
    return (
      <div className={styles.content}>
          <div className="left-div" style={{borderRight:"1px solid #e8e8e8"}}>
      <img style={{position:"absolute",marginLeft:"-1.8em",marginTop:"1em"}} src={require('./u578.png')} alt=""/>
      <div style={{position:"absolute",width:"89px",height:"24px",backgroundColor:"rgba(15, 105, 255, 1)",marginTop:"1em",marginLeft:"-1em",fontSize:"12px",color:"#ffffff",textAlign:"center",paddingTop:"2px"}}>
        资源库{/* {results[0].catalogue_name} */}
      </div>
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        style={{minHeight:"500px",marginTop:"2em",border:"none"}}
      >
        {/* {
          this.props.Db.catalist.results.forEach((item,index)=>{

          })
        } */}
        <SubMenu
          key="sub1"
          title={
            <span>
              <span style={{fontWeight:"700",fontSize:"12px",marginLeft:"-1em"}}>JavaEE企业级开发</span>
            </span>
          }
        >
         
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              
              <span  style={{fontWeight:"400",fontSize:"12px"}}>Spring boot</span>
            </span>
          }
        >
          <SubMenu key="sub3" 
          title={
            <span>
              
              <span style={{fontWeight:"400",fontSize:"12px"}}>视频库</span>
            </span>
          }>
          >
              <SubMenu key="sub5" title={
            <span>
              
              <span style={{fontWeight:"400",fontSize:"12px"}}>视频</span>
            </span>
          }>  
               
              </SubMenu>
              <SubMenu key="sub6" title={
            <span>
              
              <span style={{fontWeight:"400",fontSize:"12px"}}>专辑</span>
            </span>
          }>
               
              </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" 
           title={
            <span>
              
              <span style={{fontWeight:"400",fontSize:"12px"}}>文档库</span>
            </span>
          }>
      
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub7"
          title={
            <span>
              
              <span style={{fontWeight:"400",fontSize:"12px"}}>Mybatis</span>
            </span>
          }
        >
        </SubMenu>
        <SubMenu
          key="sub8"
          title={
            <span>
    
              <span style={{fontWeight:"400",fontSize:"12px"}}>SpringMVC</span>
            </span>
          }
        >
        </SubMenu>
      </Menu>



          </div>
          <div  className="right-div" style={{flex:"6",overflow:"hidden"}}>
          <Upload  {...props} showUploadList={false} multiple={true}>
            <Button style={{width:"90px",marginTop:"1em",height:"28px",fontSize:"12px",backgroundColor:"rgba(51, 153, 255, 1)",color:"#FFFFFF",borderRadius:"5px",position:"absolute",marginLeft:"58.5%",marginTop:"0em"}} onClick={this.showModal}>
              <Icon type="upload" />上传
            </Button>
          </Upload>
          <br/>
          <RangePicker  onChange={this.onChange} style={{marginLeft:"1.58em",marginTop:"1em",width:"220px"}} defaultValue={[moment('2018/12/11', dateFormat), moment('2018/12/12', dateFormat)]}
      format={dateFormat} />
          <Search
          placeholder="请输入搜索内容"
          onSearch={value => console.log(value)}
          style={{ marginLeft:"2em",width: "222px",height:"30px"}}
        />
        <br/>
          <div className="select-div" style={{width:"60%",marginTop:"2em",display:"inline",overflow:"hidden"}}>
          <span style={{marginLeft:"2em",marginTop:"2em",fontWeight:"700",fontSize:"12px"}}>权限 </span>
          <Select size="small" defaultValue="lucy" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px"}} onChange={this.handleChange}>
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"700"}}>格式 </span>
          <Select size="small" defaultValue="lucy" style={{  width:"62px",height:"22px",marginLeft:"1em" ,fontSize:"12px"}} onChange={this.handleChange}>
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"700"}}>状态 </span>
          <Select size="small" defaultValue="lucy" style={{  width:62,height:22,marginLeft:"1em",fontSize:"12px" }} onChange={this.handleChange}>
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">全部</Option>
            <Option value="Yiminghe">yiminghe</Option> */}
          </Select>
          <span style={{marginLeft:"2em",fontWeight:"bold"}}><Checkbox onChange={this.checkBoxChange} style={{fontSize:"12px"}}>按时间</Checkbox></span>
          <span style={{marginLeft:"1em",fontWeight:"bold"}}><Checkbox onChange={this.checkBoxChange} style={{fontSize:"12px"}}>按热度</Checkbox></span>
          </div>
          <Table size="small" style={{marginLeft:"2em",marginTop:"2em"}} 
      
          
          pagination={{
            onChange: page => {
              console.log(page);
              let p = page - 1;
              console.log(p);
            },
            pageSize: 1,
            total:100,
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
          rowSelection={{rowSelection,columnTitle:"#",fixed:"left"}} columns={columns} dataSource={dataSource} />
          <Button type="primary" style={{marginLeft:"2em",width:"35px",height:"21px",fontSize:"12px",padding:"0"}}>启用</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(255, 0, 0, 1)"}}>冻结</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(102, 102, 102, 1)"}}>删除</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(22, 142, 194, 1)"}} onClick={this.showModal1}>调整</Button>
          
          
          </div>
          <Modal
          style={{top:"20px"}}
          title={
            <div style={{width:"775px",height:"102px",backgroundColor:"#e8e8e8",borderRadius:"10px",marginLeft:"1em",boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.349019607843137)",textAlign:"center",position:"relative"}}>
           <span style={{fontWeight:"700",fontSize:"18px",position:"absolute",top:".5em",left:"252px"}}>您上传的视频：视频一、视频二....</span>
           <Icon type="close-circle" onClick={this.handleCancel} style={{position:"absolute",left:"749px",top:"14px"}}/>
            <Progress
                style={{width:"669px",height:"50px",marginTop:"2.5em"}}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={99.9}
              />
          <span style={{display:"block",position:"absolute",top:"4em",left:"2em",fontSize:"normal"}}>已上传：5/6</span>
        </div>
          }
          closable={false}
          visible={this.state.visible}
          footer={null}
          width={850}
        >
          <DbForm ref={this.saveorForm}/>
        </Modal>
        <Modal
          
          title="请选择资源所在编目"
          visible={this.state.visible1}
          style={{display:"flex",justifyContent:"space-around"}}
          footer={[
            <Button onClick={this.handleOk} style={{marginRight:"40%"}}>确认</Button>
          ]}
        >
          <Cascader options={options} onChange={this.casonChange} placeholder="请选择" />
          <Cascader style={{marginLeft:"1em"}} onChange={this.casonChange1} placeholder="请选择" />
        </Modal>
      </div>
    );
  }
}

export default connect(state=>state)(Db);
