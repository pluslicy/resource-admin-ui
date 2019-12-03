import React from 'react';
import { Button, Radio, Table, Input, Menu, Dropdown, Icon, Checkbox,Popover } from 'antd';
import { connect } from 'dva';
import styles from './Setting.less';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['一级编目', '二级编目', '三级编目'];
const defaultCheckedList = ['一级编目', '二级编目'];

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      comment_status: false,
      upload_status: false,
      apply_status: false,
      // catalevelList:[],
    }
  }
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };
  componentWillMount() {
    // 需要异步一起执行的方法
    this.props.dispatch({ type: 'setting/getSysSetting' });
    this.props.dispatch({ type: 'setting/getCatalevelList' });
    this.props.dispatch({ type: 'setting/getCatalevelSetting' });
  }

  componentDidMount() {
    // 组件挂载到DOM后调用
  }
  componentWillUpdate() {
    // 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
  }

  componentWillReceiveProps(nextProps) {
    // 该方法当props发生变化时执行，初始化render时不执行
    if (nextProps !== this.props) {
      let set = nextProps.setting.SysSettingDatas.data
      // 这里有一处bug
      console.log(set)
      if (nextProps !== null && set !== undefined) {
        this.props = nextProps;
        this.setState({
          comment_status: set.comment_status,
          upload_status: set.upload_status,
          apply_status: set.apply_status,
        })
        this.changeSwitch('comment_status')
        this.changeSwitch('upload_status')
        this.changeSwitch('apply_status')
        return;
      }
      if (this.state !== null) {
        console.log(this.state)
      }
    }
  }

  setSysSetting(x) {
    // 更改系统设置
    var values = { [x]: !this.state[x], }
    this.props.dispatch({ type: 'setting/setSysSetting', payload: values });
  }

  changeSwitch(x) {
    // 根据系统设置切换设置按钮的图片
    if (this.props.setting.SysSettingDatas.data[x] === true) {
      var oDiv = document.getElementById(x);
      oDiv.removeChild(document.getElementById('img_' + x));
      var mytr = document.createElement('img');
      mytr.id = 'img_' + x;
      mytr.src = require('../../../images/setting/p1.png');
      oDiv.appendChild(mytr);
    } else if (this.props.setting.SysSettingDatas.data[x] === false) {
      var oDiv = document.getElementById(x);
      oDiv.removeChild(document.getElementById('img_' + x));
      var mytr = document.createElement('img');
      mytr.id = 'img_' + x;
      mytr.src = require('../../../images/setting/p0.png');
      oDiv.appendChild(mytr);
    }
  };

  render() {
    //定义一个数组，将数据存入数组
    const elements = [];
    var list = this.props.setting.CatalevelListDatas;
    list.forEach((item) => {
      elements.push(
        <div key={item.id} style={{ marginBottom:'0.5em' }}>
          {item.cata_level_num}:
          <span style={{ fontSize: '16px', marginLeft: '1em', color: 'blue' ,}}>{item.cata_level_name}</span>&nbsp;<a>修改</a>
        </div>
      )
    });
    var CDs = this.props.setting.CatalevelSettingDatas;
    if (CDs.length !== 0) {
      console.log(CDs)
      var ss_se = CDs.data.search_level_start + '~' + CDs.data.search_level_end;
      var us_ue = CDs.data.upload_level_start + '~' + CDs.data.upload_level_end;
    }
    const text = <span>编目设置</span>;
    const content = (
      <div style={{width:'177px'}}>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >全选
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </div>
    );

    const buttonWidth = 70;
    return (
      <div>
        <div className={styles.contain}>
          {/* <Button onClick={() => {
            console.log(this.props.setting)
          }}>测试按钮</Button> */}
          <p>系统一键开关</p>
          <div className={styles.switch_div}>
            <div
              id="comment_status"
              className={styles.imgs}
              onClick={() => {
                this.setSysSetting('comment_status');
              }}
            >
              <img id="img_comment_status" src={require('../../../images/setting/p0.png')} />
            </div>
            <div>
              <p className={styles.imgsp}>评论开关</p>
            </div>
          </div>
          <div className={styles.switch_img}>
            <img src={require('../../../images/setting/p2.png')} alt="" />
          </div>
          <div className={styles.switch_div}>
            <div
              id="upload_status"
              className={styles.imgs}
              onClick={() => {
                this.setSysSetting('upload_status');
              }}
            >
              <img id="img_upload_status" src={require('../../../images/setting/p0.png')} />
            </div>
            <div className={styles.imgsp}>
              <p>上传开关</p>
            </div>
          </div>
          <div className={styles.switch_img}>
            <img src={require('../../../images/setting/p2.png')} alt="" />
          </div>
          <div className={styles.switch_div}>
            <div
              id="apply_status"
              className={styles.imgs}
              onClick={() => {
                this.setSysSetting('apply_status');
              }}
            >
              <img id="img_apply_status" src={require('../../../images/setting/p0.png')} />
            </div>
            <div className={styles.imgsp}>
              <p>申请认证开关</p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: '55%',
            height: '100%',
            float: 'left',
            padding: '1em',
            marginTop: '20px',
            backgroundColor: '#ffffff',
          }}
        >
          <div>
            <span>编目设置</span>
            <br />
            {/* <span style={{ fontSize: '20px' }}>资源库</span> */}
            <hr />
            {/* 一级编目:
            <span style={{ fontSize: '16px', marginLeft: '1em', color: 'blue' }}>技术方向</span>
            &nbsp;修改
            <br />
            二级编目:
            <Input
              style={{ width: '20%', marginLeft: '1em' }}
              size="small"
              placeholder="给你的编目起名"
            /> 
            <Button type="dashed" disabled={this.state.isDisabled}>Dashed(disabled)</Button>*/}
            <div>{elements}</div>
          </div>
        </div>
        <div
          style={{
            width: '43%',
            height: '100%',
            height: '200px',
            float: 'left',
            padding: '1em',
            marginTop: '20px',
            marginLeft: '2%',
            backgroundColor: '#ffffff',
          }}
        >
          <div>
            <span>编目应用设置</span>
            <br />
            <hr />
            首页检索编目级别
            <Input
              style={{ width: '3em', marginLeft: '0.5em', marginBottom:'0.8em' ,height:'1em'}}
              size="small"
              placeholder={ss_se}
              disabled
            />
            &nbsp;级编目&nbsp;
            <Popover placement="bottomRight" title={text} content={content} trigger="click" >
              <a>设置</a>
            </Popover>
            <br />
            用户上传编目级别
            <Input
              style={{ width: '3em', marginLeft: '0.5em' ,height:'1em'}}
              size="small"
              placeholder={us_ue}
              disabled
            />
            &nbsp;级编目&nbsp;
            <Popover placement="bottomRight" title={text} content={content} trigger="click">
              <a>设置</a>
            </Popover>
          </div>
        </div>
      </div >
    );
  }
}

export default connect(({ setting }) => ({ setting }))(Setting);

