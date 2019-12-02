import React from 'react';
import { Button, Radio, Table, Input, Menu, Dropdown, Icon, Switch } from 'antd';
import { connect } from 'dva';
import styles from './Setting.less';
class Setting extends React.Component {
  constructor(props) {
    console.log(props,'**********')
    super(props);
    this.state = {
      isDisabled: true,
      comment_status: false,
      upload_status: false,
      apply_status: false,
    }
  }

  componentWillMount() {
    // 需要异步一起执行的方法
    this.props.dispatch({ type: 'setting/getSysSetting' });
    this.props.dispatch({ type: 'setting/getCatalevelList' });
    this.props.dispatch({ type: 'setting/getCatalevelSetting' });
  }

  componentDidMount() {
    console.log()
    // 组件挂载到DOM后调用
    // this.changeSwitch('comment_status')
    // this.changeSwitch('upload_status')
    // this.changeSwitch('apply_status')

  }
  componentWillUpdate(){
    // 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
    console.log(this.props.setting.SysSettingDatas.data)
    console.log(this.props.setting.SysSettingDatas.data)
    console.log(this.props.setting.SysSettingDatas.data)

    // this.changeSwitch('comment_status')
    // this.changeSwitch('upload_status')
    // this.changeSwitch('apply_status')
  }

  componentWillReceiveProps(nextProps) {
  //   // 该方法当props发生变化时执行，初始化render时不执行
  //   this.componentWillMount
  //   console.log(nextProps.setting, '===')
  //   console.log(this.props.setting, '---')
  //   if (nextProps !== this.props) {
  //     let set = nextProps.setting.SysSettingDatas.data
  //     if (nextProps == ! null) {
  //       alert(123)
  //       this.setState({
  //         comment_status: set.comment_status,
  //         upload_status: set.upload_status,
  //         apply_status: set.apply_status,
  //       })
  //     }
  //     if (this.state === ! null) {
  //       alert(999)
  //       console.log(this.state)

  //     }
  //   }
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  changeSwitch(x) {
    console.log(this.props.setting.SysSettingDatas.data,'===---')
    if (this.props.setting.SysSettingDatas.data[x] === true) {
      console.log('true')
      var oDiv = document.getElementById(x);
      oDiv.removeChild(document.getElementById('img_' + x));
      var mytr = document.createElement('img');
      mytr.id = 'img_' + x;
      mytr.src = require('../../../images/setting/p1.png');
      oDiv.appendChild(mytr);
      this.setState({ [x]: false });
    } else if (this.props.setting.SysSettingDatas.data[x] === false) {
      console.log('false')
      var oDiv = document.getElementById(x);
      oDiv.removeChild(document.getElementById('img_' + x));
      var mytr = document.createElement('img');
      mytr.id = 'img_' + x;
      mytr.src = require('../../../images/setting/p0.png');
      oDiv.appendChild(mytr);
      this.setState({ [x]: true });
    }
  };

  render() {
    return (
      <div>
        <div className={styles.contain}>
          <Button onClick={() => {
            console.log(this.props.setting)
          }}>设置状态</Button>

          {/* <Button onClick={() => this.changeSwitch('comment_status')}>设置状态</Button>
          <Button onClick={() => this.changeSwitch('upload_status')}>设置状态</Button>
          <Button onClick={() => this.changeSwitch('apply_status')}>设置状态</Button> */}
          <p>系统一键开关</p>
          <div className={styles.switch_div}>
            <div
              id="comment_status"
              className={styles.imgs}
              onClick={() => {
                this.changeSwitch('comment_status');
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
                this.changeSwitch('upload_status');
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
                this.changeSwitch('apply_status');
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
            height: '200px',
            float: 'left',
            padding: '1em',
            marginTop: '20px',
            backgroundColor: '#ffffff',
          }}
        >
          <div>
            <span>编目设置</span>
            <br />
            <span style={{ fontSize: '20px' }}>资源库</span>
            <hr />
            一级编目:
            <span style={{ fontSize: '16px', marginLeft: '1em', color: 'blue' }}>技术方向</span>
            &nbsp;修改
            <br />
            二级编目:
            <Input
              style={{ width: '20%', marginLeft: '1em' }}
              size="small"
              placeholder="给你的编目起名"
            />
            <Button type="dashed" disabled={this.state.isDisabled}>Dashed(disabled)</Button>
          </div>
        </div>
        <div
          style={{
            width: '43%',
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
              style={{ width: '20%', marginLeft: '1em' }}
              size="small"
              placeholder="1~2"
              disabled
            />
            &nbsp;级编目&nbsp;<a>设置</a>
            <br />
            用户上传编目级别
            <Input
              style={{ width: '20%', marginLeft: '1em' }}
              size="small"
              placeholder="1~2"
              disabled
            />
            &nbsp;级编目&nbsp;<a>设置</a>
          </div>
        </div>
      </div >
    );
  }
}

export default connect(({ setting }) => ({ setting }))(Setting);

