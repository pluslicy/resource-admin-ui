import React from 'react';
import styles from './catelog.less'
import {Tree,Input} from 'antd'
// import DagreD3, { d3 } from './react-dagre-d3';
import {connect} from 'dva'

const { TreeNode } = Tree;

  

class Catalog extends React.Component {
	
	componentDidMount(){
		this.props.dispatch({
			type:'catalog/fetchCatalog'

		})
	}
	
	componentWillMount(){
		
	}
	
	renderTreeNodes = data =>
    data.map(item => {
      if (item.childs) {
        return (
          <TreeNode title={item.catalogue_name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.childs)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
	});
	
	
	
	render(){

		return (
		<div className={styles.content}>
			<div className={styles.left}>	
			<img style={{position:"absolute",marginLeft:"-0.8em",marginTop:"1em"}} src={require('./u578.png')} alt=""/>
			<div onMouseOver={this.handleMouse} style={{position:"absolute",width:"89px",height:"24px",backgroundColor:"rgba(15, 105, 255, 1)",marginTop:"1.2em",marginLeft:"-0.2em",fontSize:"12px",color:"#ffffff",textAlign:"center",paddingTop:"2px"}}>
				{this.props.catalog.roles[0].catalogue_name}
			</div>
			<div style={{marginTop:"2.5em",marginLeft:"1.5em"}}>
				<Tree>
					{this.renderTreeNodes(this.props.catalog.roles[0].childs)}
				</Tree>
				</div>
			</div>

			<div id="jsmind_container" className={styles.right}>
				<div  className={styles.middle}>操作面板 ｜ 视频库编目</div>
				
			
			</div>
	
		</div>
			)
	}
}
export default connect(({ catalog }) => ({
	catalog,
  }))(Catalog);
