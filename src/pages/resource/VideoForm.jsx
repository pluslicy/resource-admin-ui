import React from 'react'
import {
    Form,
    Input,
    Select,
    Upload,Button,Icon,Checkbox,Radio,
    Cascader,
    Tabs
  } from 'antd'
const { TextArea } = Input;
const { TabPane } = Tabs;
import {connect} from 'dva'
import styles from './db.less';


const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class VideoForm extends React.Component{

    constructor(props){
      super(props)
      this.state={
          key:this.props.flag
      }
    }
    componentWillMount(){
      
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
    onRadioChange = e => {
        if(e.target.value==="视频"){
            this.setState({
                key:"视频"
            })
          }else{
            this.setState({
                key:"专辑"
            })
          }
          this.setState({
            value: e.target.value,
          });
    };
    callback=(key)=>{
      console.log(key)
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
            {/* <div></div> */}
            <Tabs  tabBarStyle={{bottom:"none"}} style={{marginTop:"-6.6em",border:"none",marginLeft:"3em"}} animated={false} activeKey={this.state.key} onChange={this.callback}>
              <Radio.Group defaultValue={this.state.key} style={{marginLeft:".5em"}} onChange={this.onRadioChange} >
                  <Radio value={"视频"}>视频</Radio>
                  <Radio value={"专辑"} style={{marginLeft:"2em"}}>专辑</Radio>
              </Radio.Group>
              <TabPane style={{bottom:"none"}} key="视频">
              <Form style={{marginLeft:"-2.1em",marginTop:"2em"}} {...formItemLayout} className="video-form">
                    
                    <Form.Item label="方向">
                          {
                              getFieldDecorator('id',{})
                              (
                                  <Select  placeholder="请选择方向" name='teacherId'  >
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
                              getFieldDecorator('dd',{})
                              (
                                <Cascader options={this.props.Db.catalist[0].childs} fieldNames={{ label: 'catalogue_name', value: 'id', children: 'childs' }}  changeOnSelect placeholder="请选择方向"/>
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
              <Form style={{marginLeft:"-1.5em",marginTop:"2em"}} {...formItemLayout} className="album-form" >
                  <Form.Item label="所属专辑">
                          {
                              getFieldDecorator('teacherId',{})
                              (
                                  <Select  placeholder="请选择专辑" name='teacherId'  >
                                  {/* {
                                      this.props.teacherState.teachers.map((item)=>{
                                          return <Option key={item.id} value={item.id}>{item.realname}</Option>
                                      })
                                  } */}
                                  </Select>
                              )
                          }
                    </Form.Item>
                    <Form.Item label="方向">
                          {
                              getFieldDecorator('sd',{})
                              (
                                  <Select  placeholder="请选择方向" name='teacherId'  >
                                  {/* {
                                      this.props.teacherState.teachers.map((item)=>{
                                          return <Option key={item.id} value={item.id}>{item.realname}</Option>
                                      })
                                  } */}
                                  </Select>
                              )
                          }
                    </Form.Item>
                    <Form.Item label="技术" >
                          {
                              getFieldDecorator('ad',{})
                              (
                                  <Select  placeholder="请选择技术" name='teacherId'  >
                                  {/* {
                                      this.props.teacherState.teachers.map((item)=>{
                                          return <Option key={item.id} value={item.id}>{item.realname}</Option>
                                      })
                                  } */}
                                  </Select>
                              )
                          }
                    </Form.Item>  
                    <Form.Item  label="">
                      {getFieldDecorator('gg', {
                        })(
                      
                        <Checkbox style={{paddingLeft:"5em"}} value={1}> &nbsp;设置为vip</Checkbox>
                      )}
                    </Form.Item>
                    <Form.Item style={{marginTop:"-1em"}} label="专辑描述">
                      {getFieldDecorator('adescription', {
                      
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
    for(let key in props.course){
      obj[key] = Form.createFormField({
        value: props.course[key]
      })
    }
    return obj;
  }
export default connect((state)=>state)(Form.create({
    mapPropsToFields}
)(VideoForm))