import React from 'react';
import styles from './catelog.less'

class Catalog extends React.Component {
	
	render(){
		return (
			
		<div className={styles.content}>
			<div className={styles.left}></div>

			<div  className={styles.right}>
				<div  className={styles.middle}>操作面板 ｜ 视频库编目</div>

			</div>
				
		</div>
			)
	}
}
export default Catalog;
