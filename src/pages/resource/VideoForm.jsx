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
import AlbumForm from './albumForm'
var flag="";
const Option = Select.Option;

class VideoForm extends React.Component{

    constructor(props){
      super(props)
      this.state={
          key:"",
          childs:[],
          visible:false
      }
    }
    showBum(){
      this.setState({
        visible:true
      })
    }
    closeBum=()=>{
      this.setState({
        visible:false
      })
    }
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
    componentDidMount(){
      this.setState({
        key:this.props.vt.flag
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
    formatDate=(date)=>{  
      var y = date.getFullYear();  
      var m = date.getMonth() + 1;  
      m = m < 10 ? '0' + m : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      var hh=date.getHours();
      var mm=date.getMinutes();
      return y + '-' + m + '-' + d+'T'+hh+':'+mm;  
    }; 
    handleOk = e => {
      // 提交表单
      e.preventDefault();
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
          if (err) {
          return;
          }
  
          console.log('Received values of form: ', values);
          var obj={};
          obj.va_name=values.da_name;
          obj.va_desc=values.da_desc;
          obj.catalogue=parseInt(values.text_js[0]);
          obj.user=24;
          obj.va_created_time=this.formatDate(new Date());
          console.log(obj)
          this.props.dispatch({
            type:"Db/fetchCreateVideoAlbum",
            payload:obj
          })
          // form.resetFields();
      });
      this.setState({
        visible:false
      })
      };
    onRadioChange = e => {
      // console.log("aaaaaaaaaaaa",this.props.Db.flag)

      console.log(e.target.value)
        if(e.target.value==="视频"){
           
            this.props.dispatch({
              type:'vt/fetchUpdateFlag',payload:"视频"
            })
          }else{
            this.props.dispatch({
              type:'vt/fetchUpdateFlag',payload:"专辑"
            })
          }

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
            <Tabs className={styles.tab} tabBarStyle={{bottom:"none"}} style={{marginTop:"-6.6em",border:"none",marginLeft:"3em"}} animated={false} activeKey={this.props.vt.flag} onChange={this.callback}>
                
                <Form.Item>
                      <Radio.Group value={this.props.vt.flag} style={{marginLeft:".5em",height:"40px",marginTop:"1em"}} onChange={this.onRadioChange} >
                                       <Radio value={"视频"}>视频</Radio>
                                       <Radio checked  value={"专辑"} style={{marginLeft:"2em"}} >专辑</Radio>
                     </Radio.Group>
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
              <Button style={{position:"absolute",left:"83%",top:"3.8em"}} onClick={this.showBum.bind(this)}>创建专辑</Button>
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
                    <Form.Item  label="">
                      {getFieldDecorator('zj_vip', {
                        })(
                      
                        <Checkbox style={{paddingLeft:"5em"}} value={1}> &nbsp;设置为vip</Checkbox>
                      )}
                    </Form.Item>

                  </Form>
              </TabPane>
            </Tabs>
            <Modal
                        onCancel={this.closeBum}
                        title="自定义创建专辑"
                        visible={this.state.visible}
                        footer={[
                            <Button onClick={this.handleOk.bind(this)} style={{marginRight:"40%"}}>确认</Button>
                        ]}
                        >
                      <AlbumForm wrappedComponentRef={this.saveFormRef}></AlbumForm>
            </Modal>
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