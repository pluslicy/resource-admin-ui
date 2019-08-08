import React from 'react'
import {
    Form,
    Input,
    Select,
    Upload,Button,Icon,Checkbox,Radio,
    Cascader
  } from 'antd'
const { TextArea } = Input;
import {connect} from 'dva'
import styles from './db.less';
import $ from 'jquery'


const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class Db2Form extends React.Component{

    constructor(props){
      super(props)
      this.state={
        value:"文档"
      }
    }
    componentWillMount(){
      console.log(this.props.flag)
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
      console.log('radio checked', e.target.value);
      if(e.target.value==="文档"){
        $('.video-form').css({"display":"block"})
        $('.album-form').css({"display":"none"})
      }else{
        $('.album-form').css({"display":"block"})
        $('.video-form').css({"display":"none"})
      }
      this.setState({
        value: e.target.value,
      });
    };
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
            <Radio.Group style={{position:"absolute",left:"33.5%",top:"11em"}} onChange={this.onRadioChange} value={this.state.value} >
                <Radio value={"文档"}>文档</Radio>
                <Radio value={"专辑"} style={{marginLeft:"2em"}}>专辑</Radio>
            </Radio.Group>
            <Form {...formItemLayout} className="video-form">
            
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
              <Form.Item  label="文档描述">
                {getFieldDecorator('description', {
                
                })(
                  <TextArea rows={3} />
                )}
              </Form.Item>
            </Form>
          
            <Form {...formItemLayout} className="album-form" style={{display:"none"}}>
            
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
              <Form.Item  label="专辑描述">
                {getFieldDecorator('adescription', {
                
                })(
                  <TextArea rows={3} />
                )}
              </Form.Item>
            </Form>
            
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
)(Db2Form))