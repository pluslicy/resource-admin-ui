import React from 'react';
import styles from './module.less'
import { Table,Button,Modal,Icon,Input,Form } from 'antd';

const { Search,TextArea } = Input;

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       visible: false,
       form:{},
    };
  }
 onChange=(date, dateString)=> {
  console.log(date, dateString);
}
// 一件通过
passAll=()=>{
  // alert(this.state.selectedRowKeys)
}
// 弹出拒绝理由
reject=()=>{
   this.setState({
    visible: true,
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
    const columns = [
      { title: '作者', align: 'center', dataIndex: '' },
      { title: '作品',  align: 'center',dataIndex: '' },
      { title: '赞', align: 'center', dataIndex: '' },
      { title: '收藏',  align: 'center',dataIndex: '' },
      { title: '评论', align: 'center', dataIndex: '' },
      { title: '浏览', align: 'center', dataIndex: '' },
      { title: '联系方式', align: 'center', dataIndex: '' },
      { title: '申请理由', align: 'center', dataIndex: '' },
      { title: 'Action',
       dataIndex: '',
       align: 'center',
       render:()=>{
         return(
          <div>
            <Icon title="通过" type="check-circle" style={{marginRight: 5,color: 'green'}}/>
            <Icon title="拒绝" onClick={this.reject} type="stop" style={{color: 'red'}} />         
             <Modal
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  // 定义右下角按钮的地方
                  <Button key="submit" type="primary" onClick={this.handleOk}>
                    OK
                  </Button>,
                ]}
              >
              </Modal>
           </div>
         )
       }
      }
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
          {/* 表格 */}
          <Table 
          bordered
          size='small'
          scroll={{ x: 1100 }}
          rowSelection={{rowSelection,columnTitle:'#',fixed:'left'}} 
          columns={columns} 
          dataSource={data} />,
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
      </div>
    )
  }
}

export default Authentication;