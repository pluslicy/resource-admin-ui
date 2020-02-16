import React from 'react';
import styles from './module.less'
import { connect } from 'dva';
import {  Upload, Table, Menu, Dropdown, Icon, Modal, Button, Input, Radio, Select, Checkbox } from 'antd';

const { Search } = Input;

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  // defaultFileList: [...fileList],
};


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
    this.props.dispatch({type: 'news/findAll'})
  }

  // 更换模态框
  showModal = () => {
    this.setState({
      visible: true,
    });
    this.props.dispatch({type: 'news/findAllVideos', payload:{
      page:1,
      pageSize:10,
    }})

  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  //根据视频名字查询(完成)
  searchName=(value)=>{
    var video={...this.props.news.video,...{search:value,page:1}};
    this.props.dispatch({
      type:"news/fetchVideoQuery",payload:video
    })
    this.props.dispatch({
      type:"news/findAllVideos",payload:{...this.props.news.video,...{search:value,page:1}}
    })
  }
  setSearch(e){
    var video={...this.props.news.video,...{search:e.target.value}};
    this.props.dispatch({
      type:"news/fetchVideoQuery",payload:video
    })
  }  
  //根据权限查询
  handleChange=(value)=>{
    console.log(value)
    var video={...this.props.news.video,...{vr_permission:value,page:1}};
    this.props.dispatch({
      type:"news/fetchVideoQuery",payload:video
    })
    this.props.dispatch({
      type:"news/findAllVideos",payload:video
    });
  }
  //根据状态查询(完成)
  handleChange1=(value)=>{
    var video={...this.props.news.video,...{vr_enable:value}};
    this.props.dispatch({
      type:"news/fetchVideoQuery",payload:video
    })
    this.props.dispatch({
      type:"news/findAllVideos",payload:video
    })
  }
  //修改权限和状态(完成)
  handleChange2=(record,e)=>{
      if(e._owner.key=="vr_permission"){
       this.props.dispatch({
        type:"news/fetchPermissionVideo",payload:{
            params:{vr_permission: record,
              id: e._owner.pendingProps.record.id},
            video:this.props.news.video
          }
        })
      }else{
        this.props.dispatch({
          type:"news/fetchEnableOrFreezeVideo",
          payload:{
            params:{ vr_enable:record,
              ids:[e._owner.pendingProps.record.id]},
            video:this.props.news.video
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
    var video={...this.props.news.video,...{bytime:e.target.checked}};
    console.log(video)
    this.props.dispatch({
      type:"news/fetchVideoQuery",payload:video
    })
    this.props.dispatch({
    type:"news/findAllVideos",payload:video
    })

  }
  //根据热度排序(完毕)
  checkHotChange=(e)=>{
    var video={...this.props.news.video,...{byhot:e.target.checked}};
    this.props.dispatch({
      type:"news/fetchVideoQuery",payload:video
    })
    this.props.dispatch({
      type:"news/findAllVideos",payload:video
    })
  }

  render() {
    
    const rowSelection = {
      type:'radio',
      selectedRowKeys: this.state.id,
      columnTitle:"#",
      onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                id:selectedRowKeys,
                imgs:selectedRowKeys[0]
              })
              console.log(selectedRowKeys,"qqq")
          },

      };
      // console.log(this.props.news.arr,"ww")
      console.log(this.state.id)
    const columns = [
      {
        title: '#',
        align: 'center',
        render: (text, record, index) => `${index + 1}`,
      },
      { title: '栏目', align: 'center', dataIndex: 'catalogue_name' },
      { title: '作品', align: 'center', dataIndex: 'name' },
      { 
        title: '预览图',
        align: 'center',
        dataIndex: 'img'
      },
      { title: '作者', align: 'center', dataIndex: 'username' },
      { title: '收藏', align: 'center', dataIndex: 'collect' },
      { title: '评论', align: 'center', dataIndex: 'comment', },
      { title: '浏览', align: 'center', dataIndex: 'views' },
      {
        title: 'Action',
        align: 'center',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          return (
            <div>
              <a onClick={this.showModal}>更换</a>
            </div>
          );
        },
      },
    ];
    const columns1 = [
      { title: '名称', align: 'center', dataIndex: 'vr_name' },
      { title: '作者', align: 'center', dataIndex: 'vr_author' },
      { title: '方向', align: 'center', dataIndex: 'vr_cata_two' },
      { title: '技术', align: 'center', dataIndex: 'vr_cata_one' },
      { title: '日期', align: 'center', dataIndex: 'vr_created_time' },
    ];

    console.log(this.props.news.videos,"sss")
    return (
      <div className={styles.content}>
        <div className='btns'>
          {/* 表格 */}
          <Table
            bordered
            // rowKey="id"
            rowKey={(record, index) => index}
            size="small"
            columns={columns}
            dataSource={this.props.news.new}   
          />
        </div>
        <div>
        <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width="686px"
            height="514px"
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk} style={{ width: 200, height: 30 }}>
                完成
              </Button>
            ]}
        >
            <Search
              placeholder="请输入搜索内容"
              onChange={this.setSearch.bind(this)}
              value={this.props.news.video.search}
              onSearch={this.searchName}
              style={{ width: 200 }}
            />
            <br />
            <div>
              {/* 权限 */}
              <span style={{marginTop:"2em",fontWeight:"700",fontSize:"12px"}}>权限 </span>
              <Select value={this.props.news.video.vr_permission} size="small" placeholder="权限" defaultValue="" style={{ marginTop:"2em",marginLeft:"1em",fontSize:"12px",width:60}} onChange={this.handleChange}>
                  <Option style={{fontSize:"12px"}} value="">权限</Option>
                  <Option style={{fontSize:"12px"}} value={0}>Vip</Option>
                  <Option style={{fontSize:"12px"}} value={1}>Free</Option>
                  <Option style={{fontSize:"12px"}} value={2}>Other</Option>
              </Select>
              {/* 格式 */}
              <span style={{marginLeft:"2em",fontWeight:"700",fontSize:"12px"}}>格式 </span>
              <Select className="video_select" size="small" defaultValue="" style={{  width:"62px",height:"22px",marginLeft:"1em" ,fontSize:"12px"}}>
                  <Option style={{fontSize:"12px"}} value="">格式</Option>
                  <Option style={{fontSize:"12px"}} value="视频">视频</Option>
                  <Option style={{fontSize:"12px"}} value="专辑">专辑</Option>
              </Select>
              {/* 状态 */}
              <span style={{marginLeft:"2em",fontWeight:"700",fontSize:"12px"}}>状态 </span>
              <Select size="small" value={this.props.news.video.vr_enable} placeholder="状态" defaultValue="" style={{  width:62,height:22,marginLeft:"1em",fontSize:"12px" }} onChange={this.handleChange1}>
                  <Option style={{fontSize:"12px"}} value="">状态</Option>
                  <Option style={{fontSize:"12px"}} value={1}>启用中</Option>
                  <Option style={{fontSize:"12px"}} value={0}>冻结</Option>
              </Select>
              {/* 时间 热度 */}
              <span style={{marginLeft:"2em",fontWeight:"bold"}}>
                <Checkbox checked={this.props.news.video.bytime} onChange={this.checkTimeChange} style={{fontSize:"12px"}} >按时间</Checkbox>
              </span>
              <span style={{marginLeft:"1em",fontWeight:"bold"}}>
                <Checkbox  ckbox checked={this.props.news.video.byhot} onChange={this.checkHotChange} style={{fontSize:"12px"}} >按热度</Checkbox>
              </span>
              <br/><br/>
              <Table
                bordered
                rowKey={(record, index) => record}
                size="small"
                rowSelection={rowSelection}
                columns={columns1}
                dataSource={this.props.news.videos.results} 
                pagination={{
                  onChange: page => {
                    console.log(page);
                    this.props.dispatch({
                    type:"news/findAllVideos",
                    payload:{
                      page:page,
                      pageSize:10,
                    }
                    })
                    this.setState({
                    page:page
                    })
                  },
                  total:this.props.news.videos.count,
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
                您选择的是：{this.state.imgs.vr_name}
                <br/><br/>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 添加缩略图
                </Button>
              </Upload>
            </div>
        </Modal>
        </div>
      </div>
    )
  }
}


export default connect(({ news }) => ({
	news,
}))(News);