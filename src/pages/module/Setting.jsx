import React from 'react';
import { Button, Radio, Table, Input, Menu, Dropdown, Icon, Switch } from 'antd';
import styles from './Setting.less';
class Setting extends React.Component {
  state = {
    value: 1,
    switch1_value: 0,
    switch2_value: 0,
    switch3_value: 0,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  changeSwitch1 = e => {
    // document.getElementById('imgs1').setAttribute('style','background-image:url(https://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8d5494eef01f3a29c3907a9c9725bc315c607c0c.jpg)')
    if (this.state.switch1_value === 0) {
      var oDiv = document.getElementById('switch1');
      oDiv.removeChild(document.getElementById('img'));
      var mytr = document.createElement('img');
      mytr.id = 'img';
      mytr.src = require('../../../images/setting/p1.png');
      oDiv.appendChild(mytr);
      this.setState({ switch1_value: 1 });
    } else {
      var oDiv = document.getElementById('switch1');
      oDiv.removeChild(document.getElementById('img'));
      var mytr = document.createElement('img');
      mytr.id = 'img';
      mytr.src = require('../../../images/setting/p0.png');
      oDiv.appendChild(mytr);
      this.setState({ switch1_value: 0 });
    }
  };

  changeSwitch2 = e => {
    if (this.state.switch2_value === 0) {
      var oDiv = document.getElementById('switch2');
      oDiv.removeChild(document.getElementById('img2'));
      var mytr = document.createElement('img');
      mytr.id = 'img2';
      mytr.src = require('../../../images/setting/p1.png');
      oDiv.appendChild(mytr);
      this.setState({ switch2_value: 1 });
    } else {
      var oDiv = document.getElementById('switch2');
      oDiv.removeChild(document.getElementById('img2'));
      var mytr = document.createElement('img');
      mytr.id = 'img2';
      mytr.src = require('../../../images/setting/p0.png');
      oDiv.appendChild(mytr);
      this.setState({ switch2_value: 0 });
    }
  };
  changeSwitch3 = e => {
    if (this.state.switch3_value === 0) {
      var oDiv = document.getElementById('switch3');
      oDiv.removeChild(document.getElementById('img3'));
      var mytr = document.createElement('img');
      mytr.id = 'img3';
      mytr.src = require('../../../images/setting/p1.png');
      oDiv.appendChild(mytr);
      this.setState({ switch3_value: 1 });
    } else {
      var oDiv = document.getElementById('switch3');
      oDiv.removeChild(document.getElementById('img3'));
      var mytr = document.createElement('img');
      mytr.id = 'img3';
      mytr.src = require('../../../images/setting/p0.png');
      oDiv.appendChild(mytr);
      this.setState({ switch3_value: 0 });
    }
  };

  render() {
    // 下拉菜单
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <div className={styles.contain}>
          <p>系统一键开关</p>
          <div className={styles.switch_div}>
            <div
              id="switch1"
              className={styles.imgs}
              onClick={() => {
                this.changeSwitch1();
              }}
            >
              <img id="img" src={require('../../../images/setting/p0.png')} />
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
              id="switch2"
              className={styles.imgs}
              onClick={() => {
                this.changeSwitch2();
              }}
            >
              <img id="img2" src={require('../../../images/setting/p0.png')} />
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
              id="switch3"
              className={styles.imgs}
              onClick={() => {
                this.changeSwitch3();
              }}
            >
              <img id="img3" src={require('../../../images/setting/p0.png')} />
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
      </div>
    );
  }
}

export default Setting;
