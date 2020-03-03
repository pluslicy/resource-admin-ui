import React from 'react';
import styles from './module.less'
import { connect } from 'dva';
import {  Upload, Table, Menu, Dropdown, Icon, Modal, Button, Input, Radio, Select, Checkbox,Tabs  } from 'antd';

const { Search } = Input;


class News extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      id:[],
      imgs:{},
    }
  }

   // 在渲染前调用
	componentWillMount() {
        this.props.dispatch({type: 'newsTab/findAll'})
        
    }

  //根据视频名字查询(完成)
  searchName=(value)=>{
    var docs={...this.props.newsTab.docs,...{search:value,page:1}};
    this.props.dispatch({
      type:"newsTab/fetchDocsQuery",payload:docs
    })
    this.props.dispatch({
      type:"newsTab/findAll",payload:{...this.props.newsTab.docs,...{search:value,page:1}}
    })
  }
  setSearch(e){
    var docs={...this.props.newsTab.docs,...{search:e.target.value}};
    this.props.dispatch({
      type:"newsTab/fetchDocsQuery",payload:docs
    })
  }  
  //根据权限查询
  handleChange=(value)=>{
    console.log(value)
    var docs={...this.props.newsTab.docs,...{dr_permission:value,page:1}};
    this.props.dispatch({
      type:"newsTab/fetchDocsQuery",payload:docs
    })
    this.props.dispatch({
      type:"newsTab/findAll",payload:docs
    });
  }
  //根据状态查询(完成)
  handleChange1=(value)=>{
    var docs={...this.props.newsTab.docs,...{dr_enable:value}};
    this.props.dispatch({
      type:"newsTab/fetchDocsQuery",payload:docs
    })
    this.props.dispatch({
      type:"newsTab/findAll",payload:docs
    })
  }
  //修改权限和状态(完成)
  handleChange2=(record,e)=>{
      if(e._owner.key=="dr_permission"){
       this.props.dispatch({
        type:"newsTab/fetchPermission",payload:{
            params:{dr_permission: record,
              id: e._owner.pendingProps.record.id},
            docs:this.props.newsTab.docs
          }
        })
      }else{
        this.props.dispatch({
          type:"newsTab/fetchEnableOrFreeze",
          payload:{
            params:{ dr_enable:record,
              ids:[e._owner.pendingProps.record.id]},
            docs:this.props.newsTab.docs
          }
        })
      }
      setTimeout(()=>{
        this.setState({ids:[]})
      },200)
  }
  //根据时间排序(完毕)
  checkTimeChange=(e)=> {  
    console.log(e.target.checked)
    var docs={...this.props.newsTab.docs,...{bytime:e.target.checked}};
    console.log(docs)
    this.props.dispatch({
      type:"newsTab/fetchDocsQuery",payload:docs
    })
    this.props.dispatch({
    type:"newsTab/findAll",payload:docs
    })

  }
  //根据热度排序(完毕)
  checkHotChange=(e)=>{
    var docs={...this.props.newsTab.docs,...{byhot:e.target.checked}};
    this.props.dispatch({
      type:"newsTab/fetchDocsQuery",payload:docs
    })
    this.props.dispatch({
      type:"newsTab/findAll",payload:docs
    })
  }

  beforeUpload = (file, fileList) => {
    this.setState({
      file,
      fileList,
    });
  };

  render() {

    const props = {
      action:"http://139.224.221.31:11000/mp_man_module/update_latestresources/",
      listType: 'picture',
      // defaultFileList: [...fileList],
      data:{
        lr_image: this.state.file,
        object_id: this.state.imgs.id,
        object_type: "docs",
        show_status: 1,
        id: this.props.flag,
      }
    };
    console.log(this.state,"mmmm")
    

    // const { TabPane } = Tabs;
    // function callback(key) {
    //   console.log(key);
    // }

    const rowSelection = {
      type:'radio',
      selectedRowKeys: this.state.object_id,
      columnTitle:"#",
      onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                object_id:selectedRowKeys,
                imgs:selectedRowKeys[0]
              })
              console.log(selectedRowKeys,"qqq")
          },
      };

    const columns = [
      { title: '名称', align: 'center', dataIndex: 'dr_name' },
      { title: '作者', align: 'center', dataIndex: 'dr_author' },
      { title: '方向', align: 'center', dataIndex: 'dr_cata_two' },
      { title: '技术', align: 'center', dataIndex: 'dr_cata_one' },
      {
        title: '日期',
        dataIndex: 'dr_created_time',
        render: (text,record) => {
          var dateee = new Date(text).toJSON();
          var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          return (date)
        }
      },
    ];

    console.log(this.props.newsTab.docslist,"sss")
    return (
      <div className={styles.content1}>
        <div className='btns'>
          {this.props.flag}
            <Search
              placeholder="请输入搜索内容"
              onChange={this.setSearch.bind(this)}
              value={this.props.newsTab.docs.search}
              onSearch={this.searchName}
              style={{ width: 200 , marginTop:-5 }}
            />
            <br/>
            <div>
              {/* 权限 */}
              <span style={{marginTop:"2em",fontWeight:"700",fontSize:"12px"}}>权限 </span>
              <Select value={this.props.newsTab.docs.dr_permission} size="small" placeholder="权限" defaultValue="" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px",width:60}} onChange={this.handleChange}>
                  <Option style={{fontSize:"12px"}} value="">权限</Option>
                  <Option style={{fontSize:"12px"}} value={0}>Vip</Option>
                  <Option style={{fontSize:"12px"}} value={1}>Free</Option>
                  <Option style={{fontSize:"12px"}} value={2}>Other</Option>
              </Select>
              {/* 格式 */}
              <span style={{marginLeft:"2em",fontWeight:"700",fontSize:"12px"}}>格式 </span>
              <Select className="docs_select" size="small" defaultValue="" style={{  width:"62px",height:"22px",marginLeft:"1em" ,fontSize:"12px"}}>
                  <Option style={{fontSize:"12px"}} value="">格式</Option>
                  <Option style={{fontSize:"12px"}} value="视频">视频</Option>
                  <Option style={{fontSize:"12px"}} value="专辑">专辑</Option>
              </Select>
              {/* 状态 */}
              <span style={{marginLeft:"2em",fontWeight:"700",fontSize:"12px"}}>状态 </span>
              <Select size="small" value={this.props.newsTab.docs.dr_enable} placeholder="状态" defaultValue="" style={{  width:62,height:22,marginLeft:"1em",fontSize:"12px" }} onChange={this.handleChange1}>
                  <Option style={{fontSize:"12px"}} value="">状态</Option>
                  <Option style={{fontSize:"12px"}} value={1}>启用中</Option>
                  <Option style={{fontSize:"12px"}} value={0}>冻结</Option>
              </Select>
              {/* 时间 热度 */}
              <span style={{marginLeft:"2em",fontWeight:"bold"}}>
                <Checkbox checked={this.props.newsTab.docs.bytime} onChange={this.checkTimeChange} style={{fontSize:"12px"}} >按时间</Checkbox>
              </span>
              <span style={{marginLeft:"1em",fontWeight:"bold"}}>
                <Checkbox  ckbox checked={this.props.newsTab.docs.byhot} onChange={this.checkHotChange} style={{fontSize:"12px"}} >按热度</Checkbox>
              </span>
              <br/><br/>
              <Table
                bordered
                rowKey={record => record}
                size="small"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.newsTab.docslist.results} 
                pagination={{
                  onChange: page => {
                    console.log(page);
                    this.props.dispatch({
                    type:"newsTab/findAll",
                    payload:{
                      page:page,
                      pageSize:5,
                    }
                    })
                    this.setState({
                    page:page
                    })
                  },
                  total:this.props.newsTab.docslist.count,
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
                您选择的是：{this.state.imgs.dr_name}
                <br/><br/>
              <Upload {...props}
              beforeUpload={this.beforeUpload.bind(this)}>
                <Button>
                  <Icon type="upload" /> 添加缩略图
                </Button>
              </Upload>
            </div>
        </div>
      </div>
    )
  }
}


export default connect(({ newsTab }) => ({
	newsTab,
}))(News);