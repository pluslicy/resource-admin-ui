import React from 'react'

import {connect} from 'dva'
import {
    Form,
    Input,
    Select,
    Upload,Button,Icon,Checkbox,Radio,
    Cascader,
    Tabs,Modal
  } from 'antd'
  const { TextArea } = Input;
class AlbumForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            key:"",
            childs:[],
            visible:false,
           
        }
    }
    componentDidMount(){
        
    }
    selectFang=(value)=>{
        var a=this.props.Db.catalist[0].childs.filter((item,index)=>{
            if(item.id==value) return item;
          })
          this.setState({
            childs:a[0].childs,
            value
          })
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
        return (
            <div className="albumForm">
                 <Form style={{marginLeft:"-2.1em"}} {...formItemLayout} className="album-form">
                    <Form.Item label="专辑名称">
                        {getFieldDecorator('da_name', {
                           
                        })(<Input />)}
                    </Form.Item>
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
                             getFieldDecorator('text_js',{})
                             (
                               <Cascader  options={this.state.childs}  fieldNames={{ label: 'catalogue_name', value: 'id', children: 'childs' }}  changeOnSelect placeholder="请选择技术"/>
                             )
                         }
                   </Form.Item>  
                   <Form.Item  label="专辑描述">
                     {getFieldDecorator('da_desc', {
                     
                     })(
                       <TextArea rows={3} />
                     )}
                   </Form.Item>
                 </Form>
            </div>
        )
    }
}
const mapPropsToFields = (props) =>{

    let obj = {};
    for(let key in props.text){
      obj[key] = Form.createFormField({
        value: props.text[key]
      })
    }
    return obj;
  }
export default connect((state)=>state)(Form.create({
    mapPropsToFields}
)(AlbumForm))