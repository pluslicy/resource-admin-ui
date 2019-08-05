import React from 'react';
import {Button,Table,Modal,Radio,Menu,
          menu1,Dropdown,Icon,Input,} from 'antd';
import styles from './role.less'
// import RoleForm from './RoleForm'
import {connect} from 'dva'


class Role extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {},
      visible: false,
      visibleWeb:false,
      
      // 添加单选按钮
      value:"",
    };
  }
  componentDidMount(){
    this.props.dispatch({
      type:'role/fetchRoles'
    })
  }

  // 添加展示模态框
  showModal = () => {
    this.setState({
      visible: true,
      // visibleWeb:false,
    });
  };
  //配置模态框 
  configHandle= () => {
    this.setState({
      visibleConfig: true,
    });
  };

  // 添加模态框 ok
  handleOk = e => {
    console.log(e);
    this.setState({
      value:""
    })
    if(this.state.value===1){
      this.setState({
        visibleWeb:true
      })
    }else if(this.state.value===""){
        this.setState({
          visible:"false"
        })
    }else{
      this.setState({
        visibleBack:true,
      })
    }
    this.setState({
      visible: false,
    });
  };
  // 添加模态框关闭 
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
 
  // 网络用户ok
  handleOkWeb = e => {
    console.log(e);
    this.setState({
      visibleWeb: false,
    });
  };
  // 网络用户关闭
  handleCancelWeb = e => {
    console.log(e);
    this.setState({
      visibleWeb: false,
    });
  };

    // 后台用户ok
    handleOkBack = e => {
      console.log(e);
      this.setState({
        visibleBack: false,
      });
    };
    // 后台用户关闭
    handleCancelBack = e => {
      console.log(e);
      this.setState({
        visibleBack: false,
      });
    };

     // 配置ok
     handleOkConfig = e => {
      console.log(e);
      this.setState({
        visibleConfig: false,
      });
    };
    // 配置关闭
    handleCancelConfig = e => {
      console.log(e);
      this.setState({
        visibleConfig: false,
      });
    };
  

  // 添加单选按钮
  onChange = e => {
    console.log('radio checked', e.target.value);
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };



  render(){ 
    // 新增
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '权限',
        dataIndex: 'permissions_name',
        render:(text,record)=>{
          return(
          <div>
           <a onClick={this.configHandle}>配置</a>
          </div>
          )}
      },
        
      {
        title: '状态',
        render: () => {
          return (
            <div>
             {/*下拉菜单*/}
              <Dropdown overlay={menu1}>
              <a className="ant-dropdown-link" href="#">
                启用中 <Icon type="down" />
              </a>
            </Dropdown>
            </div>
          );
        },
      },
    ];
    
   
    // 表格
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled Role', // Column configuration not to be checked
        name: record.name,
      }),
    };

    // 状态的下拉菜单
    const menu1 = (
      <Menu>
        <Menu.Item style={{color:'red'}}>冻结</Menu.Item>
      </Menu>
    );
    
  
    return (
      <div className={styles.content}>
        <div className="btn1">
           <Button type="primary" onClick={this.showModal} size="small">+添加</Button>
        </div>

        {/* 添加模态框 */}
        <div>
         <Modal
            title="请选择角色类型"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            // onCancel={this.handleCancel}
            footer={[
            // 定义右下角按钮的地方
            <Button key="ok" style={{marginRight:230}} onClick={this.handleOk}>ok</Button>,
          ]}>
              {/* 添加单选按钮 */}
            <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio style={{margin:50,marginLeft:110}} value={1}>网站用户</Radio>
                <Radio value={2}>后台管理</Radio>        
            </Radio.Group>      
            
        </Modal>
        </div>

       {/* 网站用户模态框 */}
       <Modal 
            
            visible={this.state.visibleWeb}
            onOk={this.handleOkWeb}
            onCancel={this.handleCancelWeb}
            width="600px"
            height="400px"
            >
           <Input placeholder="输入角色名称" style={{width:500,marginLeft:"1em"}}/>
          
           <div style={{display:"flex",justifyContent:"space-around",marginTop:"1em"}}>
           <div style={{border:"1px solid #e8e8e8",width:"248px",height:"352px"}}>

           </div>
           <div style={{border:"1px solid #e8e8e8",width:"248px",height:"352px"}}>

           </div>
           </div>
        </Modal>

        {/* 后台用户模态框 */}
       <Modal
            visible={this.state.visibleBack}
            onOk={this.handleOkBack}
            onCancel={this.handleCancelBack}
            width="600px"
            height="400px">
          <Input placeholder="输入角色名称" style={{width:500,marginLeft:"1em"}}/>
          
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"1em"}}>
          <div style={{border:"1px solid #e8e8e8",width:"248px",height:"352px"}}>

          </div>
          <div style={{border:"1px solid #e8e8e8",width:"248px",height:"352px"}}>

          </div>
          </div>

        </Modal>

         {/* 配置模态框 */}
       <Modal
            visible={this.state.visibleConfig}
            onOk={this.handleOkConfig}
            onCancel={this.handleCancelConfig}
            width="600px"
            height="400px">
          <Input placeholder="输入角色名称" style={{width:500,marginLeft:"1em"}}/>
          
          <div style={{display:"flex",justifyContent:"space-around",marginTop:"1em"}}>
          <div style={{border:"1px solid #e8e8e8",width:"248px",height:"352px"}}>

          </div>
          <div style={{border:"1px solid #e8e8e8",width:"248px",height:"352px"}}>

          </div>
          </div>

        </Modal>

       {/* 数据表格 */}
        <div>
        <br></br>
           <Table
              rowKey="id"
              size="small"
              rowSelection={{rowSelection,columnTitle:"#"}} 
              columns={columns} 
              dataSource={this.props.role.roles}
              />
        
        </div>

        {/* 底部按钮 */}
        <div className="btn1">
            <Button type="primary" size="small">启用</Button>&nbsp;
            <Button type="danger" size="small">冻结</Button>&nbsp;
            <Button type="delete" size="small">删除</Button>
        </div>
       

      </div>
      
    );
    }
}

export default connect(({ role }) => ({
  role,
}))(Role);