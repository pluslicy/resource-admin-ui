import React from 'react';
import { Form, Input, Radio, Select, Modal, Table, Icon, Button } from 'antd';
import style from './Privilege.less';
import { connect } from 'dva';
var arr = [];
var data = {};
const {Option} = Select;


class Privilege extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      ids:[],
      page:1,
    };
  }

  componentWillMount(){
    this.props.dispatch({
      type:'privilege/fetchPrivi',
      payload:{
        page:1,
        pageSize:10,
      }
    })
  }

  addOption = () => {
      let obj = {
        label: '',
        name: '',
      };
      arr.push(obj);
      this.setState({
        options: arr,
      });
  };
  

   // 冻结状态改变
   handleChange=(record,e)=>{
    if(e._owner){
      // console.log("---------------",this.props.dispatch)
      this.props.dispatch({
        type:"privilege/fetchEnableOrFreeze",
        
        payload:{
         status:{
             enable:0,
             ids:[e._owner.pendingProps.record.id],
         },
         page:this.state.page,
         pageSize:10,
     
         }
     })
    }

   // 批量启用和冻结
  //  batchEnableOrFreeze=(e)=>{
  //   console.log("------------",this.props.dispatch)
  //     if(e.target.textContent=="冻 结"){
  //     this.props.dispatch({
  //         type:"privilege/fetchEnableOrFreeze",
  //         payload:{
  //         status:{
  //             enable:0,
  //             ids:this.state.ids,
  //         },
  //         page:this.state.page,
  //         pageSize:10,
      
  //         }
  //     })
  //     }else{
  //     this.props.dispatch({
  //       type:"privilege/fetchEnableOrFreeze",
  //         payload:{
  //           status:{
  //               enable:1,
  //               ids:this.state.ids,
  //           },
  //           page:this.state.page,
  //           pageSize:10,
        
  //           }
  //     }) }}
  }


  render() {
    // table第一列选框
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    // table第一行
    const columns = [
      {
        title: '权限名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'describle',
      },
      {
        title: '状态',
        dataIndex:'enable',
        render: (text,record) => {
          // console.log(text)
          if(text==1){
            return (
              <div style={{width:"75px",height:"20px",overflow:"hidden"}}>
                  <Select defaultValue={text} style={{ width:"100px",marginLeft:"-12px",marginTop:"-5px"}} onChange={this.handleChange.bind(record)}>
                    <Option value={1} >启用中</Option>
                    <Option value={0} style={{color:"red"}}>冻结</Option>
                  </Select>
              </div>
            )
          }else{
           return (
                  <span style={{color:"red"}}>冻结</span>
          )
          }

        },
      }
    
    ];
 
    return (
      <div className={style.Back}>
         <Table
              rowKey="id"
              size="small"
              rowSelection={{rowSelection,columnTitle:"#"}} 
              columns={columns} 
              dataSource={this.props.privilege.privileges}
              pagination={{
                onChange: page => {
                  console.log(page);
                  // let p = page - 1;
                  // console.log(p);
                  this.props.dispatch({
                    type:"privilege/fetchPrivi",
                    payload:{
                      page:page,
                      pageSize:10,
                    }
                  })
                  this.setState({
                    page:page
                  })
                },
                total:this.props.privilege.count,
                pageSize: 10,
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
          />
          {/* <Button type="primary" size="small" onClick={this.batchEnableOrFreeze}>启用</Button>&nbsp;
          <Button type="danger" size="small" onClick={this.batchEnableOrFreeze}>冻结</Button>&nbsp; */}
      </div>
    );
  }
}

export default connect(({ privilege }) => ({
  privilege,
}))(Privilege);



