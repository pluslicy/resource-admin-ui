import React from 'react';
import styles from './video.less';
import { Button, Table, Icon, DatePicker,Input } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search } = Input;
class Check extends React.Component {
 onChange=(date, dateString)=> {
  console.log(date, dateString);
}

  render(){
  	const rowSelection = {
		  onChange: (selectedRowKeys, selectedRows) => {
		    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		  },
		  getCheckboxProps: record => ({
		    disabled: record.name === 'Disabled User', // Column configuration not to be checked
		    name: record.name,
		  }),
		};
  	const columns = [
		  {
		    title: '名称',
		    dataIndex: 'key',
		    align: 'center',
		   
		  },
		  {
		    title: '作者',
		    align: 'center',
		    dataIndex: 'author',
		  },
		  {
		    title: '方向',
		    align: 'center',
		    dataIndex: 'address',
		  },
		   {
		    title: '技术',
		    align: 'center',
		    dataIndex: 'jishu',
		  },
		   {
		    align: 'center',
		    title: '类型',
		    dataIndex: 'type',
		  },
		   {
		    title: '权限',
		    align: 'center',
		    dataIndex: 'quanxian',
		  },
		   {
		    title: '日期',
		    align: 'center',
		    dataIndex: 'data',
		  },
		   {
		    title: '描述',
		    align: 'center',
		    dataIndex: 'dec',
		  },
		  {
		    title: '查看',
		    align: 'center',
		    dataIndex: '',
		    render: (text, record) => {
	        	return (
	            <div>
	              <Icon type="eye" />
	            </div>
	          );
	        },
		  },
		  {
		    title: '状态',
		    align: 'center',
		    dataIndex: '',
		    render: (text, record) => {
	        	return (
	            <div>
	              <Icon className={styles.iconPass} title="通过" type="check-circle" />
	              <Icon className={styles.iconStop} title="拒绝" type="stop" />
	            </div>
	          );
	        },
		  },
		];
		const data = [
		  {
		    key: '1',
		    author:'John Brown',
		    address: '昆山',
		    jishu:'前端',
		    type:'杰普教程',
		    quanxian:'无',
		    data:'2019.7.10',
		    dec: '啦啦啦啦啦'
		  },
		  {
		    key: '2',
		    author:'John Brown',
		    address: '昆山',
		    jishu:'前端',
		    type:'杰普教程',
		    quanxian:'无',
		    data:'2019.7.10',
		    dec: '啦啦啦啦啦'
		  },
		  {
		    key: '3',
		    author:'John Brown',
		    address: '昆山',
		    jishu:'前端',
		    type:'杰普教程',
		    quanxian:'无',
		    data:'2019.7.10',
		    dec: '啦啦啦啦啦'
		  },
		  {
		    key: '4',
		    author:'John Brown',
		    address: '昆山',
		    jishu:'前端',
		    type:'杰普教程',
		    quanxian:'无',
		    data:'2019.7.10',
		    dec: '啦啦啦啦啦'
		  }
		  
		];

    return (
      <div className={styles.content}>
		<div className={styles.content_top}>
        <RangePicker onChange={this.onChange} style={{ width: 300}} />
        <Search
	      onSearch={value => console.log(value)}
	      style={{ width: 200 }}
	    />

		</div>
		<div>
			<Table pagination={false} size="small" bordered rowSelection={rowSelection} columns={columns} dataSource={data} />
		</div>
		<div className={styles.content_bottom}>
			<Button size="small" type="primary">一键通过</Button>
		</div>
      </div>
    )
  }
}

export default Check;