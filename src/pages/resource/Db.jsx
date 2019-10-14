import React from 'react'
import { connect } from 'dva';
import {Tree,Tabs} from 'antd';

import styles from './db.less'
import VideoModel from './VideoModel'
import TextModel from './TextModel'
const { TreeNode } = Tree;
const { TabPane } = Tabs;
class Db extends React.Component{
  constructor(props){
    super(props)
    this.state={
      treekey:"",
      query:{
        vr_created_time_start:"",
        vr_created_time_end:"",
        bytime:false,
        byhot:false,
        search:"",
        vr_format:"",
        dr_permission:"",
        vr_enable:'',
        catalogue_path:"",
        catalogue:""
      },
      textQuery:{
        dr_created_time_start:"",
        dr_created_time_end:"",
        bytime:false,
        byhot:false,
        search:"",
        dr_permission:"",
        dr_format:"",
        dr_enable:"",
        catalogue_path:"1.",
        catalogue:""
      },
    }
  }
  callback(key) {
    console.log(key);
  }
  selectTree=(selectedKeys,e)=>{
    if(e.selectedNodes[0]!=null){
      this.setState({
        treekey:e.selectedNodes[0].props.dataRef.catalogue_path
      })
      
        
        var vq={...this.props.vt.vq,...{catalogue_path:e.selectedNodes[0].props.dataRef.catalogue_path}};
        this.props.dispatch({
          type:"vt/fetchVideoQuery",payload:vq
        })
        this.props.dispatch({
          type:"Db/fetchVideo",payload:{...this.props.vt.vq,...{catalogue_path:e.selectedNodes[0].props.dataRef.catalogue_path}}
        })
        
        var tq={...this.props.vt.tq,...{catalogue_path:e.selectedNodes[0].props.dataRef.catalogue_path}};
        this.props.dispatch({
          type:"vt/fetchTextQuery",payload:tq
        })
        this.props.dispatch({
          type:"Db/fetchText",payload:{...this.state.textQuery,...{catalogue_path:e.selectedNodes[0].props.dataRef.catalogue_path}}
        })
    
    } 
  }
  //生成树，已完成
  componentDidMount(){
    this.props.dispatch({
      type:"Db/fetchCata"
    })
  }
  renderTreeNodes = data =>
  data.map(item => {
    if (item.childs) {
      return (
        <TreeNode title={item.catalogue_name} key={item.id} dataRef={item}>
          { 
            this.renderTreeNodes(item.childs)
          }
        </TreeNode>
      );
    }
     return <TreeNode {...item} />;
  }); 
  render(){
    const {childs} =this.props.Db.catalist[0];
    return (
      <div className={styles.content}>
           <div className="left-div" style={{borderRight:"1px solid #e8e8e8",minWidth:"145px"}}>
              <img style={{position:"absolute",marginLeft:"-1.8em",marginTop:"1em"}} src={require('./u578.png')} alt=""/>
              <div  style={{position:"absolute",width:"89px",height:"24px",backgroundColor:"rgba(15, 105, 255, 1)",marginTop:"1em",marginLeft:"-1em",fontSize:"12px",color:"#ffffff",textAlign:"center",paddingTop:"2px"}}>
                {this.props.Db.catalist[0].catalogue_name}
              </div>
              <div style={{marginTop:"3em",marginLeft:".2em"}}>
                  <Tree onSelect={this.selectTree}>
                    {this.renderTreeNodes(childs)}
                  </Tree>
              </div>
            </div>
            <div  className="right-div" style={{flex:"6",overflow:"hidden"}}>
            <Tabs animated={false} style={{marginLeft:".5em"}} defaultActiveKey="视频" onChange={this.callback}>
              <TabPane tab="视频" key="视频">
                <VideoModel  treekey={this.state.treekey}></VideoModel>
              </TabPane>
              <TabPane tab="文档" key="文档">
                <TextModel treekey={this.state.treekey}></TextModel>
              </TabPane>
            </Tabs>

            </div>
      </div>
    );
  }
}
export default connect(state=>state)(Db);