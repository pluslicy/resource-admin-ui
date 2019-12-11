import React from 'react';
import { Button, Radio, Table, Input, Menu, Dropdown, Icon, Checkbox, Popover, TextArea } from 'antd';
import { connect } from 'dva';
import styles from './Setting.less';
// import TextArea from 'antd/lib/input/TextArea';
import $ from 'jquery'
const CheckboxGroup = Checkbox.Group;

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      comment_status: false,
      upload_status: false,
      apply_status: false,
      checkedList: [],
      visible: false,
      visible1: false,
      disabled: true,
    }
  }

  onChange = checkedList => {
    // 选一级编目和三级编目时务必同时选二级编目
    if (checkedList.length === 2 && checkedList[0] === '1' && checkedList[1] === '3' || checkedList.length === 2 && checkedList[0] === '3' && checkedList[1] === '1') {
      checkedList.push('2')
    }
    this.setState({
      checkedList,
    }, () => {
      console.log(this.state.checkedList)
    });
  };
  handleVisibleChange = visible => {
    this.setState({ visible }, () => {
      if (this.state.visible === false && this.state.checkedList.length !== 0) {
        // 气泡弹出框关闭且多选框有改动,则发送设置请求
        var arr = this.state.checkedList
        // 数组中的最大最小值
        var max = Math.max.apply(null, arr)
        var min = Math.min.apply(null, arr)
        var values = {
          search_level_start: min,
          search_level_end: max
        }
        console.log(values)
        this.props.dispatch({ type: 'setting/updateCatalevelSearch', payload: values });
      }
    });
  };

  onChange1 = checkedList => {
    // 选一级编目和三级编目时务必同时选二级编目
    if (checkedList.length === 2 && checkedList[0] === '1' && checkedList[1] === '3' || checkedList.length === 2 && checkedList[0] === '3' && checkedList[1] === '1') {
      checkedList.push('2')
    }
    this.setState({
      checkedList,
    }, () => {
      console.log(this.state.checkedList)
    });
  };
  handleVisibleChange1 = visible1 => {
    this.setState({ visible1 }, () => {
      if (this.state.visible1 === false && this.state.checkedList.length !== 0) {
        // 气泡弹出框关闭且多选框有改动,则发送设置请求
        var arr = this.state.checkedList
        // 数组中的最大最小值
        var max = Math.max.apply(null, arr)
        var min = Math.min.apply(null, arr)
        var values = {
          upload_level_start: min,
          upload_level_end: max
        }
        console.log(values)
        this.props.dispatch({ type: 'setting/updateCatalevelUpload', payload: values });
      }
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
    // 定义一个数组，将数据存入数组
    const elements = [];
    var list = this.props.setting.CatalevelListDatas;
    list.forEach((item) => {
      elements.push(
        <div key={item.id} style={{ marginBottom: '0.5em' }}>
          {item.cata_level_num}:
          <input
            ref={item.id}
            id={item.id}
            style={{
              width: '80px',
              border: 'none',
              outline: 'none',
              marginLeft: '1em',
            }}
            onBlur={() => {
            // 禁用输入框
            this.refs[item.id].disabled = true;
            if (this.refs[item.id].value) {
              // 提交更改
              var values = {
                "cata_level_name": this.refs[item.id].value,
                "id": item.id
              }
              this.props.dispatch({ type: 'setting/updateCatalevelname', payload: values });
            }

          }}
          disabled={this.state.disabled}
          size="small"
            placeholder={item.cata_level_name}
          />
          {/* <span style={{ fontSize: '16px', marginLeft: '1em', color: 'blue', }}>{item.cata_level_name}</span> */}
          &nbsp;<a onClick={() => {
            // 设置输入框可用同时获得焦点
            this.refs[item.id].disabled = false;
            this.refs[item.id].focus();
          }}>修改</a>
        </div>
      )
    });
    // 编目应用设置
    var CDs = this.props.setting.CatalevelSettingDatas;
    if (CDs.length !== 0) {
      var ss_se = CDs.data.search_level_start + '~' + CDs.data.search_level_end;
      var us_ue = CDs.data.upload_level_start + '~' + CDs.data.upload_level_end;
    }
    const text = <span>编目设置</span>;
    const content = (
      <div style={{ width: '100px', textAlign: 'right' }}>
        <CheckboxGroup
          value={this.state.checkedList}
          onChange={this.onChange}
        >
          <Checkbox value="1">一级编目</Checkbox>
          <Checkbox value="2">二级编目</Checkbox>
          <Checkbox value="3">三级编目</Checkbox>
        </CheckboxGroup>
      </div>
    );

    const buttonWidth = 70;
    return (
      <div>
        <div className={styles.contain}>
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
              style={{ width: '3em', marginLeft: '0.5em', marginBottom: '0.8em', height: '1em' }}
              size="small"
              placeholder={ss_se}
              disabled
            />
            &nbsp;级编目&nbsp;
            <Popover placement="bottomRight" title={text} content={content} visible={this.state.visible} onVisibleChange={this.handleVisibleChange} trigger="click" >
              <a>设置</a>
            </Popover>
            <br />
            用户上传编目级别
            <Input
              style={{ width: '3em', marginLeft: '0.5em', height: '1em' }}
              size="small"
              placeholder={us_ue}
              disabled
            />
            &nbsp;级编目&nbsp;
            <Popover placement="bottomRight" title={text} content={content} visible={this.state.visible1} onVisibleChange={this.handleVisibleChange1} trigger="click">
              <a>设置</a>
            </Popover>
          </div>
        </div>
      </div >
    );
  }
}

export default connect(({ setting }) => ({ setting }))(Setting);

