import React from 'react';
import styles from './video.less';
import { Button, Table, Icon, DatePicker,Input,Modal,Form } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Search,TextArea } = Input;
class Check extends React.Component {
	 constructor(props) {
	    super(props);
	    this.state = {
	       visible: false,
	       visible2: false,
	       form:{},
	       selectedRowKeys: [],
	    };
	  }
	 onChange=(date, dateString)=> {
	  console.log(date, dateString);
	}
	// 一件通过
	passAll=()=>{
		alert(this.state.selectedRowKeys)
	}
	// 改变多选框
	onSelectChange = (selectedRowKeys, e) => {
	    this.setState({
	      selectedRowKeys: selectedRowKeys,
	    });
	  };
	// 弹出拒绝理由
	reject=()=>{
		 this.setState({
      visible: true,
    });
	}
	// 弹出详细视频
	showVideo=()=>{
		 this.setState({
      visible2: true,
    });
	}
	// 关闭并提交拒绝理由
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
	// 关闭拒绝理由
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  // 关闭并提交视频
  handleOk2 = e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };
	// 关闭视频模态框
  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };
	handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  // 双向绑定form
  changeForm=(e)=>{
  	this.setState=({
  		form:e.target.value
  	})
  }
  render(){
  	const { selectedRowKeys } = this.state;
  	const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
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
	              <Icon type="eye" onClick={this.showVideo} />
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
	              <Icon className={styles.iconStop} title="拒绝" onClick={this.reject} type="stop" />
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
			<Table size="small" bordered rowSelection={rowSelection} columns={columns} dataSource={data} />
		</div>
		<div className={styles.content_bottom}>
			<Button size="small" type="primary" onClick={this.passAll}>一键通过</Button>
		</div>
		<Modal
          title="拒绝的理由"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
       
           <Form onSubmit={this.handleSubmit} className="login-form">
	            <Form.Item label="">	          
		         <TextArea autosize={{ minRows: 6, maxRows: 10 }} onChange={this.changeForm} />
	        	</Form.Item>
           </Form>
        </Modal>

        <Modal
       	  width={'900px'}
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
        >
          <video width="100%" height="100%" controls>
			    <source src="D:/a.mp4" type="video/mp4" />
		  </video>

        </Modal>
      </div>
    )
  }
}

export default Check;