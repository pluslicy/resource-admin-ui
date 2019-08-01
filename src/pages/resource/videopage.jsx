import React from 'react';
import {Upload,Button,Icon,DatePicker,Input,Select,Table,Checkbox,Dropdown,Menu,Modal,Cascader} from "antd"
import moment from 'moment'
import {connect} from 'dva'
const { Search } = Input;
const {RangePicker} = DatePicker;
const { Option } = Select;
class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible1:false
        }
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
       
         
        </div>
    }
}
export default connect(state=>state)(Video);