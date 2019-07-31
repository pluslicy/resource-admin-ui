import React from 'react';
import {Upload,Button,Icon,DatePicker,Input,Select,Table,Checkbox,Dropdown,Menu,Modal,Cascader} from "antd"
import moment from 'moment'
const { Search } = Input;
const {RangePicker} = DatePicker;
const { Option } = Select;
class Text extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible1:false
        }
    }
    handleOk = e => {
        // 提交表单
        // e.preventDefault();
        // this.state.form.validateFields((err, values) => {
        //   if (!err) {
        //     console.log('Received values of form: ', values);
        //     //this.props.dispatch(saveOrUpdateCourse(values));
        //   }
        // });
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
    showModal1=()=>{
        this.setState({
          visible1: true,
        });
      }
    onChange2=(date, dateString)=>{
        console.log(date, dateString);
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    checkBoxChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }
    handleMouse=(e)=>{
        console.log(e)
    } 

    render(){
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
          const dateFormat = 'YYYY-MM-DD';
          const rowSelection = {
            columnTitle:"#",
            fixed:"left",
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              
            },
          };
        return <div>
            
          <RangePicker  onChange={this.onChange2} style={{marginLeft:"1.58em",marginTop:"1em",width:"220px"}} defaultValue={[moment('2018/12/11', dateFormat), moment('2018/12/12', dateFormat)]}
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
          rowKey="key"
          pagination={{
            onChange: page => {
              console.log(page);
              let p = page - 1;
              console.log(p);
            },
            pageSize: 2,
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
          rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
          
          <Button type="primary" style={{marginLeft:"2em",width:"35px",height:"21px",fontSize:"12px",padding:"0"}}>启用</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(255, 0, 0, 1)"}}>冻结</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(102, 102, 102, 1)"}}>删除</Button>
          <Button type="primary" style={{marginLeft:"1em",width:"35px",height:"21px",fontSize:"12px",padding:"0",backgroundColor:"rgba(22, 142, 194, 1)"}} onClick={this.showModal1}>调整</Button>          
          <Modal
            onCancel={this.handleCancel1}
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
    }
}
export default Text;