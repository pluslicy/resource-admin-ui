import React from 'react';
import styles from './Welcome.less';
export default () => (
  <div>
    <div className={styles.content} style={{ backgroundColor: 'rgba(251, 173, 76, 1)' }} >
      <div className={styles.imgs}><img src={require('../../images/index/u50.png')} /></div>
      <div className={styles.name}><span>用户</span><br /><span>325</span></div>
    </div>
    <div className={styles.content} style={{ backgroundColor: 'rgba(89, 208, 93, 1)' }}>
      <div className={styles.imgs}><img src={require('../../images/index/u54.png')} /></div>
      <div className={styles.name}><span>视频</span><br /><span>2357</span></div>
    </div>
    <div className={styles.content} style={{ backgroundColor: 'rgba(255,100,109, 1)' }}>
      <div className={styles.imgs}><img src={require('../../images/index/u58.png')} /></div>
      <div className={styles.name}><span>文档</span><br /><span>2435</span></div>
    </div>
    <div className={styles.content} style={{ backgroundColor: 'rgba(29,98,240,1)' }}>
      <div className={styles.imgs}><img src={require('../../images/index/u62.png')} /></div>
      <div className={styles.name}><span>学校</span><br /><span>352</span></div>
    </div>
  </div >
);
