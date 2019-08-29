import React from 'react'
import {
    Form,
    Input,
    Select,
    Upload,Button,Icon,Checkbox,Radio,
    Cascader,
    Tabs,
    Modal
  } from 'antd'
const { TextArea } = Input;
const { TabPane } = Tabs;
import {connect} from 'dva'
import styles from './db.less';

var flag="";
const Option = Select.Option;

class VideoForm extends React.Component{

    constructor(props){
      super(props)
      this.state={
          key:"",
          childs:[],

      }
    }
    componentDidMount(){
      this.setState({
        key:this.props.flag
      })
    }
    componentWillMount(){
      this.props.dispatch({
        type:'Db/fetchVideoDalBum'
      })
    }
    handleChange(value) {
      console.log(`selected ${value}`);
    }
    normFile = e => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
   
    callback=(key)=>{
      console.log(key)
    }
    selectFang(value){ 
      var a=this.props.Db.catalist[0].childs.filter((item,index)=>{
        if(item.id==value) return item;
      })
      this.setState({
        childs:a[0].childs,
        value
      })
     
    }
    handleCancel=()=>{
      this.props.dispatch({
        type:"Db/fetchUpdateFlag",payload:""
      })
    }
    loadRadio(){
      if(this.props.vtest.flag=="视频"){
        // this.setState({
        //   key:this.props.vtest.flag
        // })
        flag="视频"
        return (<span><Radio value={"视频"}>视频</Radio><Radio disabled={true} value={"专辑"} style={{marginLeft:"2em"}} >专辑</Radio></span>)
      }else if(this.props.vtest.flag=="专辑"){
        // this.setState({
        //   key:this.props.vtest.flag
        // })
        flag="专辑"
       return  <span><Radio disabled={true} value={"视频"}>视频</Radio><Radio  value={"专辑"} style={{marginLeft:"2em"}} >专辑</Radio></span>
      }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
          },
        };

        getFieldDecorator('id')
        return (
          
            // <div className="DbForm" style={{width:"800px",height:"550px",}}>
            <div className={styles.DbForm}>
            <Tabs className={styles.tab} tabBarStyle={{bottom:"none"}} style={{marginTop:"-6.6em",border:"none",marginLeft:"3em"}} animated={false} activeKey={this.props.vtest.flag} onChange={this.callback}>
                
                <Form.Item>
                              {
                                  getFieldDecorator('flag',{})
                                  (
                                    <Radio.Group  style={{marginLeft:".5em"}}   >
                                        {this.loadRadio()}
                                    </Radio.Group>
                                  )
                              }
                </Form.Item>
              <TabPane className={styles.tb} style={{bottom:"none"}} key="视频">
              <Form style={{marginLeft:"-2.1em",marginTop:"0em"}} {...formItemLayout} className="video-form">
                    
                    <Form.Item label="方向">
                          {
                              getFieldDecorator('id',{})
                              (
                                <Select style={{borderBottom:"2px solid #e8e8e8",borderRadius:"4px"}} onChange={this.selectFang.bind(this)} placeholder="请选择方向" name='teacherId'  >
                                {
                                    this.props.Db.catalist[0].childs.map((item)=>{
                                        return <Option key={item.id} value={item.id}>{item.catalogue_name}</Option>
                                    })
                                }
                                </Select>
                              )
                          }
                    </Form.Item>
                    <Form.Item label="技术" >
                          {
                              getFieldDecorator('video_js',{})
                              (
                                <Cascader  options={this.state.childs}  fieldNames={{ label: 'catalogue_name', value: 'id', children: 'childs' }}  changeOnSelect placeholder="请选择技术"/>
                              )
                          }
                    </Form.Item>  
                    <Form.Item  label="">
                      {getFieldDecorator('name', {
                        })(
                      
                        <Checkbox style={{paddingLeft:"5em"}} value={1}> &nbsp;设置为vip</Checkbox>
                      )}
                    </Form.Item>
                    <Form.Item  label="视频描述">
                      {getFieldDecorator('description', {
                      
                      })(
                        <TextArea rows={3} />
                      )}
                    </Form.Item>
                  </Form>
              </TabPane>
              <TabPane style={{bottom:"none"}} key="专辑">
              <Button style={{position:"absolute",left:"83%",top:"3.8em"}}>创建专辑</Button>
              <Form  className={styles.tb} style={{marginLeft:"-1.5em",marginTop:"0em"}} {...formItemLayout} className="album-form" >
                  <Form.Item label="所属专辑">
                          {
                              getFieldDecorator('da',{})
                              (
                                  <Select style={{borderBottom:"2px solid #e8e8e8",borderRadius:"4px"}} placeholder="请选择专辑" name='da'  >
                                  {
                                      this.props.Db.videodalbum.map((item)=>{
                                          return <Option key={item.id} value={item.id}>{item.va_name}</Option>
                                      })
                                  }
                                  </Select>
                              )
                          }
                    </Form.Item>
                    <Form.Item label="方向">
                          {
                              getFieldDecorator('zj_fid',{})
                              (
                                <Select style={{borderBottom:"2px solid #e8e8e8",borderRadius:"4px"}} onChange={this.selectFang.bind(this)} placeholder="请选择方向" name='teacherId'  >
                                {
                                    this.props.Db.catalist[0].childs.map((item)=>{
                                        return <Option key={item.id} value={item.id}>{item.catalogue_name}</Option>
                                    })
                                }
                                </Select>
                              )
                          }
                    </Form.Item>
                    <Form.Item label="技术" >
                          {
                              getFieldDecorator('zj_ad',{})
                              (
                                <Cascader  options={this.state.childs}  fieldNames={{ label: 'catalogue_name', value: 'id', children: 'childs' }}  changeOnSelect placeholder="请选择技术"/>
                              )
                          }
                    </Form.Item>  
                    <Form.Item  label="">
                      {getFieldDecorator('zj_vip', {
                        })(
                      
                        <Checkbox style={{paddingLeft:"5em"}} value={1}> &nbsp;设置为vip</Checkbox>
                      )}
                    </Form.Item>
                    <Form.Item style={{marginTop:"-1em"}} label="专辑描述">
                      {getFieldDecorator('zj_description', {
                      
                      })(
                        <TextArea rows={3} />
                      )}
                    </Form.Item>
                  </Form>
              </TabPane>
            </Tabs>

            </div>
        );
    }
}
const mapPropsToFields = (props) =>{

    let obj = {};
    for(let key in props.vtest){
      obj[key] = Form.createFormField({
        value: props.vtest[key]
      })
    }
    return obj;
  }
export default connect((state)=>state)(Form.create({
    mapPropsToFields}
)(VideoForm))